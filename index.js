require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')
const Note = require('./models/note')


app.use(express.json())
app.use(express.static('build'))
app.use(cors())


app.get('/', (request, response) => {
    response.send('<h1>Hello World!</h1>')
})


//get all notes
app.get('/api/notes', (request, response) => {
    Note.find({}).then(notes => {
        response.json(notes)
    })
})

//create note
app.post('/api/notes/', (request, response) => {
    const body = request.body

    if (body.content === undefined) {
        return response.status(400).json({
            error: 'content missing'
        })
    }

    const note = new Note({
        content: body.content,
        important: body.important || false,
    })

    note.save().then(savedNote => {
        response.json(savedNote)
    })
})


//get individual note with id #
app.get('/api/notes/:id', (request, response) => {
    Note.findById(request.params.id).then(note => {
        response.json(note)
    })
})

//change note
app.put('/api/notes/:id', (request, response) => {
    const id = Number(request.params.id)
    newNote = request.body
    notes = notes.map(note => note.id !== id ? note : newNote)

    response.json(newNote)
})

//delete note
app.delete('/api/notes/:id', (request, response) => {
    const id = Number(request.params.id)
    notes = notes.filter(note => note.id !== id)

    response.status(204).end()
})




const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})