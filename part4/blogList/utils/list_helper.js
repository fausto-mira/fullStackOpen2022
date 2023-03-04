const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  return blogs.reduce((accum, current) => accum + current.likes, 0)
}

const favoriteBlogs = (blogs) => {
  return blogs.reduce((accumulator, currentValue, index) => {
    if (index === 0) {
      return currentValue
    }
    return accumulator.likes > currentValue.likes ? accumulator : currentValue
  })
}

const mostBlogs = (blogs) => {
  return blogs.reduce()
}

module.exports = { dummy, totalLikes, favoriteBlogs, mostBlogs }
