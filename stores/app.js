import { defineStore } from 'pinia';
import * as prismic from '@prismicio/client';
import { repositoryName } from './slicemachine.config.json';

const endpoint = prismic.getRepositoryEndpoint(repositoryName);

export const useAppStore = defineStore('app', {
  state: () => ({
    theme: 'light',
    appData: {},
    prismicClient: null,
    fontsLoaded: false,
    isMenuOpen: false,
    isCartOpen: false,
  }),

  getters: {
    isAuthenticated: state => !!state.user,
  },

  actions: {
    toggleTheme() {
      this.theme = this.theme === 'light' ? 'dark' : 'light';
    },

    async initializePrismicClient() {
      if (!this.prismicClient) {
        this.prismicClient = prismic.createClient(endpoint);
      }
    },

    async fetchAppData() {
      try {
        await this.initializePrismicClient(); // Ensure Prismic client is initialized
        const response = await this.prismicClient.getByType('app'); // Fetch from 'app' custom type

        if (response.results.length > 0) {
          this.appData = response.results[0]; // Store first result in state
        } else {
          console.warn("No data found for custom type 'app'");
          this.appData = null;
        }
      } catch (error) {
        console.error('Error fetching app data:', error);
        this.appData = null;
      }
    },
  },
});
