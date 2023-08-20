<template>
  <div class="pb-5">
    <v-container class="py-1 my-0" fluid style="border-radius: 20px">
      <v-container>
        <v-row class="justify-center">
          <v-col class="my-auto text-" lg="12">
            <h2 class="text-primary">Enquiries</h2>
          </v-col>
        </v-row>
      </v-container></v-container
    >
    <v-container class="py-3">
      <v-card class="bg-white border-20 pa-5">
        <v-row>
          <v-spacer></v-spacer>
          <!-- <v-col class="my-auto" lg="3">
            <v-responsive class="my-auto">
              <v-select
                class="rounded-pill bg-background overflow-hidden my-auto"
                color="primary"
                density="compact"
                label="select fields"
                v-model="searchField"
                hide-details="auto"
                multiple
                :items="['name', 'email', 'phone', 'date']"
              >
              </v-select>
            </v-responsive>
          </v-col> -->
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
          <v-col lg="3" class="my-auto">
            <v-btn @click="downloadExcel()" color="primary" dark>
              Download &nbsp; <v-icon>mdi-download</v-icon>
            </v-btn>
          </v-col>
          <v-spacer></v-spacer>
        </v-row>
        <v-row>
          <v-col>
            <EasyDataTable
              table-class-name="customize-table"
              theme-color="#4b49ac"
              buttons-pagination
              :loading="tableLoading"
              alternating
              :headers="headers"
              :items="items"
              v-model="serverOptions"
              :server-items-length="serverItemsLength"
            >
              <template #expand="item">
                <v-container style="padding: 15px">
                  <v-row
                    ><v-col lg="4">
                      <h3>
                        &nbsp; Message :
                        {{ item.message }}
                      </h3></v-col
                    >
                    <v-col lg="3">
                      <h3>
                        &nbsp; Property :
                        {{
                          item.propertyData && item.propertyData.name
                            ? item.propertyData.name
                            : ""
                        }}
                      </h3>
                    </v-col>
                    <v-col lg="2">
                      <h3>
                        &nbsp;
                        {{
                          item.propertyData &&
                          item.propertyData.bhkData &&
                          item.propertyData.bhkData.bhk
                            ? "BHK :" + item.propertyData.bhkData.bhk
                            : ""
                        }}
                      </h3>
                    </v-col>
                    <v-col lg="2">
                      <h3>
                        &nbsp;
                        {{
                          item.propertyData &&
                          item.propertyData.bhkData &&
                          item.propertyData.bhkData.floorData &&
                          item.propertyData.bhkData.floorData.name
                            ? "Floor :" +
                              item.propertyData.bhkData.floorData.name
                            : ""
                        }}
                      </h3>
                    </v-col>
                    <v-col lg="1">
                      <NuxtLink
                        :to="`${config.public.FRONTEND_URL}/properties/${
                          item.propertyData.urlSlug
                        }${
                          item.propertyData &&
                          item.propertyData.bhkData &&
                          item.propertyData.bhkData.bhk
                            ? '/' + item.propertyData.bhkData.urlSlug
                            : ''
                        }${
                          item.propertyData &&
                          item.propertyData.bhkData &&
                          item.propertyData.bhkData.floorData &&
                          item.propertyData.bhkData.floorData.urlSlug
                            ? '/' + item.propertyData.bhkData.floorData.urlSlug
                            : ''
                        }`"
                        target="_blank"
                      >
                        <v-btn elavation="0" flat icon="mdi-eye"> </v-btn>
                      </NuxtLink>
                    </v-col>
                  </v-row>
                </v-container>
              </template>
              <template #item-createdAt="item" class="mx-auto">
                {{
                  item.createdAt
                    ? new Date(item.createdAt).toLocaleDateString()
                    : ""
                }}
              </template>
              <template #item-name="item" class="mx-auto">
                {{
                  item.clientData && item.clientData.name
                    ? item.clientData.name
                    : ""
                }}
              </template>
              <template #item-email="item" class="mx-auto">
                {{
                  item.clientData && item.clientData.email
                    ? item.clientData.email
                    : ""
                }}
              </template>
              <template #item-phone="item" class="mx-auto">
                {{
                  item.clientData && item.clientData.phone
                    ? item.clientData.phone
                    : ""
                }}
              </template>
              <template #item-executiveData="item" class="mx-auto">
                {{
                  item.executiveData && item.executiveData.name
                    ? item.executiveData.name
                    : ""
                }}
              </template>
              <template #item-isAttended="item" class="mx-auto">
                <!--<v-icon
                  class="text-center"
                  v-if="item.isAttended == true"
                  color="success"
                  icon="mdi-check-circle-outline"
                >
                </v-icon>-->
                <v-checkbox
                  v-if="item.isAttended == true"
                  hide-details
                  :model-value="true"
                  @click="updateAttended(item, false)"
                >
                </v-checkbox>
                <v-checkbox
                  v-if="item.isAttended == false"
                  hide-details
                  value="true"
                  @click="updateAttended(item, true)"
                >
                </v-checkbox>
                <!--<v-icon v-else color="error" icon="mdi-cancel"> </v-icon>-->
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
import { useToast } from "vue-toast-notification";
export default {
  data() {
    return {
      config: useRuntimeConfig(),
      saveButtonLoading: false,
      deleteConfirmButton: false,
      hideFunctionLoading: false,
      tableLoading: false,
      dialog: false,
      dialogDelete: false,
      headers: [
        { text: "Date", value: "createdAt" },
        { text: "Name", value: "name" },
        { text: "Email", value: "email" },
        { text: "Phone", value: "phone" },
        // { text: "To", value: "to" },
        { text: "Attended By", value: "executiveData" },
        { text: "Attended Status", value: "isAttended" },

        // { text: "Actions", value: "actions", align: "center" },
      ],
      items: [],
      sortBy: [],
      sortType: "desc",
      editedIndex: -1,
      editedItem: {
        name: "",
        email: "",
        phone: "",
        date: "",
        to: "",
        attendedBy: "",
        message: "",
        property: "",
        bhk: "",
      },
      defaultItem: {
        name: "",
        email: "",
        phone: "",
        date: "",
        to: "",
        attendedBy: "",
        message: "",
        property: "",
        bhk: "",
      },
      itemsSelected: [],
      searchValue: "",
      searchField: ["name", "email", "phone", "date", "message"],
      // mazPhone number
      phoneNumber: null,
      defaultPhoneNumber: "",
      serverItemsLength: 0,
      serverOptions: {
        page: 1,
        rowsPerPage: 25,
      },
      debounceTimer: null,
    };
  },
  created() {
    // this.initialize();
    //  console.log("url", useRuntimeConfig().public.FRONTEND_URL)
  },
  methods: {
    async downloadExcel() {
      try {
        let headers = [
          "Date",
          "Name",
          "Email",
          "Phone",
          "Message",
          "Property Name",
          "BHK",
          "URL",
          "AttendedBy",
        ];
        let data = [];
        let tempObj = {
          date: "",
          name: "",
          email: "",
          phone: "",
          message: "",
          propertyName: "",
          bhk: "",
          url: "",
          attendedBy: "",
        };
        this.items.map((e) => {
          tempObj = {
            date: e.createdAt ? new Date(e.createdAt).toLocaleDateString() : "",
            name: e.clientData && e.clientData.name ? e.clientData.name : "",
            email: e.clientData && e.clientData.email ? e.clientData.email : "",
            phone: e.clientData && e.clientData.phone ? e.clientData.phone : "",
            message: e.message ? e.message : "",
            propertyName:
              e.propertyData && e.propertyData.name ? e.propertyData.name : "",
            bhk:
              e.propertyData &&
              e.propertyData.bhkData &&
              e.propertyData.bhkData.bhk
                ? e.propertyData.bhkData.bhk
                : "",
            attendedBy:
              e.executiveData && e.executiveData.name
                ? e.executiveData.name
                : "",
            url: `${this.config.public.FRONTEND_URL}/properties/${
              e.propertyData.urlSlug
            }${
              e.propertyData &&
              e.propertyData.bhkData &&
              e.propertyData.bhkData.bhk
                ? "/" + e.propertyData.bhkData.urlSlug
                : ""
            } ${
              e.propertyData &&
              e.propertyData.bhkData &&
              e.propertyData.bhkData.floorData &&
              e.propertyData.bhkData.floorData.urlSlug
                ? "/" + e.propertyData.bhkData.floorData.urlSlug
                : ""
            }`,
          };
          data.push(tempObj);

          tempObj = {
            date: "",
            name: "",
            email: "",
            phone: "",
            message: "",
            propertyName: "",
            bhk: "",
            url: "",
            attendedBy: "",
          };
        });
        // console.log(data)

        let fileName = "enquiry_" + new Date().toLocaleDateString();
        exportToExcel(data, fileName);
      } catch (err) {
        console.log(err);
      }
    },
    async updateAttended(item, val) {
      try {
        await $fetch(`/enquiry/${item._id}`, {
          method: "PUT",
          baseURL: useRuntimeConfig().public.baseURL,
          server: false,
          headers: {
            Authorization: `Bearer ${useCookie("accessToken").value}`,
          },
          body: { isAttended: val },
        });
        useToast().success(
          `Enquiry marked as ${val ? "attended" : "unattended"}.`,
          {
            position: "top-right",
          }
        );
        this.initialize();
      } catch (err) {
        console.log(err);
        useToast().error("Error marking as attended", {
          position: "top-right",
        });
      }
    },
    async initialize() {
      this.tableLoading = true;
      try {
        let payload = {};
        if (this.searchValue && this.searchValue.length) {
          payload = {
            search: {
              term: this.searchValue,
              fields: ["name", "email", "phone", "date", "message"],
            },
            options: {
              page: this.serverOptions.page,
              itemsPerPage: this.serverOptions.rowsPerPage,
            },
          };
        } else {
          payload = {
            options: {
              page: this.serverOptions.page,
              itemsPerPage: this.serverOptions.rowsPerPage,
              sortBy: ["createdAt"],
              sortDesc: [true],
            },
          };
        }
        let { data } = await $fetch("/enquiry/all", {
          method: "POST",
          baseURL: useRuntimeConfig().public.baseURL,
          server: false,
          headers: {
            Authorization: `Bearer ${useCookie("accessToken").value}`,
          },
          body: payload,
        });
        this.items = data.tableData;
        this.serverItemsLength = parseInt(data.totalCount);
        // this.downloadExcel()
      } catch (err) {
        useToast().error("Failed to fetch data", { position: "top-right" });
      }
      this.tableLoading = false;
    },
    editItem(item) {
      this.editedIndex = this.items.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item) {
      this.editedIndex = this.items.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialogDelete = true;
    },

    deleteItemConfirm() {
      this.items.splice(this.editedIndex, 1);
      this.closeDelete();
    },

    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    closeDelete() {
      this.dialogDelete = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },
  },
  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "Add item" : "Edit Item";
    },
  },
  watch: {
    serverOptions: {
      handler(val) {
        this.initialize();
      },
      deep: true,
    },
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
  background: #f68121 !important;
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
</style>
