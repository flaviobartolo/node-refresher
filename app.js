const express = require('express')
const app = express()

app.use((req, res, next) => { // app.use() express method to create middlewares
  next() // if you are not calling next() then any middleware after this one will not be reached by the request; 
        //  you should always call next() unless you are in the middleware where you wanna send back a response
}) 

app.use((req, res, next) => {
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

})

app.use((req, res, next) => {
  if (req.body) {
    return res.send(`<h1>${req.body.name}</h1>`)
  }
  res.send('<form method="POST"><input type="text" name="username" /><button type="submit">Create User</button></form>')
})

app.listen(5000)