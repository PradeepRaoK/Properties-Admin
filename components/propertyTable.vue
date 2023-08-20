<template>
  <div>
    <v-container fluid class="px-0 mx-0">
      <v-card style="border-radius: 20px" class="pa-5">
        <div class="head">
          <h3 class="text-primary">Property List</h3>
          <v-btn color="primary" @click="openDialog()">Add Property</v-btn>

          <v-dialog persistent v-model="dialog">
            <v-card>
              <v-card-title class="primary">Add New Item </v-card-title>
              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="12">
                      <v-container>
                        <v-row>
                          <v-col>
                            <p>
                              Company logo&nbsp;
                              <v-btn color="primary" @click="openFileInput"
                                >Upload Image</v-btn
                              >
                            </p>
                          </v-col>
                        </v-row>
                        <v-row>
                          <v-col cols="3">
                            <div>
                              <input
                                type="file"
                                ref="fileInput"
                                @change="handleFileChange"
                                style="display: none"
                                accept="image/*"
                              />

                              <v-img
                                v-if="imageData"
                                :src="imageData"
                                alt="Uploaded Preview"
                              ></v-img>
                            </div>
                          </v-col>
                          <v-col cols="9">
                            <v-row>
                              <v-col cols="12">
                                <v-text-field
                                  v-model="editedItem.name"
                                  variant="outlined"
                                  density="compact"
                                  label="Property Name"
                                  hide-details="auto"
                                ></v-text-field>
                              </v-col>

                              <v-col cols="12">
                                <v-text-field
                                  v-model="editedItem.url"
                                  label="URL"
                                  variant="outlined"
                                  density="compact"
                                  hide-details="auto"
                                ></v-text-field>
                              </v-col>
                              <v-col cols="12">
                                <v-text-field
                                  v-model="editedItem.adminUrl"
                                  label="Admin URL"
                                  variant="outlined"
                                  density="compact"
                                  hide-details="auto"
                                ></v-text-field>
                              </v-col>
                            </v-row> </v-col
                        ></v-row>
                      </v-container>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                  color="primary"
                  variant="outlined"
                  @click="dialog = false"
                  >Cancel</v-btn
                >
                <v-btn class="bg-primary" @click="saveItem">Save</v-btn>
                <v-spacer></v-spacer>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </div>
        <table class="table table-striped">
          <thead class="thead-dark">
            <tr>
              <th scope="col">Logo</th>
              <th scope="col">Name</th>
              <th scope="col">URL</th>
              <th scope="col">Admin URL</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <draggable v-model="list" tag="tbody" :item-key="itemKey">
            <template #item="{ element: list }">
              <tr>
                <td><v-avatar tile> logo </v-avatar></td>
                <td>{{ list.name }}</td>
                <td>{{ list.url }}</td>
                <td>{{ list.adminUrl }}</td>
                <td>
                  <v-icon size="small" class="me-2" @click="editItem(list)">
                    mdi-pencil
                  </v-icon>
                  <v-icon size="small" @click="deleteItem(list)">
                    mdi-delete
                  </v-icon>
                </td>
              </tr>
            </template>
          </draggable>
        </table>
      </v-card></v-container
    >
  </div>
</template>

<script>
export default {
  name: "table-example",
  display: "Table",
  order: 8,

  data() {
    return {
      list: [
        { id: 1, name: "Vajra", url: "xyz", text: "xyz" },
        {
          id: 2,
          name: "someshwara",
          url: "xyz",
          text: "xyz",
        },
        {
          id: 3,
          name: "",
          url: "xyz",
          text: "1xyz",
        },
      ],
      dragging: false,
      dialog: false,
      editedItem: {
        name: "",
        url: "",
        text: "",
      },
      imageData: null,
    };
  },
  methods: {
    // image upload
    openFileInput() {
      this.$refs.fileInput.click();
    },
    handleFileChange(event) {
      const file = event.target.files[0];
      if (file) {
        this.previewImage(file);
      }
    },
    previewImage(file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.imageData = reader.result;
      };
      reader.readAsDataURL(file);
    },
    //
    itemKey() {
      return (list) => list.id;
    },
    openDialog() {
      this.dialog = true;
      this.editedItem = {
        id: "",
        name: "",
        sport: "",
      };
    },
    saveItem() {
      if (this.editedIndex > -1) {
        Object.assign(this.list[this.editedIndex], this.editedItem);
      } else {
        this.list.push(this.editedItem);
      }
      this.dialog = false;
    },
    editItem(item) {
      this.editedIndex = this.list.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },
    deleteItem(item) {
      const index = this.list.indexOf(item);
      if (index > -1) {
        confirm("Are you sure you want to delete this item?") &&
          this.list.splice(index, 1);
      }
    },
  },
};
</script>

<style scoped>
.ghost {
  opacity: 0.5;
  background: #c8ebfb;
}
table {
  font-family: arial, sans-serif;
  border-collapse: collapse;
  width: 100%;
  border-radius: 8px;
}

td,
th {
  border: 1px solid #dddddd;
  text-align: left;
  padding: 8px;
}
th {
  background: #f1c376;

  color: #606c5d;
}
tr:nth-child(even) {
  background-color: #f5f5f5;
}
tr:nth-child(odd) {
  background-color: #fefefe;
}
tr:hover {
  cursor: grab;
}

.head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 5px;
}
</style>
