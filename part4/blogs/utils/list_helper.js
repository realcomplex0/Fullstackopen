const logger = require('./logger')

const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    const reducer = (sum, cur) => {
        return sum + cur.likes
    }
    return blogs.reduce(reducer, 0)
}

const favoriteBlog = (blogs) => {
    const reducer = (best, cur) => {
        if(cur.likes > best.likes) return cur
        else return best
    }
    const simplify = (result) => {
        return {
            title: result.title,
            author: result.author,
            likes: result.likes
        }
    }
    if(blogs.length == 0){
        return {}
    }
    else{
        return simplify(blogs.reduce(reducer))
    }
}

const mostBlogs = (blogs) => {
    const reducer = (obj, blog) => {
        const [blogCounts, mostAuthor] = obj
        const newCount = blog.author in blogCounts ? blogCounts[blog.author] + 1 : 1
        const newBlogCounts = {...blogCounts, [blog.author] : newCount}
        const newMostAuthor = (!mostAuthor || newCount > mostAuthor.blogs)? {author : blog.author,blogs: newCount} : mostAuthor
        return [newBlogCounts, newMostAuthor]
    }
    const [blogCounts, mostAuthor] = blogs.reduce(reducer, [{}, null])
    return mostAuthor
}

const mostLikes = (blogs) => {
    const reducer = (obj, blog) => {
        const [likeCounts, mostAuthor] = obj
        const newCount = blog.author in likeCounts ? likeCounts[blog.author] + blog.likes : blog.likes
        const newLikeCounts = {...likeCounts, [blog.author] : newCount}
        const newMostAuthor = (!mostAuthor || newCount > mostAuthor.likes) ? {author : blog.author, likes: newCount} : mostAuthor
        return [newLikeCounts, newMostAuthor]
    }
    const [likeCounts, mostAuthor] = blogs.reduce(reducer, [{}, null])
    return mostAuthor
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
}