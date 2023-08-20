<template>
  <div>
    <div>
      <v-container fluid class="px-0">
        <v-card class="border20 pa-5">
          <v-row>
            <!-- left col -->
            <v-col lg="7" md="4">
              <!-- details -->
              <v-row class="justify-center">
                <v-col lg="6" md="12">
                  <v-text-field
                    v-model="editedItem.name"
                    density="compact"
                    color="primary"
                    variant="outlined"
                    hide-details="auto"
                    label="Name"
                    @input="updateInput('name', $event.target.value)"
                  ></v-text-field>
                </v-col>
                <v-col lg="6" md="6">
                  <v-text-field
                    disabled
                    density="compact"
                    v-model="editedItem.urlSlug"
                    color="primary"
                    variant="outlined"
                    hide-details="auto"
                    label="URL Slug"
                    @input="updateInput('urlSlug', $event.target.value)"
                  ></v-text-field>
                </v-col>
                <v-col class="mt-0 pt-0" lg="12" md="12">
                  <v-textarea
                    density="compact"
                    v-model="editedItem.description"
                    color="primary"
                    variant="outlined"
                    hide-details="auto"
                    label="Description"
                    @input="updateInput('description', $event.target.value)"
                  ></v-textarea>
                </v-col>
                <v-col lg="6" md="6">
                  <v-text-field
                    v-model="editedItem.sqft"
                    density="compact"
                    type="number"
                    color="primary"
                    variant="outlined"
                    hide-details="auto"
                    label="Area"
                    @input="updateInput('sqft', $event.target.value)"
                  ></v-text-field>
                </v-col>
                <v-col lg="6" md="6">
                  <v-select
                    v-model="editedItem.unit"
                    density="compact"
                    label="Unit"
                    color="primary"
                    variant="outlined"
                    hide-details="auto"
                    :items="['Sq Ft', 'Sq Mtr', 'Cents', 'Acer']"
                    @input="updateInput('unit', $event.target.value)"
                  ></v-select>
                </v-col>

                <v-col lg="6" md="6">
                  <v-text-field
                    density="compact"
                    v-model="editedItem.bathRooms"
                    color="primary"
                    type="number"
                    variant="outlined"
                    hide-details="auto"
                    label="Number of Bathrooms"
                    @input="updateInput('bathRooms', $event.target.value)"
                  ></v-text-field>
                </v-col>
                <v-col lg="6" md="6">
                  <v-text-field
                    density="compact"
                    v-model="editedItem.balconys"
                    color="primary"
                    type="number"
                    variant="outlined"
                    hide-details="auto"
                    label="Number of Balconies"
                    @input="updateInput('balconys', $event.target.value)"
                  ></v-text-field>
                </v-col>
                <!-- <v-col lg="6" md="6">
                <v-textarea
                  density="compact"
                  v-model="editedItem.description"
                  color="primary"
                  variant="outlined"
                  hide-details="auto"
                  label="Description"
                ></v-textarea>
              </v-col> -->

                <v-col lg="6" md="6">
                  <v-text-field
                    density="compact"
                    v-model="editedItem.price"
                    color="primary"
                    variant="outlined"
                    type="number"
                    hide-details="auto"
                    label="Price"
                    @input="updateInput('price', $event.target.value)"
                  ></v-text-field>
                </v-col>
                <!--<v-col lg="6" md="6">
                  <v-select
                    v-model="editedItem.soldTo"
                    :hide-no-data="false"
                    :items="soldToItems"
                    item-title="name"
                    return-object
                    hide-selected
                    color="primary"
                    variant="outlined"
                    hide-details="auto"
                    label="Bought By"
                    persistent-hint
                    multiple
                    density="compact"
                    chips
                    @input="updateInput('soldTo', $event.target.value)"
                  >
                  </v-select>
                </v-col>
                <v-col lg="6" md="6" class="text-center my-auto pb-0 mb-0">
                  <v-checkbox
                    v-model="editedItem.isFeatured"
                    class="pb-0"
                    label="Featured"
                    value="true"
                    color="secondary"
                    hide-details="auto"
                    @input="updateInput('isFeatured', $event.target.value)"
                  ></v-checkbox>
                </v-col>-->
                <!--<v-col lg="3" md="3" class="text-center my-auto pb-0 mb-0">
                  <v-checkbox
                    v-model="editedItem.isSold"
                    class="pb-0"
                    label="Sold"s
                    value="true"
                    color="secondary"
                    hide-details="auto"
                    @input="updateInput('isSold', $event.target.value)"
                  ></v-checkbox>
                </v-col>-->
              </v-row>

              <!-- sqft range -->
              <!-- <v-row class="justify-center">
              <v-col lg="6" md="6">
                <v-text-field
                  density="compact"
                  v-model="editedItem.sqftMin"
                  color="primary"
                  variant="outlined"
                  hide-details="auto"
                  label=" SqFt range (min)"
                ></v-text-field>
              </v-col>
              <v-col lg="6" md="6">
                <v-text-field
                  density="compact"
                  v-model="editedItem.sqftMax"
                  color="primary"
                  variant="outlined"
                  hide-details="auto"
                  label=" SqFt range (max)"
                ></v-text-field>
              </v-col>
            </v-row> -->
            </v-col>
            <!-- right col -->
            <v-col lg="5" md="4">
              <v-row class="justify-center">
                <h3 class="text-center text-fourthColor">Property Photos</h3>
                <v-col lg="11" md="11">
                  <v-card
                    class="rounded-lg mx-auto font-weight-medium my-auto"
                    min-height="220px"
                    max-height="220px"
                    min-width="300px"
                    max-width="300px"
                    variant="outlined"
                  >
                    <p
                      v-if="!(showImage && showImage.length)"
                      class="basic-absolute text-center"
                    >
                      Please upload an Image to preview
                    </p>
                    <v-img
                      v-if="showImage && showImage.length"
                      :src="showImage"
                      :aspect-ratio="4 / 3"
                    >
                      <v-btn
                        v-if="showImage && showImage.length"
                        class="mx-1 rounded-lg inner-abs"
                        color="secondary"
                        icon="mdi-eye"
                        @click="openViewPhoto(showImage)"
                      ></v-btn> </v-img
                  ></v-card>
                </v-col>
                <v-col lg="11">
                  <v-sheet>
                    <span v-for="(each, j) in propertyImages" :key="j">
                      <v-avatar
                        style="border: 0.3px solid #808080"
                        size="50"
                        rounded="0"
                        class="ma-2"
                      >
                        <v-img
                          :aspect-ratio="4 / 3"
                          @click="selectedPicture(each)"
                          :src="each"
                        >
                          <v-icon
                            @click="deleteImg(j)"
                            size="small"
                            style="position: absolute; top: 0; right: 0"
                            >mdi-delete</v-icon
                          >
                        </v-img>
                      </v-avatar>
                    </span>
                  </v-sheet>
                  <!-- profile pic dialog -->
                  <div class="text-center">
                    <v-dialog
                      transition="dialog-bottom-transition"
                      v-model="profileDialog"
                      max-width="1200px"
                    >
                      <v-container>
                        <v-card>
                          <v-card-title>Property Photo Settings</v-card-title>
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
                            <v-btn
                              size="large"
                              class="bg-primary"
                              @click="
                                updateDp();
                                updateInput('images', {
                                  existing: existingImgs,
                                  added: addedImgs,
                                });
                              "
                              >SAVE</v-btn
                            >
                          </v-card-actions>
                        </v-card>
                      </v-container>
                    </v-dialog>
                  </div>
                </v-col>

                <v-col lg="12" class="text-center">
                  <v-btn
                    variant="outlined"
                    class="mx-1 rounded-lg"
                    color="primary "
                    :loading="isSelectingProfile"
                    @click="profilePicImport"
                  >
                    + Add photo</v-btn
                  >

                  <input
                    accept="image/*"
                    ref="uploaderProfile"
                    class="d-none"
                    type="file"
                    @change="onFileChangedProfile"
                  />
                </v-col>
              </v-row>
            </v-col>
          </v-row>
        </v-card>
      </v-container>
    </div>
    <!-- view Image dialog -->
    <div class="text-center">
      <v-dialog max-width="600px" v-model="viewImageDialog">
        <v-container class="pa-5">
          <v-row class="justify-center">
            <v-col>
              <v-img :src="showCase" width="100%" height="100%" cover> </v-img>
            </v-col>
          </v-row>
        </v-container>
      </v-dialog>
    </div>
  </div>
</template>
<script>
export default {
  props: ["floorData", "type"],
  data() {
    return {
      dialog: false,
      edit: false,
      // should come from prop
      editedItem: {
        name: "",
        urlSlug: "",
        sqft: "",
        unit: "",
        price: "",
        description: "",
        isSold: false,
        bathRooms: "",
        balconys: "",
        soldTo: [],
        type: {},
        images: [],
      },
      // used items
      categoryItems: ["Gaming", "Programming", "Vue", "Vuetify"],
      category: [],
      featureItems: [],
      features: [],
      propertyTagsItems: [],
      propertyTags: [],
      assignedExecutive: [],
      assignedExecutiveItems: [],
      seoKeyword: [],
      seoKeywordItems: [],
      neighborHoodlist: [],
      neighborDialog: false,
      neighbordata: {
        name: "",
        distance: "",
      },
      // image
      propertyImages: [],
      existingImgs: [],
      addedImgs: [],
      // dp variables
      profileDialog: false,
      isSelectingProfile: false,
      selectedFileProfile: null,
      uploadedProfile: "1",
      showImage: null,
      aspectDp: {
        aspectRatio: 4 / 3,
      },
      // seoImg variables
      seoDialog: false,
      isSelectingseo: false,
      selectedFileseo: null,
      uploadedseo: "1",
      seoImage: null,
      aspectSeo: {
        aspectRatio: 4 / 3,
      },
      // carriedImg
      carriedImage: null,
      // viewimage
      viewImageDialog: false,
      //
      showCase: null,
      // video
      uploadedVideo: null,
      isVideoLoading: false,
      soldToItems: [],
    };
  },
  watch: {
    // value(val) {
    //   this.editedItem = val;
    // },
    editedItem: {
      handler(val) {
        if (val.name && val.name.length) {
          this.editedItem.urlSlug = val.name
            .replace(/[^a-zA-Z0-9 ]/g, " ")
            .replace(/ +/g, " ")
            .trim()
            .split(" ")
            .join("-")
            .toLowerCase();
        }
        // console.log("emit", this.editedItem);
        // this.$emit("input", this.editedItem);
        // this.emitVal();
      },
      deep: true,
    },
  },
  created() {
    // try {
    //   //  console.log("type", this.type);
    //   this.getTransactors();
    //   if (this.floorData && Object.keys(this.floorData).length) {
    //     this.editedItem = { ...this.floorData };
    //   }
    //   this.existingImgs = this.editedItem.images ? this.editedItem.images:[];
    //   // this.propertyImages = this.editedItem.images
    //   //   ? this.editedItem.images
    //   //   : [];
    //   if (this.existingImgs && this.existingImgs.length) {
    //     this.existingImgs.forEach((e, i) => {
    //      this.propertyImages.push(getImage(e));
    //     });
    //     // console.log(this.propertyImages);
    //   }
    //   if (this.type && this.type.length) {
    //     this.editedItem["type"] = {};
    //     this.type.forEach((e) => {
    //       this.editedItem.type[e.name] = this.editedItem.type[e.name]
    //         ? this.editedItem.type[e.name]
    //         : 0;
    //     });
    //   }
    // } catch (err) {
    //   console.log("catch".err);
    // }
  },
  methods: {
    deleteImg(i) {
      if (i < this.existingImgs.length) {
        this.existingImgs.splice(i, 1);
      } else {
        this.addedImgs.splice(i - this.existingImgs.length - 1, 1);
      }
      this.propertyImages.splice(i, 1);
      this.showImage = null;
    },
    updateInput() {
      let floor = {
        name: this.editedItem.name,
        urlSlug: this.editedItem.urlSlug,
        sqft: this.editedItem.sqft,
        unit: this.editedItem.unit,
        price: this.editedItem.price,
        description: this.editedItem.description,
        bathRooms: this.editedItem.bathRooms,
        balconys: this.editedItem.balconys,
        isSold: this.editedItem.isSold,
        soldTo: this.editedItem.soldTo,
        type: this.editedItem.type,
        addedImgs: this.addedImgs,
        existingImgs: this.existingImgs,
      };
      // console.log("floor", floor);
      this.$emit("updateData", floor);
    },
    async getTransactors() {
      try {
        let { data } = await $fetch("/transactor/all", {
          method: "POST",
          baseURL: useRuntimeConfig().public.baseURL,
          server: false,
          headers: {
            Authorization: `Bearer ${useCookie("accessToken").value}`,
          },
          body: {
            options: {
              sortBy: ["createdAt"],
              sortDesc: [true],
            },
          },
        });

        this.soldToItems = data.tableData;
      } catch (err) {
        // useToast().error("Failed to fetch data", { position: "top-right" });
      }
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
      // console.log(e);
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
      // console.log(item);
      this.carriedImage = item;
    },
    cancelUpdateDp() {
      this.carriedImage = null;
      this.profileDialog = false;
    },
    async updateDp() {
      this.propertyImages.push(this.carriedImage);
      this.addedImgs.push(this.carriedImage);
      this.showImage = this.carriedImage;
      this.carriedImage = null;
      this.profileDialog = false;
    },
    // view image
    openViewPhoto(item) {
      this.viewImageDialog = true;
      this.showCase = item;
    },
    //
    addNeighborhood() {
      this.neighborDialog = true;
    },
    closeneighbor() {
      this.neighbordata = {
        name: "",
        distance: "",
      };
      this.neighborDialog = false;
    },
    saveNeighbor() {
      if (this.neighbordata && Object.keys(this.neighbordata)) {
        this.neighborHoodlist.push(this.neighbordata);
      }
      this.closeneighbor();
    },
    // 1st image
    selectedPicture(item) {
      this.showImage = item;
    },
    // upload video
    importVideo() {
      this.isVideoLoading = true;
      var input = document.getElementById("videoId");
      input.click();
      this.isVideoLoading = false;
    },
    previewVideo() {
      var videoInput = document.getElementById("videoId");
      const preview = document.getElementById("preview");
      const file = videoInput.files[0];
      const reader = new FileReader();
      reader.onload = function () {
        preview.src = reader.result;
      };

      reader.readAsDataURL(file);
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
  },
};
</script>
<style scoped>
input[type="date"] {
  /* Removes default arrow */
  appearance: none;
  -webkit-appearance: none;
  /* Removes default border */
  border: none;
  /* Adds custom border */
  border-radius: 4px;
  border: 1px solid #ccc;
  /* Adds padding */
  padding: 8px;
  /* Sets font size */
  font-size: 16px;
  /* Sets background color */
  background-color: #fff;
  /* Sets cursor */
  cursor: pointer;
}

/* Styles the date picker drop-down arrow */
input[type="date"]::-webkit-calendar-picker-indicator {
  /* Changes color */
  color: #999;
  /* Changes size */
  font-size: 20px;
}

/* Styles the date picker on hover */
input[type="date"]:hover {
  /* Changes background color */
  background-color: #f5f5f5;
}
.border20 {
  border-radius: 20px;
}
:deep(.v-field--variant-outlined .v-field__outline__notch) {
  border-width: 0 !important;
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
</style>
