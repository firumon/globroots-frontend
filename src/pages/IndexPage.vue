<template>
  <q-page class="q-gutter-y-xl">
    <UniversitiesSearch class="q-mx-xl" />
    <CountriesScroll />
    <WebsiteMission />
    <WebsiteCourses />
    <WebsiteUniversities class="desktop-only" />
    <WebsiteSuccessStories />
    <WebsiteLatestUpdates />
    <WebsiteGetInTouch />
    <WebsiteFooter />
  </q-page>
</template>

<script setup>
import CountriesScroll from "components/website/CountriesScroll.vue";
import WebsiteMission from "components/website/WebsiteMission.vue";
import WebsiteCourses from "components/website/WebsiteCourses.vue";
import WebsiteUniversities from "components/website/WebsiteUniversities.vue";
import WebsiteSuccessStories from "components/website/WebsiteSuccessStories.vue";
import WebsiteLatestUpdates from "components/website/WebsiteLatestUpdates.vue";
import WebsiteGetInTouch from "components/website/WebsiteGetInTouch.vue";
import WebsiteFooter from "components/website/WebsiteFooter.vue";
import UniversitiesSearch from "components/website/UniversitiesSearch.vue";
</script>
