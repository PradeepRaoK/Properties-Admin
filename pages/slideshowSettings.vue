<template>
  <div class="pb-5">
    <v-container class="py-1 my-0" fluid style="border-radius: 20px">
      <v-container>
        <v-row class="justify-center">
          <v-col class="my-auto text-">
            <h2 class="text-primary">Slideshow Setting</h2>
          </v-col>
          <v-spacer></v-spacer>
          <v-col cols="auto">
            <v-btn color="primary" @click="dialog = true">Add Slideshow</v-btn>
          </v-col>
        </v-row>
      </v-container>
      <v-row class="justify-center">
        <v-col
          v-for="n in slideDeatils"
          :key="n"
          class="my-auto text-center"
          lg="3"
          md="4"
          sm="6"
        >
          <v-card class="bg-white border-20 pa-5">
            <v-col class="pa-3 text-right">
              <v-btn
                size="small"
                @click="edit(n)"
                v-if="!fieldEnabled"
                class="mb-2"
                color="black"
                icon="mdi-pen"
              ></v-btn>
              <v-btn
                size="small"
                @click="cancelEdit()"
                v-if="fieldEnabled"
                color="black"
                icon="mdi-close"
              ></v-btn>
              &nbsp;
              <v-btn
                size="small"
                @click="SaveEdit()"
                v-if="fieldEnabled"
                color="primary"
                icon="mdi-check"
              ></v-btn>
            </v-col>
            <v-img :aspect-ratio="16 / 9" cover :src="n.src"> </v-img>
            <p>{{ n.heading1 ? n.heading1 : `&nbsp;` }}</p>
            <p>{{ n.heading2 ? n.heading2 : `&nbsp;` }}</p>
            <div>
              <small>{{ n.Subeading1 ? n.Subeading1 : `&nbsp;` }}</small>
            </div>
            <div>
              <small>{{ n.Subeading1 ? n.Subeading1 : `&nbsp;` }}</small>
            </div>
          </v-card>
        </v-col></v-row
      >
      <v-dialog v-model="dialog" persistent>
        <v-card>
          <v-card-title>
            <h3 class="text-right">
              <v-btn
                size="small"
                @click="cancelEdit()"
                color="black"
                icon="mdi-close"
              ></v-btn>
            </h3>
          </v-card-title>
          <v-card-text>
            <v-container class="bg-white">
              <v-row class="justify-center">
                <v-col cols="8">
                  <p>Animation Type</p>
                  <v-select
                    class="primary my-auto"
                    density="compact"
                    variant="outlined"
                    hide-details="auto"
                    :items="['Slide', 'Fade']"
                  ></v-select>
                </v-col>
                <v-col cols="12" sm="6" md="6" class="my-auto">
                  <v-card variant="outlined" elevation="0" class="py-2 px-1">
                    <div class="text-center">Slide Image</div>
                    <v-row class="justify-center">
                      <v-col lg="6" md="7" sm="8">
                        <v-sheet class="mx-auto">
                          <v-img
                            cover
                            :aspect-ratio="16 / 9"
                            :src="preview1 ? preview1 : ``"
                            lazy-src="/images/Loading_icon.gif"
                          >
                          </v-img>
                        </v-sheet>
                      </v-col>
                      <v-col cols="12" class="text-center">
                        <v-btn
                          class="mx-auto px-0"
                          color="primary"
                          variant="outlined"
                          @click="$refs.uploaderProfile2.click()"
                        >
                          <v-icon icon="mdi-pencil"></v-icon
                        ></v-btn>
                        <input
                          accept="image/*"
                          ref="uploaderProfile2"
                          class="d-none"
                          type="file"
                          @change="onFileChangedProfile"
                        />
                        <v-dialog v-model="cropperDialog">
                          <v-container>
                            <v-row class="justify-center">
                              <h2>Crop Profile picture</h2>
                            </v-row>
                            <v-row class="justify-center">
                              <v-col lg="5" md="6" sm="7" cols="10">
                                <PictureCropper
                                  @tempDp="tempDp"
                                  :src="uploadedProfile"
                                  :aspect="aspectDp"
                                />
                              </v-col>
                            </v-row>
                            <v-row class="justify-center">
                              <v-col cols="auto">
                                <v-btn @click="cancelProfile">Cancel</v-btn>
                                &nbsp;
                                <v-btn
                                  color="primary"
                                  @click="saveTempProfilePicture"
                                  >Save</v-btn
                                >
                              </v-col>
                            </v-row>
                          </v-container>
                        </v-dialog>
                      </v-col>
                    </v-row>
                  </v-card>
                </v-col>
              </v-row>
              <v-row>
                <v-col>
                  <v-card class="bg-white border-20 pa-5">
                    <h4>Heading Line 1</h4>
                    <v-text-field
                      v-model="editedItem.heading1"
                      type="text"
                      placeholder="Heading Line 1"
                      color="primary"
                      class="my-auto"
                      density="compact"
                      variant="outlined"
                      hide-details
                      autofocus
                    ></v-text-field>
                    <h4>Heading Line 2</h4>
                    <v-text-field
                      v-model="editedItem.heading2"
                      type="text"
                      placeholder="Heading Line 2"
                      color="primary"
                      class="my-auto"
                      density="compact"
                      variant="outlined"
                      hide-details
                      autofocus
                    ></v-text-field>
                    <h4>Sub-Heading Line 1</h4>
                    <v-text-field
                      v-model="editedItem.Subeading1"
                      type="text"
                      placeholder="Sub-Heading Line 1"
                      color="primary"
                      class="my-auto"
                      density="compact"
                      variant="outlined"
                      hide-details
                      autofocus
                    ></v-text-field>
                    <h4>Sub-Heading Line 2</h4>
                    <v-text-field
                      v-model="editedItem.Subeading2"
                      type="text"
                      placeholder="Sub-Heading Line 2"
                      color="primary"
                      class="my-auto"
                      density="compact"
                      variant="outlined"
                      hide-details
                      autofocus
                    ></v-text-field>
                  </v-card>
                </v-col>
              </v-row>
            </v-container>
          </v-card-text>
        </v-card>
      </v-dialog>
    </v-container>
  </div>
</template>
<script setup>
let dialog = ref(false);
let fieldEnabled = ref(false);
let editedItem = ref({
  heading1: "",
  heading2: "",
  Subeading1: "",
  Subeading2: "",
  src: "",
});
let defaultItem = ref({
  heading1: "",
  heading2: "",
  Subeading1: "",
  Subeading2: "",
  src: "",
});

let edit = async (item) => {
  fieldEnabled.value = true;
  editedItem.value = Object.assign({}, item);
  dialog.value = true;
};
let cancelEdit = async () => {
  fieldEnabled.value = false;
  dialog.value = false;
};
let SaveEdit = async () => {
  fieldEnabled.value = false;
  dialog.value = false;
};

// image upload variables
let cropperDialog = ref(false);
const uploadedProfile = ref(null);
const carrySmall = ref(null);
const preview = ref(null);
const preview1 = ref("");
const aspectDp = ref({
  aspectRatio: 16 / 9,
});
let oldUrl = ref("");
const tempDp = async (val) => {
  console.log(val);
  carrySmall.value = val;
};
const cancelProfile = () => {
  cropperDialog.value = false;
  carrySmall.value = null;
  if (editedItem.value && editedItem.value.profilePic) {
    preview1.value = `${config.baseURL}/img/${config.S3URL}/${editedItem.value.profilePic}`;
  } else {
    preview1.value = null;
  }
};
const saveTempProfilePicture = async () => {
  preview1.value = carrySmall.value;
  cropperDialog.value = false;
};
const selectedFileProfile = ref(null);
const onFileChangedProfile = async (e) => {
  cropperDialog.value = true;
  selectedFileProfile.value = e.target.files[0];
  if (selectedFileProfile.value) {
    const reader = new FileReader();
    reader.readAsDataURL(selectedFileProfile.value);
    reader.addEventListener("load", () => {
      uploadedProfile.value = URL.createObjectURL(e.target.files[0]);
    });
  }
};
// draggable
let id = 1;
let display = "Simple";
let order = ref(0);
let enabled = ref(true);
let list = ref([
  { name: "John", id: 0 },
  { name: "Joao", id: 1 },
  { name: "Jean", id: 2 },
]);
let dragging = ref(false);
const draggingInfo = computed(() => {});
let itemKey = async () => {
  return (list) => list.id;
};

let slideDeatils = ref([
  {
    slideNumber: 1,
    heading1: "This comes for slide 1",
    heading2: "This comes as second line",
    Subeading1: "subheading for slide 1",
    Subeading2: "next line for subheading",
    src: "https://picsum.photos/200",
  },
  {
    slideNumber: 2,
    heading1: "This comes for slide 2",
    heading2: "This comes as second line",
    Subeading1: "subheading for slide 2",
    Subeading2: "next line for subheading",
    src: "https://picsum.photos/200",
  },
  {
    slideNumber: 3,
    heading1: "This comes for slide 3",
    heading2: "This comes as second line",
    Subeading1: "subheading for slide 3",
    Subeading2: "next line for subheading",
    src: "https://picsum.photos/200",
  },
]);
</script>
