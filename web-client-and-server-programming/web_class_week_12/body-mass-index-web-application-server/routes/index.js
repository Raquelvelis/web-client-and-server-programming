/**
 * Routes configuration file for the Body Mass Index Web Application Server.
 * Defines all routes for the application including the home page and BMI calculation.
 * This file defines the routes for handling BMI calculation requests.
 */

// Import required modules
const express = require('express')  // The Express.js framework
const router = express.Router()     // Create a router object to define routes

/**
 * GET / - Home page route
 * 
 * This route handles requests to the root URL of the application.
 */
router.get('/', function(req, res, next) {
    // res.render() renders a view template and sends the HTML to the client
    // The second parameter is an object with data to be used in the template
    res.render('index', {
        title: 'Body Mass Index Calculator',
        author: 'Your Name'
    })
})

/**
 * GET /calculate - Processes the BMI calculation
 * 
 * This route handles the form submission when a user submits the BMI form.
 */
router.get('/calculate', function(req, res, next) {
    // Extract the form data from the request query
    // req.query contains key-value pairs of data submitted in the URL query string
    const height = parseFloat(req.query.height)
    const weight = parseFloat(req.query.weight)
    
    // Validate the input data
    if (isNaN(height) || isNaN(weight) || height <= 0 || weight <= 0) {
        // If the data is invalid, render the error page
        return res.render('error', {
            message: 'Invalid input data. Please enter valid height and weight values.'
        })
    }
    
    // Calculate the BMI
    const bmi = weight / (height * height)
    
    // Format the BMI to two decimal places
    const formattedBMI = bmi.toFixed(2)
    
    // Render the result page with the calculated BMI
    res.render('result', {
        height: height,
        weight: weight,
        bmi: formattedBMI
    })
})

// This makes all the routes defined above available to the main application
module.exports = router