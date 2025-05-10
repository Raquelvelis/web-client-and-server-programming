/**
 * Main server file for the "Would You Rather" Express API application.
 * This file sets up the Express server, configures routes, and starts the server.
 */

// Import the Express framework
const express = require('express')

// Import the routes defined in routes/index.js
const indexRouter = require('./routes/index')

// Create a new Express application instance
const app = express() 

// Mount the router at the root path '/'
// This makes all routes defined in indexRouter available from the root URL
app.use('/', indexRouter)

// Start the server listening on the specified port
let server = app.listen(3000, function() {
    console.log('Express server running on port', server.address().port)
})
