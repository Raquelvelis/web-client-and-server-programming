/**
 * Main server file for the Student Feedback Web Server application.
 * This file sets up the Express server with Handlebars templating,
 * configures middleware, and starts the server.
 */

// Import required modules
const express = require('express')  // The Express.js framework
const path = require('path')        // Node.js module for working with file paths
const bodyParser = require('body-parser')  // Middleware to parse request bodies

// Import the routes defined in routes/index.js
// This separates our route handling logic from the main server setup
const indexRouter = require('./routes')

// Create a new Express application instance

const app = express() 

// This allows us to access form data via req.body in our route handlers
// extended: false means the values can be only strings or arrays
app.use(bodyParser.urlencoded({ extended: false }))


// The path.join() method creates an absolute path by joining the __dirname (current directory)
// with 'public'
const staticFileLocation = path.join(__dirname, 'public')
app.use(express.static(staticFileLocation))

// Set the directory where template files are located
app.set('views', path.join(__dirname, 'views'))
// Set the template engine to Handlebars (hbs)
app.set('view engine', 'hbs')

// ROUTING CONFIGURATION
// This makes all routes defined in indexRouter available from the root URL

app.use('/', indexRouter)

// SERVER STARTUP
// Start the server listening on the specified port
let server = app.listen( 3000, function() {
    console.log('Express server running on port', server.address().port)
})
