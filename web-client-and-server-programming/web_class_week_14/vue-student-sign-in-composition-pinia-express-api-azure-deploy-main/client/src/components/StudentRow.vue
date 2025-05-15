<script setup>
// Import Vue composition API functions
import { ref } from 'vue'

// Define props received from parent component
const props = defineProps({
    student: Object
})

// Define events emitted to parent component
const emit = defineEmits(['arrived-or-left', 'delete-student'])

// Reactive state to track if this student is present or not 
const isStudentPresent = ref( props.student.present )

// Emit event when student presence status changes
const notifyArrivedOrLeft = () => {
    emit('arrived-or-left', props.student, isStudentPresent.value) 
}

// Confirm deletion and emit event if confirmed
const confirmThenDeleteStudent = () => {
    if (confirm(`Delete ${props.student.name}?`)) {
        emit('delete-student', props.student)
    } 
}

</script>

<template>
<!-- Table row for a single student with conditional styling -->
<tr class="align-middle" v-bind:class="{ present: student.present, absent: !student.present }">
    <!-- Student name -->
    <td>{{ student.name }}</td>
    <!-- Student StarID -->
    <td>{{ student.starID }}</td>
    <!-- Presence status with checkbox -->
    <td> 
        <input type="checkbox" v-model="isStudentPresent" v-on:change="notifyArrivedOrLeft">
        <span class="mx-3" v-if="student.present">Here!</span>
        <span class="mx-3" v-else>Not present</span>
    </td>
    <!-- Delete button -->
    <td>
        <button class="btn btn-danger" v-on:click="confirmThenDeleteStudent">
            <i class="bi bi-trash-fill"></i> Delete
        </button>
    </td>
</tr>

</template>

<style scoped>
/* Style for present students */
.present {
    color: gray;
    font-style: italic;
}

/* Style for absent students */
.absent {
    color: black;
    font-weight: bold;
}
</style>
