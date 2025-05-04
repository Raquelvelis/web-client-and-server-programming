import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

// Define the BMI store
export const useBMIStore = defineStore('bmi', () => {
  // Reactive data
  const height = ref('') // User's height (in meters or inches)
  const weight = ref('') // User's weight (in kilograms or pounds)
  const bmi = ref(null) // Calculated BMI value
  const isMetric = ref(true) // Unit selection - true for metric (default), false for American

  // Computed properties for maximum height and weight values based on selected units
  const maxHeight = computed(() => {
    // The tallest recorded person in history was just under 3 meters tall (or 108 inches)
    return isMetric.value ? 3 : 108
  })

  const maxWeight = computed(() => {
    // Maximum reasonable weight in kg (around 600 kg) or pounds (around 1320 lbs)
    return isMetric.value ? 600 : 1320
  })

  // Computed properties for validation messages
  const heightError = computed(() => {
    if (height.value === '') return ''
    const heightVal = parseFloat(height.value)
    if (isNaN(heightVal) || heightVal <= 0) return 'Height must be a positive number'
    if (heightVal > maxHeight.value) return `Height must be less than ${maxHeight.value} ${isMetric.value ? 'meters' : 'inches'}`
    return ''
  })

  const weightError = computed(() => {
    if (weight.value === '') return ''
    const weightVal = parseFloat(weight.value)
    if (isNaN(weightVal) || weightVal <= 0) return 'Weight must be a positive number'
    if (weightVal > maxWeight.value) return `Weight must be less than ${maxWeight.value} ${isMetric.value ? 'kilograms' : 'pounds'}`
    return ''
  })

  // Computed property to automatically calculate BMI when height and weight are valid
  const calculatedBMI = computed(() => {
    // Check for validation errors
    if (heightError.value || weightError.value) {
      return null
    }

    const heightValue = parseFloat(height.value)
    const weightValue = parseFloat(weight.value)

    // Additional validation to ensure values are positive and within range
    if (isNaN(heightValue) || heightValue <= 0 || heightValue > maxHeight.value ||
        isNaN(weightValue) || weightValue <= 0 || weightValue > maxWeight.value) {
      return null
    }

    // Calculate BMI based on the selected units
    if (isMetric.value) {
      // Metric formula: weight (kg) / (height (m) * height (m))
      return weightValue / (heightValue * heightValue)
    } else {
      // American formula: weight (lbs) / (height (in) * height (in)) * 730
      return (weightValue / (heightValue * heightValue)) * 730
    }
  })

  // Function to toggle units and clear inputs
  function toggleUnits() {
    isMetric.value = !isMetric.value
    height.value = ''
    weight.value = ''
  }

  // Function to reset all values
  function resetValues() {
    height.value = ''
    weight.value = ''
  }

  // Return all reactive data, functions, and computed properties
  return {
    // Reactive data
    height,
    weight,
    bmi,
    isMetric,
    
    // Computed properties
    maxHeight,
    maxWeight,
    heightError,
    weightError,
    calculatedBMI,
    
    // Functions
    toggleUnits,
    resetValues
  }
})