const crypto = require("crypto")
const axios = require("axios")
const postsService = require("../service/postsService")

const random = () => crypto.randomBytes(8).toString("hex")

const request = (url, method, data) => {
  return axios({ url, method, data, validateStatus: false })
}

test("Should get posts", async () => {
  //given (dado que)
  const post1 = await postsService.savePost({ title: random(), content: random() })
  const post2 = await postsService.savePost({ title: random(), content: random() })
  const post3 = await postsService.savePost({ title: random(), content: random() })
  // when (quando acontecer)
  const response = await request("http://localhost:3000/posts", "get")
  const posts = response.data
  //then (então)
  expect(response.status).toBe(200)
  expect(posts).toHaveLength(3)
  await postsService.deletePost(post1.id)
  await postsService.deletePost(post2.id)
  await postsService.deletePost(post3.id)
})

test("Should save post", async () => {
  //given (dado que)
  const data = { title: random(), content: random() }
  // when (quando acontecer)
  const response = await request("http://localhost:3000/posts", "post", data)

  const post = response.data
  //then (então)
  expect(response.status).toBe(201)
  expect(post.title).toBe(data.title)
  expect(post.content).toBe(data.content)
  await postsService.deletePost(post.id)
})

test("Should not save post", async () => {
  //given (dado que)
  const data = { title: random(), content: random() }
  // when (quando acontecer)
  const response1 = await request("http://localhost:3000/posts", "post", data)
  const response2 = await request("http://localhost:3000/posts", "post", data)

  const post = response1.data
  //then (então)
  expect(response1.status).toBe(201)
  expect(response2.status).toBe(409)
  await postsService.deletePost(post.id)
})

test("Should update a post", async () => {
  //given (dado que)
  const post = await postsService.savePost({ title: random(), content: random() })
  // when (quando acontecer)
  post.title = random()
  post.content = random()
  const response = await request(`http://localhost:3000/posts/${post.id}`, "put", post)
  const updatedPost = await postsService.getPost(post.id)
  //then (então)
  expect(response.status).toBe(204)
  expect(updatedPost.title).toBe(post.title)
  expect(updatedPost.content).toBe(post.content)
  await postsService.deletePost(post.id)
})

test("Should not update a post", async () => {
  //given (dado que)
  const post = { id: 1 }
  // when (quando acontecer)
  const response = await request(`http://localhost:3000/posts/${post.id}`, "put", post)
  //then (então)
  expect(response.status).toBe(404)
})

test("Should delete a post", async () => {
  //given (dado que)
  const post = await postsService.savePost({ title: random(), content: random() })
  // when (quando acontecer)
  await request(`http://localhost:3000/posts/${post.id}`, "delete")
  //then (então)
  const posts = await postsService.getPosts()
  expect(posts).toHaveLength(0)
})
