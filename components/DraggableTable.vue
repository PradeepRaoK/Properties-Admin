<template>
  <div>
    <div class="head">
      <h3>{{ list.title }}</h3>
      <v-dialog persistent v-model="dialog" max-width="500px">
        <template v-slot:activator="{ on }">
          <v-btn color="primary" @click="openDialog">Add</v-btn>
        </template>
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
                    label="Text"
                  ></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-text-field
                    v-model="editedItem.name"
                    label="Name"
                  ></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-text-field
                    v-model="editedItem.sport"
                    label="Sport"
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary" variant="outlined" @click="dialog = false"
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
          <th scope="col">link</th>
          <th scope="col" v-if="list.title == 'Social Media Details'">icon</th>
          <th scope="col">Actions</th>
        </tr>
      </thead>
      <draggable v-model="list" tag="tbody" :item-key="itemKey">
        <template #item="{ element: list }">
          <tr>
            <td>{{ list.link }}</td>
            <td>{{ list.text }}</td>
            <td v-if="list.icon"><v-icon :icon="list.icon"></v-icon></td>
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
  </div>
</template>

<script>
export default {
  props: ["info"],
  name: "table-example",
  display: "Table",
  order: 8,

  data() {
    return {
      list: [
        { id: 1, name: "Abby", sport: "basket" },
        { id: 2, name: "Brooke", sport: "foot" },
        { id: 3, name: "Courtenay", sport: "volley" },
        { id: 4, name: "David", sport: "rugby" },
      ],
      dragging: false,
      dialog: false,
      editedItem: {
        id: "",
        name: "",
        sport: "",
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
