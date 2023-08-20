<template>
  <div>
    <v-container fluid class="px-0 mx-0">
      <v-card class="border20 pa-5">
        <v-row>
          <v-col lg="7" md="4">
            <v-row class="justify-center">
              <!-- <v-col lg="6" md="6">
                <v-select
                  density="compact"
                  color="primary"
                  variant="outlined"
                  hide-details="auto"
                  label="BHK"
                  :items="[1, 2, 3, 4, 5]"
                ></v-select>
              </v-col> -->

              <v-col lg="6" md="6">
                <v-text-field
                  density="compact"
                  v-model="editedItem.bhk"
                  color="primary"
                  variant="outlined"
                  hide-details="auto"
                  hint="Enter bhk name, e.g. 3 BHK"
                  label="BHK"
                  @input="updateInput('bhk', $event.target.value)"
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

              <!-- <v-col lg="12" md="12">
                <v-textarea
                  v-model="editedItem.additionalInfo"
                  density="compact"
                  color="primary"
                  variant="outlined"
                  hide-details="auto"
                  label="Aditional Info"
                ></v-textarea>
              </v-col> -->

              <v-col lg="12" md="12">
                <v-textarea
                  density="compact"
                  v-model="editedItem.description"
                  color="primary"
                  variant="outlined"
                  hide-details="auto"
                  label="Description"
                ></v-textarea>
              </v-col>
            </v-row>

            <v-row class="justify-center">
              <v-col lg="12" md="12">
                <v-autocomplete
                  v-model="editedItem.features"
                  :hide-no-data="false"
                  :items="featureItems"
                  item-title="name"
                  return-object
                  hide-selected
                  color="primary"
                  variant="outlined"
                  hide-details="auto"
                  label="Features & Amenities"
                  multiple
                  persistent-hint
                  density="compact"
                  chips
                  @input="updateInput('features', $event.target.value)"
                >
                  <template v-slot:no-data>
                    <v-list-item>
                      <v-list-item-title>
                        No results matching.
                      </v-list-item-title>
                    </v-list-item>
                  </template>
                </v-autocomplete>
              </v-col>
              <v-col lg="12" md="12">
                <v-combobox
                  v-model="editedItem.propertyTags"
                  :hide-no-data="false"
                  :items="propertyTagsItems"
                  item-title="name"
                  item-value="name"
                  hide-selected
                  color="primary"
                  variant="outlined"
                  hide-details="auto"
                  label="Property Tags"
                  multiple
                  persistent-hint
                  density="compact"
                  chips
                  @input="updateInput('propertyTags', $event.target.value)"
                >
                  <template v-slot:no-data>
                    <v-list-item>
                      <v-list-item-title>
                        No results matching. Press
                        <kbd>enter</kbd> to create a new one
                      </v-list-item-title>
                    </v-list-item>
                  </template>
                </v-combobox>
              </v-col>
              <!--<v-col lg="12" md="12">
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
              </v-col>-->
            </v-row>
            <v-row class="justify-center">
              <v-col lg="4" md="4">
                <v-text-field
                  density="compact"
                  v-model="editedItem.sqftMin"
                  color="primary"
                  type="number"
                  variant="outlined"
                  hide-details="auto"
                  placeholder="Area (min)"
                  label="Area (min)"
                  @input="updateInput('sqftMin', $event.target.value)"
                ></v-text-field>
              </v-col>
              <v-col lg="4" md="4">
                <v-text-field
                  density="compact"
                  v-model="editedItem.sqftMax"
                  color="primary"
                  variant="outlined"
                  type="number"
                  hide-details="auto"
                  label="Area (max)"
                  placeholder="Area (max)"
                  @input="updateInput('sqftMax', $event.target.value)"
                ></v-text-field>
              </v-col>
              <v-col lg="4" md="4">
                <v-select
                  v-model="editedItem.unit"
                  density="compact"
                  label="Unit"
                  color="primary"
                  variant="outlined"
                  hide-details="auto"
                  :items="['Sq Ft', 'Sq Mtr', 'Cents', 'Acer']"
                ></v-select>
              </v-col>
              <v-col class="mt-4" lg="12" md="4">
                <v-text-field
                  density="compact"
                  v-model="editedItem.price"
                  color="primary"
                  type="number"
                  variant="outlined"
                  hide-details="auto"
                  label="Price"
                  @input="updateInput('price', $event.target.value)"
                ></v-text-field>
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
                <v-text-field
                  density="compact"
                  v-model="editedItem.priceMax"
                  color="primary"
                  variant="outlined"
                  hide-details="auto"
                  label=" Price range (max)"
                ></v-text-field>
              </v-col> 
              <v-col lg="6" md="6" class="text-center pb-0 mb-0">
                <v-checkbox
                  v-model="editedItem.isSold"
                  class="pb-0"
                  label="Sold"
                  value="true"
                  color="secondary"
                  @input="updateInput('isSold', $event.target.value)"
                ></v-checkbox>
              </v-col>
              <v-col cols="12" lg="6" md="4">
                <span>
                  <label for="featuredStartDate"> Featured Start Date</label>
                  <input
                    v-model="editedItem.featuredStartDate"
                    width="100%"
                    type="date"
                    id="featuredStartDate"
                  />
                </span>
              </v-col>
              <v-col cols="12" lg="6" md="4">
                <span>
                  <label for="featuredEndDate">Featured End Date</label>
                  <input
                    v-model="editedItem.featuredEndDate"
                    width="100%"
                    type="date"
                    id="featuredEndDate"
                  />
                </span>
              </v-col>-->
            </v-row>
            <v-row class="justify-center">
              <v-col lg="12" md="12">
                <v-text-field
                  density="compact"
                  v-model="editedItem.seoTitle"
                  color="primary"
                  variant="outlined"
                  hide-details="auto"
                  label="Seo title"
                  @input="updateInput('seoTitle', $event.target.value)"
                ></v-text-field>
              </v-col>
              <v-col lg="12" md="12">
                <v-combobox
                  v-model="editedItem.seoKeyword"
                  :hide-no-data="false"
                  hide-selected
                  color="primary"
                  variant="outlined"
                  hide-details="auto"
                  label="Seo Keywords"
                  multiple
                  persistent-hint
                  density="compact"
                  chips
                  @input="updateInput('seoKeyword', $event.target.value)"
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

              <v-col class="pt-0" lg="12" md="12">
                <v-textarea
                  density="compact"
                  v-model="editedItem.seoDescription"
                  color="primary"
                  variant="outlined"
                  hide-details="auto"
                  label="Seo Descritption"
                  @input="updateInput('seoDescription', $event.target.value)"
                ></v-textarea>
              </v-col>
            </v-row>
          </v-col>
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
                <div class="text-center">
                  <v-dialog
                    transition="dialog-bottom-transition"
                    v-model="profileDialog"
                    max-width="1200px"
                    persistent
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
                              updateInput('images', propertyImages);
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
            <br />
            <v-divider></v-divider>
            <br />
            <v-row class="justify-center">
              <v-col lg="11" md="11">
                <v-card class="pa-1 text-center justify-center" height="250px">
                  <h3 class="text-center text-fourthColor mb-0">
                    Walk through Video
                  </h3>
                  <!--<video id="preview" width="320" height="240" controls></video>-->
                  <iframe
                    v-if="
                      editedItem.video &&
                      editedItem.video.length &&
                      editedItem.video.split('/').length > 0
                    "
                    width="320"
                    height="240"
                    :lazy-src="editedItem.video"
                    :src="editedItem.video"
                  >
                  </iframe>
                  <v-btn
                    class="mx-1 rounded-lg inner-abs"
                    color="primary"
                    icon="mdi-upload"
                    :loading="isVideoLoading"
                    @click="importVideo"
                  ></v-btn>
                </v-card>
              </v-col>
            </v-row>
            <br />
            <!-- <v-divider></v-divider>
            <br />
            <v-row class="justify-center">
              <v-col class="my-auto" lg="11" md="12" sm="4">
                <v-card
                  style="position: relative"
                  class="rounded-lg font-weight-medium my-auto px-3 py-3"
                  min-height="190px"
                  max-height="390px"
                >
                  <h3 class="text-center text-fourthColor">Location Map</h3>
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15528.140978322052!2d74.78527271136598!3d13.348083771086959!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bbca4ac6429a6f7%3A0x40fbffa0b63e4fab!2sDomino&#39;s%20Pizza!5e0!3m2!1sen!2sin!4v1679426474023!5m2!1sen!2sin"
                    width="100%"
                    height="100%"
                    style="border: 0"
                    allowfullscreen=""
                    loading="lazy"
                    referrerpolicy="no-referrer-when-downgrade"
                  ></iframe>
                </v-card>
              </v-col>
            </v-row> -->

            <v-divider></v-divider>
            <br />
            <v-row class="justify-center">
              <v-col lg="11" md="11">
                <h3 class="text-center text-fourthColor">SEO Thumbnail</h3>
                <v-hover>
                  <template v-slot:default="{ isHovering, props }">
                    <v-card
                      v-bind="props"
                      style="position: relative"
                      class="rounded-lg mx-auto font-weight-medium my-auto"
                      min-height="160px"
                      max-height="160px"
                      min-width="208px"
                      max-width="208px"
                      variant="outlined"
                    >
                      <p
                        v-if="!(seoImage && seoImage.length)"
                        class="basic-absolute text-center"
                      >
                        Please upload an Image to preview
                      </p>

                      <v-img
                        v-if="seoImage && seoImage.length"
                        :aspect-ratio="4 / 3"
                        :src="seoImage"
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
                            v-if="seoImage && seoImage.length"
                            class="mx-1 rounded-lg"
                            color="secondary"
                            icon="mdi-eye"
                            @click="openViewPhoto(seoImage)"
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
            </v-row>
          </v-col>
        </v-row>
        <br />
        <v-divider></v-divider>
        <br />
        <v-row class="justify-center">
          <h2 class="text-center">
            Floor Plan details &nbsp;
            <v-btn
              @click="totalFloorPlans.push(defaultFloorPlanData)"
              icon="mdi-plus"
            ></v-btn>
          </h2>
          <v-col class="px-0 mx-0" lg="12" md="12">
            <v-expansion-panels>
              <v-expansion-panel
                v-for="(count, k) in totalFloorPlans"
                :key="k"
                class="bg-fifthColor"
              >
                <v-expansion-panel-title class="d-flex">
                  Floor Plan Variant {{ count.name ? count.name : "" }} details
                  <v-spacer></v-spacer>
                  <v-btn
                    @click="totalFloorPlans.splice(k, 1)"
                    size="small"
                    icon="mdi-delete"
                  ></v-btn>
                </v-expansion-panel-title>
                <v-expansion-panel-text>
                  <FloorPlan
                    :floorData="count"
                    :type="type"
                    @updateData="updateFloorData($event, k)"
                  />
                </v-expansion-panel-text>
              </v-expansion-panel>
            </v-expansion-panels>
          </v-col>
        </v-row>
        <!-- view Image dialog -->
        <div class="text-center">
          <v-dialog max-width="600px" v-model="viewImageDialog">
            <v-container class="pa-5">
              <v-row class="justify-center">
                <v-col>
                  <v-img :src="showCase" width="100%" height="100%" cover>
                  </v-img>
                </v-col>
              </v-row>
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
                  <v-btn
                    size="large"
                    class="bg-primary"
                    @click="
                      updateSeo();
                      updateInput('seoImg', seoImage);
                    "
                    >SAVE</v-btn
                  >
                </v-card-actions>
              </v-card>
            </v-container>
          </v-dialog>
        </div>
        <div class="text-center">
          <v-dialog persistent v-model="dialogVideo" max-width="700px">
            <v-container>
              <v-card class="pa-5">
                <v-card-title> Add Video URL </v-card-title>
                <v-card-text>
                  <v-row>
                    <v-col>
                      <v-text-field
                        v-model="tempVideoUrl"
                        hint="https://www.youtube.com/embed/YpGjaJ1ettI"
                        density="compact"
                        label="Youtube Video Url"
                        color="primary"
                        variant="outlined"
                        hide-details="auto"
                      ></v-text-field>
                      <br />
                      <p class="text-center"><b>or</b></p>
                      <br />
                      <v-text-field
                        hint="https://www.youtube.com/embed/YpGjaJ1ettI"
                        density="compact"
                        label="vimeo Video Url"
                        color="primary"
                        variant="outlined"
                        hide-details="auto"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                </v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn
                    size="large"
                    variant="outlined"
                    color="primary"
                    @click="
                      tempVideoUrl = '';
                      dialogVideo = false;
                    "
                    >Cancel</v-btn
                  >
                  <v-btn
                    size="large"
                    class="bg-primary"
                    @click="
                      editedItem.video = tempVideoUrl;
                      dialogVideo = false;
                      updateInput('video', editedItem.video);
                    "
                    >SAVE</v-btn
                  >
                  <v-spacer></v-spacer>
                </v-card-actions>
              </v-card>
            </v-container>
          </v-dialog>
        </div>
      </v-card>
    </v-container>
  </div>
</template>
<script>
export default {
  props: ["category", "bhkData"],
  data() {
    return {
      soldToItems: [],
      type: {
        rent: 0,
        lease: 0,
        sale: 0,
      },
      dialog: false,
      edit: false,
      totalFloorPlans: [],
      // should come from prop
      editedItem: {
        bhk: "",
        urlSlug: "",
        features: [],
        propertyTags: [],
        sqftMin: "",
        sqftMax: "",
        price: "",
        bathRooms: "",
        balconys: "",
        soldTo: [],
        isSold: false,
        seoTitle: "",
        seoKeyword: "",
        seoDescription: "",
        seoThumbnail: "",
        type: {
          rent: 0,
          lease: 0,
          sale: 0,
        },
        video: "",
        images: [],
        floorData: [],
      },
      defaultFloorPlanData: {
        name: "",
        urlSlug: "",
        sqft: "",
        price: "",
        description: "",
        isSold: false,
        bathRooms: "",
        balconys: "",
        soldTo: [],
        type: {
          rent: 0,
          lease: 0,
          sale: 0,
        },
        images: [],
      },
      // used items
      categoryItems: [],
      featureItems: [],
      features: [],
      propertyTagsItems: [],
      propertyTags: [],
      assignedExecutive: [],
      assignedExecutiveItems: [],
      seoKeyword: [],
      seoKeywordItems: [],
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
      tempVideoUrl: "",
      dialogVideo: false,
      editedSeo: false,
    };
  },
  watch: {
    editedItem: {
      handler(val) {
        if (val.bhk && val.bhk.length) {
          this.editedItem.urlSlug = val.bhk
            .replace(/[^a-zA-Z0-9 ]/g, " ")
            .replace(/ +/g, " ")
            .trim()
            .split(" ")
            .join("-")
            .toLowerCase();
          this.editedItem.seoTitle = val.bhk
            .replace(/[^a-zA-Z0-9 ]/g, " ")
            .replace(/ +/g, " ")
            .trim();
        }
        // this.$emit("updatedBHKData", this.editedItem);
      },
      deep: true,
    },
  },
  methods: {
    // async getCategories() {
    //   try {
    //     let { data } = await $fetch("/category/all", {
    //       method: "POST",
    //       baseURL: useRuntimeConfig().public.baseURL,
    //       server: false,
    //       headers: {
    //         Authorization: `Bearer ${useCookie("accessToken").value}`,
    //       },
    //       body: {
    //         options: {
    //           sortBy: ["createdAt"],
    //           sortDesc: [true],
    //         },
    //       },
    //     });
    //     this.category = data.tableData && data.tableData ? data.tableData : [];
    //     this.featureItems = this.category.filter((e) => {
    //       return e.type == "Features & Amenities";
    //     });
    //     this.propertyTagsItems = this.category.filter((e) => {
    //       return e.type == "propertyTag";
    //     });
    //     this.type = this.category.filter((e) => {
    //       return e.type == "type";
    //     });
    //     this.type.forEach((e) => {
    //       this.editedItem.type[e.name] = this.editedItem.type[e.name]
    //         ? this.editedItem.type[e.name]
    //         : 0;
    //     });
    //   } catch (err) {
    //     console.log(err);

    //     // useToast().error("Failed to fetch data", { position: "top-right" });
    //   }
    // },
    deleteImg(i) {
      if (i < this.existingImgs.length) {
        this.existingImgs.splice(i, 1);
      } else {
        this.addedImgs.splice(i - this.existingImgs.length - 1, 1);
      }
      this.propertyImages.splice(i, 1);
      this.showImage = null;
    },
    async updateInput() {
      try {
        // console.log("propertyTags", this.editedItem["propertyTags"])
        if (
          this.editedItem["propertyTags"] &&
          this.editedItem["propertyTags"].length
        ) {
          for (let i = 0; i < this.editedItem["propertyTags"].length; i++) {
            // console.log("pp", i,  this.editedItem["propertyTags"][i])
            if (
              typeof this.editedItem["propertyTags"][i] == "object" &&
              this.editedItem["propertyTags"][i].name
            ) {
              this.editedItem["propertyTags"][i] =
                this.editedItem["propertyTags"][i].name;
            }
          }
        }
        let bhkData = {
          editedSeo: this.editedSeo,
          addedImgs: this.addedImgs,
          existingImgs: this.existingImgs,
          urlSlug: this.editedItem.urlSlug,
          description: this.editedItem.description,
          bathRooms: this.editedItem.bathRooms,
          balconys: this.editedItem.balconys,
          features: this.editedItem.features,
          bhk: this.editedItem.bhk,
          propertyTags: this.editedItem.propertyTags,
          soldTo: this.editedItem.soldTo,
          sqftMin: this.editedItem.sqftMin,
          sqftMax: this.editedItem.sqftMax,
          unit: this.editedItem.unit,
          price: this.editedItem.price,
          isSold: this.editedItem.isSold,
          seoTitle: this.editedItem.seoTitle,
          seoKeyword: this.editedItem.seoKeyword,
          seoDescription: this.editedItem.seoDescription,
          type: this.editedItem.type,
          video: this.editedItem.video,
          seoImg: this.seoImage,
          floorData: this.totalFloorPlans,
        };
        // console.log("edited", this.bhkData);
        this.$emit("updatedBHKData", bhkData);
      } catch (err) {
        console.log(err);
      }
    },
    updateFloorData(floorData, k) {
      // console.log("floorData", floorData);
      this.totalFloorPlans[k] = floorData;
      this.updateInput("floorData", this.totalFloorPlans);
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

        this.soldToItems =
          data.tableData && data.tableData.length ? data.tableData : [];
      } catch (err) {
        console.log(err);
        // useToast().error("Failed to fetch data", { position: "top-right" });
      }
    },
    closeneighbor() {
      this.neighbordata = {
        title: "",
        description: "",
      };
      this.neighborDialog = false;
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
    async onFileChangedProfile(e) {
      // console.log(e);
      this.selectedFileProfile = e.target.files[0];
      if (this.selectedFileProfile) {
        // this.propertyImages.push(
        //   await this.uploadImage(this.selectedFileProfile)
        // );
        // this.editedItem.images = this.propertyImages;
        const reader = new FileReader();
        reader.readAsDataURL(this.selectedFileProfile);
        reader.addEventListener("load", () => {
          this.uploadedProfile = URL.createObjectURL(e.target.files[0]);
          this.profileDialog = true;
        });
      }
    },
    // async uploadImage(image) {
    //   try {
    //     let formData = new FormData();
    //     formData.append("image", image, image.name);
    //     formData.append("path", "transactors");
    //     formData.append("urlSlug", this.editedItem.name);
    //     let { data } = await $fetch(`/image`, {
    //       method: "POST",
    //       baseURL: useRuntimeConfig().public.baseURL,
    //       server: false,
    //       headers: {
    //         Authorization: `Bearer ${useCookie("accessToken").value}`,
    //       },
    //       body: formData,
    //     });
    //     return data;
    //   } catch (err) {
    //     console.log(err);
    //     // useToast().error("Failed to upload photo.", { position: "top-right" });
    //   }
    // },
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
    // 1st image
    selectedPicture(item) {
      this.showImage = item;
    },
    // upload video
    importVideo() {
      this.isVideoLoading = true;
      this.tempVideoUrl = this.editedItem.video ? this.editedItem.video : "";
      this.dialogVideo = true;
      this.isVideoLoading = false;
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

    async onFileChangedseo(e) {
      this.selectedFileseo = e.target.files[0];
      if (this.selectedFileseo) {
        // this.editedItem["seoThumbnail"] = await this.uploadImage(
        //   this.selectedFileseo
        // );
        const reader = new FileReader();
        reader.readAsDataURL(this.selectedFileseo);
        reader.addEventListener("load", () => {
          this.uploadedseo = URL.createObjectURL(e.target.files[0]);
          this.seoDialog = true;
        });
      }
    },
    tempSeo(item) {
      // console.log(item);
      this.carriedImage = item;
    },
    cancelUpdateSeo() {
      this.carriedImage = null;
      this.seoDialog = false;
    },
    async updateSeo() {
      this.seoImage = this.carriedImage;
      this.carriedImage = null;
      this.seoDialog = false;
      this.editedSeo = true;
    },
  },
  created() {
    // this.getCategories();
    // try {
    //   this.getTransactors();
    //   // console.log(this.bhkData);
    //   this.editedItem = { ...this.bhkData };
    //   this.totalFloorPlans = this.editedItem.floorData
    //     ? this.editedItem.floorData
    //     : [];
    //   this.existingImgs = this.editedItem.images ? this.editedItem.images : [];
    //   // this.propertyImages = this.editedItem.images ? this.editedItem.images : [];
    //   if (this.existingImgs && this.existingImgs.length) {
    //     this.existingImgs.forEach((e) => {
    //      this.propertyImages.push(getImage(e));
    //       // console.log("lllll", e);
    //     });
    //   }
    //   this.seoImage = getImage(this.editedItem.seoThumbnail);
    //   //categories
    //   this.featureItems = this.category.filter((e) => {
    //     return e.type == "Features & Amenities";
    //   });
    //   this.propertyTagsItems = this.category.filter((e) => {
    //     return e.type == "propertyTag";
    //   });
    //   this.type = this.category.filter((e) => {
    //     return e.type == "type";
    //   });
    //   // console.log("type", this.type, this.category);
    //   if (this.type && Object.keys(this.type).length) {
    //     this.editedItem["type"] = {};
    //     this.type.forEach((e) => {
    //       // console.log("e", e, this.editedItem.type[e.name]);
    //       this.editedItem.type[e.name] = this.editedItem.type[e.name]
    //         ? this.editedItem.type[e.name]
    //         : 0;
    //     });
    //   }
    //   // console.log("k", this.type, this.editedItem.type);
    // } catch (err) {
    //   console.log("catch", err);
    // }
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
