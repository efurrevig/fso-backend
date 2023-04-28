const Note = require('../../models/note')

const initialNotes = [
    {
        content: 'HTML is easy',
        important: true
    },
    {
        content: 'MongoDB is pretty easy to use',
        important: true
    },
    {
        content: 'This is a test note',
        important: true
    },
    {
        content: 'This year is flying by..',
        important: true
    }
]

const nonExistingId = async () => {
    const note = new Note({ content: 'willremovethissoon' })
    await note.save()
    await note.deleteOne()

    return note._id.toString()
}

const notesInDb = async () => {
    const notes = await Note.find({})
    return notes.map(note => note.toJSON())
}

module.exports = {
    initialNotes, nonExistingId, notesInDb
}