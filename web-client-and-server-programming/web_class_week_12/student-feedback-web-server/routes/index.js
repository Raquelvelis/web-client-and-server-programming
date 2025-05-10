/**
 * Routes configuration file for the Student Feedback Web Server application.
 * Defines all routes for the application including the home page,
 * feedback form, and form submission handling.

 */

// Import required modules
const express = require('express')  // The Express.js framework
const router = express.Router()     // Create a router object to define routes

/**
 * GET / - Home page route
 * 
 * This route handles requests to the root URL of the application.
 * When a user visits the homepage, this function renders the index template.
 */
router.get('/', function(req, res, next) {
    // res.render() renders a view template and sends the HTML to the client
    // The second parameter is an object with data to be used in the template
    res.render('index', {title: 'Feedback app', author: 'Raquel Velis'})
})

/**
 * GET /feedback-form - Displays the student feedback form
 * 
 * This route handles requests to the feedback form page.
 * When a user clicks the link on the homepage, they are directed here.

 */
router.get('/feedback-form', function(req, res, next){
    // Render the feedback form template (no data is passed to this template)
    res.render('student_feedback_form')
})

/**
 * POST /submit-feedback - Processes the submitted feedback form
 * 
 * This route handles the form submission when a user submits the feedback form.
 * It extracts the form data and renders a thank you page with the submitted information.
 */
router.post('/submit-feedback', function(req, res, next){
    // Extract the form data from the request body
    // req.body contains key-value pairs of data submitted in the request body
    // The bodyParser middleware (configured in server.js) makes this data available
    const formData = req.body
    // In a real application, you would store this data in a database here

    // Render the thank you page with the submitted data
    // We pass the form data to the template so it can display what was submitted
    res.render('thank_you', { 
        name: formData.name,                      // The user's name from the form
        email: formData.email,                    // The user's email from the form
        message: formData.comments,               // The user's comments from the form
        currentStudent: formData['current-student'] // Whether they're a current student
     })
})

// This makes all the routes defined above available to the main application
module.exports = router
