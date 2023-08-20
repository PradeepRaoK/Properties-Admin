<template>
  <div class="pb-5">
    <v-container class="py-1 my-0" fluid style="border-radius: 20px">
      <v-container>
        <v-row class="justify-center">
          <v-col class="my-auto" lg="12">
            <h2 class="text-primary">Blogs</h2>
          </v-col>
        </v-row>
      </v-container></v-container
    >
    <v-container class="py-3">
      <v-card class="bg-white border-20 pa-5">
        <v-row>
          <v-spacer></v-spacer>
          <v-col class="my-auto" lg="3">
            <v-responsive class="my-auto">
              <v-select
                class="rounded-pill bg-background overflow-hidden my-auto"
                color="primary"
                density="compact"
                label="Filter"
                v-model="filter"
                hide-details="auto"
                :items="['All', 'Active', 'Trash']"
              >
              </v-select>
            </v-responsive>
          </v-col>
          <v-col class="my-auto" lg="6">
            <v-responsive class="my-auto">
              <v-text-field
                v-model="searchValue"
                type="text"
                placeholder="Search..."
                color="primary"
                class="rounded-pill bg-background overflow-hidden my-auto"
                density="compact"
                hide-details
                autofocus
              >
                <v-icon icon="mdi-magnify"></v-icon
              ></v-text-field>
            </v-responsive>
            <v-spacer></v-spacer>
          </v-col>
          <!-- for add edit delete dialog uncomment this-->
          <v-col lg="2" class="my-auto">
            <v-btn
              @click="
                (dialog = true),
                  (editedIndex = -1),
                  (editedItem.scheduledDate = new Date()
                    .toISOString()
                    .split('T')[0])
              "
              color="primary"
              dark
            >
              {{ formTitle }}
            </v-btn>
            <v-dialog persistent v-model="dialog">
              <v-card>
                <v-card-title class="text-center bg-primary">
                  <span class="text-h5 text-center">{{ formTitle }}</span>
                </v-card-title>

                <v-card-text>
                  <v-row class="justify-center">
                    <v-col cols="8">
                      <v-text-field
                        density="compact"
                        label="Blog Title"
                        color="primary"
                        variant="outlined"
                        hide-details="auto"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                  <br />
                  <v-divider></v-divider>
                  <br />
                  <EachBlogContent />
                </v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <label for="endingDate">Scheduled Date</label>
                  &nbsp; &nbsp;
                  <div>
                    <input
                      v-model="editedItem.scheduledDate"
                      class="bg-primary"
                      style="width: 100%"
                      type="date"
                      id="endingDate"
                    />
                  </div>

                  &nbsp; &nbsp; &nbsp; &nbsp;
                  <v-btn variant="outlined" class="primary mx-1" @click="close">
                    Cancel
                  </v-btn>
                  <v-btn
                    :loading="btnLoad"
                    :disabled="!editedItem.title || !editedItem.title.length"
                    class="bg-primary mx-1"
                    @click="save"
                    >Save
                  </v-btn>
                  <v-spacer></v-spacer>
                </v-card-actions>
              </v-card>
            </v-dialog>
            <v-dialog v-model="dialogDelete" max-width="500px">
              <v-card>
                <v-card-title class="text-h5"
                  >Are you sure you want to delete this item?</v-card-title
                >
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="blue darken-1" text @click="closeDelete"
                    >Cancel</v-btn
                  >
                  <v-btn
                    color="blue darken-1"
                    text
                    @click="deleteItemConfirm({ isDeleted: true }, 'Delete')"
                    >OK</v-btn
                  >
                  <v-spacer></v-spacer>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-col>
          <v-spacer></v-spacer>
        </v-row>
        <v-row>
          <v-col>
            <EasyDataTable
              table-class-name="customize-table"
              theme-color="#4b49ac"
              buttons-pagination
              alternating
              :headers="headers"
              :items="items"
              v-model="serverOptions"
              :server-items-length="serverItemsLength"
            >
              <template #item-createdAt="item">
                {{ new Date(item.createdAt).toLocaleDateString() }}
                {{ new Date(item.createdAt).toLocaleTimeString() }}
              </template>
              <template #item-updatedAt="item">
                {{ new Date(item.updatedAt).toLocaleDateString() }}
                {{ new Date(item.updatedAt).toLocaleTimeString() }}
              </template>

              <template #item-isEnabled="item">
                <v-switch
                  v-model="item.isEnabled"
                  color="orange-darken-3"
                  hide-details
                  @click="hideFunction(item)"
                ></v-switch>
              </template>
              <template
                v-if="filter == 'Trash'"
                #item-actions="item"
                class="mx-auto"
              >
                <v-icon
                  v-if="filter == 'Trash'"
                  class="text-center mr-4"
                  icon="mdi-delete-restore"
                  @click="
                    editedItem = item;
                    deleteItemConfirm({ isDeleted: false }, 'Restore');
                  "
                >
                </v-icon>
              </template>
              <template v-else #item-actions="item" class="mx-auto">
                <v-icon
                  class="text-center mr-4"
                  icon="mdi-pencil"
                  @click="editItem(item)"
                >
                </v-icon>
                <v-icon
                  class="text-center"
                  icon="mdi-delete"
                  @click="deleteItem(item)"
                >
                </v-icon>
              </template>

              <template #empty-message>
                <v-btn class="text-center" @click="initialize()"> RESET </v-btn>
                <h3>No Data available</h3>
              </template>
            </EasyDataTable>
          </v-col>
        </v-row>
      </v-card>
      <!-- profile pic dialog -->
      <div class="text-center">
        <v-dialog
          transition="dialog-bottom-transition"
          v-model="profileDialog"
          max-width="1200px"
          scrollable
        >
          <v-card>
            <v-card-title>Blog Photo Settings</v-card-title>
            <v-divider></v-divider>
            <v-card-text style="height: 500px">
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
        </v-dialog>
      </div>
      <!-- Seo pic dialog -->
      <div class="text-center">
        <v-dialog
          transition="dialog-bottom-transition"
          v-model="seoDialog"
          max-width="1200px"
          scrollable
        >
          <v-card>
            <v-card-title>SEO Picture Settings </v-card-title>
            <v-divider></v-divider>
            <v-card-text style="height: 500px">
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
        </v-dialog>
      </div>
      <!-- view Image dialog -->
      <div class="text-center">
        <v-dialog max-width="600px" v-model="viewImageDialog">
          <v-container class="pa-5">
            <v-row class="justify-center">
              <v-col>
                <v-img :src="showImage" width="100%" height="100%" cover>
                </v-img>
              </v-col>
            </v-row>
          </v-container>
        </v-dialog>
      </div>
    </v-container>
  </div>
</template>

<script>
import { useToast } from "vue-toast-notification";
export default {
  data() {
    return {
      valid: false,
      btnLoad: false,
      propertyImages: [],
      tempPropImgs: [],
      // dp variables
      profileDialog: false,
      isSelectingProfile: false,
      selectedFileProfile: null,
      uploadedProfile: "1",
      dp: null,
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
      showImage: null,
      //   table
      dialog: false,
      dialogDelete: false,
      headers: [
        { text: "Title", value: "title" },
        { text: "Created On", value: "createdAt" },
        { text: "Updated On", value: "updatedAt" },
        { text: "Hide", value: "isEnabled", align: "center" },
        { text: "Actions", value: "actions", align: "center" },
      ],
      items: [],
      sortBy: ["title", "createdOn", "updatedOn"],
      sortType: "desc",
      editedIndex: -1,
      editedItem: {
        title: "",
        urlSlug: "",
        description: "",
        images: [],
        seoKeyword: [],
        seoDescription: "",
        seoThumbnail: "",
        scheduledDate: "",
      },
      seoKeyword: [],
      seoKeywordItems: [],
      defaultItem: {
        title: "",
        urlSlug: "",
        description: "",
        images: [],
        seoKeyword: [],
        seoDescription: "",
        seoThumbnail: "",
        scheduledDate: "",
      },
      itemsSelected: [],
      searchValue: "",
      searchField: [],
      // mazPhone number
      phoneNumber: null,
      defaultPhoneNumber: "",
      filter: "All",
      editPic: false,
      editSeo: false,
      filterObj: {
        isDeleted: [false],
      },
      existingImgs: [],
      addedImgs: [],
      serverItemsLength: 0,
      serverOptions: {
        page: 1,
        rowsPerPage: 25,
      },
      debounceTimer: null,
      tableLoading: false,
      paragraphs: [],
    };
  },
  created() {
    // this.initialize();
  },
  methods: {
    async addParagraph() {
      let o = { type: "", text: "sdbckjsdc", src: "" };
      this.paragraphs.push(o);
    },
    async hideFunction(item) {
      try {
        await $fetch(`/blog/${item._id}`, {
          method: "PUT",
          baseURL: useRuntimeConfig().public.baseURL,
          server: false,
          headers: {
            Authorization: `Bearer ${useCookie("accessToken").value}`,
          },
          body: {
            isEnabled: item.isEnabled,
          },
        });
        this.initialize();
      } catch (err) {
        useToast().error("Failed to hide", { position: "top-right" });
      }
    },
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
        // this.tempPropImgs.push(this.selectedFileProfile);
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
      // console.log(this.carriedImage)
      this.propertyImages.push(this.carriedImage);
      this.addedImgs.push(this.carriedImage);
      this.tempPropImgs.push(this.carriedImage);
      // this.showImage = this.carriedImage;
      this.carriedImage = null;
      this.profileDialog = false;
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
      // console.log(item);
      this.carriedImage = item;
    },
    cancelUpdateSeo() {
      this.carriedImage = null;
      this.seoDialog = false;
    },
    async updateSeo() {
      // console.log(this.carriedImage)
      this.seoImage = this.carriedImage;
      this.carriedImage = null;
      this.seoDialog = false;
      this.editSeo = true;
    },
    selectedPicture(item) {
      this.showImage = item;
    },
    // view image
    openViewPhoto(item) {
      this.viewImageDialog = true;
      this.showImage = item;
    },
    async initialize() {
      this.tableLoading = true;
      try {
        let payload = {};
        if (this.searchValue && this.searchValue.length) {
          payload = {
            search: {
              term: this.searchValue,
              fields: ["title", "description"],
            },
            options: {
              page: this.serverOptions.page,
              itemsPerPage: this.serverOptions.rowsPerPage,
            },
            filter: this.filterObj,
          };
        } else {
          payload = {
            options: {
              page: this.serverOptions.page,
              itemsPerPage: this.serverOptions.rowsPerPage,
              sortBy: ["createdAt"],
              sortDesc: [true],
            },
            filter: this.filterObj,
          };
        }
        let { data } = await $fetch("/blog/getall", {
          method: "POST",
          baseURL: useRuntimeConfig().public.baseURL,
          server: false,
          headers: {
            Authorization: `Bearer ${useCookie("accessToken").value}`,
          },
          body: payload,
        });
        this.items =
          data && data.tableData && data.tableData.length ? data.tableData : [];
        this.items.forEach((e) => {
          e.isEnabled = !e.isEnabled;
        });
        this.serverItemsLength =
          data && data.totalCount ? parseInt(data.totalCount) : 0;
        // console.log("bol", this.items);
      } catch (err) {
        useToast().error("Failed to fetch data", { position: "top-right" });
      }
      this.tableLoading = false;
    },
    editItem(item) {
      this.editedIndex = this.items.findIndex((e) => {
        return e._id == item._id;
      });
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
      this.editedItem.scheduledDate = new Date().toISOString().split("T")[0];
      if (this.editedItem.seoThumbnail) {
        this.seoImage = getImage(this.editedItem.seoThumbnail);
      }
      this.propertyImages = [];
      this.existingImgs = this.editedItem.images;
      if (this.editedItem.images && this.editedItem.images.length) {
        this.editedItem.images.forEach((e, i) => {
          this.propertyImages.push(getImage(e));
        });
      }
      // console.log("img", this.propertyImages);
    },

    deleteItem(item) {
      this.editedIndex = this.items.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialogDelete = true;
    },
    async deleteItemConfirm(payload, type) {
      try {
        await $fetch(`/blog/${this.editedItem._id}`, {
          method: "PUT",
          baseURL: useRuntimeConfig().public.baseURL,
          server: false,
          headers: {
            Authorization: `Bearer ${useCookie("accessToken").value}`,
          },
          body: payload,
        });
        useToast().success(` ${type} Blog successful`, {
          position: "top-right",
        });
      } catch (err) {
        // console.log(err);
        useToast().error(`Failed to ${type} Blog`, {
          position: "top-right",
        });
      }
      this.closeDelete();
      this.initialize();
    },

    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
      this.tempPropImgs = [];
      this.selectedFileseo = "";
      this.seoImage = "";
      this.propertyImages = [];
      this.addedImgs = [];
      this.existingImgs = [];
      this.showImage = null;
    },

    closeDelete() {
      this.dialogDelete = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },
    deleteImg(i) {
      if (i < this.existingImgs.length) {
        this.existingImgs.splice(i, 1);
      } else {
        this.addedImgs.splice(i - this.existingImgs.length - 1, 1);
      }
      this.propertyImages.splice(i, 1);
      this.showImage = null;
    },
    async save() {
      this.btnLoad = true;
      if (this.editedIndex > -1) {
        try {
          this.editedItem["images"] = this.existingImgs;
          if (this.addedImgs && this.addedImgs.length) {
            // console.log("img", this.addedImgs);
            let url = "";
            await Promise.all(
              this.addedImgs.map(async (e, i) => {
                url = await this.uploadImage(e);
                this.editedItem["images"].push(url);
                url = "";
              })
            );
          }
          if (this.editSeo) {
            this.editedItem["seoThumbnail"] = await this.uploadImage(
              this.seoImage
            );
          }
          delete this.editedItem.isEnabled;
          delete this.editedItem.isDeleted;
          await $fetch(`/blog/${this.editedItem._id}`, {
            method: "PUT",
            baseURL: useRuntimeConfig().public.baseURL,
            server: false,
            headers: {
              Authorization: `Bearer ${useCookie("accessToken").value}`,
            },
            body: this.editedItem,
          });
          useToast().success("Blog updated successfully", {
            position: "top-right",
          });

          this.btnLoad = false;
        } catch (err) {
          console.log(err);
          this.btnLoad = false;
          useToast().error("Failed to update Blog.", {
            position: "top-right",
          });
        }
      } else {
        try {
          if (this.seoImage) {
            this.editedItem["seoThumbnail"] = await this.uploadImage(
              this.seoImage
            );
          }
          this.editedItem["images"] = [];

          if (this.propertyImages && this.propertyImages.length) {
            let url = "";
            await Promise.all(
              this.propertyImages.map(async (e, i) => {
                url = await this.uploadImage(e);
                this.editedItem["images"].push(url);
                url = "";
              })
            );
          }

          await $fetch(`/blog`, {
            method: "POST",
            baseURL: useRuntimeConfig().public.baseURL,
            server: false,
            headers: {
              Authorization: `Bearer ${useCookie("accessToken").value}`,
            },
            body: removeEmptyValues(this.editedItem),
          });
          this.btnLoad = false;
          useToast().success("Blog added successfully", {
            position: "top-right",
          });
        } catch (err) {
          console.log(err);
          this.btnLoad = false;
          useToast().error("Failed to add Blog.", {
            position: "top-right",
          });
        }
      }
      this.tempPropImgs = [];
      this.selectedFileseo = "";
      this.seoImage = "";
      this.propertyImages = [];
      this.addedImgs = [];
      this.existingImgs = [];
      this.initialize();
      this.close();
    },
    async uploadImage(image) {
      console.log(image);
      try {
        const regex = /^data:\w+\/(\w+);base64,/;
        // console.log("pic", regex);
        const result = regex.exec(image);
        // console.log("pic", image);
        const fileExtension = result[1];
        const prefix = image.slice(0, image.indexOf(";base64,"));
        const mimeType = prefix.split(":")[1];

        let atob = await $fetch(image);

        const blob = new Blob([await atob.arrayBuffer()], {
          type: mimeType,
        });
        var formdata = new FormData();
        formdata.append(
          "image",
          blob,
          `${this.editedItem.title}.${fileExtension}`
        );
        formdata.append("urlSlug", this.editedItem.urlSlug);
        formdata.append("path", "blogs");

        console.log(formdata);
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
          return resp.data;
        } else {
          return "";
        }
      } catch (err) {
        console.log(err);
        useToast().error("Failed to upload photo.", { position: "top-right" });
      }
    },
  },
  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "Add Blog" : "Edit Blog";
    },
  },
  watch: {
    searchValue(val) {
      if (this.debounceTimer) {
        clearTimeout(this.debounceTimer);
      }
      if (val && val.length > 2) {
        this.debounceTimer = setTimeout(() => {
          this.initialize();
        }, 1000);
      } else if (!val.length) {
        this.initialize();
      }
    },
    serverOptions: {
      handler(val) {
        this.initialize();
      },
      deep: true,
    },
    editedItem: {
      handler(val) {
        if (this.editedIndex == -1 && val.title && val.title.length) {
          this.editedItem.urlSlug = val.title
            .replace(/[^a-zA-Z0-9 ]/g, " ")
            .replace(/ +/g, " ")
            .trim()
            .split(" ")
            .join("-")
            .toLowerCase();
        }

        this.editedItem.seoTitle = val.title
          .replace(/[^a-zA-Z0-9 ]/g, " ")
          .replace(/ +/g, " ")
          .trim();
      },
      deep: true,
    },
    filter(val) {
      if (val == "Trash") {
        this.filterObj = {
          isDeleted: [true],
        };
      } else if (val == "Active") {
        this.filterObj = {
          isEnabled: [true],
          isDeleted: [false],
        };
      } else {
        this.filterObj = {
          isDeleted: [false],
        };
      }
      this.initialize();
    },
    dialog(val) {
      val || this.close();
    },
    dialogDelete(val) {
      val || this.closeDelete();
    },
  },
};
</script>
<style scoped>
.customize-table {
  --easy-table-header-font-size: 14px;
  --easy-table-header-font-color: #606c5d;
  --easy-table-header-background-color: #f1c376;

  --easy-table-body-even-row-font-color: #606c5d;
  --easy-table-body-even-row-background-color: #f7e6c4;
}
thead > tr > th {
  /* background: #f68121 !important; */
}
.border-20 {
  border-radius: 30px;
  border-style: 1px solid #110f0d !important;
}
:deep(.m-input-label) {
  transform: scale(0.8) translateY(-0.65em) !important;
}
:deep(.v-field--variant-outlined .v-field__outline__notch) {
  border-width: 0 !important;
}

/* date picker */

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
