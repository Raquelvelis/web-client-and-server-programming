// Import Sequelize ORM and data types for database operations
const { Sequelize, DataTypes } = require('sequelize')
// Import database configuration from config.json file
const configJson = require('../config.json')
// Import Student model definition from separate file
const createStudentModel = require('./student')

// Determine environment (development, production, etc.) from environment variables
const env = process.env.NODE_ENV || 'development'

// Get database password from environment variables for security
const dbPassword = process.env.DB_PASSWORD

// Get database configuration for current environment from config file
const config = configJson[env]
config.password = dbPassword // Set password from environment variable

// Initialize Sequelize ORM with database configuration
const sequelize = new Sequelize(config)

// Create database object to export with Sequelize instances
const database = {
    sequelize: sequelize, // Database connection instance
    Sequelize: Sequelize, // Sequelize library for types and utilities
}

// Initialize Student model with database connection
const studentModel = createStudentModel(sequelize, DataTypes)
const studentModelName = studentModel.name 
// Add Student model to database object for export
database[studentModelName] = studentModel

// Export database object with Sequelize instance and models for use in application
module.exports = database 
