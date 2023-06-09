<template>
  <q-layout class="background" view="hHh lpR fFf">
    <div class="banner" :style='{ height:bannerHeight+"px","background-image": "url("+bannerImages[misc.bImgIdx]+")" }'>
      <q-header  class="bg-transparent" style="margin-top: -2rem">
        <q-toolbar>
          <q-toolbar-title>&nbsp;</q-toolbar-title>
          <q-card class="bg-primary q-pt-lg" style="border-radius: 30px"><q-card-section class="text-bold q-px-lg"><img src="mail.png" width="24" style="vertical-align: bottom"> info@globroots.com <img src="phone.png" width="24" style="vertical-align: bottom" class="q-ml-md"> +91 9947 666 123</q-card-section></q-card>
        </q-toolbar>
      </q-header>

      <div class="q-pt-xl">
        <q-toolbar style="max-width: 1220px; margin: auto">
          <q-toolbar-title><img src="logo.png" :width="logoWidth"></q-toolbar-title>
          <q-tabs class="text-black q-mr-lg gt-sm" v-model="tab" >
            <q-tab v-for="(link,label) in pms.menus" :name="label" :label="label" no-caps />
          </q-tabs>
          <q-btn-dropdown stretch flat :label="tab" color="black" no-caps class="lt-md" icon="menu">
            <q-list>
              <q-item v-for="(link,label) in pms.menus" clickable v-close-popup tabindex="0" @click="tab = label">
                <q-item-section><q-item-label>{{ label }}</q-item-label></q-item-section>
              </q-item>
            </q-list>
          </q-btn-dropdown>
<!--          <q-btn label="chat with us" color="primary" rounded unelevated class="btn-chat q-py-sm" />-->
        </q-toolbar>
      </div>
    </div>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import {usePublicMenuStore} from "stores/public-menus";
import {computed, reactive, ref, watch} from "vue";
import {usePublicBannerStore} from "stores/public-banners";
import { useQuasar } from 'quasar'

const $q = useQuasar()
const pms = usePublicMenuStore()
const bnr = usePublicBannerStore()

const misc = reactive({ bImgIdx:0 })
const tab = ref('')
const bannerImages = computed(() => bnr.images)
const logoWidth = computed(() => {
  let logoWidth = 210, screenWidth =  $q.screen.width;
  if(screenWidth >= logoWidth*3) return logoWidth;
  return parseInt(logoWidth/(logoWidth*3)*screenWidth)
})
const bannerHeight = computed(() => 800 / 1735 * $q.screen.width)

watch(() => misc.bImgIdx,function(cIdx){
  setTimeout(() => misc.bImgIdx = (cIdx+1 === bannerImages.value.length) ? 0 : cIdx+1,bnr.duration)
},{ immediate:true,deep:true })
</script>

<style scoped>
.btn-chat { border: 3px solid #588298 }
.background {
  background-image: url('background.jpg');
  background-size: cover;
  //background-attachment: fixed;
  background-position: top;
  background-repeat: no-repeat;
}
.banner {
  background-size: contain;
  background-position: top center;
  background-repeat: no-repeat;
  transition: background-image 1s ease-in-out;
}
</style>
