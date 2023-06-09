<template>
    <q-card square class="bg-white q-pt-xl q-mt-xl" :class="{ 'text-center':$q.screen.lt.md }">
      <q-card-section class="q-mx-auto" style="max-width: 1220px">
        <q-card-section :horizontal="$q.screen.gt.sm">
          <q-card-section class="flex column items-center">
            <img src="logo_2.png" />
            <div><img src="social/fb.png"><img src="social/insta.png"><img src="social/wa.png"><img src="social/tumblr.png"></div>
          </q-card-section>
          <q-card-section v-for="(items,header) in menus" class="col-grow gt-sm">
            <q-list dense class="text-black">
              <q-item-label header class="text-weight-bold text-black text-subtitle1">{{ header }}</q-item-label>
              <q-item clickable v-for="(link,item) in items"><q-item-section>{{ item }}</q-item-section></q-item>
            </q-list>
          </q-card-section>
          <q-card-section>
            <q-list dense class="text-black">
              <q-item-label header class="text-weight-bold text-black text-subtitle1">Head Office</q-item-label>
              <q-item v-for="line in address"><q-item-section>{{ line }}</q-item-section></q-item>
            </q-list>
          </q-card-section>
        </q-card-section>
      </q-card-section>
      <q-separator inset />
      <q-card-actions align="center">
        <q-btn label="Terms of Use" flat no-caps /> <q-separator vertical inset /> <q-btn label="Privacy Policy" flat no-caps />
      </q-card-actions>
    </q-card>
</template>

<script setup>
import {useQuasar} from "quasar";

const $q = useQuasar()

const menus = {
  'Study Destinations': {
    'United States':'#',
    'Canada':'#',
    'United Kingdom':'#',
    'Ireland':'#',
    'Australia':'#',
    'New Zealand':'#',
    'Europe':'#',
  },
  'Services for Students': {
    'Counselling':'#',
    'Test Preparation':'#',
    'Course, Country & University Selection':'#',
    'Applications & Admission':'#',
    'Scholarships':'#',
    'Internship':'#',
    'Education Loan Assistance':'#',
  }
}
const address = ['1st floor Mas Center','Gandhi Nagar, West','Nada, Guruvayur, Trissur','Kerala-680101']
</script>

<style scoped>
</style>
