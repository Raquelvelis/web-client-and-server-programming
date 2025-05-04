<script setup>
// Import necessary Vue functionality and components
import BodyMassIndexForm from './components/BodyMassIndexForm.vue' // Import the BMI form component
import { useBMIStore } from './stores/BMIStore' // Import the BMI store
import { storeToRefs } from 'pinia' // Import storeToRefs to extract reactive properties

// Create a store instance
const bmiStore = useBMIStore()

// Extract reactive properties from the store
const { isMetric, calculatedBMI } = storeToRefs(bmiStore)

// Extract functions from the store
const { toggleUnits } = bmiStore
</script>

<template>
  <!-- Main container for the BMI calculator application -->
  <div class="app-container">
    <!-- Application title -->
    <h1>Body Mass Index Calculator</h1>

    <!-- Unit selection -->
    <div class="unit-selection">
      <label>
        <input type="checkbox" v-model="isMetric" @change="toggleUnits" />
        {{ isMetric ? 'Using Metric Units' : 'Using American Units' }}
      </label>
    </div>

    <!-- BMI Form component -->
    <!-- Using key attribute to force component re-creation when units change -->
    <BodyMassIndexForm :key="isMetric" />

    <!-- Result section - always displayed -->
    <div class="result">
      <!-- Display BMI value with 2 decimal places only when available -->
      <p class="bmi-value">{{ calculatedBMI !== null ? `BMI is: ${calculatedBMI.toFixed(2)}` : '' }}</p>
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