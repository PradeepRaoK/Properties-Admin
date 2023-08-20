<template>
  <div class="pb-5">
    <v-container class="pt-0" fluid style="border-radius: 20px">
      <v-container>
        <v-row class="justify-center">
          <v-col class="my-auto text-" lg="9">
            <h2 class="text-primary">My Profile</h2>
          </v-col>
          <v-col>
            <v-row>
              <v-col>
                <v-btn
                  color="black mx-1"
                  v-if="!editData"
                  @click="editData = true"
                  icon="mdi-pencil"
                >
                </v-btn>
                <v-btn
                  class="mx-1"
                  color="black"
                  v-if="editData"
                  @click="cancelProfileObj()"
                  icon="mdi-close"
                >
                </v-btn>
                <v-btn
                  class="bg-primary mx-1"
                  v-if="editData"
                  :loading="saveProfileObjLoading"
                  @click="saveProfileObj()"
                  icon="mdi-check"
                >
                </v-btn>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-container>
      <v-container>
        <v-row>
          <v-col>
            <v-card elevation="0" class="bg-white border-20">
              <v-container fluid>
                <v-row class="my-auto pa-2 justify-center">
                  <!-- section user details -->
                  <v-col lg="8" md="7" sm="8" cols="12" class="py-1">
                    <v-row>
                      <v-col lg="6" md="5" sm="12" cols="12">
                        <v-text-field
                          v-model="editProfileObj.name"
                          density="compact"
                          :disabled="!editData"
                          label="Name"
                          color="primary"
                          variant="outlined"
                          hide-details="auto"
                        ></v-text-field>
                      </v-col>
                      <v-col lg="6" md="5" sm="12" cols="12">
                        <v-text-field
                          v-model="editProfileObj.email"
                          :disabled="!editData"
                          density="compact"
                          label="Email"
                          color="primary"
                          variant="outlined"
                          hide-details="auto"
                        ></v-text-field>
                      </v-col>
                    </v-row>
                    <v-row>
                      <v-col lg="6" md="6" sm="12" cols="12">
                        <MazPhoneNumberInput
                          density="compact"
                          color="primary"
                          :disabled="!editData"
                          variant="outlined"
                          v-model="editProfileObj.phone"
                          show-code-on-list
                          default-country-code="IN"
                          :preferred-countries="['IN']"
                          :translations="{
                            countrySelector: {
                              placeholder: 'Country code',
                              error: 'Choose country',
                            },
                            phoneInput: {
                              placeholder: 'Phone number',
                              example: 'Eg:',
                            },
                          }"
                          hide-details="auto"
                          style="border-radius: 10px"
                        />
                      </v-col>
                      <v-col lg="6" md="6" sm="12" cols="12" class="my-auto">
                        <v-text-field
                          v-model="editProfileObj.designation"
                          label="Designation"
                          :disabled="!editData"
                          density="compact"
                          color="primary"
                          variant="outlined"
                          hide-details="auto"
                        ></v-text-field>
                      </v-col>
                    </v-row>
                    <v-row>
                      <v-col>
                        <v-textarea
                          v-model="editProfileObj.bio"
                          density="compact"
                          :disabled="!editData"
                          label="Bio"
                          color="primary"
                          variant="outlined"
                          hide-details="auto"
                        ></v-textarea>
                      </v-col>
                    </v-row>
                  </v-col>
                  <!-- section profile photo -->
                  <v-col lg="3" md="4" sm="4" cols="6" class="py-1 my-auto">
                    <v-hover>
                      <template v-slot:default="{ isHovering, props }">
                        <v-card
                          v-bind="props"
                          style="position: relative"
                          variant="outlined"
                          class="rounded-lg mx-auto font-weight-medium my-auto"
                          min-height="208px"
                          max-height="208px"
                          min-width="208px"
                          max-width="208px"
                        >
                          <p
                            v-if="
                              !(
                                editProfileObj.profilePic &&
                                editProfileObj.profilePic.length
                              )
                            "
                            class="basic-absolute text-center"
                          >
                            Please upload an Image to preview
                          </p>
                          <v-img
                            v-if="
                              editProfileObj.profilePic &&
                              editProfileObj.profilePic.length
                            "
                            :width="205"
                            :aspect-ratio="1 / 1"
                            :src="`${useRuntimeConfig().public.baseURL}/img/_/${
                              useRuntimeConfig().public.s3URL
                            }/${editProfileObj.profilePic}`"
                            class="mx-auto"
                          >
                          </v-img>
                          <v-expand-transition>
                            <v-avatar
                              v-show="isHovering"
                              size="250"
                              class="inner-abs"
                              rounded="0"
                            >
                              <v-btn
                                class="mx-1 rounded-lg"
                                color="primary"
                                icon="mdi-upload"
                                :loading="isSelectingProfile"
                                @click="profilePicImport"
                              ></v-btn>
                              <v-btn
                                v-if="
                                  editProfileObj.profilePic &&
                                  editProfileObj.profilePic.length
                                "
                                class="mx-1 rounded-lg"
                                color="primary"
                                icon="mdi-eye"
                                @click="
                                  openViewPhoto(editProfileObj.profilePic)
                                "
                              ></v-btn>
                              <input
                                accept="image/*"
                                ref="uploaderProfile"
                                class="d-none"
                                type="file"
                                @change="onFileChangedProfile"
                              />
                            </v-avatar>
                          </v-expand-transition>
                        </v-card>
                      </template>
                    </v-hover>
                  </v-col>
                </v-row>
                <!-- seo part -->
                <v-row class="my-auto pa-2 justify-center">
                  <v-col lg="8" md="7" sm="8" cols="12" class="py-1">
                    <v-row>
                      <v-col lg="6" md="6" sm="12" cols="12">
                        <v-text-field
                          v-model="editProfileObj.seoTitle"
                          density="compact"
                          :disabled="!editData"
                          label="SEO Title"
                          color="primary"
                          variant="outlined"
                          hide-details="auto"
                        ></v-text-field>
                      </v-col>
                      <v-col lg="6" md="6" sm="12" cols="12">
                        <v-combobox
                          v-model="editProfileObj.seoKeyword"
                          :hide-no-data="false"
                          :disabled="!editData"
                          hide-selected
                          color="primary"
                          variant="outlined"
                          hide-details="auto"
                          label="SEO Keywords"
                          multiple
                          persistent-hint
                          density="compact"
                          chips
                        >
                          <template v-slot:no-data>
                            <v-list-item>
                              <v-list-item-title>
                                Press
                                <kbd>enter</kbd> after each keyword
                              </v-list-item-title>
                            </v-list-item>
                          </template>
                        </v-combobox>
                      </v-col>
                    </v-row>
                    <v-row>
                      <v-col>
                        <v-textarea
                          v-model="editProfileObj.seoDescription"
                          density="compact"
                          :disabled="!editData"
                          label="SEO Description"
                          color="primary"
                          class="rounded-lg font-weight-medium"
                          hide-details="auto"
                          variant="outlined"
                        ></v-textarea>
                      </v-col>
                    </v-row>
                  </v-col>
                  <v-col lg="3" md="4" cols="6" class="py-1">
                    <v-hover>
                      <template v-slot:default="{ isHovering, props }">
                        <v-card
                          v-bind="props"
                          style="position: relative"
                          variant="outlined"
                          class="rounded-lg mx-auto font-weight-medium my-auto"
                          min-height="208px"
                          max-height="208px"
                          min-width="208px"
                          max-width="208px"
                        >
                          <p
                            v-if="
                              !(
                                editProfileObj.seoThumbnail &&
                                editProfileObj.seoThumbnail.length
                              )
                            "
                            class="basic-absolute text-center"
                          >
                            Please upload an Image to preview
                          </p>

                          <v-img
                            :width="205"
                            aspect-ratio="1/1"
                            v-if="
                              editProfileObj.seoThumbnail &&
                              editProfileObj.seoThumbnail.length
                            "
                            :src="`${useRuntimeConfig().public.baseURL}/img/_/${
                              useRuntimeConfig().public.s3URL
                            }/${editProfileObj.seoThumbnail}`"
                            class="mx-auto"
                          >
                          </v-img>
                          <v-expand-transition>
                            <v-avatar
                              v-show="isHovering"
                              size="250"
                              class="inner-abs"
                              rounded="0"
                            >
                              <v-btn
                                class="mx-1 rounded-lg"
                                color="primary"
                                icon="mdi-upload"
                                :loading="isSelectingseo"
                                @click="seoPicImport()"
                              ></v-btn>
                              <v-btn
                                v-if="
                                  editProfileObj.seoThumbnail &&
                                  editProfileObj.seoThumbnail.length
                                "
                                class="mx-1 rounded-lg"
                                color="primary"
                                icon="mdi-eye"
                                @click="
                                  openViewPhoto(editProfileObj.seoThumbnail)
                                "
                              ></v-btn>
                              <input
                                accept="image/*"
                                ref="uploaderseo"
                                class="d-none"
                                type="file"
                                @change="onFileChangedseo"
                              />
                            </v-avatar>
                          </v-expand-transition>
                        </v-card>
                      </template>
                    </v-hover>
                  </v-col>
                  <!-- <v-col lg="4" md="4" cols="7" class="py-2 my-2">
                      <v-btn
                        variant="outlined"
                        elevation="0"
                        color="primary"
                        class="mx-1"
                      >
                        <v-icon>mdi-close</v-icon> Cancel</v-btn
                      >
                      <v-btn elevation="0" color="primary" class="mx-1">
                        <v-icon>mdi-floppy</v-icon> &nbsp; Save</v-btn
                      >
                    </v-col> -->
                </v-row>
              </v-container>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
      <!-- password -->
      <v-container>
        <v-row class="justify-center">
          <v-col class="text-center my-auto" lg="9">
            <h2 class="text-primary">Password Settings &nbsp;</h2>
          </v-col>
          <v-col lg="3">
            <v-row>
              <v-col>
                <v-btn
                  color="primary mx-1"
                  v-if="passObj.password.length"
                  @click="
                    passObj.password = '';
                    passObj.confirmPassword = '';
                  "
                >
                  <v-icon icon="mdi-close"></v-icon>
                  &nbsp;Cancel
                </v-btn>
                <v-btn
                  class="bg-primary mx-1"
                  v-if="passObj.confirmPassword.length"
                  :loading="savePassObjLoading"
                  @click="savePassObj()"
                >
                  <v-icon icon="mdi-check"></v-icon>
                  &nbsp;Save</v-btn
                >
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-container>

      <v-container>
        <v-card elevation="0" class="bg-white border-20">
          <v-container fluid class="pa-5">
            <v-row class="justify-center">
              <v-col lg="4" md="5" sm="6" cols="12">
                <v-text-field
                  v-model="passObj.password"
                  density="compact"
                  label="Password"
                  color="primary"
                  variant="outlined"
                  hide-details="auto"
                  @click:append-inner="show1 = !show1"
                  :append-inner-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                  :type="show1 ? 'text' : 'password'"
                ></v-text-field>
              </v-col>
              <v-col lg="4" md="5" sm="6" cols="12">
                <v-text-field
                  v-model="passObj.confirmPassword"
                  :disabled="!passObj.password.length"
                  density="compact"
                  label="Confirm Password"
                  color="primary"
                  variant="outlined"
                  hide-details="auto"
                  @click:append-inner="show2 = !show2"
                  :append-inner-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
                  :type="show2 ? 'text' : 'password'"
                ></v-text-field>
              </v-col>
            </v-row>
          </v-container>
        </v-card>
      </v-container>
      <!-- profile pic dialog -->
      <div class="text-center">
        <v-dialog
          transition="dialog-bottom-transition"
          v-model="profileDialog"
          max-width="1200px"
        >
          <v-container>
            <v-card>
              <v-card-title>Profile Picture Settings</v-card-title>
              <v-divider></v-divider>
              <v-card-text>
                <v-container>
                  <v-row class="justify-center">
                    <v-col cols="12">
                      <PictureCropper
                        @tempDp="tempDp"
                        :src="uploadedProfile"
                        :aspect="aspectDp"
                      />
                    </v-col> </v-row
                ></v-container>
              </v-card-text>
              <v-card-actions class="justify-center py-5">
                <v-btn
                  size="large"
                  variant="outlined"
                  color="primary"
                  @click="cancelUpdateDp()"
                  >Cancel</v-btn
                >
                <v-btn size="large" class="bg-primary" @click="updateDp()"
                  >SAVE</v-btn
                >
              </v-card-actions>
            </v-card>
          </v-container>
        </v-dialog>
      </div>
      <!-- Seo pic dialog -->
      <div class="text-center">
        <v-dialog
          transition="dialog-bottom-transition"
          v-model="seoDialog"
          max-width="1200px"
        >
          <v-container>
            <v-card>
              <v-card-title>SEO Picture Settings </v-card-title>
              <v-divider></v-divider>
              <v-card-text>
                <v-container>
                  <v-row class="justify-center">
                    <v-col cols="12">
                      <PictureCropper
                        @tempDp="tempSeo"
                        :src="uploadedseo"
                        :aspect="aspectSeo"
                      />
                    </v-col> </v-row
                ></v-container>
              </v-card-text>
              <v-card-actions class="justify-center py-5">
                <v-btn
                  size="large"
                  variant="outlined"
                  color="primary"
                  @click="cancelUpdateSeo()"
                  >Cancel</v-btn
                >
                <v-btn size="large" class="bg-primary" @click="updateSeo()"
                  >SAVE</v-btn
                >
              </v-card-actions>
            </v-card>
          </v-container>
        </v-dialog>
      </div>
      <!-- view Image dialog -->
      <div class="text-center">
        <v-dialog max-width="600px" v-model="viewImageDialog">
          <v-container class="pa-5">
            <v-row class="justify-center">
              <v-col>
                <v-img
                  :src="`${useRuntimeConfig().public.baseURL}/img/_/${
                    useRuntimeConfig().public.s3URL
                  }/${showImage}`"
                  width="100%"
                  height="100%"
                  cover
                >
                </v-img>
              </v-col>
            </v-row>
          </v-container>
        </v-dialog>
      </div>
    </v-container>

    <div class="text-center">
      <v-dialog v-model="tableLoading" :scrim="false" persistent width="auto">
        <v-card color="primary">
          <v-card-text>
            Please stand by
            <v-progress-linear
              indeterminate
              color="white"
              class="mb-0"
            ></v-progress-linear>
          </v-card-text>
        </v-card>
      </v-dialog>
    </div>
  </div>
</template>
<script>
import MazPhoneNumberInput from "maz-ui/components/MazPhoneNumberInput";
import { useToast } from "vue-toast-notification";
export default {
  data() {
    return {
      // editSaveButtons
      editData: false,
      editDataPassword: false,

      // passObj
      passObj: {
        password: "",
        confirmPassword: "",
      },
      savePassObjLoading: false,
      saveProfileObjLoading: false,
      tableLoading: false,
      show1: false,
      show2: false,
      // profileObj
      profileObj: {},
      editProfileObj: {},

      // editProfileObj.profilePic variables
      profileDialog: false,
      isSelectingProfile: false,
      selectedFileProfile: null,
      uploadedProfile: "1",
      aspectDp: {
        aspectRatio: 1 / 1,
      },
      // seoImg variables
      seoDialog: false,
      isSelectingseo: false,
      selectedFileseo: null,
      uploadedseo: "1",
      seoImage: null,
      aspectSeo: {
        aspectRatio: 1 / 1,
      },
      seoKeyword: [],
      seoKeywordItems: [],
      // carriedImg
      carriedImage: null,
      // viewimage
      viewImageDialog: false,
      showImage: null,
      // mazPhone number
      phoneNumber: null,
      defaultPhoneNumber: "",
    };
  },
  watch: {
    editedItem: {
      handler(val) {
        this.editedItem.seoTitle = this.editedItem.name;
      },
    },
  },
  async created() {
    this.init();
  },
  methods: {
    cancelProfileObj() {
      this.editProfileObj = JSON.parse(JSON.stringify(this.profileObj));
      this.editData = false;
    },
    async init() {
      this.tableLoading = true;
      try {
        let { data } = await $fetch("/admin/profile", {
          method: "GET",
          baseURL: useRuntimeConfig().public.baseURL,
          server: false,
          headers: {
            Authorization: `Bearer ${useCookie("accessToken").value}`,
          },
        });
        this.profileObj = structuredClone(data);
        this.editProfileObj = structuredClone(data);
        this.editData = false;
      } catch (err) {
        useToast().error("Failed to fetch data", { position: "top-right" });
      }
      this.tableLoading = false;
    },
    async saveProfileObj() {
      this.saveProfileObjLoading = true;
      let result = getEditedKeys(this.profileObj, this.editProfileObj);
      try {
        await $fetch("/admin/profile", {
          method: "PUT",
          baseURL: useRuntimeConfig().public.baseURL,
          server: false,
          headers: {
            Authorization: `Bearer ${useCookie("accessToken").value}`,
          },
          body: result.editedValues,
        });
        useToast().success("Profile updated successfully", {
          position: "top-right",
        });
        this.init();
      } catch (err) {
        useToast().error("Failed to fetch data", { position: "top-right" });
      }
      this.saveProfileObjLoading = false;
    },
    async savePassObj() {
      this.savePassObjLoading = true;
      if (this.passObj.password != this.passObj.confirmPassword) {
        useToast().error("Password doesn't match", { position: "top-right" });
      } else {
        try {
          await $fetch("/admin/profile", {
            method: "PUT",
            body: { password: this.passObj.password },
            baseURL: useRuntimeConfig().public.baseURL,
            server: false,
            headers: {
              Authorization: `Bearer ${useCookie("accessToken").value}`,
            },
          });
          useToast().success("Password changed successfully", {
            position: "top-right",
          });
        } catch (error) {
          useToast().error("Password change failed", { position: "top-right" });
          this.passObj = {
            password: "",
            confirmPassword: "",
          };
        }
      }
      this.passObj = {
        password: "",
        confirmPassword: "",
      };
      this.savePassObjLoading = false;
    },
    //  Profile picture upload methods involved
    profilePicImport() {
      this.isSelectingProfile = true;
      window.addEventListener(
        "focus",
        () => {
          this.isSelectingProfile = false;
        },
        { once: true }
      );
      this.$refs.uploaderProfile.click();
    },

    onFileChangedProfile(e) {
      this.selectedFileProfile = e.target.files[0];
      if (this.selectedFileProfile) {
        const reader = new FileReader();
        reader.readAsDataURL(this.selectedFileProfile);
        reader.addEventListener("load", () => {
          this.uploadedProfile = URL.createObjectURL(e.target.files[0]);
          this.profileDialog = true;
        });
      }
    },
    tempDp(item) {
      this.carriedImage = item;
    },
    cancelUpdateDp() {
      this.carriedImage = null;
      this.profileDialog = false;
    },
    async updateDp() {
      // this.editProfileObj.profilePic = this.carriedImage;
      // this.carriedImage = null;
      // this.profileDialog = false;
      // URL.createObjectURL()
      const regex = /^data:\w+\/(\w+);base64,/;
      // console.log("pic", regex);
      const result = regex.exec(this.carriedImage);
      //console.log("pic", this.carriedImage);
      const fileExtension = result[1];
      const prefix = this.carriedImage.slice(
        0,
        this.carriedImage.indexOf(";base64,")
      );
      const mimeType = prefix.split(":")[1];

      let atob = await $fetch(this.carriedImage);

      const blob = new Blob([await atob.arrayBuffer()], {
        type: mimeType,
      });
      var formdata = new FormData();
      formdata.append(
        "image",
        blob,
        `${this.editProfileObj.urlSlug}.${fileExtension}`
      );
      formdata.append("urlSlug", this.editProfileObj.urlSlug);
      formdata.append("path", "profile");
      try {
        let resp = await $fetch("/image", {
          method: "POST",
          body: formdata,
          baseURL: useRuntimeConfig().public.baseURL,
          server: false,
          headers: {
            Authorization: `Bearer ${useCookie("accessToken").value}`,
          },
        });
        if (resp.data.length) {
          this.editProfileObj.profilePic = resp.data;
          useToast().success("Profile photo updated", {
            position: "top-right",
          });
          this.carriedImage = null;
          this.profileDialog = false;
          await $fetch("/admin/profile", {
            method: "PUT",
            body: { profilePic: resp.data },
            baseURL: useRuntimeConfig().public.baseURL,
            server: false,
            headers: {
              Authorization: `Bearer ${useCookie("accessToken").value}`,
            },
          });
          // this.init();
        } else {
          useToast().error("Profile photo upload failed", {
            position: "top-right",
          });
        }
      } catch (error) {
        useToast().error("Profile photo upload failed", {
          position: "top-right",
        });
      }
    },
    //  Seo picture upload methods involved
    seoPicImport() {
      this.isSelectingseo = true;
      window.addEventListener(
        "focus",
        () => {
          this.isSelectingseo = false;
        },
        { once: true }
      );
      this.$refs.uploaderseo.click();
    },

    onFileChangedseo(e) {
      this.selectedFileseo = e.target.files[0];
      if (this.selectedFileseo) {
        const reader = new FileReader();
        reader.readAsDataURL(this.selectedFileseo);
        reader.addEventListener("load", () => {
          this.uploadedseo = URL.createObjectURL(e.target.files[0]);
          this.seoDialog = true;
        });
      }
    },
    tempSeo(item) {
      this.carriedImage = item;
    },
    cancelUpdateSeo() {
      this.carriedImage = null;
      this.seoDialog = false;
    },
    async updateSeo() {
      // this.editProfileObj.seoThumbnail = this.carriedImage;
      // this.carriedImage = null;
      // this.seoDialog = false;
      const regex = /^data:\w+\/(\w+);base64,/;
      const result = regex.exec(this.carriedImage);
      const fileExtension = result[1];
      const prefix = this.carriedImage.slice(
        0,
        this.carriedImage.indexOf(";base64,")
      );
      const mimeType = prefix.split(":")[1];

      let atob = await $fetch(this.carriedImage);

      const blob = new Blob([await atob.arrayBuffer()], {
        type: mimeType,
      });
      var formdata = new FormData();
      formdata.append(
        "image",
        blob,
        `${this.editProfileObj.urlSlug}.${fileExtension}`
      );
      formdata.append("urlSlug", this.editProfileObj.urlSlug);
      formdata.append("path", "profile");
      try {
        let resp = await $fetch("/image", {
          method: "POST",
          body: formdata,
          baseURL: useRuntimeConfig().public.baseURL,
          server: false,
          headers: {
            Authorization: `Bearer ${useCookie("accessToken").value}`,
          },
        });
        if (resp.data.length) {
          this.editProfileObj.seoThumbnail = resp.data;
          useToast().success("SEO photo updated", {
            position: "top-right",
          });
          this.carriedImage = null;
          this.seoDialog = false;
          await $fetch("/admin/profile", {
            method: "PUT",
            body: { seoThumbnail: resp.data },
            baseURL: useRuntimeConfig().public.baseURL,
            server: false,
            headers: {
              Authorization: `Bearer ${useCookie("accessToken").value}`,
            },
          });
          // await this.init();
        } else {
          useToast().error("SEO photo upload failed", {
            position: "top-right",
          });
        }
      } catch (error) {
        useToast().error("SEO photo upload failed", {
          position: "top-right",
        });
      }
    },

    // view image
    openViewPhoto(item) {
      this.viewImageDialog = true;
      this.showImage = item;
    },
  },
  components: {
    MazPhoneNumberInput,
  },
};
</script>
<style scoped>
.border-20 {
  border-radius: 30px;
  border-style: 1px solid #110f0d !important;
}
.inner-abs {
  position: absolute;
  top: 85%; /* position the top  edge of the element at the middle of the parent */
  left: 50%; /*  position the left edge of the element at the middle of the parent */
  transform: translate(-50%, -50%);
}
.basic-absolute {
  position: absolute;
  top: 45%;
  left: 50%;
  transform: translate(-50%, -50%);
}
:deep(.m-input-label) {
  transform: scale(0.8) translateY(-0.65em) !important;
}
:deep(.v-field--variant-outlined .v-field__outline__notch) {
  border-width: 0 !important;
}
.no-hover-opacity:hover {
  background-color: transparent !important;
  opacity: 1 !important;
  box-shadow: none !important;
}
/* * >>> .v-text-field {
    color: #863f05 !important;
  } */
/* :root {
    --maz-color-primary2: #4f4843 !important;
  } */
/* * >>> .m-input-wrapper {
    border: 1px solid #776f68;
  } */
</style>
