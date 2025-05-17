// Import required modules for API routes
const express = require('express')
const database = require('../models')
const Student = database.Student

// Create Express router for handling API endpoints
const router = express.Router()

// GET /api/students - Retrieve all students sorted by presence and name
router.get('/students', function(req, res, next) {
    // Find all students and order by presence status (absent first) and then by name
    Student.findAll( {order: ['present', 'name']} ).then( students => {
        return res.json(students)
    }).catch( err => {
        return next(err) // Pass errors to error handler
    })
})

// POST /api/students - Create a new student record
router.post('/students', function(req, res, next){
    const newStudent = req.body
    console.log(newStudent)
    // Create student in database with data from request body
    Student.create(newStudent).then( result => {
        return res.status(201).send('New student created!')
    }).catch( err => {
        // Handle validation errors from Sequelize
        if (err instanceof database.Sequelize.ValidationError) {
            const messages = err.errors.map( e => e.message )
            return res.status(400).json(messages) // Return validation errors to client
        } else {
            return next(err) // Pass other errors to error handler
        }
    })
})

// PATCH /api/students/:id - Update a student's information by StarID
router.patch('/students/:id', function(req, res, next) {
    const studentID = req.params.id
    const updatedStudent = req.body 
    console.log(studentID, updatedStudent)
    // Update student in database where StarID matches
    Student.update( updatedStudent, { where: { starID: studentID} })
        .then( (result) => {
            const rowsModified = result[0]
            // Check if student was found and updated successfully
            if (rowsModified == 1) {
                return res.send('Student updated')
            } else {
                return res.status(404).send('Student not found') // Student with ID doesn't exist
            }
        })
        .catch( err => {
            // Handle validation errors from Sequelize
            if (err instanceof database.Sequelize.ValidationError) {
                const messages = err.errors.map( e => e.message )
                return res.status(400).json(messages) // Return validation errors to client
            } else {
                return next(err) // Pass other errors to error handler
            }
        })
})

// DELETE /api/students/:id - Delete a student record by StarID
router.delete('/students/:id', function(req, res, next) {
    const studentID = req.params.id
    // Delete student from database where StarID matches
    Student.destroy({where: { starID: studentID}})
        .then( (rowsDeleted) => {
            // Check if student was found and deleted successfully
            if (rowsDeleted === 1) {
                return res.send('Student deleted')
            } else {
                return res.status(404).send('Student not found') // Student with ID doesn't exist
            }
        }).catch( err => {
            return next(err) // Pass errors to error handler
        })
})

// Export router for use in main application
module.exports = router
