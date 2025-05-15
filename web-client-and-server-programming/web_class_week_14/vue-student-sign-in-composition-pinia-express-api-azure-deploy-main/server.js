// Import required modules
const express = require('express')
const apiRoutes = require('./routes/api.js')
const path = require('path')

// Create Express application
const app = express()

// Middleware to parse JSON request bodies
app.use(express.json()) 

// Set up static file serving for the Vue client application
const staticFilePath = path.join(__dirname, 'client', 'dist') 
const staticFiles = express.static(staticFilePath)
app.use('/', staticFiles)

// Set up API routes
app.use('/api', apiRoutes)

// 404 error handler for routes not found
app.use(function(req, res, next) {
    res.status(404).send('Not found')
})

// 500 error handler for server errors
app.use(function(req, res, next, err) {
    console.error(err.stack)  // for server developers
    res.status(500).send('Server error') // for client 
})

// Start the server on the specified port or default to 30001
const server = app.listen(process.env.PORT || 30001, function() {
    console.log('Express app running on port', server.address().port)
})
