<script setup>


import {ref} from 'vue';
import { useStudentStore} from "../stores/StudentStore.js";


// create reactive variables
const newStudentName = ref('')
const newStarID = ref('')

const formErrors = ref([])

const studentStore = useStudentStore()

// create functions
// Function to add a new student
function addStudent() {

  formErrors.value = []

  // Check if student is invalid
  if (newStudentName.value === 0) {
    formErrors.value.push("Student name must be entered")
  }

  if (newStarID.value === 0) {
    formErrors.value.push("Star ID must be entered")
  }

  // if there are no error - is the forma valid
  if (formErrors.value.length === 0) {
    // Create new student object
    let student = {
      name: newStudentName.value,
      starID: newStarID.value,
      present: false
    }
    // Add to the list
    studentStore.addNewStudent(student)
    // Clear the form
    newStudentName.value = ''
    newStarID.value = ''
  }
}

</script>

<template>

  <!-- Show form errors  -->
  <div id="new-student-form-errors" class="m-2">

    <div v-if="formErrors.length > 0 " class="alert alert-danger">
      <li v-for="error in formErrors">
        {{ error }}
      </li>
    </div>

  </div>


  <!-- Form to add new students -->
  <div id="new-student-form" class="card add-student m-2 p-2">
    <h4 class="card-title">Add new student</h4>

    <!-- Name input -->
    <div class="form-group mb-3">
      <label for="name">Name</label>

      <input v-model.trim="newStudentName" id="name" class="form-control">
    </div>

    <!-- Star ID input -->
    <div class="form-group mb-3">
      <label for="starID">Star ID</label>

      <input v-model.trim="newStarID" id="starID" class="form-control">
    </div>

    <!-- Button to add students -->
    <button v-on:click="addStudent" class="btn btn-primary">Add</button>
  </div>

</template>

<style scoped>

</style>