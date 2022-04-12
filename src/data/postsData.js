const db = require("../infra/database")

exports.getPosts = () => {
  return db.query("SELECT * FROM blog.post")
}

exports.getPost = (id) => {
  return db.oneOrNone("SELECT * FROM blog.post WHERE id = $1", [id])
}

exports.getPostByTitle = (title) => {
  return db.oneOrNone("SELECT * FROM blog.post WHERE title = $1", [title])
}

exports.savePost = (post) => {
  return db.one("INSERT INTO blog.post (title, content) values ($1, $2) returning *", [
    post.title,
    post.content,
  ])
}

exports.updatePost = (id, post) => {
  return db.none("UPDATE blog.post SET title = $1, content = $2 WHERE id = $3", [
    post.title,
    post.content,
    id,
  ])
}

exports.deletePost = (id) => {
  return db.none("DELETE FROM blog.post WHERE id = $1", [id])
}
