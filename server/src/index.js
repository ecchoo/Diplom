const express = require("express");
const http = require('http')
const { Server } = require('socket.io')
const cors = require('cors')

const coursesRouter = require('./routes/coursesRoutes')
const authRouter = require('./routes/authRoutes')
const dashboardRouter = require('./routes/dashboardRoutes')

const chatService = require('./services/ChatService')
const messageRepository = require('./repositories/MessageRepository')

const app = express()
const port = process.env.PORT || 3000

app.use(express.json());
app.use(cors({ origin: '*' }))

app.use('/api/courses', coursesRouter)
app.use('/api/auth', authRouter)
app.use('/api/dashboard', dashboardRouter)

const server = http.createServer(app)

const io = new Server(server, {
    cors: {
        origin: '*',
        methods: ['GET', 'POST', 'PUT', 'DELETE']
    }
})

const currentChatsUsers = {}

io.on('connection', socket => {
    socket.on('join', async ({ userId, chatId }) => {
        socket.join(chatId)

        if (chatId in currentChatsUsers) {
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
        const newMesssage = await chatService.sendMessage({
            userId,
            chatId,
            text,
            currentChatUsers: currentChatsUsers[chatId]
        })

        io.emit('messageReceived', newMesssage)
    })

    socket.on('exit', async ({ chatId, userId }) => {
        currentChatsUsers[chatId] = currentChatsUsers[chatId].filter(u => u !== userId)
    })

    io.on('disconnection', () => {
        console.log('Disconnect')
    })
})

server.listen(port, () => {
    console.log(`[server]: Server is running on port ${port}`);
});
