<script setup>
import { useBMIStore } from '../stores/BMIStore'
import { storeToRefs } from 'pinia'

// Create a store instance
const bmiStore = useBMIStore()

// Extract reactive properties from the store
const { height, weight, isMetric, maxHeight, maxWeight, heightError, weightError } = storeToRefs(bmiStore)
</script>

<template>
  <!-- Main form container with red border -->
  <div class="bmi-form">
    <!-- Form heading -->
    <h2>Enter your height and weight</h2>

    <!-- Height input group -->
    <div class="form-group">
      <label for="height">Height in {{ isMetric ? 'meters' : 'inches' }}</label>
      <!-- Input for height with two-way binding and validation -->
      <div class="input-container">
        <!-- Defining the input as type Number to have the nice arrows to increase and decrease the value -->
        <input
          id="height"
          type="number"
          v-model="height"
          :placeholder="`Enter your height in ${isMetric ? 'meters' : 'inches'}`"
          :step="isMetric ? '0.01' : '0.1'"
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
      <label for="weight">Weight in {{ isMetric ? 'kilograms' : 'pounds' }}</label>
      <!-- Input for weight with two-way binding and validation -->
      <div class="input-container">
        <input
          id="weight"
          type="number"
          v-model="weight"
          :placeholder="`Enter your weight in ${isMetric ? 'kilograms' : 'pounds'}`"
          :step="isMetric ? '0.1' : '0.5'"
          min="0"
          :max="maxWeight"
          :class="{ 'error-input': weightError }"
        />
        <!-- Display validation error message if any -->
        <div v-if="weightError" class="error-message">{{ weightError }}</div>
      </div>
    </div>

    <!-- Note: No Calculate button needed as BMI is calculated automatically using a computed property -->
    <div class="note">
      <p>BMI is calculated automatically as you type</p>
    </div>
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

/* Note styling */
.note {
  margin-top: 15px;
  font-size: 0.9em;
  color: #666;
  font-style: italic;
}
</style>