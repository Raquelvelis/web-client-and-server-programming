<script setup>

import { ref, computed } from 'vue'

// Define props - accept isMetric prop from parent component
const props = defineProps({
  isMetric: {
    type: Boolean,
    default: true
  }
})

// Reactive data for height and weight - initialized as empty strings
const height = ref('') // User's height (in meters or inches)
const weight = ref('') // User's weight (in kilograms or pounds)

// Function to emit the stats-entered event with height and weight data
// This function is called when the Calculate button is clicked
const emitStats = () => {
  // Convert string values to floating-point numbers
  const heightValue = parseFloat(height.value)
  const weightValue = parseFloat(weight.value)

  // Check for validation errors before emitting
  if (heightError.value || weightError.value) {
    return // Don't emit if there are validation errors
  }

  // Additional validation to ensure values are positive and within range
  // isNaN was suggested by Webstorm AI. isNaN function determines whether a value is not a number
  if (isNaN(heightValue) || heightValue <= 0 || heightValue > maxHeight.value ||
      isNaN(weightValue) || weightValue <= 0 || weightValue > maxWeight.value) {
    return // Don't emit if values are invalid
  }

  // Emit the stats to the parent component for BMI calculation
  emit('stats-entered', {
    height: heightValue,
    weight: weightValue
  })
}

// Function with the events this component can emit
const emit = defineEmits(['stats-entered']) // This component emits the 'stats-entered' event

// Computed properties for maximum height and weight values based on selected units
const maxHeight = computed(() => {
  // The tallest recorded person in history was just under 3 meters tall (or 108 inches)
  return props.isMetric ? 3 : 108
})

const maxWeight = computed(() => {
  // Maximum reasonable weight in kg (around 600 kg) or pounds (around 1320 lbs)
  return props.isMetric ? 600 : 1320
})

// Computed properties for validation messages
const heightError = computed(() => {
  if (height.value === '') return ''
  const heightVal = parseFloat(height.value)
  if (isNaN(heightVal) || heightVal <= 0) return 'Height must be a positive number'
  if (heightVal > maxHeight.value) return `Height must be less than ${maxHeight.value} ${props.isMetric ? 'meters' : 'inches'}`
  return ''
})

const weightError = computed(() => {
  if (weight.value === '') return ''
  const weightVal = parseFloat(weight.value)
  if (isNaN(weightVal) || weightVal <= 0) return 'Weight must be a positive number'
  if (weightVal > maxWeight.value) return `Weight must be less than ${maxWeight.value} ${props.isMetric ? 'kilograms' : 'pounds'}`
  return ''
})
</script>

<template>
  <!-- Main form container with red border -->
  <div class="bmi-form">
    <!-- Form heading -->
    <h2>Enter your height and weight</h2>

    <!-- Height input group -->
    <div class="form-group">
      <label for="height">Height in {{ props.isMetric ? 'meters' : 'inches' }}</label>
      <!-- Input for height with two-way binding and validation -->
      <div class="input-container">
        <-- Defining the input as type Number to have the nice arrows to increase and decrease the value -->
        <input
          id="height"
          type="number"
          v-model="height"
          :placeholder="`Enter your height in ${props.isMetric ? 'meters' : 'inches'}`"
          :step="props.isMetric ? '0.01' : '0.1'"
          min="0"
          :max="maxHeight"
          :class="{ 'error-input': heightError }"
        />
        <!-- Display validation error message if any -->
        <div v-if="heightError" class="error-message">{{ heightError }}</div>
      </div>
    </div>

    <!-- Weight input group -->
    <div class="form-group">
      <label for="weight">Weight in {{ props.isMetric ? 'kilograms' : 'pounds' }}</label>
      <!-- Input for weight with two-way binding and validation -->
      <div class="input-container">
        <input
          id="weight"
          type="number"
          v-model="weight"
          :placeholder="`Enter your weight in ${props.isMetric ? 'kilograms' : 'pounds'}`"
          :step="props.isMetric ? '0.1' : '0.5'"
          min="0"
          :max="maxWeight"
          :class="{ 'error-input': weightError }"
        />
        <!-- Display validation error message if any -->
        <div v-if="weightError" class="error-message">{{ weightError }}</div>
      </div>
    </div>

    <!-- Calculate button - triggers the emitStats function when clicked -->
    <button type="button" @click="emitStats">Calculate</button>
  </div>
</template>

<style scoped>
/* Form container with red border to distinguish it from the main app container */
.bmi-form {
  border: 2px solid red;
  padding: 20px;
  margin: 20px 0;
  border-radius: 8px;
}

/* Form heading styling */
h2 {
  margin-top: 0;
  margin-bottom: 20px;
  text-align: center;
}

/* Spacing between form groups (height and weight inputs) */
.form-group {
  margin-bottom: 15px;
  display: flex;
  align-items: center;
}

/* Label styling - aligned to the left of inputs */
label {
  width: 150px;
  margin-right: 10px;
  text-align: left;
}

/* Input field styling - using default border */
input {
  flex: 1;
  padding: 8px;
}

/* Calculate button styling - light blue background with white text */
button {
  background-color: lightblue;
  color: black;
  padding: 10px 15px;
  border: none;
  border-radius: 8px;
  cursor: pointer; /* Changes cursor to hand when hovering over button */
  display: block;
  margin: 0 auto;
  margin-top: 15px;
}

/* Button hover effect - slightly darker blue for visual feedback */
button:hover {
  background-color: #a0d8ef;
}

/* Input container styling - contains input and error message */
.input-container {
  flex: 1;
  display: flex;
  flex-direction: column;
}

/* Error message styling - red text for visibility */
.error-message {
  color: red;
  font-size: 0.8em;
  margin-top: 5px;
  text-align: left;
}

/* Error input styling - red border to indicate error */
.error-input {
  border: 1px solid red;
}
</style>
