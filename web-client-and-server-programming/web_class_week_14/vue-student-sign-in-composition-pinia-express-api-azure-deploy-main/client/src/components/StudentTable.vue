<script setup>
// Import child component
import StudentRow from './StudentRow.vue'

// Import Vue composition API functions
import { computed } from 'vue'

// Import Pinia utilities
import { storeToRefs } from 'pinia' 

// Import student store
import { useStudentStore } from '../stores/StudentStore.js'

// Initialize the student store
const studentStore = useStudentStore()

// Get reactive data from the store
const { sortedStudents, studentCount } = storeToRefs(studentStore)

// Handle student arrival/departure events from child components
const arrivedOrLeft = (student, isStudentPresent) => {
    student.present = isStudentPresent
    studentStore.arrivedOrLeft(student)
}

// Handle student deletion events from child components
const deleteStudent = (student) => {
    studentStore.deleteStudent(student)
}

// Computed property for displaying appropriate message based on student count
const pluralStudentMessage = computed (() => {
    if (studentCount.value == 1) {
        return 'There is 1 student in class.'
    } else {
        return `There are ${studentCount.value} students in class.`
    }
})

</script>

<template>
<!-- Student list table container -->
<div id="student-list-table" class="card m-2 p-2">
    <h4 class="card-title">Student List</h4>
    <h5 class="card-subtitle text-muted"> {{ pluralStudentMessage }} </h5>
    <div id="student-table">
        <table class="table">
            <thead>
                <tr class="align-middle">
                    <th>Name</th>
                    <th>StarID</th>
                    <th>Present?</th>
                    <th>Delete</th>
                </tr>
            </thead>

            <tbody>
                <!-- Render a row for each student using the StudentRow component -->
                <StudentRow 
                    v-for="student in sortedStudents" 
                    v-bind:key="student.starID"
                    v-bind:student="student" 
                    v-on:delete-student="deleteStudent"
                    v-on:arrived-or-left="arrivedOrLeft">       
                </StudentRow>
            </tbody>
        </table>
    </div>
</div>

</template>

<style scoped>
/* Set maximum height for table with scrolling */
#student-table {
    max-height: 500px;
    overflow: scroll;
}

/* Style table cells */
th, td {
    width: 25%;
    text-align: center;
}
</style>
