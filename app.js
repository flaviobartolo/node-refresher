const express = require('express')
const bodyParser = require('body-parser') // body-parser is a node library that give us ready to use middlewares which we can use in express apps

const app = express()

/* app.use((req, res, next) => { // app.use() express method to create middlewares
  next() // if you are not calling next() then any middleware after this one will not be reached by the request; 
        //  you should always call next() unless you are in the middleware where you wanna send back a response
})  */

// requests without body-parser
/* app.use((req, res, next) => {
  let body = ''

  req.on('end', () => {
    const username = body.split('=')[1]
    if (username){
      req.body = {name: username}
    }
    next()
  })

  req.on('data', (chunk) => {
    body += chunk
  })

}) */

// requests with body parser
app.use(bodyParser.urlencoded({ extended: false }))


app.get('/', (req, res, next) => {
  console.log('get')
  res.send('<form action="/user" method="POST"><input type="text" name="username" /><button type="submit">Create User</button></form>')
})

app.post('/user', (req, res, next) => {
  console.log('post')
  res.send(`<h1>User: ${req.body.username}</h1>`)
})
 
app.listen(5000)