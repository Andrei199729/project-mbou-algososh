import { defineConfig } from "cypress";

export default defineConfig({
  projectId: '4b2nfn',
  component: {
    devServer: {
      framework: "create-react-app",
      bundler: "webpack",
    },
  },

  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
