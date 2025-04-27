<script setup>
// Import necessary Vue functionality and components
import { ref } from 'vue' // Import ref for reactive state management
import BodyMassIndexForm from './components/BodyMassIndexForm.vue' // Import the BMI form component

// Reactive data for BMI result - initialized as null until calculation is performed
const bmi = ref(null)
// Reactive data for unit selection - true for metric (default), false for American
const isMetric = ref(true)

// Handle the stats-entered event emitted from the BodyMassIndexComponent component
const handleStatsEntered = (stats) => {
  // Calculate BMI based on the selected units
  if (isMetric.value) {
    // Metric formula: weight (kg) / (height (m) * height (m))
    bmi.value = stats.weight / (stats.height * stats.height)
  } else {
    // American formula: weight (lbs) / (height (in) * height (in)) * 730
    bmi.value = (stats.weight / (stats.height * stats.height)) * 730
  }
}

// Handle unit change - clear inputs and BMI result
const handleUnitChange = () => {
  bmi.value = null
}
</script>

<template>
  <!-- Main container for the BMI calculator application -->
  <div class="app-container">
    <!-- Application title -->
    <h1>Body Mass Index Calculator</h1>

    <!-- Unit selection -->
    <div class="unit-selection">
      <label>
        <input type="checkbox" v-model="isMetric" @change="handleUnitChange" />
        {{ isMetric ? 'Using Metric Units' : 'Using American Units' }}
      </label>
    </div>

    <!-- BMI Form component with event listener for the stats-entered event and unit prop -->
    <!-- Using key attribute to force component re-creation when units change -->
    <BodyMassIndexForm 
      @stats-entered="handleStatsEntered" 
      :isMetric="isMetric"
      :key="isMetric"
    />

    <!-- Result section - always displayed -->
    <div class="result">
      <!-- Display BMI value with 2 decimal places only when available -->
      <p class="bmi-value">{{ bmi !== null ? `BMI is: ${bmi.toFixed(2)}` : '' }}</p>
    </div>
  </div>
</template>

<style scoped>
/* Main container styling - centered with a blue border */
.app-container {
  max-width: 600px;
  margin: 0 auto; /* Center the container */
  padding: 20px;
  text-align: center;
  border: 2px solid blue;
  border-radius: 8px;
}

/* Title styling */
h1 {
  color: #333;
  margin-bottom: 20px;
}

/* Result container styling - no background */
.result {
  margin-top: 20px;
  padding: 15px;
}

/* BMI value styling - basic style */
.bmi-value {
  font-size: 16px;
  font-weight: normal;
  color: black;
}

/* Unit selection styling */
.unit-selection {
  margin-bottom: 15px;
  text-align: center;
  padding: 0 20px;
}

.unit-selection label {
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  justify-content: center;
}
</style>
