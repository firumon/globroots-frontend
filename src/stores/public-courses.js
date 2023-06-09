import { defineStore } from 'pinia';

export const usePublicCourseStore = defineStore('public-courses', {
  state: () => ({
    path: 'courses',
    courses: [
      {
        name: 'Business and Management',
        image:'business.jpg',
      },
      {
        name: 'Accounting and Finance',
        image:'finance.jpg',
      },
    ]
  }),
  getters: {},
  actions: {},
});
