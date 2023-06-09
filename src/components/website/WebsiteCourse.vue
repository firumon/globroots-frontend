<template>
  <q-card flat class="bg-transparent">
    <img :src="path + '/' + image">
    <q-card-section class="q-px-none">
      <div class="text-h6">{{ name }}</div>
      <div class="text-subtitle2">View Course</div>
    </q-card-section>
  </q-card>
</template>

<script setup>
const { name,image,path } = defineProps(['name','image','path'])

</script>

<style scoped>

</style>
