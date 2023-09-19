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

module.exports = { dummy, totalLikes, favoriteBlog }


