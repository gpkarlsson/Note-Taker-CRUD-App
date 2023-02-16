//Dependencies
const express = require('express')
const fs = require('fs')
const path = require('path')
const routes = require('./routes/routes')
//Initialize App

const app = express()
const PORT = process.env.PORT || 3001

//Set up data parsing
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(express.static('public'))

//Require route file
app.use('/', routes)

//Set up app listener
app.listen(PORT, () => {
  console.log('Listing on PORT: ' + PORT)
});

