// Import required modules
const express = require('express')
const database = require('../models')
const Student = database.Student

// Create Express router
const router = express.Router()

// GET /api/students - Retrieve all students
router.get('/students', function(req, res, next) {
    // Find all students and order by presence status and name
    Student.findAll( {order: ['present', 'name']} ).then( students => {
        return res.json(students)
    }).catch( err => {
        return next(err)
    })
})

// POST /api/students - Create a new student
router.post('/students', function(req, res, next){
    const newStudent = req.body
    console.log(newStudent)
    // Create student in database
    Student.create(newStudent).then( result => {
        return res.status(201).send('New student created!')
    }).catch( err => {
        // Handle validation errors
        if (err instanceof database.Sequelize.ValidationError) {
            const messages = err.errors.map( e => e.message )
            return res.status(400).json(messages)
        } else {
            return next(err)
        }
    })
})

// PATCH /api/students/:id - Update a student by ID
router.patch('/students/:id', function(req, res, next) {
    const studentID = req.params.id
    const updatedStudent = req.body 
    console.log(studentID, updatedStudent)
    // Update student in database
    Student.update( updatedStudent, { where: { id: studentID} })
        .then( (result) => {
            const rowsModified = result[0]
            // Check if student was found and updated
            if (rowsModified == 1) {
                return res.send('Student updated')
            } else {
                return res.status(404).send('Student not found')
            }
        })
        .catch( err => {
            // Handle validation errors
            if (err instanceof database.Sequelize.ValidationError) {
                const messages = err.errors.map( e => e.message )
                return res.status(400).json(messages)
            } else {
                return next(err)
            }
        })
})

// DELETE /api/students/:id - Delete a student by ID
router.delete('/students/:id', function(req, res, next) {
    const studentID = req.params.id
    // Delete student from database
    Student.destroy({where: { id: studentID}})
        .then( (rowsDeleted) => {
            // Check if student was found and deleted
            if (rowsDeleted === 1) {
                return res.send('Student deleted')
            } else {
                return res.status(404).send('Student not found')
            }
        }).catch( err => {
            return next(err)
        })
})

// Export router
module.exports = router
