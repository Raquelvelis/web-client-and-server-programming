<script setup>
// Import necessary functions from Vue
import {ref, watch} from 'vue'

// Define props that this component will receive from its parent component
defineProps({
  question: String,  // The question to display
  answer1: String,   // First answer option
  answer2: String    // Second answer option
})

// Set up event emitter to communicate with parent component
const emit = defineEmits([
  'answer-selected'  // This event will be emitted when user selects an answer
])

// Create a reactive reference to store the user's selected choice
const choice = ref('')

// This function was commented out in the original code but kept for reference
// function choiceMade(){
//   // Emit event to tell parent that the user has made a choice.
//   emit('answer-selected', choice.value)
// }

// Watch for changes to the choice variable
// When the user selects an option, immediately emit the 'answer-selected' event
watch(choice, (val) => {
  emit('answer-selected', choice.value)
})
</script>


<template>
  <!-- Main container with ID for styling -->
  <div id="wyr">
    <h2>Make your choice!</h2>

    <!-- Display the question passed from parent component -->
    <p> {{ question }}</p>
    <div>
      <!-- First radio button option -->
      <input id="answer-1" v-model="choice" type="radio" v-bind:value="answer1">
      <label for="answer-1">{{ answer1 }}</label>

      <!-- Second radio button option -->
      <input id="answer-2" v-model="choice" type="radio" v-bind:value="answer2">
      <label for="answer-2">{{ answer2 }}</label>
    </div>
  </div>
</template>

<style scoped>
/* Style for the main container */
#wyr {
  background-color: #535bf2;
}
/* Style for the question text */
p{
  font-family: fantasy;
}
</style>