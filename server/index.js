require('dotenv').config()
const {sequelize} = require('./util/database')
const {User} = require('./models/user')
const {Post} = require('./models/post')


const express = require('express')
const cors = require('cors')


const {PORT} = process.env
const {register, login} = require('./controllers/auth')
const {getAllPosts, getCurrentUserPosts, addPost, editPost, deletePost} = require('./controllers/post')
const {isAuthenticated} = require('./middleware/isAthenticated')


const server = express()

server.use(express.json())
server.use(cors())

User.hasMany(Post)
Post.belongsTo(User)


server.post('/register', register)
server.post('/login', login)

server.get('/posts', getAllPosts)

server.get('/userposts/:userId', getCurrentUserPosts)
server.post('/posts',isAuthenticated , addPost)
server.put('/posts/:id',isAuthenticated , editPost)
server.delete('/posts/:id', isAuthenticated, deletePost)

sequelize.sync().then(() => {
    server.listen(PORT, () => console.log(`Server running on port: ${PORT}`))
})
.catch(err => console.log(err))

