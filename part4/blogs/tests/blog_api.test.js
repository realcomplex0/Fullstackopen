const {test, after, describe, beforeEach} = require('node:test')
const assert = require('node:assert')
const Blog = require('../models/blog')
const mongoose = require('mongoose')
const supertest = require('supertest')

const app = require('../app')
const api = supertest(app)
const initialBlogs = [
    {
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
        likes: 5,
    },
    {
        title: 'Simple Book',
        author: 'John Doe',
        url: 'https://linkedin.com',
        likes: 132,
    }
]

beforeEach(async () => {
    await Blog.deleteMany()
    for(let blog of initialBlogs) {
        let blogObject = new Blog(blog)
        await blogObject.save()
    }
})
test('correct note count', async () => {
    const response = await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)
    assert.strictEqual(response.body.length, initialBlogs.length)
})

test('id property test', async () => {
    const response = await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)

    response.body.forEach(e => {
        assert.ok('id' in e)
    })
})

test('add blog', async () => {
    const newBlog = {
        title: 'Algorithms',
        author: 'Bellman-Ford',
        url: 'https://x.com',
        likes: 123,
    }
    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)
    const dbBlogList = await Blog.find({})
    const endBlogList = dbBlogList.map(b => b.toJSON())
    const titles = endBlogList.map(b => b.title)
    console.log(endBlogList.length)
    assert.strictEqual(endBlogList.length, initialBlogs.length + 1)
    assert(titles.includes(newBlog.title))
    
})

test('likes property test', async () => {
    const noLikesBlog = {
        title: 'Algorithms',
        author: 'Bellman-Ford',
        url: 'https://x.com'
    }
    const response = await api
        .post('/api/blogs')
        .send(noLikesBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)
    assert.strictEqual(response.body.likes, 0)
})

test('no title property', async() => {
    const noTitleBlog = {
        author: 'Bellman-Ford',
        url: 'https://x.com',
        likes: 14
    }
    const response = await api
        .post('/api/blogs')
        .send(noTitleBlog)
        .expect(400)
})

test('no url property', async() => {
    const noUrlBlog = {
        title: 'Algorithms and data structures',
        author: 'Bellman-Ford',
        likes: 14
    }
    const response = await api
        .post('/api/blogs')
        .send(noUrlBlog)
        .expect(400)
})

test.only('delete a single blog', async() => {
    const allBlogs = await api
        .get('/api/blogs')
        .expect(200)
    const blogs = allBlogs.body
    await api
        .delete(`/api/blogs/${blogs[0].id}`)
        .expect(204)
    const afterDeleteBlogs = await api
        .get('/api/blogs')
        .expect(200)
    const newBlogs = afterDeleteBlogs.body
    const titles = newBlogs.map(b => b.title)
    assert.strictEqual(blogs.length - 1, newBlogs.length)
    assert(!titles.includes(blogs[0].title))
})

test.only('edit a single blog', async() => {
    const allBlogs = await api
        .get('/api/blogs')
        .expect(200)
    const blogs = allBlogs.body
    const newBlog = {
        title : "My Edited Blog",
        author : "James Editor",
        url : "www.youtube.com",
        likes : 175
    }
    await api
        .put(`/api/blogs/${blogs[0].id}`)
        .send(newBlog)
        .expect(200)
    const afterPutBlog = await api
        .get('/api/blogs')
        .expect(200)
    const newBlogs = afterPutBlog.body
    assert.strictEqual(blogs.length, newBlogs.length)
    const titles = newBlogs.map(b => b.title)
    assert(titles.includes(newBlog.title))
})

after(async() => {
    await mongoose.connection.close()
})