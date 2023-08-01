<template>
  <q-page padding>
    <div class="row q-col-gutter-sm">
      <div class="col-xs-12 col-sm-12 col-md-12 col-lg-4 col-xl-4">
        <q-card>
          <q-card-section class="bg-light-blue-4 text-white text-bold">Colleges</q-card-section>
          <q-list separator dense>
            <q-item>
              <q-item-section><q-input label="New College Name" outlined v-model="college.name" /></q-item-section>
              <q-item-section side><q-btn icon="forward" round color="light-blue-4" padding="md" @click="addCollege" /></q-item-section>
            </q-item>
            <q-item v-for="College in Colleges">
              <q-item-section side>{{ College.No }}</q-item-section>
              <q-item-section>{{ College.Name }}</q-item-section>
              <q-item-section side>{{ College.Students }}</q-item-section>
            </q-item>
          </q-list>
        </q-card>
      </div>
      <div class="col-xs-12 col-sm-12 col-md-12 col-lg-8 col-xl-8">
        <q-card>
          <q-card-section class="bg-green-4 text-white text-bold">Students</q-card-section>
          <q-card-section class="q-px-none">
            <q-list separator>
              <q-item>
                <q-item-section><q-input label="Coupon Number" outlined v-model.number="student.coupon" type="number" /></q-item-section>
                <q-item-section><q-input label="Student Name" outlined v-model="student.name" /></q-item-section>
              </q-item>
              <q-item>
                <q-item-section><q-input label="Phone Number" outlined v-model.number="student.phone" type="number" /></q-item-section>
                <q-item-section><q-input label="Whatsapp Number" outlined v-model="student.whatsapp" type="number" /></q-item-section>
              </q-item>
              <q-item>
                <q-item-section><q-select label="College" outlined v-model.number="student.college" :options="CollegeOptions" emit-value map-options /></q-item-section>
                <q-item-section side><q-btn icon="forward" round color="green-4" padding="md" @click="addStudent" /></q-item-section>
              </q-item>
              <q-item v-for="(Student,idx) in Students">
                <q-item-section side>
                  <q-item-label>{{ idx+1 }}</q-item-label>
                  <q-item-label caption>{{ Student.Coupon }}</q-item-label>
                </q-item-section>
                <q-item-section>
                  <q-item-label>{{ Student.Name }}</q-item-label>
                  <q-item-label caption>{{ Colleges[Student.College].Name }}</q-item-label>
                </q-item-section>
                <q-item-section>
                  <q-item-label>P: {{ Student.Phone }}</q-item-label>
                  <q-item-label caption>W: {{ Student.WhatsApp }}</q-item-label>
                </q-item-section>
                <q-item-section side v-if="idx<5">
                  <q-btn icon="forward" color="positive" round dense flat target="_blank" :href="WhatsAppLink(Student)" />
                </q-item-section>
              </q-item>
            </q-list>
          </q-card-section>
        </q-card>

      </div>
    </div>
    <q-inner-loading :showing="misc.loading"><q-spinner-facebook size="40vw" color="amber" /><div>Loading Data</div></q-inner-loading>
  </q-page>
</template>

<script setup>
import {computed, reactive, ref, watch} from "vue";
import {LUCKY_DRAW_FETCH_UL} from "assets/constants";
import {forEach, map, zipObject} from "lodash";

const misc = reactive({ loading:true,college_heading:null,student_heading:null,w_change:false })
const college = reactive({ name:'' })
const student = reactive({ coupon:null,name:'',phone:null,whatsapp:null,college:null })
const Colleges = ref({}), Students = ref([]);
const CollegeOptions = computed(() => map(Colleges.value,(College,No) => ({ value:parseInt(No),label:College.Name })))

fetch(LUCKY_DRAW_FETCH_UL + '?action=3yt24').then(r => r.json()).then(data => {
  setColleges(data.Colleges); setStudents(data.Students);
  misc.loading = false;
})

function setColleges(cArray){
  let Heading = cArray.splice(0,1)[0];
  forEach(cArray,College => Colleges.value[College[0]] = zipObject(Heading,College));
  misc.college_heading = Heading;
}
function setStudents(sArray){
  let Heading = sArray.splice(0,1)[0];
  Students.value = sArray.map(Student => zipObject(Heading,Student)).reverse();
  misc.student_heading = Heading;
}
function WhatsAppLink(Student){
  let text = WhatsAppTemplate.replace('[Name]',Student.Name).replace('[CNO]',Student.Coupon).replace('[CODE]',IDtoCode(Student.ID))
  return `https://api.whatsapp.com/send?phone=${Student.WhatsApp}&text=`+encodeURI(text);
}
function IDtoCode(id){
  let T = String(new Date().getTime()).slice(-9), intT = parseInt(T),
    it = String(parseInt(id)+intT), it64 = btoa(it);
  return T+it64;
}

function addCollege(){
  misc.loading = true;
  if(!college.name) return misc.loading = false;
  fetch(LUCKY_DRAW_FETCH_UL + '?action=9werj&name=' + college.name).then(r => r.json()).then(data => {
    let No = data[0]; Colleges.value[No] = zipObject(misc.college_heading,data);
    misc.loading = false; college.name = ''
  })
}

watch(() => student.phone,phone => misc.w_change ? null : (student.whatsapp = phone))
watch(() => student.whatsapp,whatsapp => misc.w_change = whatsapp !== student.phone)
function addStudent(){
  misc.loading = true;
  if(!student.name || !student.college || !student.coupon || !student.phone || !student.whatsapp) return misc.loading = false;
  if(String(student.whatsapp).length === 10) student.whatsapp += 91e10
  let params = ''; forEach(student,(val,key) => params += `&${key}=${val}`)
  fetch(LUCKY_DRAW_FETCH_UL + '?action=9sdl' + params).then(r => r.json()).then(data => {
    Students.value.unshift(zipObject(misc.student_heading,data))
    Colleges.value[Students.value[0].College].Students++
    forEach(student,(val,key) => key === 'college' ? null : (student[key] = null))
    misc.loading = false;
  })
}
const WhatsAppTemplate = `\`\`\`
Dear [Name],

We extend our heartfelt gratitude for your enthusiastic participation in Globroots International's Lucky Draw. We are thrilled to inform you that your enrolment has been successfully processed, and you have been assigned a unique coupon number, [CNO]. To verify your entry, please visit https://luckydraw.globroots.com/student/[CODE].

We are eagerly anticipating the draw, scheduled for 1st January 2024. May fortune smile upon you, and may you emerge as the proud winner of a brand new Mac Book Pro. This special event is part of our grand celebration for our 5th Anniversary.

At Globroots International, we take pride in being a reputable study abroad consultancy that has been serving students for the past 5 years. We have built a strong foundation and have a track record of success, with 100% satisfied students. Don't just take our word for it, feel free to check out our stellar Google reviews at https://g.page/r/CREhpTkciJaDEB0/review.

We genuinely appreciate your interest in our services and encourage you to save our contact number for any Study Abroad Enquiries. Our devoted team is always ready to provide you with the best guidance and support. We eagerly anticipate the opportunity to serve you and help you fulfil your study abroad aspirations.

Warm regards,
Globroots International
9947666123 | info@globroots.com
\`\`\``
</script>
