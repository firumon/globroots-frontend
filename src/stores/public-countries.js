import { defineStore } from 'pinia';

export const usePublicCountryStore = defineStore('public-countries', {
  state: () => ({
    path: 'countries',
    countries: [
      {
        caption: 'Study in United Kingdom',
        image:'uk.jpg',
        details:'The UK is a world-renowned location to study abroad. Home to four of the top ten universities in the world according to the 2022 QS World University Rankings (University of Cambridge, University of Oxford, Imperial College London and University College London). It’s also where one in four world leaders have studied, showing that an education in the UK really can take you to the top.\n' +
          '\n' +
          'Between its top two universities (Cambridge and Oxford), the UK has produced almost 30 international alumni who have gone on to win Nobel Prizes. Its universities are also hotbeds of world leading research, demonstrating that it’s a country where education is about the future as much as the past.',
        icon: 'uk_flag.jpg'
      },
      {
        caption: 'Study in Canada',
        image:'canada.jpg',
        details:'The UK is a world-renowned location to study abroad. Home to four of the top ten universities in the world according to the 2022 QS World University Rankings (University of Cambridge, University of Oxford, Imperial College London and University College London). It’s also where one in four world leaders have studied, showing that an education in the UK really can take you to the top.\n' +
          '\n' +
          'Between its top two universities (Cambridge and Oxford), the UK has produced almost 30 international alumni who have gone on to win Nobel Prizes. Its universities are also hotbeds of world leading research, demonstrating that it’s a country where education is about the future as much as the past.',
        icon: 'canada_flag.jpg'
      },
    ]
  }),
  getters: {},
  actions: {},
});
