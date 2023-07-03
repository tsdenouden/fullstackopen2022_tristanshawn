const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  let totalLike = 0
  blogs.forEach(blog => totalLike += blog.likes)
  return totalLike
}

const favoriteBlog = (blogs) => {
  let favoriteBlog = {}
  let highestLike = 0
  blogs.forEach(blog => {
    if (blog.likes > highestLike) {
      highestLike = blog.likes
      favoriteBlog = blog 
    }
  })
  return favoriteBlog
}

const mostBlogs = (blogs) => {
  let blogCounts = {}

  blogs.forEach(blog => {
    if (blogCounts[blog.author]) {
      blogCounts[blog.author] += 1
    } else {
      blogCounts[blog.author] = 1
    }
  })

  const [author, blogCount] = getPropertyWithHighestValue(blogCounts)

  return {
    "author": author,
    "blogs": blogCount
  }
}

const mostLikes = (blogs) => {
  let likeCounts = {}

  blogs.forEach(blog => {
    if (likeCounts[blog.author]) {
      likeCounts[blog.author] += blog.likes
    } else {
      likeCounts[blog.author] = blog.likes
    }
  })

  const [author, likes] = getPropertyWithHighestValue(likeCounts)

  return {
    author,
    likes
  }
}

function getPropertyWithHighestValue(obj) {
  let maxProp = null;
  let maxValue = -Infinity;

  for (let prop in obj) {
    if (obj.hasOwnProperty(prop) && typeof obj[prop] === 'number') {
      if (obj[prop] > maxValue) {
        maxValue = obj[prop];
        maxProp = prop;
      }
    }
  }

  return [maxProp, maxValue];
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}

