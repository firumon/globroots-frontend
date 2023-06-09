import { defineStore } from 'pinia';
import {map} from "lodash";

export const usePublicStoriesStore = defineStore('public-stories', {
  state: () => ({
    students: [
      { name:'Jayamol',image:'jayamol.jpg',year:'2022' },
      { name:'Sanjay',image:'sanjay.jpg',year:'2022' },
      { name:'Nihad Roshan',image:'nihadroshan.jpg',year:'2022' },
      { name:'Jayamol',image:'jayamol.jpg',year:'2022' },
      { name:'Sanjay',image:'sanjay.jpg',year:'2022' },
      { name:'Nihad Roshan',image:'nihadroshan.jpg',year:'2022' },
      { name:'Jayamol',image:'jayamol.jpg',year:'2022' },
      { name:'Sanjay',image:'sanjay.jpg',year:'2022' },
      { name:'Nihad Roshan',image:'nihadroshan.jpg',year:'2022' },
      { name:'Jayamol',image:'jayamol.jpg',year:'2022' },
      { name:'Sanjay',image:'sanjay.jpg',year:'2022' },
      { name:'Nihad Roshan',image:'nihadroshan.jpg',year:'2022' },
    ],
    path: 'stories',
    caption: 'Journey with Globroots International',
  }),
  getters: {},
  actions: {},
});
