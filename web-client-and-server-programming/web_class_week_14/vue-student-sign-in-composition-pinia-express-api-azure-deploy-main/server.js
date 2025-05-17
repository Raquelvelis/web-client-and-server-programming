// Import required modules for Express server setup
const express = require('express')
const apiRoutes = require('./routes/api.js')
const path = require('path')

// Create Express application instance
const app = express()

// Middleware to parse JSON request bodies for API endpoints
app.use(express.json()) 

// Set up static file serving for the Vue client application from the dist directory
const staticFilePath = path.join(__dirname, 'client', 'dist') 
const staticFiles = express.static(staticFilePath)
app.use('/', staticFiles)

// Set up API routes under the /api path prefix
app.use('/api', apiRoutes)

// 404 error handler for routes not found in the application
app.use(function(req, res, next) {
    res.status(404).send('Not found')
})

// 500 error handler for internal server errors
app.use(function(req, res, next, err) {
    console.error(err.stack)  // Log error details for server developers
    res.status(500).send('Server error') // Send simplified message to client
})

// Start the server on the specified port (from environment) or default to 30001
const server = app.listen(process.env.PORT || 30001, function() {
    console.log('Express app running on port', server.address().port)
})
