const express = require("express");
const http = require('http')
const { Server } = require('socket.io')
const cors = require('cors')
const coursesRouter = require('./routes/coursesRoutes')
const authRouter = require('./routes/authRoutes')
const dashboardRouter = require('./routes/dashboardRoutes')
const moderatorRouter = require('./routes/moderatorRoute')
const teacherRouter = require('./routes/teacherRouter')
const modulesRouter = require('./routes/modulesRoutes')
const partitionsRouter = require('./routes/partitionsRoutes')
const leassonsRouter = require('./routes/leassonsRoutes')


const chatService = require('./services/ChatService')
const messageRepository = require('./repositories/MessageRepository')

const BadWordsNext = require('bad-words-next')
const ru = require('bad-words-next/data/ru.json');
const { createBlockedMessage } = require("./utils/createBlockedMessage");
const moderatorService = require("./services/ModeratorService");
const userRepository = require("./repositories/UserRepository");

const multer = require('multer');
const path = require('path');
const { UPLOAD_PATHS } = require("./constants/uploadFilleType");

const app = express()
const port = process.env.PORT || 3000

app.use(express.json({ limit: '50mb' }));
app.use(cors({ origin: '*' }))

app.use('/api/courses', coursesRouter)
app.use('/api/auth', authRouter)
app.use('/api/dashboard', dashboardRouter)
app.use('/api/moderator', moderatorRouter)
app.use('/api/teachers', teacherRouter)
app.use('/api/modules', modulesRouter)
app.use('/api/partitions', partitionsRouter)
app.use('/api/leassons', leassonsRouter)

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const { folder } = UPLOAD_PATHS.find(p => p.type === req.query.type)
        const uploadPath = folder ? `src/uploads/${folder}` : 'src/uploads/'

        cb(null, uploadPath)
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`)
    },
});

const upload = multer({ storage: storage });

app.post('/api/upload', upload.single('file'), (req, res) => {
    if (!req.file) {
        return res.status(400).send('No file uploaded.');
    }

    const relativeFilePath = req.file.path.slice(4).replace(/\\/g, '/');
    res.status(200).send({ filePath: `http://localhost:3000/${relativeFilePath}` });
})

app.use('/uploads', express.static(path.join(__dirname, 'uploads')))


const server = http.createServer(app)

const io = new Server(server, {
    cors: {
        origin: '*',
        methods: ['GET', 'POST', 'PUT', 'DELETE']
    }
})

const badwords = new BadWordsNext({ data: ru })
const currentChatsUsers = {}

io.on('connection', socket => {
    socket.on('join', async ({ userId, chatId }) => {
        socket.join(chatId)
        // console.log(currentChatsUsers)
        if (chatId in currentChatsUsers && !currentChatsUsers[chatId].includes(userId)) {
            currentChatsUsers[chatId].push(userId)
        } else {
            currentChatsUsers[chatId] = [userId]
        }

        const countNewMessages = (await messageRepository.getNewMessages({ chatId, userId })).length
        if (countNewMessages) {
            await chatService.readNewMessages({ chatId, userId })
            io.emit('messagesRead', { readerId: userId, readChatId: chatId })
        }

        const { messages, notifications } = await chatService.getChatMessagesAndNotification({ userId, chatId })
        socket.emit('chatMessages', { messages, notifications })
    })

    socket.on('sendMessage', async ({ chatId, userId, text }) => {
        // console.log(chatId)
        const newMesssage = await chatService.sendMessage({
            userId,
            chatId,
            text,
            currentChatUsers: currentChatsUsers[chatId]
        })

        if (badwords.check(newMesssage.text)) {
            // создать чаты модеров, при создании любого чата определять брать модера(ов) у которого меньше чатов, та же логика при отправке сообщения модеру 
            const newModeratorMessage = await moderatorService.createModerationMessage({ messageId: newMesssage.id, moderatorId: 47 })
            io.emit('messageContainsBadWords', newModeratorMessage)
        }

        io.emit('messageReceived', newMesssage)
    })

    socket.on('updateMessage', async ({ chatId, messageId, text }) => {
        await messageRepository.updateMessage({ messageId, text })
        io.emit('messageUpdated', { chatId, messageId, text })
    })

    socket.on('deleteMessage', async ({ chatId, userId, messageId, isForAll }) => {
        await chatService.deleteMessage({ messageId, isForAll })
        const lastMessage = await chatService.getLastChatMessage({ userId, chatId })
        io.emit('messageDeleted', { chatId, messageId, userId, isForAll, lastMessage })
    })

    socket.on('lockUser', async ({ moderatorId, messageId, userId, accompanyingText, reason, duration }) => {
        const { chatId } = await messageRepository.getMessageById(messageId)
        const { name: nameLockedChat } = await chatService.getUserChatById({ userId, chatId })

        const lockedUser = await moderatorService.lockUser({ moderatorId, userId, chatId, messageId, reason, duration })

        const chatWithModerator = await chatService.getChatBetweenUsers({ firstUserId: moderatorId, secondUserId: userId })
        if (chatWithModerator) {
            const message = await chatService.sendMessage({
                userId: moderatorId,
                chatId: chatWithModerator.id,
                text: createBlockedMessage({ chatName: nameLockedChat, duration, reason, accompanyingText }),
                currentChatUsers: currentChatsUsers[chatWithModerator.id]
            })

            io.emit('messageReceived', message)
            io.emit('userLocked', lockedUser)
            return
        }

        const { id: newChatId } = (await chatService.createChatBetweenUsers({
            firstUserId: moderatorId,
            secondUserId: userId
        })).toJSON()

        await chatService.sendMessage({
            userId: moderatorId,
            chatId: newChatId,
            text: createBlockedMessage({ chatName: nameLockedChat, duration, reason, accompanyingText }),
            currentChatUsers: []
        })

        const chat = await chatService.getUserChatById({ userId, chatId: newChatId })
        io.emit('newChat', chat)
        io.emit('userLocked', lockedUser)
    })

    socket.on('unlockUser', async (lockedUserId) => {
        await userRepository.deleteLockedUser(lockedUserId)
        socket.emit('userUnlocked', lockedUserId)
    })

    socket.on('exit', async ({ chatId, userId }) => {
        // console.log('exit', currentChatsUsers)
        currentChatsUsers[chatId] = currentChatsUsers[chatId].filter(u => u !== userId)
    })

    io.on('disconnection', () => {
        console.log('Disconnect')
    })
})

server.listen(port, () => {
    console.log(`[server]: Server is running on port ${port}`);
});
