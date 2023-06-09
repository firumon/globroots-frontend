import { defineStore } from 'pinia';

export const usePublicUpdatesStore = defineStore('public-updates', {
  state: () => ({
    files: ['cccu-study-uk-2023-sep.jpg','enu-study-uk-2023-sep.jpg','gcu-study-uk-2023-sep.jpg','heriot-watt-study-uk-2023-sep.jpg','rhul-study-uk-2023-sep.jpg','teesside-study-uk-2023-sep.jpg','ucb-study-uk-2023-sep.jpg','uk-nursing.jpg'],
    path: 'updates',
  }),
  getters: {
    images(state){ return state.files.map(name => [state.path,name].join("/")) }
  },
  actions: {},
});
