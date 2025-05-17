<script setup>
// Import Vue composition API functions
import { ref, onMounted } from 'vue'

// Import the WouldYouRather component and API service
import WouldYouRather from './components/WouldYouRather.vue'
import wyrService from './services/wyrService';

// Reactive references for the question and answers
const wyrQuestion = ref('')
const wyrAnswer1 = ref('')
const wyrAnswer2 = ref('')

// Fetch a random question when the component is mounted
onMounted( () => {
  wyrService.getRandomWYR().then( wyrData => {
    // Update the reactive references with the question data
    wyrQuestion.value = wyrData.question 
    wyrAnswer1.value = wyrData.answer1 
    wyrAnswer2.value = wyrData.answer2
  })
})

// Will store the user's selection, either 'Triangle house' or 'Circle house'
const userSelection = ref('')

// Handle the answer selection event from the WouldYouRather component
function updateUserSelection(userChoice) {
  userSelection.value = `Thanks! You chose ${userChoice}`
}

</script>

<template>

<div id="app">
  <h1>Hello! Would You Rather...</h1>

  <!-- WouldYouRather component with props and event handler -->
  <WouldYouRather 
    v-bind:question="wyrQuestion" 
    v-bind:answer1="wyrAnswer1" 
    v-bind:answer2="wyrAnswer2"
    v-on:answer-selected="updateUserSelection">
  </WouldYouRather>

  <!-- Display the user's selection -->
  {{  userSelection }}

</div>

</template>

<style scoped>
/* Main app container styling */
#app {
  background-color: aqua;
}

</style>
