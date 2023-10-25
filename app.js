const express = require('express')
const app = express()
const connectDB = require('./db/connect')
const errorHandlerMiddleware = require('./middleware/error-handler')
require('dotenv').config()

const tasks = require('./routes/task')

//add static files
app.use(express.static('./public'))

//json middleware
app.use(express.json())

app.use('/api/v1/tasks', tasks)

const port = process.env.PORT || 3000

app.use(errorHandlerMiddleware)

const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI)
        app.listen(port, () => {
            console.log(`Server is listening on port ${port}...`)
        })
    }catch (e) {
        console.log(e)
    }
}

start()
