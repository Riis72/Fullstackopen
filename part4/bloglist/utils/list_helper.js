const _ = require('lodash')
const dummy = (blogs) => {
    return 1
}
const totalLikes = (blogs) => {

    const reducer = (sum, item) => {
        return sum + item.likes
    }
    return blogs.reduce(reducer, 0)

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
    names = []
    blogs.map(x => {
        names.push(x.author)
    })

    most = _.countBy(names)
    arr1 = Object.keys(most)
    arr2 = Object.values(most)
    let highest = 0
    arr2.map(x => {
        if(x > highest) {
            highest = x
        }
    })
    const index = arr2.indexOf(highest)
    let mostBlog = {}
    mostBlog.author = arr1[index]
    mostBlog.blogs = arr2[index]
    console.log(mostBlog)
    return mostBlog
}



module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs
}
