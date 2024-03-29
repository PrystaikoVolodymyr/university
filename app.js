const express = require('express')
const config = require('config')
const mongoose = require('mongoose')
const router = require('./router')

const app = express()

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', router)

const PORT = config.get('port') || 5000


async function start () {
    try {
        await mongoose.connect(config.get('mongoURI'), {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })

        app.listen(PORT, () => {
            console.log(`App has been started at port ${PORT}...`)
        })
    } catch (e) {
        console.log("Server Error mongoDB", e.message())
        process.exit(1)
    }
}


start();