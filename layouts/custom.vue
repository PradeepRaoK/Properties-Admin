<template>
  <v-app id="inspire">
    <div class="img-back">
      <div class="hero">
        <!-- <v-avatar
          style="z-index: 2"
          size="100"
          class="bg-white border20 pa-1 ma-5"
          @click="$router.push('/signin')"
        >
          <v-img src="/images/logo.png"></v-img>
        </v-avatar> -->
        <div class="hero__title mt-0">
          <v-main><slot /></v-main>
        </div>
      </div>
    </div>
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
      showSidebar2: false,
      sidebarItems: [
        {
          title: "Dashboard",
          icon: "mdi-view-dashboard-outline",
          to: "/",
          show: false,
          content: [],
        },
        {
          title: "Properties",
          icon: "mdi-office-building-plus-outline",
          to: "/properties",
          show: true,
          content: [],
        },
        {
          title: "Executives",
          icon: "mdi-account-group-outline",
          to: "/executives",
          show: false,
          content: [],
        },
        {
          title: "Associates",
          icon: "mdi-handshake",
          to: "/associates",
          show: false,
          content: [],
        },

        {
          title: "Buyer/seller",
          icon: "mdi-home-switch-outline",
          to: "/buyer-seller",
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
          title: "Blogs",
          icon: "mdi-comment-quote-outline",
          to: "/blogs",
          show: false,
          content: [],
        },
        {
          title: "Testimonials",
          icon: "mdi-star-box-multiple-outline",
          to: "/testimonials",
          show: false,
          content: [],
        },
        {
          title: "Careers",
          icon: "mdi-briefcase-outline",
          to: "/careers",
          show: false,
          content: [],
        },
        {
          title: "Contact us",
          icon: "mdi-phone-outline",
          to: "/contact-us",
          show: false,
          content: [],
        },
        {
          title: "About Company ",
          icon: "mdi-monitor",
          to: "/about-company",
          show: false,
          content: [],
        },
        {
          title: "My Profile",
          icon: "mdi-account-circle-outline",
          to: "/my-profile",
          show: false,
          content: [],
        },
      ],
    };
  },
};
</script>
<style scoped>
.border-20 {
  border-radius: 20px;
}
.img-back {
  position: fixed;
  width: 100%;
  height: 100vh;

  background: url("/images/signin-background.jpeg"), rgb(0, 0, 0, 0.2);
  background-attachment: fixed;
  background-size: cover;
  background-position: center center;
  background-repeat: no-repeat;
}
:deep(.v-list-item__prepend) {
  /* width: 25px !important; */
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
/* :deep( .v-text-field {
  color: #4b49ac !important;
} */
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

/* 
 */
.hero {
  background-color: rgba(255, 255, 255, 0.485);
  backdrop-filter: blur(10px);
  position: relative;
  height: 100vh;
  overflow: hidden;
  font-family: "Montserrat", sans-serif;
}

.hero__title {
  color: #fff;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 50px;
  z-index: 1;
}

.cube {
  position: absolute;
  top: 80vh;
  left: 45vw;
  width: 10px;
  height: 10px;
  border: solid 1px #f68121;
  transform-origin: top left;
  transform: scale(0) rotate(0deg) translate(-50%, -50%);
  -webkit-animation: cube 12s ease-in forwards infinite;
  animation: cube 12s ease-in forwards infinite;
}
.cube:nth-child(2n) {
  border-color: #4b49ac;
}
.cube:nth-child(2) {
  -webkit-animation-delay: 2s;
  animation-delay: 1s;
  left: 25vw;
  top: 40vh;
}
.cube:nth-child(3) {
  -webkit-animation-delay: 4s;
  animation-delay: 2s;
  left: 75vw;
  top: 50vh;
}
.cube:nth-child(4) {
  -webkit-animation-delay: 6s;
  animation-delay: 3s;
  left: 90vw;
  top: 10vh;
}
.cube:nth-child(5) {
  -webkit-animation-delay: 8s;
  animation-delay: 4s;
  left: 10vw;
  top: 85vh;
}
.cube:nth-child(6) {
  -webkit-animation-delay: 10s;
  animation-delay: 5s;
  left: 50vw;
  top: 10vh;
}

@-webkit-keyframes cube {
  from {
    transform: scale(0) rotate(0deg) translate(-50%, -50%);
    opacity: 1;
  }
  to {
    transform: scale(20) rotate(960deg) translate(-50%, -50%);
    opacity: 0;
  }
}

@keyframes cube {
  from {
    transform: scale(0) rotate(0deg) translate(-50%, -50%);
    opacity: 1;
  }
  to {
    transform: scale(20) rotate(960deg) translate(-50%, -50%);
    opacity: 0;
  }
}
</style>
