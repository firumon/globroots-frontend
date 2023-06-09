<template>
  <q-card flat square class="bg-transparent">
    <q-card-section class="text-h3 text-weight-bold text-center" style="color: #2F4355;">Latest Globroots Updates</q-card-section>
    <q-card-section class="row q-col-gutter-md no-wrap overflow-auto items-center justify-between">
      <div class="col col-shrink"><q-btn icon="arrow_back_ios_new" round color="white" text-color="grey" @click="dec" /></div>
        <div class="col col-grow" v-for="i in live" :class="{ hide: !live.includes(i) }">
          <q-card><q-img :src="updatesStore.images[i]" /></q-card>
        </div>
      <div class="col col-shrink text-right"><q-btn icon="arrow_forward_ios" round color="white" text-color="grey" @click="inc" /></div>
    </q-card-section>
  </q-card>
</template>

<script setup>
import {usePublicUpdatesStore} from "stores/public-updates";
import {computed, reactive} from "vue";
import {useQuasar} from "quasar";
import {range} from "lodash";

const updatesStore = usePublicUpdatesStore()
const $q = useQuasar()

const misc = reactive({ page:0 })
const max = computed(() => $q.screen.gt.lg ? 5 : ($q.screen.gt.sm ? 3 : ($q.screen.xs ? 1 : 2)))
const live = computed(() => {
  const tUpdates = updatesStore.images.length, ims2 = [misc.page]
  if(max.value >= tUpdates) return range(0,tUpdates);
  while(ims2.length < max.value) {
    let lIm = ims2[ims2.length-1], nIm = ((lIm+1) === tUpdates) ? 0 : lIm+1;
    ims2.push(nIm);
  }
  return ims2;
})
function inc(){ if(updatesStore.images.length <= misc.page+1) misc.page = 0; else misc.page++ }
function dec(){ if(misc.page-1 < 0) misc.page = updatesStore.images.length-1; else misc.page-- }
</script>

<style scoped>
.hide { display: none }
</style>
