<script setup>
// Import Vue composition API functions
import { onMounted } from 'vue'

// Import child components
import NewStudentForm from './components/NewStudentForm.vue'
import StudentTable from './components/StudentTable.vue'
import StudentMessage from './components/StudentMessage.vue'

// Import Pinia store
import { useStudentStore } from './stores/StudentStore'

// Initialize the student store
const studentStore = useStudentStore() 

// Fetch all students when component is mounted
onMounted( () => {
  studentStore.getAllStudents()
})

</script>

<template>
  <!-- Main application title -->
  <h1>Student Sign In Application</h1>

  <!-- Component for adding new students -->
  <NewStudentForm></NewStudentForm>
  <!-- Component for displaying student list -->
  <StudentTable></StudentTable>
  <!-- Component for displaying messages about student status -->
  <StudentMessage></StudentMessage>

</template>

<style scoped>
/* Center the main heading */
h1 {
  text-align: center;
}
</style>
