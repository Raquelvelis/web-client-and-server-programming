const express = require('express')
const router = express.Router()
// Import the function that generates random WYR questions
const randomWyrQuestion = require('../model/wyr_questions')

// Define GET endpoint for retrieving a random "Would You Rather" question
router.get('/wyr', function(req, res, next) {
    // Get a random question from our collection
    const wyrQuestion = randomWyrQuestion()
    // Send the question as JSON response
    res.json(wyrQuestion)
})

// Export the router for use in the main application
module.exports = router
