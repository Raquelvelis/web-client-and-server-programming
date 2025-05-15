// Define and export the Student model
module.exports = (sequelize, DataTypes) => {
    // Define Student model with its fields and validations
    const Student = sequelize.define('Student', {
        // Student name field - required string
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        // StarID field - required unique string
        starID: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                notEmpty: true
            }
        },
        // Present field - boolean with default value of false
        present: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        }
    })

    // Sync model with database (without dropping existing table)
    Student.sync({ force: false }).then( () => {
        console.log('Synced student table')
    })

    // Return the Student model
    return Student
}
