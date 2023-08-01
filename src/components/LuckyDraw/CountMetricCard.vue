<template>
  <q-card>
    <q-card-section class="qcs-back" style="background-position: center center; background-repeat: no-repeat; background-size: cover">
      <div class="text-weight-bold text-center bg-transparent" style="font-size: 3.5em">{{ count }}</div>
    </q-card-section>
    <q-card-actions align="center" class="text-uppercase text-bold">{{ label }}</q-card-actions>
  </q-card>
</template>

<script setup>
const props = defineProps(['background','count','label'])
const src_img = 'url("'+props.background+'")'
</script>

<style scoped>
.qcs-back {
  background-image: v-bind(src_img);
}
</style>
