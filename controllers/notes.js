const notesRouter = require('express').Router()
const Note = require('../models/note')
const User = require('../models/user')

//get all notes
notesRouter.get('/', async (request, response) => {
    const notes = await Note
        .find({}).populate('user', { username: 1, name: 1 })
    response.json(notes)
})

//get individual note with id #
notesRouter.get('/:id', async (request, response, next) => {
    const note = await Note.findById(request.params.id)
    if (note) {
        response.json(note)
    } else {
        response.status(404).end()
    }
})

//create note
notesRouter.post('/', async (request, response, next) => {
    const body = request.body

    const user = await User.findById(body.userId)

    const note = new Note({
        content: body.content,
        important: body.important || false,
        user: user.id
    })


    const savedNote = await note.save()
    user.notes = user.notes.concat(savedNote._id)
    await user.save()

    response.status(201).json(savedNote)

})



//change note
notesRouter.put('/:id', (request, response, next) => {
    const { content, important } = request.body

    Note.findByIdAndUpdate(
        request.params.id,
        { content, important },
        { new: true, runValidators: true, context: 'query' }
    )
        .then(updatedNote => {
            response.json(updatedNote)
        })
        .catch(error => next(error))
})

//delete note
notesRouter.delete('/:id', async (request, response, next) => {
    await Note.findByIdAndRemove(request.params.id)
    response.status(204).end()
})

module.exports = notesRouter