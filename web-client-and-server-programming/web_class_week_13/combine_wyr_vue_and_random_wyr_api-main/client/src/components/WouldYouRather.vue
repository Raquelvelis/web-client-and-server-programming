<script setup>
// Import Vue's ref for reactive state
import { ref } from 'vue'

// Define props that the component accepts from its parent
defineProps({
  question: String,  // The WYR question text
  answer1: String,   // First answer option
  answer2: String    // Second answer option
})

// Define custom events that this component can emit
const emit = defineEmits( [
  'answer-selected'  // Event emitted when user selects an answer
])

const choice = ref(null)  // null means no value 
// needed to prevent both buttons being selected 


// Function called when a radio button is selected
function choiceMade() {
  // Emit the answer-selected event with the chosen answer
  emit('answer-selected', choice.value)
}

</script>

<template>

<div id="wyr">
  <!-- Component header -->
  <h2>Make your choice!</h2>

  <!-- Display the question -->
  <div id="question">
    {{ question }}
  </div>

  <!-- Radio button options for answers -->
  <div id="answers">
    <!-- First answer option -->
    <input type="radio" id="answer-1" v-model="choice" v-bind:value="answer1" v-on:change="choiceMade">
    <label for="answer-1"> {{ answer1 }}</label>

    <!-- Second answer option -->
    <input type="radio" id="answer-2" v-model="choice" v-bind:value="answer2" v-on:change="choiceMade">
    <label for="answer-2"> {{ answer2 }}</label>
  </div>

</div>
</template>

<style scoped>
/* Main component container */
#wyr {
  background-color: hotpink;
  padding: 20px;
}

/* Answers container */
#answers {
  padding: 10px;
}

</style>
