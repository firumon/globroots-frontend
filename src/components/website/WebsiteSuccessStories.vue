<template>
  <q-card flat square class="bg-transparent" v-if="is_on">
    <q-card-section class="text-h3 text-weight-bold text-uppercase text-center q-mb-xl" style="color: #35414C;">Success Stories</q-card-section>
    <q-card-section horizontal class="items-center">
      <q-card-section v-if="have_pages"><q-btn icon="arrow_back_ios_new" round color="white" text-color="grey" @click="dec" /></q-card-section>
      <q-card-section v-for="idx in ims" class="frame" :style='"background-image: url(\""+storiesStore.path+"/frame.png\"), url(\""+storiesStore.path+"/"+storiesStore.students[idx].image+"\")"'>
        <div class="text-center student">{{ storiesStore.students[idx].name }}</div>
        <div class="center-space">&nbsp;</div>
        <div class="caption">{{ storiesStore.caption }}<br />{{ storiesStore.students[idx].year }}</div>
      </q-card-section>
      <q-card-section v-if="have_pages"><q-btn icon="arrow_forward_ios" round color="white" text-color="grey" @click="inc" /></q-card-section>
    </q-card-section>
    <q-card-section class="q-py-xl">&nbsp;</q-card-section>
  </q-card>
</template>

<script setup>
import {usePublicStoriesStore} from "stores/public-stories";
import {useQuasar} from "quasar";
import {computed, reactive} from "vue";
import {range} from "lodash";


const storiesStore = usePublicStoriesStore()
const $q = useQuasar()

const is_on = computed(() => $q.screen.width > 410)
const have_pages = computed(() => storiesStore.students.length > maximum.value)
const maximum = computed(() => Math.floor(($q.screen.width-(have_pages ? 104*2 : 0))/410))
const misc = reactive({ page:0 })
const ims = computed(() => {
  if(!have_pages.value) return range(0,storiesStore.students.length);
  let mSts = storiesStore.students.length, ims2 = [misc.page];
  while(ims2.length < maximum.value) {
    let lIm = ims2[ims2.length-1], nIm = ((lIm+1) === mSts) ? 0 : lIm+1;
    ims2.push(nIm);
  }
  return ims2;
})
function inc(){ if(storiesStore.students.length <= misc.page+1) misc.page = 0; else misc.page++ }
function dec(){ if(misc.page-1 < 0) misc.page = storiesStore.students.length-1; else misc.page-- }
</script>

<style scoped>
@font-face {
  font-family: 'Candy Randy';
  src: url('fonts/candyrandy.ttf') format('truetype');
}
@font-face {
  font-family: 'Akbar';
  src: url('fonts/akbar.ttf') format('truetype');
}
.frame {
  width: 400px; height: 480px;
  border: 10px solid #FFF;
  border-radius: 35px !important;
  background-repeat: no-repeat, no-repeat;
  background-position: center, center;
  margin: 0px auto 0px auto;
  background-size: cover, contain;
}
.student {
  color: #FFFFFF;
  font-size: 2.6rem;
  font-weight: bold;
  height: 100px;
  font-family: "Candy Randy";
}
.center-space {
  height: 260px;
}
.caption {
  height: 120px;
  text-align: center;
  color: #FFFFFF;
  font-size: 1.4rem;
  line-height: 1.1;
  font-family: "Akbar";
  text-transform: uppercase;
}
</style>
