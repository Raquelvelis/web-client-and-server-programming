/**
 * Routes configuration file for the "Would You Rather" Express API.
 * Defines all API endpoints for the application.
 */

// Import required modules
const express = require('express')
const router = express.Router()
const randomWyrQuestion = require('../model/wyr_questions')

router.get('/wyr', function (req, res, next) {
    // Get a random question from the model
    const wyrQuestion = randomWyrQuestion()
    // Send the question as JSON response
    res.json(wyrQuestion)
})

// Export the router to be used in the main server file
module.exports = router
