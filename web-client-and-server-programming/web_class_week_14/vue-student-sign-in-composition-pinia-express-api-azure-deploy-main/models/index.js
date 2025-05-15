// Import Sequelize ORM and data types
const { Sequelize, DataTypes } = require('sequelize')
// Import database configuration
const configJson = require('../config.json')
// Import Student model definition
const createStudentModel = require('./student')

// Determine environment (development, production, etc.)
const env = process.env.NODE_ENV || 'development'

// Get database password from environment variables
const dbPassword = process.env.DB_PASSWORD

// Get configuration for current environment
const config = configJson[env]
config.password = dbPassword

// Initialize Sequelize with configuration
const sequelize = new Sequelize(config)

// Create database object to export
const database = {
    sequelize: sequelize,
    Sequelize: Sequelize,
}

// Initialize Student model
const studentModel = createStudentModel(sequelize, DataTypes)
const studentModelName = studentModel.name 
// Add Student model to database object
database[studentModelName] = studentModel

// Export database object with Sequelize instance and models
module.exports = database 
