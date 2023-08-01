<script setup>
defineProps(['Student','College','Students'])
defineEmits(['back'])
</script>

<template>
  <q-card flat class="bg-transparent">
    <q-card-section class="text-h6 text-bold q-pb-none">Welcome Back Dear {{ Student.Name }}</q-card-section>
    <q-card-section class="q-pb-none">There are a total of {{ College.Students }} participants (including you) from your College, {{ College.Name }}..</q-card-section>
    <q-list separator>
      <q-item-label header class="text-bold">Here are them</q-item-label>
      <q-item class="text-bold">
        <q-item-section> </q-item-section>
        <q-item-section side>Coupon</q-item-section>
      </q-item>
      <q-item v-for="(student,idx) in Students">
        <q-item-section side>{{ idx+1 }}</q-item-section>
        <q-item-section>{{ student.Name }}</q-item-section>
        <q-item-section side>{{ student.Coupon }}</q-item-section>
      </q-item>
    </q-list>
    <q-card-section>Invite your college friends to join us and seize this incredible opportunity to participate in our contest. Don't let this chance slip away and make sure you share the excitement of winning with your fellow students.<q-btn label="Click here to share" flat no-caps class="text-primary" padding="none" href="https://api.whatsapp.com/send?text=Hello!%20I%20would%20like%20to%20invite%20you%20to%20participate%20in%20the%20Free%20Lucky%20Draw%20Contest%20organized%20by%20Globroots%20International.%20By%20taking%20part,%20you%20stand%20a%20chance%20to%20win%20amazing%20prizes,%20including%20a%20Mac%20Book%20Pro%20and%20many%20others.%20The%20best%20part%20is,%20it's%20completely%20free%20to%20enter!%20You%20can%20visit%20their%20website%20at%20http://luckydraw.globroots.com%20or%20contact%20their%20representative%20at%209947666123.%20I%20have%20already%20joined%20and%20would%20love%20for%20you%20to%20be%20a%20part%20of%20it%20too.%20Good%20luck!%20%F0%9F%98%84" target="_blank" /></q-card-section>
    <q-btn label="Back to Home Page" class="full-width fixed-bottom" color="secondary" padding="md" square @click="$emit('back')" />
  </q-card>
</template>
