const _ = require('lodash')

const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    return blogs.reduce(
        (accumulator, currentValue) => accumulator + currentValue.likes,
        0,
    )
}

const favoriteBlog = (blogs) => {
    let maxVotes = 0
    let blog = {}
    blogs.map(x => {
        if (x.likes > maxVotes) {
            maxVotes = x.likes
            blog.title = x.title
            blog.author = x.author
            blog.likes = x.likes
        }

    })
    return blog

}

const mostBlogs = (blogs) => {
    let numbers = blogs.reduce((acc, child) => {
        if (!acc[child.author]) {
            acc[child.author] = 0;
        }
        acc[child.author]++;

        return acc;

    }, {});

    let max = 0

    Object.values(numbers).map(x => {
        if (x > max) {
            max = x

        }
    })

    const mostBlog = {}
    const mostBlogNumber = Object.values(numbers)[Object.values(numbers).indexOf(max)]
    const mostBlogAuthor = Object.keys(numbers)[Object.values(numbers).indexOf(max)]
    mostBlog.author = mostBlogAuthor
    mostBlog.blogs = mostBlogNumber
    console.log(mostBlog)
    return mostBlog

}





module.exports = { dummy, totalLikes, favoriteBlog, mostBlogs}


