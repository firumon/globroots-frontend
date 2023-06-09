import { defineStore } from 'pinia';
import {map} from "lodash";

export const usePublicUniversityStore = defineStore('public-universities', {
  state: () => ({
    universities: ['coventry.jpg','shu.jpg','bul.jpg','aru.jpg','uon.jpg','greenwich.jpg','bpp.jpg','bedfordshire.jpg'],
    path: 'universities',
  }),
  getters: {
    images: (state) => map(state.universities,university => [state.path,university].join("/")),
  },
  actions: {},
});
