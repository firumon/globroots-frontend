import { defineStore } from 'pinia';
import {map} from "lodash";

export const usePublicBannerStore = defineStore('public-banners', {
  state: () => ({
    banners: ['banner01.png','banner02.png'],
    path: 'banners',
    duration: 10000,
  }),
  getters: {
    images: (state) => map(state.banners,banner => [state.path,banner].join("/")),
  },
  actions: {},
});
