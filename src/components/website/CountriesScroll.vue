<template>
  <q-card class="bg-transparent" square flat>
    <q-card-section></q-card-section>
    <q-card-section class="background text-center">
      <q-img :src="countriesStore.path+'/'+country.image" class="img">
        <p v-if="caption_p" class="text-white text-bold absolute-bottom text-uppercase">{{ country.caption }}</p>
        <div v-else class="absolute-bottom text-center text-uppercase text-h4 bg-transparent text-bold">{{ country.caption }}</div>
      </q-img>
    </q-card-section>
    <q-card-section class="text-center">
      <div class="flex flex-center q-gutter-x-md">
        <div class="dot" v-for="n in countriesStore.countries.length" :class="{ active:misc.cIdx+1 === n }" @click="misc.cIdx = n-1">&nbsp;</div>
      </div>
    </q-card-section>
    <q-card-section>
      <p v-for="txt in paragraphs(country.details)" v-html="txt" />
    </q-card-section>
    <q-card-section class="text-center text-bold q-py-sm text-h5" style="color: #594f4f">STUDY AT THESE TOP GLOBAL DESTINATIONS !</q-card-section>
    <q-card-actions align="center">
      <q-btn round v-for="(C,idx) in countriesStore.countries">
        <q-avatar size="4rem" class="shadow-5" :class="{ 'shadow-12':misc.cIdx === idx }">
          <img :src="countriesStore.path+'/'+C.icon" class="icon" @click="misc.cIdx = idx">
        </q-avatar>
      </q-btn>
    </q-card-actions>
  </q-card>
</template>

<script setup>
import {usePublicCountryStore} from "stores/public-countries";
import {computed, reactive} from "vue";
import {useQuasar} from "quasar";

const countriesStore = usePublicCountryStore()
const $q = useQuasar(), cw = 640, wc = 1;

const misc = reactive({ cIdx:0 })
const country = computed(() => countriesStore.countries[misc.cIdx])
const caption_p = computed(() => $q.screen.width < cw)
function paragraphs(txt){
  let max = txt.toString().slice(0,$q.screen.width * wc);
  if(max.length < txt.toString().length) max += '... <a class="q-ml-xl text-caption link">Read More &rightarrow;</a>'
  return max.split("\n")
}
</script>

<style scoped>
.background {
  background-image: url("graphic01.png");
  background-repeat: no-repeat;
  background-position: center;
  background-size: contain;
}
.img {
  width: 60%;
  border: 0.85rem solid #FFFFFF;
}
.dot {
  width: 22px; height: 22px; background-color: #FFFFFF; border-radius: 50%;
  border: 12px solid #4E171B; cursor: pointer;
}
.dot.active {
  border: 5px solid #4E171B !important;
}
.description {
  width: 80%;
  text-align: justify;
  margin: auto;
  font-size: 1.25rem;
  line-height: 1.55;
}
.icon {
  border: 0.25rem solid #FFFFFF;
}
p {
  font-size: 1.2rem;
  line-height: 1.2;
}
</style>
