const express = require("express");

const coursesRouter = require('./routes/coursesRoutes')
const authRouter = require('./routes/authRoutes')
const userRouter = require('./routes/userRoutes')

const app = express()
const port = process.env.PORT || 3000

app.use(express.json());

app.options('*', (req, res) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:5173');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.sendStatus(200);
});

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:5173');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    next();
});

app.use('/api/courses', coursesRouter)
app.use('/api/auth', authRouter)
app.use('/api/user', userRouter)

app.listen(port, () => {
    console.log(`[server]: Server is running on port ${port}`);
});
