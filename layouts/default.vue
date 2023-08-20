<template>
  <v-app id="inspire">
    <v-navigation-drawer
      permanent
      style="border-radius: 20px"
      width="240"
      height="auto"
    >
      <div class="bg-primary">
        <v-card elevation="0" height="80px">
          <v-img
            v-if="selectedProperty == 'Someshwar Vista'"
            src="/images/someshwar-logo.png"
          ></v-img>
          <v-img
            v-if="selectedProperty == 'Vajra Realties'"
            src="/images/vajra-logo.png"
          ></v-img>
        </v-card>
      </div>
      <v-container>
        <v-row>
          <v-col>
            <v-select
              v-model="selectedProperty"
              density="compact"
              variant="outlined"
              label="Select Property"
              hide-details="auto"
              :items="['Someshwar Vista', 'Vajra Realties']"
            ></v-select>
          </v-col>
        </v-row>
      </v-container>
      <v-divider class="mx-3"></v-divider>
      <v-list density="compact" nav :active-class="$route.path">
        <nuxt-link
          style="text-decoration: none"
          v-for="(item, i) in sidebarItems"
          :key="i"
          :to="item.to"
        >
          <v-list-item color="primary" variant="flat" autofocus :value="item">
            <template v-slot:prepend>
              <v-icon :icon="item.icon"></v-icon>
              <v-list-item-title
                ><h3>
                  {{ item.title }}
                </h3></v-list-item-title
              >
            </template>
          </v-list-item>
        </nuxt-link>
        <v-list-item
          @click="logoutDialog = true"
          color="primary"
          variant="flat"
          autofocus
        >
          <template v-slot:prepend>
            <v-icon icon="mdi-power"></v-icon>
            <v-list-item-title><h3>Logout</h3></v-list-item-title>
          </template>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-dialog persistent v-model="logoutDialog" max-width="500px">
      <v-card>
        <v-card-title class="text-h5 pa-4">Do you want to Logout?</v-card-title>
        <br />
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            size="large"
            variant="outlined"
            color="primary"
            @click="logoutDialog = false"
            >Cancel</v-btn
          >
          <v-btn size="large" class="bg-primary" @click="logout()"
            >Logout</v-btn
          >
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-main><slot /></v-main>
  </v-app>
</template>

<script>
import { useTheme } from "vuetify";

export default {
  setup() {
    const theme = useTheme();
    return {
      theme,
      toggleTheme: () =>
        (theme.global.name.value = theme.global.current.value.dark
          ? "light"
          : "dark"),
    };
  },
  data() {
    return {
      x: null,
    };
  },
  watch: {
    x(val) {
      //   console.log(val);
    },
  },
  async created() {
    // try {
    //   const response = await $fetch("/admin/auth/user", {
    //     method: "GET",
    //     server: false,
    //     baseURL: useRuntimeConfig().public.baseURL,
    //     headers: {
    //       Authorization: `Bearer ${useCookie("accessToken").value}`,
    //     },
    //   });
    //   // let role = response.data.role;
    //   let role = "ADMIN";
    //   if (role == "ADMIN") {
    //     this.sidebarItems = [
    //       {
    //         title: "Dashboard",
    //         icon: "mdi-view-dashboard-outline",
    //         to: "/",
    //         show: false,
    //         content: [],
    //       },
    //       {
    //         title: "Project",
    //         icon: "mdi-office-building-plus-outline",
    //         to: "/project",
    //         show: true,
    //         content: [],
    //       },
    //       {
    //         title: "Executives",
    //         icon: "mdi-account-group-outline",
    //         to: "/executives",
    //         show: false,
    //         content: [],
    //       },
    //       {
    //         title: "Associates",
    //         icon: "mdi-handshake",
    //         to: "/associates",
    //         show: false,
    //         content: [],
    //       },
    //       {
    //         title: "BHK",
    //         icon: "mdi-home-switch-outline",
    //         to: "/bhk",
    //         show: false,
    //         content: [],
    //       },
    //       {
    //         title: "Enquiries",
    //         icon: "mdi-email-alert-outline",
    //         to: "/enquiries",
    //         show: false,
    //         content: [],
    //       },
    //       {
    //         title: "Blogs",
    //         icon: "mdi-comment-quote-outline",
    //         to: "/blogs",
    //         show: false,
    //         content: [],
    //       },
    //       {
    //         title: "Testimonials",
    //         icon: "mdi-star-box-multiple-outline",
    //         to: "/testimonials",
    //         show: false,
    //         content: [],
    //       },
    //       {
    //         title: "Careers",
    //         icon: "mdi-briefcase-outline",
    //         to: "/careers",
    //         show: false,
    //         content: [],
    //       },
    //       {
    //         title: "Contact us",
    //         icon: "mdi-phone-outline",
    //         to: "/contact-us",
    //         show: false,
    //         content: [],
    //       },
    //       {
    //         title: "File Manager",
    //         icon: "mdi-file",
    //         to: "/file-manager",
    //         show: false,
    //         content: [],
    //       },
    //       {
    //         title: "About Company ",
    //         icon: "mdi-monitor",
    //         to: "/about-company",
    //         show: false,
    //         content: [],
    //       },
    //       {
    //         title: "My Profile",
    //         icon: "mdi-account-circle-outline",
    //         to: "/profile",
    //         show: false,
    //         content: [],
    //       },
    //     ];
    //   } else {
    //     this.sidebarItems = [
    //       {
    //         title: "Dashboard",
    //         icon: "mdi-view-dashboard-outline",
    //         to: "/",
    //         show: false,
    //         content: [],
    //       },
    //       {
    //         title: "Project",
    //         icon: "mdi-office-building-plus-outline",
    //         to: "/project",
    //         show: true,
    //         content: [],
    //       },
    //       {
    //         title: "BHK",
    //         icon: "mdi-home-switch-outline",
    //         to: "/bhk",
    //         show: false,
    //         content: [],
    //       },
    //       {
    //         title: "Enquiries",
    //         icon: "mdi-email-alert-outline",
    //         to: "/enquiries",
    //         show: false,
    //         content: [],
    //       },
    //       {
    //         title: "Blogs",
    //         icon: "mdi-comment-quote-outline",
    //         to: "/blogs",
    //         show: false,
    //         content: [],
    //       },
    //       {
    //         title: "Contact us",
    //         icon: "mdi-phone-outline",
    //         to: "/contact-us",
    //         show: false,
    //         content: [],
    //       },
    //       {
    //         title: "File Manager",
    //         icon: "mdi-file",
    //         to: "/file-manager",
    //         show: false,
    //         content: [],
    //       },
    //       {
    //         title: "My Profile",
    //         icon: "mdi-account-circle-outline",
    //         to: "/profile",
    //         show: false,
    //         content: [],
    //       },
    //     ];
    //   }
    // } catch (err) {
    //   console.log(err);
    // }
  },
};
</script>
<script setup>
// const { signIn, getUser, isLoggedIn, isVerified, signOut } = useAuth();
let logoutDialog = ref(false);
let selectedProperty = ref("Someshwar Vista");
let logout = async () => {
  try {
    await signOut("/");
    logoutDialog.value = false;
  } catch (error) {
    console.log(error);
  }
};
let sidebarItems = ref([
  {
    title: "BHK",
    icon: "mdi-home-switch-outline",
    to: "/bhk",
    show: false,
    content: [],
  },
  {
    title: "Enquiries",
    icon: "mdi-email-alert-outline",
    to: "/enquiries",
    show: false,
    content: [],
  },
  {
    title: "Brochure",
    icon: "mdi-file-download",
    to: "/brochure",
    show: false,
    content: [],
  },
  {
    title: "Blogs",
    icon: "mdi-comment-quote-outline",
    to: "/blogs",
    show: false,
    content: [],
  },
  {
    title: "Contact Settings",
    icon: "mdi-phone-outline",
    to: "/contactSettings",
    show: false,
    content: [],
  },
  {
    title: "Slideshow Settings",
    icon: "mdi-file",
    to: "/slideshowSettings",
    show: false,
    content: [],
  },
  {
    title: "My Profile",
    icon: "mdi-account-circle-outline",
    to: "/profile",
    show: false,
    content: [],
  },
  {
    title: "Property Details",
    icon: "mdi-office-building-plus-outline",
    to: "/project",
    show: true,
    content: [],
  },
  {
    title: "Settings",
    icon: "mdi-cog",
    to: "/settings",
    show: true,
    content: [],
  },
]);
</script>
<style scoped>
.border-20 {
  border-radius: 20px;
}

:deep(.v-list-item-subtitle) {
  opacity: 1 !important;
}
:deep(.v-list-item--active > .v-list-item__overlay) {
  opacity: 0 !important;
}
:deep(.v-field--variant-outlined .v-field__outline__notch) {
  border-width: 0 !important;
}

:deep(.m-input-wrapper-input) {
  color: #100d70 !important;
}

:deep(.v-field--variant-outlined .v-field__outline__notch) {
  border-width: 0 !important;
}
a:link {
  text-decoration: none;
}

a:visited {
  text-decoration: none;
}

a:hover {
  text-decoration: underline;
}

a:active {
  text-decoration: underline;
}
a {
  color: #000000;
}
</style>
