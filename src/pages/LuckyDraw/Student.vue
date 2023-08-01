<template>
  <q-page padding style="background: url('https://img.freepik.com/premium-photo/abstract-images-textures-surface-pattern-design-bright-glitter-geometry-octagon-bokeh_34985-801.jpg?w=2000') top right no-repeat; background-size: cover">
    <ViewStudent v-bind="resp" @back="() => $router.push('/')" v-if="!misc.loading" />
    <q-inner-loading :showing="misc.loading">
      <q-spinner-facebook size="40vw" color="amber" />
      <div class="text-center">Downloading Data</div>
    </q-inner-loading>
  </q-page>
</template>

<script setup>
import {useRouter} from "vue-router";
import {LUCKY_DRAW_FETCH_UL} from "assets/constants";
import {computed, reactive, ref} from "vue";
import {forEach, sumBy, zipObject} from "lodash";
import ViewStudent from "components/LuckyDraw/ViewStudent.vue";

const props = defineProps(['code'])
const router = useRouter();
const resp = reactive({ Student:null,Students:[],College:null })
const misc = reactive({ loading:true })

if(props.code) {
  fetch(LUCKY_DRAW_FETCH_UL + '?action=sfg34&code=' + props.code).then(r => r.json()).then((data) => {
    if(data.hasOwnProperty('status') && data.status === false) return misc.not_participant = !(misc.phone_fetching = false);
    resp.Student = zipObject(data.Heading,data.Student); resp.Students = data.Students.map(student => zipObject(data.Heading,student));
    let sCollege = parseInt(resp.Student.College), cHeading = data.Colleges[0], college = data.Colleges.find(college => parseInt(college[0]) === sCollege)
    resp.College = zipObject(cHeading,college);
    misc.loading = false;
  })

} else router.push("/");
function getStudent(){
  if(!misc.phone || String(misc.phone).length !== 10) return misc.phone_error = true;
  misc.phone_fetching = true;
}
</script>
