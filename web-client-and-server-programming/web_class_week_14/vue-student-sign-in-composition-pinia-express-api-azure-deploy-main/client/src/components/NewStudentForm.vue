<script setup>
// Import Vue composition API functions
import { ref, watch } from 'vue'

// Import Pinia store and utilities
import { useStudentStore } from '../stores/StudentStore'
import { storeToRefs } from 'pinia';

// Initialize the student store
const studentStore = useStudentStore() 

// Reactive state for form inputs
const newStudentName = ref('')
const newStarID = ref('')

// Reactive state for form validation errors
const formErrors = ref([])

// Get validation errors from the store
const { addNewStudentErrors } = storeToRefs(studentStore)

// Watch for API validation errors and display them
watch( addNewStudentErrors, () => {
    if (addNewStudentErrors.value) {
        alert(addNewStudentErrors.value.join('\n'))
    }
})

// Handle form submission
const addStudent = () => {
    formErrors.value = []   // clear errors array

    // Validate student name
    if (!newStudentName.value) {
        formErrors.value.push('Student name must be entered')
    }

    // Validate StarID
    if (!newStarID.value) {
        formErrors.value.push('StarID must be entered')
    }

    // If there are no validation errors, submit the form
    if (formErrors.value.length == 0) {
        let student = { name: newStudentName.value, starID: newStarID.value, present: false }

        studentStore.addNewStudent(student)
        newStudentName.value = ''   // clear form input
        newStarID.value = ''  
    }
}

</script>

<template>
<!-- Display form validation errors -->
<div id="new-student-form-errors" class="m-2">
    <div class="alert alert-danger" v-if="formErrors.length > 0">
        <li v-for="error in formErrors" v-bind:key="error">
            {{ error }}
        </li>
    </div>
</div>

<!-- New student form -->
<div id="new-student-form" class="card add-student m-2 p-2">
    <h4 class="card-title">Add new student</h4>

    <!-- Student name input field -->
    <div class="form-group mb-3">
        <label for="name">Name</label>
        <input id="name" class="form-control" v-model.trim="newStudentName">
    </div>
    <!-- StarID input field -->
    <div class="form-group mb-3">
        <label for="starID">Star ID</label>
        <input id="starID" class="form-control" v-model.trim="newStarID">
    </div>

    <!-- Submit button -->
    <button class="btn btn-primary" v-on:click="addStudent">Add</button>
</div>


</template>

<style scoped>
/* Component-specific styles would go here */
</style>
