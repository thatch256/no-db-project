require('dotenv').config({path: __dirname + '/../.env'})
const express = require('express')
const ctrl = require('./compController')

const {SERVER_PORT} = process.env

const app = express()

app.use(express.json())

app.get('/api/quiz', ctrl.getQuestions)
// app.get(`api/quiz/:id`)
app.put('/api/quiz/:answer', )
app.post('/api/quiz', ctrl.addQuestion)
app.delete('/api/quiz/:id', ctrl.deleteQuestion)

app.listen(SERVER_PORT, () => {
    console.log(`Listening on port ${SERVER_PORT}`)
})