const express = require("express")
const cors = require("cors")
const { uuid } = require("uuidv4")

// const { v4: uuid } = require('uuid');

const app = express()

app.use(express.json())
app.use(cors())

const repositories = []

app.get("/repositories", (request, response) => {
  return response.json(repositories)
})

app.post("/repositories", (request, response) => {
  const { title, url, techs } = request.body

  const newRepository = { id: uuid(), title, url, techs, likes: 0 }

  repositories.push(newRepository)

  return response.json(newRepository)
})

app.put("/repositories/:id", (request, response) => {
  const { id } = request.params
  const { title, url, techs } = request.body

  const repositoryIndex = repositories.findIndex(r => r.id == id)

  
  if (repositoryIndex < 0)
    return response.status(400).json({ error: 'ID not found' })
  
  const likes = repositories[repositoryIndex].likes
  const newRepository = { id, title, url, techs, likes }

  repositories[repositoryIndex] = newRepository

  return response.json(newRepository)
});

app.delete("/repositories/:id", (request, response) => {
  const { id } = request.params

  const repositoryIndex = repositories.findIndex(r => r.id == id)

  if (repositoryIndex < 0)
    return response.status(400).json({ error: 'ID not found' })

  repositories.splice(repositoryIndex, 1)

  return response.status(204).send()
})

app.post("/repositories/:id/like", (request, response) => {
  const { id } = request.params

  const repositoryIndex = repositories.findIndex(r => r.id == id)

  if (repositoryIndex < 0)
    return response.status(400).json({ error: 'ID not found' })

  repository = repositories[repositoryIndex]
  
  repository.likes = repository.likes + 1 

  console.log(repository.likes)

  return response.json(repository)
})

module.exports = app
