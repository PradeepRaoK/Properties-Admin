<template>
  <div class="pb-5">
    <v-container class="py-1 my-0" fluid style="border-radius: 20px">
      <v-container>
        <v-row class="justify-center">
          <v-col class="my-auto text-" lg="12">
            <h2 class="text-primary">Brouchure</h2>
          </v-col>
        </v-row>
        <br />

        <v-card class="bg-white border-20 pa-5">
          <v-row>
            <v-col cols="12" class="pb-0">
              <h2>Select the brouchures to show in website</h2>
            </v-col>
            <v-col lg="10" md="12">
              <v-autocomplete
                v-model="selectedBrochure"
                :hide-no-data="false"
                :items="allBrochureList"
                item-title="name"
                return-object
                hide-selected
                color="primary"
                variant="outlined"
                hide-details="auto"
                label="Selected Brochure"
                multiple
                persistent-hint
                density="compact"
                chips
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
          </v-row>
        </v-card>
      </v-container>
    </v-container>
    <v-divider></v-divider>
    <v-container class="py-3">
      <v-card class="bg-white border-20 pa-5">
        <h2 class="text-center">Add or Edit brochures</h2>
        <br />
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
            <v-dialog persistent v-model="dialog" width="50%">
              <v-card>
                <v-card-title class="text-center bg-primary">
                  <span class="text-h5 text-center">{{ formTitle }}</span>
                </v-card-title>

                <v-card-text>
                  <v-form v-model="valid">
                    <v-container>
                      <v-row class="my-auto pa-2 justify-center">
                        <v-col cols="12">
                          <v-text-field
                            density="compact"
                            v-model="editedItem.title"
                            color="primary"
                            label="Title"
                            variant="outlined"
                            hide-details="auto"
                            required
                          ></v-text-field>
                        </v-col>
                      </v-row>
                      <v-row class="my-auto pa-2 justify-center">
                        <v-col cols="12">
                          <div>
                            <input type="file" @change="handleFileUpload" />
                            <div v-if="uploadedFile">
                              <p>Uploaded File: {{ uploadedFile.name }}</p>
                              <p>File Type: {{ uploadedFile.type }}</p>
                            </div>
                          </div>
                        </v-col>
                      </v-row>
                    </v-container></v-form
                  >
                </v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn
                    variant="outlined"
                    class="text-primary mx-1"
                    @click="close"
                  >
                    Cancel
                  </v-btn>
                  <v-btn
                    :loading="btnLoad"
                    :disabled="!editedItem.title || !editedItem.title.length"
                    class="bg-primary mx-1"
                    @click="save"
                  >
                    Save
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
    </v-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      valid: false,
      btnLoad: false,
      selectedBrochure: [],
      allBrochureList: [],
      //   table
      dialog: false,
      dialogDelete: false,
      headers: [
        { text: "Title", value: "title" },
        { text: "Hide", value: "isEnabled", align: "center" },
        { text: "Actions", value: "actions", align: "center" },
      ],
      items: [],
      sortBy: ["title", "file", "updatedOn"],
      sortType: "desc",
      editedIndex: -1,
      editedItem: {
        title: "",
        file: null,
      },
      defaultItem: {
        title: "",
        file: null,
      },
      itemsSelected: [],
      searchValue: "",
      searchField: [],

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
    };
  },
  created() {
    // this.initialize();
  },
  methods: {
    async hideFunction(item) {
      try {
        await $fetch(`/brochure/${item._id}`, {
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
        // this.initialize();
      } catch (err) {
        useToast().error("Failed to hide", { position: "top-right" });
      }
    },
    async handleFileUpload(event) {
      this.uploadedFile = event.target.files[0];
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
        let { data } = await $fetch("/brochure/getall", {
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

      // console.log("img", this.propertyImages);
    },

    deleteItem(item) {
      this.editedIndex = this.items.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialogDelete = true;
    },
    async deleteItemConfirm(payload, type) {
      try {
        await $fetch(`/brochure/${this.editedItem._id}`, {
          method: "PUT",
          baseURL: useRuntimeConfig().public.baseURL,
          server: false,
          headers: {
            Authorization: `Bearer ${useCookie("accessToken").value}`,
          },
          body: payload,
        });
        useToast().success(` ${type} brochure successful`, {
          position: "top-right",
        });
      } catch (err) {
        // console.log(err);
        useToast().error(`Failed to ${type} brochure`, {
          position: "top-right",
        });
      }
      this.closeDelete();
      // this.initialize();
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

    async save() {
      this.btnLoad = true;
      if (this.editedIndex > -1) {
        try {
          this.editedItem["images"] = this.existingImgs;

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
          await $fetch(`/brochure`, {
            method: "POST",
            baseURL: useRuntimeConfig().public.baseURL,
            server: false,
            headers: {
              Authorization: `Bearer ${useCookie("accessToken").value}`,
            },
            body: removeEmptyValues(this.editedItem),
          });
          this.btnLoad = false;
          useToast().success("brochure added successfully", {
            position: "top-right",
          });
        } catch (err) {
          console.log(err);
          this.btnLoad = false;
          useToast().error("Failed to add brochure.", {
            position: "top-right",
          });
        }
      }

      // this.initialize();
      this.close();
    },

    uploadFile() {
      if (this.uploadedFile) {
        const formData = new FormData();
        formData.append("file", this.uploadedFile);
      }
    },
  },
  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "Add Brochure" : "Edit Brochure";
    },
  },
  watch: {
    searchValue(val) {
      if (this.debounceTimer) {
        clearTimeout(this.debounceTimer);
      }
      if (val && val.length > 2) {
        this.debounceTimer = setTimeout(() => {
          // this.initialize();
        }, 1000);
      } else if (!val.length) {
        // this.initialize();
      }
    },
    serverOptions: {
      handler(val) {
        // this.initialize();
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
      // this.initialize();
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
  /* background: #f1c376 !important; */
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
