<template>
  <q-card>
    <q-card-section class="bg-secondary text-white">
      <div class="text-h6">{{ data.Name }}</div>
      <div class="text-subtitle2">{{ data.Campuses }}</div>
      <q-btn fab icon="close" color="secondary" v-close-popup dense round class="absolute" style="right:1rem; top:1rem;" />
    </q-card-section>
    <q-list class="q-mt-md" separator>
      <q-item v-for="item in list">
        <q-item-section>
          <q-item-label>{{ item }}</q-item-label>
          <q-item-label caption style="white-space: pre-line">{{ data[item] }}</q-item-label>
        </q-item-section>
      </q-item>
    </q-list>
  </q-card>
</template>

<script setup>
import {ref} from "vue";

defineProps(['data'])
const list = ref(['English Requirement','Academic Requirement'])

</script>
