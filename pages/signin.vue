<template>
  <v-container class="mt-0 justify-center align-center pt-0 mt-0" fluid>
    <v-row class="pt-0">
      <v-card class="glass-card border20" style="min-width: 900px">
        <v-card-text>
          <v-container>
            <h1 class="text-primary text-center border20">Sign In</h1>
            <v-row>
              <v-col cols="6">
                <v-card-title class="text-center">
                  <v-row>
                    <v-col>
                      <v-sheet>
                        <v-img
                          :aspect-ratio="1 / 1"
                          cover
                          src="/images/signin-component.jpeg"
                        ></v-img>
                      </v-sheet>
                    </v-col>
                  </v-row>
                </v-card-title>
              </v-col>
              <v-col cols="6" class="my-auto">
                <v-form v-model="formValid" ref="form">
                  <br />
                  <v-text-field
                    v-model="signInObject.loginId"
                    hide-details="auto"
                    variant="outlined"
                    density="compact"
                    placeholder="Email / Phone"
                    label="Email / Phone"
                    :rules="
                      isPhone == null
                        ? [loginIdRules]
                        : isPhone == true
                        ? [phoneRules]
                        : [emailRules]
                    "
                    :prepend-inner-icon="
                      isPhone == null
                        ? 'mdi-account-outline'
                        : isPhone == true
                        ? 'mdi-phone-outline'
                        : 'mdi-email-outline'
                    "
                  >
                  </v-text-field>
                  <br />
                  <v-text-field
                    hide-details="auto"
                    density="compact"
                    variant="outlined"
                    v-model="signInObject.password"
                    :rules="[passwordRule]"
                    placeholder=" Password"
                    label="Password"
                    prepend-inner-icon="mdi-lock-outline"
                    color="white"
                    @click:append-inner="show1 = !show1"
                    :append-inner-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                    :type="show1 ? 'text' : 'password'"
                    @keydown.enter="formValid ? signInFuntion() : ''"
                  >
                  </v-text-field>

                  <br />
                  <v-btn
                    color="primary "
                    class="d-flex justify-center mx-auto"
                    :loading="buttonLoading"
                    :disabled="!formValid"
                    @click="signInFuntion()"
                    >Sign In</v-btn
                  >
                </v-form>
              </v-col>
            </v-row>
          </v-container>

          <v-row class="justify-center">
            <v-col class="text-center">
              <nuxt-link to="/forgot-password">
                <v-btn variant="text" color="secondary">Forgot Password?</v-btn>
              </nuxt-link>
            </v-col>
            <v-col class="text-center"> </v-col>
          </v-row>
        </v-card-text>
      </v-card>
    </v-row>
  </v-container>
</template>

<script setup>
// imports

// meta
definePageMeta({
  layout: "custom",
  auth: false,
});

// declaration
// const { signIn, getUser, isLoggedIn, isVerified, signOut } = useAuth();
// const router = useRouter();
// const route = useRoute();

// constatnts
const emailRules = (value) => {
  const pattern =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return pattern.test(value) || "Invalid e-mail";
};
const phoneRules = (value) => {
  return (value.toString() && value.toString().length == 10) || "Invalid phone";
};
const loginIdRules = (value) => {
  return !!value || "LoginId cannot be empty";
};
const passwordRule = (value) => {
  return !!value || "Password cannot be empty";
};
const defaultSignInObject = { loginId: "", password: "" };

// reactive elements
let formValid = ref(false);
let signInObject = ref(defaultSignInObject);
let form = ref(false);
let show1 = ref(false);
let buttonLoading = ref(false);
// functions
let signInFuntion = async () => {
  buttonLoading.value = true;
  let payload = {};
  if (isPhone.value == true) {
    let loginId = signInObject.value.loginId;
    loginId = "+91" + loginId;
    payload["loginId"] = loginId;
  } else {
    payload["loginId"] = signInObject.value.loginId;
  }
  payload["password"] = signInObject.value.password;
  try {
    await signIn(payload, route.query.to ?? "/");
    buttonLoading.value = false;
  } catch (error) {
    buttonLoading.value = false;
    form.value.reset();
  }
};

// computed
let isPhone = computed(() => {
  if (
    signInObject.value &&
    signInObject.value.loginId &&
    signInObject.value.loginId.length
  ) {
    let id = signInObject.value.loginId;
    if (parseInt(id) > 0) {
      return true;
    } else if (id && id.length && id.length > 0) {
      return false;
    } else {
      return null;
    }
  }
});

// watch
// watch(signInObject.value, (value, oldValue) => {
//   if (parseInt(value.loginId) > 0) {
//     isPhone.value = true;
//   } else {
//     isPhone.value = false;
//   }
// });

// watcheffect
// watchEffect(async () => {
//   if ((await isLoggedIn()) && (await isVerified())) {
//     router.push("/");
//   }
// });
</script>

<style scoped>
.border20 {
  border-radius: 20px;
  padding: 20px;
}
.glass-card {
  backdrop-filter: blur(10px);
}
:deep(.v-field--variant-outlined .v-field__outline__notch) {
  border-width: 0 !important;
}
/*  */
</style>
