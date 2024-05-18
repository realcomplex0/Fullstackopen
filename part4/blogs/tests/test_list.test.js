const {test, describe} = require('node:test')
const assert = require('node:assert')
const listHelper = require('../utils/list_helper')

test('dummy returns one', () => {
    const blogs = []

    const result = listHelper.dummy(blogs)
    assert.strictEqual(result, 1)
})

const singleBlogList = [
    {
        _id: '5a422aa71b54a676234d17f8',
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
        likes: 5,
        __v: 0
    }
]
const blogList = [
    {
        _id: '5a422aa71b54a676234d17f8',
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
        likes: 5,
        __v: 0
    },
    {
        _id: '5a422sfasfasffas17f8',
        title: 'Simple Book',
        author: 'John Doe',
        url: 'https://linkedin.com',
        likes: 132,
        __v: 0
    },
    {
        _id: '17247142adasdad71247174',
        title: 'Programming',
        author: 'Belmann-Ford',
        url: 'https://google.com',
        likes: 2,
        __v: 0
    }
]

describe('Total likes', () => {
    test('single blog list', () => {
        assert.strictEqual(listHelper.totalLikes(singleBlogList), 5)
    })
    test('empty blog list', () => {
        assert.strictEqual(listHelper.totalLikes([]), 0)
    })
    test('any blog list', () => {
        assert.strictEqual(listHelper.totalLikes(blogList), 139)
    })
})

describe('Favorite post', () => {
    test('empty blog list', () => {
        assert.deepStrictEqual(listHelper.favoriteBlog([]), {})
    })
    test('single blog list', () => {
        assert.deepStrictEqual(listHelper.favoriteBlog(singleBlogList),
        {
            title: 'Go To Statement Considered Harmful',
            author: 'Edsger W. Dijkstra',
            likes: 5
        })
    })
    test('multiple blog list', () => {
        assert.deepStrictEqual(listHelper.favoriteBlog(blogList),
        {
            title: 'Simple Book',
            author: 'John Doe',
            likes: 132
        })
    })
})

const mostBlogListTest_1 = [
    {
        _id: '5a422sfasfasffas17f8',
        title: 'Simple Book',
        author: 'John Doe',
        url: 'https://linkedin.com',
        likes: 132,
        __v: 0
    }
]

const mostBlogListTest_2 = [
    {
        _id: '5a422sfasfasffas17f8',
        title: 'Simple Book',
        author: 'John Doe',
        url: 'https://linkedin.com',
        likes: 132,
        __v: 0
    },
    {
        _id: 'asd124214214412',
        title: 'Programming Book 1',
        author: 'Alice Roberts',
        url: 'https://youtube.com',
        likes: 135,
        __v: 0
    },
    {
        _id: 'asd124214214412',
        title: 'Programming Book 2',
        author: 'Alice Roberts',
        url: 'https://google.com',
        likes: 13522,
        __v: 0
    },
    {
        _id: '41241242141412555',
        title: 'Hard Book',
        author: 'John Doe',
        url: 'https://yahoo.com',
        likes: 144,
        __v: 0
    },
    {
        _id: '41241242141412555a322',
        title: 'Hard Book 2',
        author: 'John Doe',
        url: 'https://yahoo.com',
        likes: 122,
        __v: 0
    }
]

describe('Most blogs', () => {
    test('single author', () => {
        assert.deepStrictEqual(listHelper.mostBlogs(mostBlogListTest_1), {
            author: 'John Doe',
            blogs: 1
        })
    })
    test('multiple authors', () => {
        assert.deepStrictEqual(listHelper.mostBlogs(mostBlogListTest_2), {
            author: 'John Doe',
            blogs: 3
        })
    })
    test('no authors', () => {
        assert.deepStrictEqual(listHelper.mostBlogs([]), null)
    })
})

describe('Most likes', () => {
    test('single author', () => {
        assert.deepStrictEqual(listHelper.mostLikes(mostBlogListTest_1), {
            author: 'John Doe',
            likes: 132
        })
    }),
    test('multiple authors', () => {
        assert.deepStrictEqual(listHelper.mostLikes(mostBlogListTest_2), {
            author: 'Alice Roberts',
            likes: 13657
        })
    })
})