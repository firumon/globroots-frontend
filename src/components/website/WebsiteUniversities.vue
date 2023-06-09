<template>
  <q-card flat square class="desktop--only">
    <q-card-section class="q-py-xl">&nbsp;</q-card-section>
    <q-card-section class="q-mx-auto items-center" horizontal>
      <q-card-section class="text-h3" style="border-right: 1px solid #878787; color: #3C5C74;">Explore<br/>Top<br/>Universities</q-card-section>
      <q-card-section class="q-gutter-lg q-pl-xl">
        <img :src="url" v-for="url in universityStore.images" />
      </q-card-section>
    </q-card-section>
    <q-card-section class="q-py-xl">&nbsp;</q-card-section>
  </q-card>
</template>

<script setup>
import {usePublicUniversityStore} from "stores/public-universities";

const universityStore = usePublicUniversityStore()
</script>

<style scoped>

</style>
