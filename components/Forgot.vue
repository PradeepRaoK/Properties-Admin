<template>
    <v-container fluid>
      <v-row align="center" justify="center">
        <v-col cols="12" md="6" lg="4">
          <v-card>
            <v-toolbar color="primary" dark>
              <v-toolbar-title>{{ $t("forgotPassword.title") }}</v-toolbar-title>
            </v-toolbar>
            <v-card-text>
              <v-alert v-if="!step" :value="true" color="info">
                {{ $t("forgotPassword.instructions") }}
              </v-alert>
              <v-alert v-else-if="step === 'otp'" :value="true" color="info">
                {{ $t("forgotPassword.otpInstructions") }}
              </v-alert>
              <v-alert
                v-else-if="step === 'changePassword'"
                :value="true"
                color="info"
              >
                {{ $t("forgotPassword.changePasswordInstructions") }}
              </v-alert>
              <v-form v-if="!step" @submit.prevent="submitEmail">
                <v-text-field
                  v-model="email"
                  :rules="[rules.required, rules.email]"
                  label="Email"
                  required
                />
                <v-btn color="primary" type="submit" :loading="loading">{{
                  $t("forgotPassword.submitEmail")
                }}</v-btn>
              </v-form>
              <v-form v-else-if="step === 'otp'" @submit.prevent="submitOtp">
                <v-text-field
                  v-model="otp"
                  :rules="[rules.required]"
                  label="OTP"
                  required
                />
                <v-btn color="primary" type="submit" :loading="loading">{{
                  $t("forgotPassword.submitOtp")
                }}</v-btn>
              </v-form>
              <v-slide-group
                v-else-if="step === 'changePassword'"
                v-model="slideIndex"
              >
                <v-slide-item>
                  <v-form @submit.prevent="submitPassword" ref="passwordForm">
                    <v-text-field
                      v-model="password"
                      :rules="[rules.required, rules.password]"
                      label="New Password"
                      required
                      type="password"
                    />
                    <v-text-field
                      v-model="confirmPassword"
                      :rules="[rules.required, rules.matchPassword]"
                      label="Confirm Password"
                      required
                      type="password"
                    />
                    <v-btn color="primary" type="submit" :loading="loading">{{
                      $t("forgotPassword.submitPassword")
                    }}</v-btn>
                  </v-form>
                </v-slide-item>
                <v-slide-item>
                  <v-alert :value="true" color="success">
                    {{ $t("forgotPassword.passwordChanged") }}
                  </v-alert>
                  <v-btn color="primary" @click="goToLogin">{{
                    $t("forgotPassword.backToLogin")
                  }}</v-btn>
                </v-slide-item>
              </v-slide-group>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </template>
  
  <script>
  export default {
    data: () => ({
      email: "",
      otp: "",
      password: "",
      confirmPassword: "",
      loading: false,
      step: null,
      slideIndex: 0,
      rules: {
        required: (value) => !!value || "Required.",
        email: (value) => /.+@.+/.test(value) || "Email must be valid.",
      },
    }),
    methods: {
      async submitEmail() {
        if (!this.$refs.emailForm.validate()) return;
        try {
          this.loading = true;
          await this.forgotPassword(this.email);
          this.step = "otp";
        } catch (err) {
          console.error(err);
          this.$store.dispatch("snackbar/showSnackbar", {
            message:
              err.response?.data?.message || this.$t("forgotPassword.error"),
            color: "error",
          });
        } finally {
          this.loading = false;
        }
      },
  
      async submitOtp() {
        if (!this.$refs.otpForm.validate()) return;
        try {
          this.loading = true;
          await this.changePassword({ email: this.email, otp: this.otp });
          this.step = "changePassword";
        } catch (err) {
          console.error(err);
          this.$store.dispatch("snackbar/showSnackbar", {
            message:
              err.response?.data?.message || this.$t("forgotPassword.error"),
            color: "error",
          });
        } finally {
          this.loading = false;
        }
      },
  
      async submitPassword() {
        if (!this.$refs.passwordForm.validate()) return;
        try {
          this.loading = true;
          await this.changePassword({
            email: this.email,
            otp: this.otp,
            password: this.password,
          });
          this.slideIndex = 1;
          await sleep(5000); // Wait 5 seconds before redirecting to login
          this.goToLogin();
        } catch (err) {
          console.error(err);
          this.$store.dispatch("snackbar/showSnackbar", {
            message:
              err.response?.data?.message || this.$t("forgotPassword.error"),
            color: "error",
          });
        } finally {
          this.loading = false;
        }
      },
  
      goToLogin() {
        this.$router.push({ name: "login" });
      },
    },
  };
  </script>
  