// Define and export the Student model for database operations
module.exports = (sequelize, DataTypes) => {
    // Define Student model with its fields, constraints, and validations
    const Student = sequelize.define('Student', {
        // Student name field - required non-empty string for student's full name
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true // Ensures name is not an empty string
            }
        },
        // StarID field - required unique identifier for each student
        starID: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true, // Ensures no duplicate StarIDs in database
            validate: {
                notEmpty: true // Ensures StarID is not an empty string
            }
        },
        // Present field - boolean tracking student attendance status
        present: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false // Students are marked absent by default
        }
    })

    // Sync model with database (without dropping existing table or data)
    Student.sync({ force: false }).then( () => {
        console.log('Synced student table')
    })

    // Return the Student model for use in the application
    return Student
}
