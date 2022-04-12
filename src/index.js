const express = require("express")
const app = express()

app.use(express.json())
app.use("/posts", require("./route/postsRoute"))
app.use((error, req, res, next) => {
  if (err.message === "Post already exists.") {
    res.status(409).send(err.message)
  } else if (err.message === "Post not found.") {
    res.status(404).send(err.message)
  } else {
    res.status(500).send(err.message)
  }
})

app.listen(3000)
