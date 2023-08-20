// plugins/vuetify.js
import { createVuetify } from "vuetify";

import colors from "vuetify/lib/util/colors";

// colors

const dark = {
  variables: {},
  colors: {
    background: "#f8f8f8",
    surface: "#FFFFFF",
    primary: "#606c5d",
    secondary: "#f1c376",
    error: "#B00020",
    info: "#2196F3",
    success: "#4CAF50",
    warning: "#FB8C00",
  },
};

// export

export default defineNuxtPlugin((nuxtApp) => {
  const vuetify = createVuetify({
    ssr: true,

    theme: {
      defaultTheme: "dark",
      themes: {
        dark,
      },
    },
  });

  nuxtApp.vueApp.use(vuetify);
});
