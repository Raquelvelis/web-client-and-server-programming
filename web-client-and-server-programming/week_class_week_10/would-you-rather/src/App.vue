<script setup>
// Import the WouldYouRather component from the components folder
import WouldYouRather from './components/WouldYouRather.vue'
// Import ref from Vue to create reactive variables
import {ref} from 'vue'

// Create reactive variables to store the question and answer options
const wyrQuestion = ref('Live in a House shaped like a triangle or a house shaped like a circel?')
const wyrAnswer1 = ref('Tiangle House')
const wyrAnswer2 = ref('Circle House')

// This will store the user's answer once they've made a choice
const userSelection = ref('')

// This function runs when the user selects an answer in the WouldYouRather component
function updateUserSelection(userChoice) {
  userSelection.value = `Thanks! you chose ${userChoice}`
}
</script>

<template>
  <!-- Main container for the app -->
  <div id="app-component">
    <h1> Would You Rather!</h1>

    <!--
      WouldYouRather component with properties (props) passed to it:
      - question, answer1, and answer2 are bound to our reactive variables
      - The v-on:answer-selected listens for the answer-selected event
        from the child component and calls updateUserSelection when triggered
    -->
    <WouldYouRather
        v-bind:question="wyrQuestion"
        v-bind:answer1="wyrAnswer1"
        v-bind:answer2="wyrAnswer2"
        v-on:answer-selected="updateUserSelection"
    ></WouldYouRather>

    <!-- Display the user's selection after they make a choice -->
    <p>{{ userSelection }} </p>
  </div>
</template>

<style scoped>
/* Styles for the main container */
#app-component{

  /* font-size:3em; */
  background: aqua;
  padding: 40px;
}
/* Style for paragraph elements */
p {
  font-family: 'Courier New', Courier, monospace;
}
</style>