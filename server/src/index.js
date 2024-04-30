const express = require("express");
const http = require('http')
const { Server } = require('socket.io')
const cors = require('cors')

const coursesRouter = require('./routes/coursesRoutes')
const authRouter = require('./routes/authRoutes')
const dashboardRouter = require('./routes/dashboardRoutes')
const messageRepository = require('./repositories/MessageRepository')
const chatService = require('./services/ChatService')

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

io.on('connection', socket => {
    socket.on('join', async ({ userId, chatId }) => {
        socket.join(chatId)

        const chatMessages = await chatService.getChatMessages(userId, chatId)

        socket.emit('chatMessages', {
            data: {
                chatMessages
            }
        })
    })

    socket.on('sendMessage', async ({ chatId, userId, text }) => {
        try {
            const newMesssage = await chatService.sendMessage(userId, chatId, text)
            io.to(chatId).emit('messageReceived', newMesssage)
        } catch (err) {
            console.log(err.message)
        }
    })

    io.on('disconnection', () => {
        console.log('Disconnect')
    })
})

server.listen(port, () => {
    console.log(`[server]: Server is running on port ${port}`);
});
