// Import Pinia and Vue composition API
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
// Import HTTP client library
import { mande } from 'mande'

// Create API client for students endpoint
const studentAPI = mande('api/students')

// Define and export the student store
export const useStudentStore = defineStore('students', () => {
    // Reactive state for list of students
    const studentList = ref( [] )

    // Reactive state for the most recently modified student
    const mostRecentStudent = ref( {} )

    // Reactive state for validation errors when adding a student
    const addNewStudentErrors = ref( [] )

    // Fetch all students from the API
    function getAllStudents() {
        return studentAPI.get().then( students => {
            studentList.value = students
        })
    }

    // Add a new student to the database
    function addNewStudent(student) {
        studentAPI.post(student).then( resp => {
            getAllStudents()
        }).catch( err => {
            addNewStudentErrors.value = err.body
        })
    }

    // Delete a student from the database
    function deleteStudent(studentToDelete) {
        const deleteStudentAPI = mande(`/api/students/${studentToDelete.id}`)
        deleteStudentAPI.delete().then( () => {
            mostRecentStudent.value = {} 
            getAllStudents()
        })
    }

    // Update a student's presence status
    function arrivedOrLeft(student) {
        const editStudentAPI = mande(`/api/students/${student.id}`)
        editStudentAPI.patch(student).then( () => {
            mostRecentStudent.value = student
            getAllStudents()
        })
    }

    // Computed property for students sorted by name
    const sortedStudents = computed( () => {
        return studentList.value.toSorted( (s1, s2) => {
            return s1.name.localeCompare(s2.name)
        })
    })

    // Computed property for total number of students
    const studentCount = computed( () => {
        return studentList.value.length
    })

    // Return state and methods to be used by components
    return { 
        // reactive data
        studentList, 
        mostRecentStudent, 
        addNewStudentErrors,

        // functions
        addNewStudent, 
        deleteStudent, 
        arrivedOrLeft, 
        getAllStudents,

        // computed properties
        sortedStudents,
        studentCount
    }

})
