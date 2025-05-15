<script setup>
// Import Pinia store and utilities
import { useStudentStore } from '../stores/StudentStore.js'
import { storeToRefs } from 'pinia'

// Initialize the student store
const studentStore = useStudentStore()

// Get the most recently modified student from the store
const { mostRecentStudent } = storeToRefs(studentStore)

</script>

<template>
<!-- Container for welcome/goodbye message -->
<div id="welcome-or-goodbye-message" class="m-2">
    <!-- Only show message if there is a most recent student -->
    <div v-if="mostRecentStudent.name">
        <!-- Show welcome message if student is present -->
        <div v-if="mostRecentStudent.present" class="alert alert-success">
            Welcome, {{ mostRecentStudent.name }}!
        </div>
        <!-- Show goodbye message if student is not present -->
        <div v-else class="alert alert-info">
            Goodbye, {{ mostRecentStudent.name }}. See you later!
        </div>     
    </div>  
</div>

</template>

<style scoped>
/* Component-specific styles would go here */
</style>
