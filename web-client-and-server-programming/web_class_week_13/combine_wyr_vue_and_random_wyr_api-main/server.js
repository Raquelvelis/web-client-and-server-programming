const express = require('express')
const path = require('path')

// Import the routes defined in routes/index.js file
const indexRouter = require('./routes/index')

// Create the Express web application instance
const app = express() 

// Set up path to the built Vue.js client files
const staticFilePath = path.join(__dirname, 'client', 'dist') 
// Create middleware for serving static files
const staticFiles = express.static(staticFilePath)
// Serve static files from the Vue.js build directory
app.use('/', staticFiles)

// Register the API routes from index.js
app.use('/', indexRouter)

// Start the server on the specified port or default to 3001
let server = app.listen(process.env.PORT || 3001, function() {
    console.log('Express server running on port', server.address().port)
})
