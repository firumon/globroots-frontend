<template>
  <q-page padding style="background: url('https://img.freepik.com/premium-photo/abstract-images-textures-surface-pattern-design-bright-glitter-geometry-octagon-bokeh_34985-801.jpg?w=2000') top right no-repeat; background-size: cover">
    <template v-if="resp.Student">
      <ViewStudent v-bind="resp" @back="() => resp.Student = null" />
    </template>
    <template v-else>
      <div class="row q-col-gutter-sm">
        <div class="col-12">
          <q-card>
            <q-card-section class="q-py-none q-px-none text-bold text-center text-h4" style="background: url('https://globroots.com/CBack.png') center no-repeat; background-size: cover">
              <q-img src="https://globroots.com/CImg.png" />
            </q-card-section>
          </q-card>
        </div>
        <div class="col-6"><CountMetricCard label="Total Colleges" background="https://png.pngtree.com/thumb_back/fh260/background/20210324/pngtree-gradient-blue-powder-white-point-card-light-background-image_593568.jpg" :count="Colleges.length" /></div>
        <div class="col-6"><CountMetricCard label="Total Participants" background="https://static.vecteezy.com/system/resources/previews/007/455/514/original/light-green-low-poly-background-polygonal-design-pattern-bright-mosaic-modern-geometric-design-creative-design-templates-connected-lines-with-dots-free-vector.jpg" :count="Participants" /></div>
      </div>
      <q-card class="q-mt-sm">
        <q-list>
          <q-item-label header class="text-bold bg-amber text-white" style="font-size: 1.2rem">Enter your phone number to know your college participants</q-item-label>
          <q-item>
            <q-item-section><q-input outlined label="Phone Number" v-model.number="misc.phone" type="number" /></q-item-section>
            <q-item-section side><q-btn icon="forward" round color="amber" padding="md" @click="getStudent" /></q-item-section>
          </q-item>
        </q-list>
        <q-inner-loading :showing="misc.phone_fetching"><q-spinner-facebook size="40vw" color="amber" /></q-inner-loading>
      </q-card>
      <q-list class="q-mt-sm" separator bordered style="background: url('https://png.pngtree.com/background/20210717/original/pngtree-soft-and-bright-vintage-rough-texture-straw-paper-light-yellow-background-picture-image_1445371.jpg') center center no-repeat; background-size: cover">
        <q-item-label header class="text-bold" style="font-size: 1.2rem">Participated students count from Colleges</q-item-label>
        <q-separator />
        <q-item v-for="(College,idx) in Colleges">
          <q-item-section side><q-item-label>{{ idx+1 }}</q-item-label></q-item-section>
          <q-item-section><q-item-label class="text-bold">{{ College.Name }}</q-item-label></q-item-section>
          <q-item-section side><q-item-label class="text-bold">{{ College.Students }}</q-item-label></q-item-section>
        </q-item>
      </q-list>
      <q-dialog persistent full-width v-model="misc.phone_error"><DialoguePhoneError /></q-dialog>
      <q-dialog persistent full-width v-model="misc.not_participant" @hide="() => misc.phone = null"><DialogueNotParticipant /></q-dialog>
    </template>
  </q-page>
</template>

<script setup>
import CountMetricCard from "components/LuckyDraw/CountMetricCard.vue";
import {LUCKY_DRAW_FETCH_UL} from "assets/constants";
import {computed, reactive, ref} from "vue";
import {forEach, sumBy, zipObject} from "lodash";
import DialoguePhoneError from "components/LuckyDraw/DialoguePhoneError.vue";
import DialogueNotParticipant from "components/LuckyDraw/DialogueNotParticipant.vue";
import ViewStudent from "components/LuckyDraw/ViewStudent.vue";

const Colleges = ref([]), Participants = computed(() => sumBy(Colleges.value,college => parseInt(college.Students)))
const misc = reactive({ phone:null,phone_error:false,phone_fetching:false,not_participant:false })
const resp = reactive({ Student:null,Students:[],College:null })

fetch(LUCKY_DRAW_FETCH_UL + '?action=sdfoe').then(r => r.json()).then(setColleges)
function setColleges(cArray){
  let heading = cArray.splice(0,1)[0];
  Colleges.value.splice(0,Colleges.value.length);
  forEach(cArray,college => Colleges.value.push(zipObject(heading,college)));
}
function getStudent(){
  if(!misc.phone || String(misc.phone).length !== 10) return misc.phone_error = true;
  misc.phone_fetching = true;
  fetch(LUCKY_DRAW_FETCH_UL + '?action=bvovi&phone=' + misc.phone).then(r => r.json()).then((data) => {
    if(data.hasOwnProperty('status') && data.status === false) return misc.not_participant = !(misc.phone_fetching = false);
    resp.Student = zipObject(data.Heading,data.Student); resp.Students = data.Students.map(student => zipObject(data.Heading,student));
    let sCollege = parseInt(resp.Student.College), cHeading = data.Colleges[0], college = data.Colleges.find(college => parseInt(college[0]) === sCollege)
    resp.College = zipObject(cHeading,college); setColleges(data.Colleges);
    misc.phone_fetching = false;
  })
}
</script>
