<template>
  <q-card class="bg-transparent" flat square>
    <q-card-section class="text-h4 text-weight-bold text-center q-py-xl">We'll help you find the right courses</q-card-section>
    <q-card-section class="row q-col-gutter-lg q-mx-auto" style="max-width: 1220px">
      <div class="col-xs-12 col-sm-6 col-md-6 col-lg-4" v-for="course in courseStore.courses"><WebsiteCourse v-bind="course" :path="courseStore.path" /></div>
    </q-card-section>
  </q-card>
</template>

<script setup>
import WebsiteCourse from "components/website/WebsiteCourse.vue";
import {usePublicCourseStore} from "stores/public-courses";

const courseStore = usePublicCourseStore()
</script>

<style scoped>

</style>
