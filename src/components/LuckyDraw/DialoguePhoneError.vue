<template>
  <q-card>
    <q-card-section class="flex bg-red justify-between items-center">
      <div class=" text-white text-weight-bold text-h5">Error!</div>
      <q-btn dense icon="close" round color="white" class="bg-transparent" v-close-popup />
    </q-card-section>
    <q-card-section>The phone number is mandatory and it should be 10 digit</q-card-section>
  </q-card>
</template>
