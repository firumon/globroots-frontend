<template>
  <q-card class="my-card">
    <q-img height="12rem" src="https://cdn.quasar.dev/img/parallax2.jpg">
      <div class="absolute-bottom text-h6">{{ details.Name }}</div>
    </q-img>
    <q-card-section>
      <div class="row no-wrap absolute q-col-gutter-x-xs q-mr-xs" style="top: 0; right: 0; transform: translateY(-25%);">
        <template v-for="(label,key) in plot.dot">
          <div class="col text-center" v-if="details[key]">
            <q-btn fab color="primary" :label="details[key]" />
            <div class="text-grey" style="font-size: 0.65rem">{{ label }}</div>
          </div>
        </template>
      </div>
      <div>{{ details.Campuses }}</div>
    </q-card-section>
    <q-list class="q-mt-md" separator>
      <template v-for="item in plot.list">
        <q-item v-if="(item[2] && data[item[2]]) || (item[3] && data[item[3]])">
          <q-item-section side top><q-icon :name="item[0]" /></q-item-section>
          <q-item-section v-if="item[2] && data[item[2]]">
            <q-item-label>{{ item[1] }}</q-item-label>
            <q-item-label caption v-if="item[2] && data[item[2]]" style="white-space: pre-line">{{ data[item[2]] }}</q-item-label>
          </q-item-section>
          <q-item-section side v-if="item[3] && data[item[3]]">{{ data[item[3]] }}</q-item-section>
        </q-item>
      </template>
      <q-item v-if="data['Process Flow']">
        <q-item-section side top><q-icon name="account_tree" /></q-item-section>
        <q-item-section>
          <q-item-label>Process Flow</q-item-label>
          <q-item-label caption>{{ data['Process Flow'].replace(/(?:\r\n|\r|\n)/g," >> ") }}</q-item-label>
        </q-item-section>
      </q-item>
    </q-list>
    <q-card-actions align="center" class="bg-grey-2"><q-btn flat color="primary" label="Entry Requirement" @click="viewRequirements" /></q-card-actions>
  </q-card>
</template>

<script setup>
import {computed, reactive} from "vue";

const props = defineProps(['details','misc'])
const emits = defineEmits(['requirements'])
const data = computed(() => Object.assign({},props.details,props.misc))
const plot = reactive({
  dot:{ 'Minimum English Requirement':'XII English','Minimum Academic Requirement':'Degree','Maximum Year GAP Accepted':'Max Gap' },
  list:[
    ['home','Campus','Campuses'],
    ['cast_for_education','Offer Turn Around Time','Offer Timeline','Max Offer TAT'],
    ['interpreter_mode','Interviews','Interviews'],
    ['payments','Initial Deposit & Financial','Deposit','Finance'],
    ['social_distance','GAP Accepted','GAP','Maximum Year GAP Accepted'],
    ['account_balance','Fee Range','Fee Range'],
    ['credit_score','Scholarship','Scholarship'],
    ['g_translate','University Language Test','Own Language Test'],
    ['manage_history','CAS Turn Around Time',null,'CAS TAT'],
    ['school','Dual Masters',null,'Dual Masters'],
    ['diversity_1','Marriage Case',null,'Marriage Case'],
  ]
})

function viewRequirements(){
  emits('requirements',data.value)
}

</script>
