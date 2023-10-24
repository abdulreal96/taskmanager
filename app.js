const express = require('express')
const app = express()
const connectDB = require('./db/connect')
require('dotenv').config()

const tasks = require('./routes/task')

//add static files
app.use(express.static('./public'))

//json middleware
app.use(express.json())

app.use('/api/v1/tasks', tasks)

const port = 3000

const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI)
        app.listen(port, () => {
            console.log("Server is listening on port 3000...")
        })
    }catch (e) {
        console.log(e)
    }
}

start()
