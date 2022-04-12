const express = require("express")
const router = express.Router()
const postsService = require("../service/postsService")

router.get("/", async (req, res, next) => {
  try {
    const posts = await postsService.getPosts()
    res.json(posts)
  } catch (err) {
    next(err)
  }
})

router.get("/:id", async (req, res) => {})

router.post("/", async (req, res, next) => {
  const post = req.body
  try {
    const newPost = await postsService.savePost(post)
    res.status(201).json(newPost)
  } catch (err) {
    next(err)
  }
})

router.put("/:id", async (req, res, next) => {
  const post = req.body
  try {
    await postsService.updatePost(req.params.id, post)
    res.status(204).end()
  } catch (err) {
    next(err)
  }
})

router.delete("/:id", async (req, res, next) => {
  try {
    await postsService.deletePost(req.params.id)
    res.status(204).end()
  } catch (err) {
    next(err)
  }
})

module.exports = router
