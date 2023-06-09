<template>
  <q-card class="bg-primary" style="border-radius: 3rem">
    <q-card-section :horizontal="q.screen.gt.sm" class="q-px-lg items-center">
      <q-card-section class="text-bold text-white text-h4 overflow-hidden gt-sm" style="width: 25%"> Get Your Universities </q-card-section>
      <q-card-section class="text-bold text-white text-h6 overflow-hidden lt-md"> Get Your Universities </q-card-section>
      <q-card-section class="flex col-grow justify-between q-gutter-xs">
        <q-input borderless class="col-grow bg-white q-px-md" style="border-radius: 1rem" :readonly="misc.loading" type="number" v-model.number="search.hse" label="Plus Two English Percentage" />
        <q-input borderless class="col-grow bg-white q-px-md" style="border-radius: 1rem" :readonly="misc.loading" type="number" v-model.number="search.degree" label="Degree Percentage" />
        <q-input borderless class="col-grow bg-white q-px-md" style="border-radius: 1rem" :readonly="misc.loading" type="number" v-model.number="search.year" label="Degree Pass-out Year" />
        <q-btn class="text-h5 text-bold q-px-xl" rounded :loading="misc.loading" color="warning" label="Search" style="border-radius: 1rem" @click="searchUniversities" />
      </q-card-section>
    </q-card-section>
    <q-card-section v-show="misc.results.length > 0" class="row q-px-xl q-col-gutter-sm">
      <div class="col-xs-12 col-sm-6 col-md-4 col-lg-3 col-xl-2" v-for="unIdx in misc.results.slice(0,misc.slice)"><SearchResultUniversity @requirements="popRequirements" :details="zipObject(data.headings,data.universities[unIdx])" :misc="zipObject(data.misc_headings,data.misc[unIdx])" /></div>
    </q-card-section>
    <q-card-actions align="center" v-show="misc.results.length > misc.slice">
      <q-btn label="Load More" flat padding="md xl" icon="refresh" color="white" @click="misc.slice += perPage" />
    </q-card-actions>
    <q-dialog persistent v-model="misc.detail_view" @beforeHide="misc.detail_data = null"><SearchResultUniversityExtra style="width: 85vw" :data="misc.detail_data" /></q-dialog>
  </q-card>
</template>

<script setup>
import {reactive, ref} from "vue";
import {useQuasar} from "quasar";
import SearchResultUniversity from "components/website/SearchResultUniversity.vue";
import {UNIVERSITIES_FETCH_URL} from "assets/constants";
import {filter, map, mapValues, shuffle, zipObject} from "lodash";
import SearchResultUniversityExtra from "components/website/SearchResultUniversityExtra.vue";

const q = useQuasar();
const perPage = q.screen.xs ? 2 : (q.screen.sm ? 4 : (q.screen.md ? 6 : (q.screen.lg ? 8 : 12)))
const misc = reactive({ loading:false,results:[],slice:perPage,detail_view:false,detail_data:null })
const search = reactive({ hse:70,degree:55,year:new Date().getFullYear()-5 })
const data = ref(null)

function searchUniversities(){
  misc.loading = true; misc.results.splice(0,misc.results.length);
  getAllUniversities().then((records) => {
    let hse = search.hse || 70, degree = search.degree || 55, gap = search.year ? new Date().getFullYear()-search.year : 0
    let filtered = filter(shuffle(records.universities),university => {
      return (
        (parseInt(university[data.value.indexes['hse']]) <= hse)
        && (parseInt(university[data.value.indexes['degree']]) <= degree)
        && (String(university[data.value.indexes['year']]).trim() === "" || parseInt(university[data.value.indexes['year']]) >= gap)
      )
    })
    misc.results = map(filtered,uni => parseInt([uni[0]])-1)
    setTimeout(() => misc.loading = false,1250);
  })
}
function getAllUniversities(){
  if(data.value) return Promise.resolve(data.value)
  return new Promise(resolve => {
    fetch(UNIVERSITIES_FETCH_URL + '?universities=1').then(resp => resp.json()).then(json => {
      let { misc,universities } = json, Associates = [''];
      universities = universities.map(university => university.map(property => {
        let prop = String(property);
        if(prop.indexOf('⏩') > -1 || prop.indexOf('▶️') > -1){
          return prop.replace(/(⏩|▶️)([\w\s]+)\:/g,(m,bul,ass) => {
            let assIdx = Associates.indexOf(ass);
            return bul + "CHANNEL " + ((assIdx === -1) ? Associates.push(ass)-1 : assIdx) + ": ";
          })
          // return prop.replace(/⏩[\w\s]+\:/g,"⏩").replace(/▶️[\w\s]+\:/g,"▶️").replace(/(?:\r\n|\r|\n){2,}/g, "\n\n").trim()
        }
        return prop;
      }))
      let headings = universities.splice(0,1)[0]
      let indexes = mapValues({ hse:'Minimum English Requirement',degree:'Minimum Academic Requirement',year:'Maximum Year GAP Accepted' },val => headings.indexOf(val))
      let misc_headings = misc.splice(0,1)[0]
      resolve(data.value = { misc,universities,indexes,headings,misc_headings })
    })
  })
}

function popRequirements(data){
  misc.detail_data = data
  misc.detail_view = true
}
</script>
