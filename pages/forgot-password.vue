<template>
  <v-container class="mt-0 justify-center align-center pt-0 mt-0" fluid>
    <v-row class="pt-0">
      <v-card class="glass-card bg-thirdColor border20" style="width: 600px">
        <v-card-title class="text-center">
          <v-row>
            <v-col>
              <h2 class="text-primary border20">Change Password</h2>
              <p>{{ guidelines }}</p>
            </v-col>
            <v-btn
              @click="initialize"
              v-show="!emailview"
              icon="mdi-arrow-left"
              class="bg-secondary"
              style="position: absolute; top: 8%; left: 10%"
            ></v-btn>
          </v-row>

          <!-- <ProplinksHeading :heading="'Sign In'" /> -->
        </v-card-title>
        <v-card-text class="text-center" style="position: relative">
          <v-form v-model="formValid" ref="form">
            <br />
            <div v-show="emailview">
              <v-text-field
                density="compact"
                :rules="
                  isPhone == null
                    ? [loginIdRules]
                    : isPhone == true
                    ? [phoneRules]
                    : [emailRules]
                "
                v-model="email"
                :disabled="otpview"
                hide-details="auto"
                variant="outlined"
                placeholder="Email / Phone"
                label="Email / Phone"
                :prepend-inner-icon="
                  isPhone == null
                    ? 'mdi-account-outline'
                    : isPhone == true
                    ? 'mdi-phone-outline'
                    : 'mdi-email-outline'
                "
                @keydown.enter="formValid ? getOtp() : ''"
              >
              </v-text-field>
            </div>
            <v-btn
              :loading="loadGetOTP"
              class="bg-primary ma-3"
              v-show="emailview && !otpview"
              @click="getOtp"
              :disabled="formValid"
            >
              Get OTP</v-btn
            >
            <br v-show="emailview && !otpview" />
            <div v-show="otpview">
              <OTP @filled="getfilledOTP($event)" />
              <v-btn
                :disabled="!formValid && !(filledOTP && filledOTP.length)"
                class="bg-primary ma-3"
                v-show="otpview"
                @click="verifyOtp"
              >
                Verify OTP</v-btn
              >
            </div>
            <div v-show="showPasswordFields">
              <v-text-field
                density="compact"
                v-model="password"
                hide-details="auto"
                variant="outlined"
                placeholder=" Password"
                :rules="rules"
                label="Password"
                prepend-inner-icon="mdi-lock-outline"
                @click:append-inner="show1 = !show1"
                :append-inner-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                :type="show1 ? 'text' : 'password'"
              >
              </v-text-field>
              <br />
              <div>
                <v-text-field
                  v-model="confirmPassword"
                  variant="outlined"
                  density="compact"
                  label="Confirm Password"
                  prepend-inner-icon="mdi-lock-outline"
                  placeholder=" Confirm Password..."
                  hide-details="auto"
                  @click:append-inner="show2 = !show2"
                  :append-inner-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
                  :type="show2 ? 'text' : 'password'"
                  @keydown.enter="same ? submitPassword() : ''"
                >
                </v-text-field>
              </div>
              <v-btn
                :disabled="!same"
                class="bg-primary ma-3"
                @click="submitPassword"
              >
                Submit</v-btn
              >
            </div>
            <div v-show="showLogin">
              <nuxt-link to="/signin">
                <h3
                  class="text-center text-primary"
                  style="text-decoration: underline"
                >
                  Go To Sign in
                </h3>
              </nuxt-link>
            </div>
          </v-form>
        </v-card-text>
      </v-card>
    </v-row>
  </v-container>
</template>

<script>
import { useToast } from "vue-toast-notification";
definePageMeta({
  layout: "custom",
  auth: false,
});

export default {
  data() {
    return {
      filledOTP: "",
      loadGetOTP: false,
      formValid: false,
      email: "",
      password: "",
      show1: false,
      show2: false,
      confirmPassword: "",
      guidelines: "",
      emailview: true,
      otpview: false,
      resendView: false,
      showLogin: false,
      showPasswordFields: false,
      loginId: "",
      emailRules: (value) => {
        const pattern =
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return pattern.test(value) || "Invalid e-mail.";
      },
      loginIdRules: (value) => {
        return !!value || "LoginId cannot be empty";
      },
      phoneRules: (value) => {
        return (
          (value.toString() && value.toString().length == 10) || "Invalid phone"
        );
      },
      rules: {
        required: (value) => !!value || "Required.",
        min: (v) => v.length >= 8 || "Min 8 characters",
      },
    };
  },
  methods: {
    async getfilledOTP(event) {
      // console.log("otp", event);
      this.filledOTP = event;
    },
    async getOtp() {
      try {
        this.loadGetOTP = true;
        this.loginId = "";
        if (this.isPhone) {
          this.loginId = "+91" + this.email;
        } else {
          this.loginId = this.email;
        }
        await $fetch(`/admin/auth/forgotPassword`, {
          method: "POST",
          baseURL: useRuntimeConfig().public.baseURL,
          server: false,
          headers: {
            Authorization: `Bearer ${useCookie("accessToken").value}`,
          },
          body: {
            loginId: this.loginId,
          },
        });
        this.loadGetOTP = false;
        this.otpview = true;
        useToast().success("OTP sent successfully", { position: "top-right" });
      } catch (err) {
        console.log(err);
        this.loadGetOTP = false;
        useToast().error("Failed to send OTP", { position: "top-right" });
      }
    },
    async verifyOtp() {
      try {
        await $fetch(`/admin/auth/verify`, {
          method: "POST",
          baseURL: useRuntimeConfig().public.baseURL,
          server: false,
          headers: {
            Authorization: `Bearer ${useCookie("accessToken").value}`,
          },
          body: {
            loginId: this.loginId,
            otp: this.filledOTP,
          },
        });
        this.emailview = false;
        this.showPasswordFields = true;
        useToast().success("OTP verified", { position: "top-right" });
      } catch (err) {
        console.log(err);
        useToast().error("Invalid OTP", { position: "top-right" });
      }
    },
    async submitPassword() {
      try {
        await $fetch(`/admin/auth/setPassword`, {
          method: "POST",
          baseURL: useRuntimeConfig().public.baseURL,
          server: false,
          headers: {
            Authorization: `Bearer ${useCookie("accessToken").value}`,
          },
          body: {
            loginId: this.loginId,
            otp: this.filledOTP,
            password: this.password,
          },
        });
        this.showPasswordFields = false;
        this.showLogin = true;
        useToast().success("OTP verified", { position: "top-right" });
      } catch (err) {
        console.log(err);
        useToast().error("Invalid OTP", { position: "top-right" });
      }
    },
    initialize() {
      this.emailview = true;
      this.otpview = false;
      this.resendView = false;
      this.showLogin = false;
      this.showPasswordFields = false;
    },
  },
  watch: {
    email(val) {
      this.initialize();
    },
    showPasswordFields(val) {
      if (val == true) {
        this.emailview = false;
        this.otpview = false;
        this.resendView = false;
      }
    },
  },
  computed: {
    isPhone() {
      let id = this.email;
      if (parseInt(id) > 0) {
        return true;
      } else if (id && id.length && id.length > 0) {
        return false;
      } else {
        return null;
      }
    },
    same() {
      if (this.password.length && this.password == this.confirmPassword) {
        return true;
      } else {
        return false;
      }
    },
  },
};
</script>

<style scoped>
.border20 {
  border-radius: 20px;
  padding: 20px;
}
.glass-card {
  backdrop-filter: blur(10px);
}

/*  */
</style>
