<template>
  <div>
    <v-container>
      <v-row>
        <ClientOnly>
          <QuillEditor theme="snow" toolbar="essential" />
        </ClientOnly>
      </v-row>
      <v-row>
        <v-col lg="6" md="6">
          <v-row justify="center">
            <v-col>
              <v-container fluid>
                <v-row>
                  <v-col cols="12">
                    <h3 class="text-primary">
                      Add a paragraph &nbsp;
                      <v-btn
                        @click="(paragraphDialog = true), (nhType = 'Add')"
                        class="bg-primary mx-1"
                        icon="mdi-plus"
                      ></v-btn>
                    </h3>
                  </v-col>
                  <v-col>
                    <v-expansion-panels>
                      <v-expansion-panel
                        v-for="(count, k) in paragraphList"
                        :key="k"
                        :title="`${k + 1}`"
                      >
                        <v-expansion-panel-text>
                          <span>
                            <div class="d-flex">
                              <v-avatar rounded="0" size="70">
                                <v-img :src="count.imagePath"></v-img></v-avatar
                              >&nbsp;
                              <div
                                v-html="count.description"
                                class="pt-2"
                              ></div>
                              <v-spacer></v-spacer>
                              <v-btn
                                variant="text"
                                @click="
                                  (nhIndex = k),
                                    (paragraphDialog = true),
                                    (tempParagraph = { ...count }),
                                    (nhType = 'Add')
                                "
                                icon="mdi-pencil"
                                size="small"
                                class="my-auto"
                                elevation="0"
                              ></v-btn>
                              <v-btn
                                class="my-auto"
                                variant="text"
                                @click="paragraphList.splice(k, 1)"
                                icon="mdi-delete"
                                size="small"
                                elevation="0"
                              ></v-btn>
                            </div>
                          </span>
                        </v-expansion-panel-text>
                      </v-expansion-panel>
                    </v-expansion-panels> </v-col></v-row
              ></v-container>
            </v-col>
          </v-row>
        </v-col>
        <!-- crop neighbor pic -->
        <div class="text-center">
          <v-dialog
            transition="dialog-bottom-transition"
            v-model="profileDialogPara"
            max-width="800px"
          >
            <v-container>
              <v-card>
                <v-card-title> Picture Crop Settings</v-card-title>
                <v-divider></v-divider>
                <v-card-text>
                  <v-container>
                    <v-row class="justify-center">
                      <v-col lg="6">
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
                    @click="cancelCropNeighbor()"
                    >Cancel</v-btn
                  >
                  <v-btn
                    size="large"
                    class="bg-primary"
                    @click="saveCropNeighbor()"
                    >SAVE</v-btn
                  >
                </v-card-actions>
              </v-card>
            </v-container>
          </v-dialog>
        </div>
      </v-row>
      <v-dialog persistent v-model="paragraphDialog" max-width="700px">
        <v-container fluid>
          <v-card class="pa-5">
            <v-card-title class="text-primary"> Add a paragraph </v-card-title>
            <v-card-text>
              <v-row>
                <v-col>
                  <v-radio-group
                    hide-details="auto"
                    color="primary"
                    v-model="contentType"
                  >
                    <v-radio
                      hide-details="auto"
                      label="Content left aligned"
                      value="left-aligned"
                    ></v-radio>
                    <v-radio
                      hide-details="auto"
                      label="Content center aligned"
                      value="center-aligned"
                    ></v-radio>
                    <v-radio
                      hide-details="auto"
                      label="Content right aligned"
                      value="right-aligned"
                    ></v-radio>
                  </v-radio-group>
                </v-col>
              </v-row>
              <v-row class="justify-center">
                <v-col lg="6" md="6">
                  <v-hover>
                    <template v-slot:default="{ isHovering, props }">
                      <v-card
                        v-bind="props"
                        style="position: relative"
                        variant="outlined"
                        class="rounded-lg font-weight-medium my-auto"
                        min-height="240px"
                        max-height="255px"
                      >
                        <p
                          class="basic-absolute text-center"
                          v-if="
                            !(tempParagraph.image && tempParagraph.image.length)
                          "
                        >
                          Please upload an Image to preview
                        </p>
                        <v-img
                          v-if="
                            tempParagraph.imagePath &&
                            tempParagraph.imagePath.length
                          "
                          max-height="290px"
                          :aspect-ratio="4 / 3"
                          :src="tempParagraph.imagePath"
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
                              @click="uploadNeighborImage()"
                            ></v-btn>
                            <input
                              accept="image/*"
                              ref="uploaderProfileNH"
                              class="d-none"
                              type="file"
                              @change="onFileChangedNeighbourPic"
                            />
                          </v-avatar>
                        </v-expand-transition>
                      </v-card>
                    </template>
                  </v-hover>
                </v-col>
              </v-row>
              <v-row class="justify-center">
                <v-col cols="12"> <RichTextEditor /> </v-col
              ></v-row>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                size="large"
                variant="outlined"
                color="primary"
                @click="cancelParagraphChange()"
                >Cancel</v-btn
              >
              <v-btn size="large" class="bg-primary" @click="addParagraph()"
                >SAVE</v-btn
              >
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-container>
      </v-dialog>
    </v-container>
  </div>
</template>
<script>
export default {
  data() {
    return {
      paragraphList: [],
      profileDialogPara: false,
      paragraphDialog: false,
      nhType: "Add",
      nhIndex: -1,
      tempParagraph: {
        description: "",
        image: "",
        editImage: false,
      },
      carriedImage: null,
      aspectDp: {
        aspectRatio: 4 / 3,
      },
      contentType: "left-aligned",
    };
  },
  methods: {
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
      this.tempPropImgs.push(this.carriedImage);
      this.showImage = this.carriedImage;
      this.carriedImage = null;
      this.profileDialog = false;
    },
    //neighbour

    saveCropNeighbor() {
      this.tempParagraph["imagePath"] = this.carriedImage;

      console.log("save", this.tempParagraph);
      this.profileDialogPara = false;
      this.carriedImage = null;
    },
    cancelCropNeighbor() {
      this.carriedImage = null;
      this.profileDialogPara = false;
    },
    addParagraph() {
      // console.log("save");
      this.tempParagraph["editImage"] = true;
      // console.log("save", this.tempParagraph["editImage"]);
      if (this.nhType == "Add") {
        // console.log("Add");
        this.paragraphList.push(this.tempParagraph);
      } else {
        // console.log("edit");
        this.paragraphList[this.nhIndex] = this.tempParagraph;
      }
      // console.log("save", this.paragraphList);
      this.carriedImage = null;
      this.tempParagraph = {
        description: "",
        image: null,
      };
      this.paragraphDialog = false;
    },
    cancelParagraphChange() {
      this.carriedImage = null;
      this.tempParagraph = { description: "", image: null };
      this.paragraphDialog = false;
    },
    uploadNeighborImage() {
      this.isSelectingProfile = true;
      window.addEventListener(
        "focus",
        () => {
          this.isSelectingProfile = false;
        },
        { once: true }
      );
      this.$refs.uploaderProfileNH.click();
    },
    onFileChangedNeighbourPic(e) {
      this.selectedFileProfile = e.target.files[0];
      if (this.selectedFileProfile) {
        const reader = new FileReader();
        reader.readAsDataURL(this.selectedFileProfile);
        reader.addEventListener("load", () => {
          this.uploadedProfile = URL.createObjectURL(e.target.files[0]);
          this.profileDialogPara = true;
        });
      }
    },
  },
};
</script>
<style scoped>
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
:deep(.v-selection-control--density-default) {
  --v-selection-control-size: 30px;
}
</style>
