<template>
  <div>
    <v-container fluid class="px-0 mx-0">
      <v-card style="border-radius: 20px" class="pa-5">
        <div class="head">
          <h3 class="text-primary">Specifications Settings</h3>
          <v-btn color="primary" @click="openDialog">Add Specifications </v-btn>
          <v-dialog persistent v-model="dialog" max-width="500px">
            <v-card>
              <v-card-title>
                <span class="headline">Add New Item</span>
              </v-card-title>
              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="12">
                      <v-text-field
                        v-model="editedItem.text"
                        variant="outlined"
                        density="compact"
                        label="Text"
                      ></v-text-field>
                    </v-col>

                    <v-col cols="12">
                      <small style="line-height: 1.1">
                        <v-icon size="small">mdi-information</v-icon> Please use
                        the link
                        <a
                          style="color: blue"
                          target="_blank"
                          href="https://pictogrammers.com/library/mdi/"
                          >ICON LIST</a
                        >
                        to get all the icons <br />(eg: Whatsapp is going to
                        have icon name as <b>mdi-whatsapp</b>)
                      </small>
                      <br />
                      <v-text-field
                        class="pt-4"
                        v-model="editedItem.icon"
                        label="Icon Name"
                        placeholder="mdi-whatsapp"
                        variant="outlined"
                        density="compact"
                      ></v-text-field>
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
                <v-btn color="primary" @click="saveItem">Save</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </div>
        <table class="table table-striped">
          <thead class="thead-dark">
            <tr>
              <th scope="col">Text</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <draggable v-model="list" tag="tbody" :item-key="itemKey">
            <template #item="{ element: list }">
              <tr>
                <td>
                  <v-icon>{{ `${list.icon}` }} </v-icon> &nbsp;
                  {{ list.text }}
                </td>
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
        {
          id: 1,
          text: "Gym",
          icon: "mdi-weight-lifter",
        },
        {
          id: 2,
          text: "Electricity",
          icon: "mdi-meter-electric-outline",
        },
        {
          id: 3,
          icon: "mdi-parking",
          text: "Car Parking",
        },
        {
          id: 4,
          text: "Balcony",
          icon: "mdi-window-open-variant",
        },
      ],
      dragging: false,
      dialog: false,
      editedItem: {
        text: "",
        link: "",
      },
    };
  },
  methods: {
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
  created() {},
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
