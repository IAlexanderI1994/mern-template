const path = require('path')
const keys = require('../config/keys')
const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const users = require('./routes/api/users')
const passport = require('passport')
const passportConfig = require('../config/passport')

const server = express()

// Body parser middleware
server.use(bodyParser.urlencoded({ extended: false }))
server.use(bodyParser.json())
// getting db config
const { mongoURI: db } = keys

mongoose
  .connect(db, { useFindAndModify: false,  useNewUrlParser: true  })
  .then(() => console.log('DB connected'))
  .catch(e => console.log(e))

// passport middleware
server.use(passport.initialize())

passportConfig(passport)


// API Routes
server.use('/api/users/', users)

// Server static assets if in production
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  server.use(express.static(path.resolve(__dirname, '../client', 'build', 'index.html')));

  server.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../client', 'build', 'index.html'));
  });
}

server.listen(8080, () => {

  console.log('Listening 8080... ')

})
