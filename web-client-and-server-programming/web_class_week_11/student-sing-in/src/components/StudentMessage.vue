<script setup>

import { useStudentStore } from "../stores/StudentStore.js";
import { storeToRefs }   from "pinia";

const studentStore = useStudentStore()

const { mostRecentStudent } = storeToRefs(studentStore)

</script>

<template>
  <!-- Message that shows when student arrives or leaves -->
  <div id="welcome-or-goodbye-message" class="m-2">

    <!-- Only show if we have a recent student -->
    <div v-if="mostRecentStudent.name">
      <div v-if="mostRecentStudent.present" class="alert alert-success">
        Welcome, {{ mostRecentStudent.name }}!
      </div>
      <div v-else class="alert alert-info">
        Goodbye {{ mostRecentStudent.name }}, see you later.
      </div>
    </div>

  </div>
</template>

<style scoped>

</style>