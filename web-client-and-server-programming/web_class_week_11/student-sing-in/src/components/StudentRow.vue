<script setup>

import { ref } from 'vue'

const props = defineProps({
  student: Object
})

const isStudentPresent = ref(props.student.present)

const emit = defineEmits([ 'arrived-or-left', 'delete-student'])

const notifyArrivedOrLeft = () => {
  emit('arrived-or-left', props.student, isStudentPresent.value)
}

const confirmThenDeleteStudent = () => {
  emit('delete-student', props.student)
}


</script>

<template>
  <!-- Loop through all students -->
  <tr  class= "align-middle" v-bind:class="{present:student.present, absent:!student.present}">

    <td>{{ student.name }}</td>
    <td>{{ student.starID }}</td>
    <td>
      <!-- Checkbox to mark attendance -->
      <input type="checkbox" v-model="isStudentPresent" v-on:change="notifyArrivedOrLeft">
      <span v-if="student.present" class="mx-3">Here!</span>
      <span v-else class="mx-3">Not present</span>
    </td>
    <td>
      <!-- Delete button -->
      <button v-on:click="confirmThenDeleteStudent(student)" class="btn btn-danger"><i class="bi bi-trash-fill"></i>Delete</button>
    </td>
  </tr>
</template>

<style scoped>
.present {
  color: gray;
  font-style: italic;
}

.absent {
  color: black;
  font-weight: bold;
}

</style>