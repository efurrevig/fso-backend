const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Note = require('../models/note')

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

beforeEach(async () => {
    await Note.deleteMany({})
    for (let note of initialNotes) {
        let newNote = new Note(note)
        await newNote.save()
    }
})

test('notes are returned as json', async () => {
    await api
        .get('/api/notes')
        .expect(200)
        .expect('Content-Type', /application\/json/)
})

test('there are four notes', async () => {
    const response = await api.get('/api/notes')

    expect(response.body).toHaveLength(initialNotes.length)
})

test('a specific note is within the returned notes', async () => {
    const response = await api.get('/api/notes')
    const contents = response.body.map(r => r.content)

    expect(contents).toContain('HTML is easy')
})

afterAll(async () => {
    await mongoose.connection.close()
})