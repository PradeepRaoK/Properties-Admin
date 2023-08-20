<template>
  <div>
    <v-card elevation="0" style="background: transparent">
      <!-- <v-card-title class="text-center bg-primary">
          <span class="text-h5 text-center"
            >{{ formTitle }} {{ editedItem.name }}</span
          >
        </v-card-title> -->

      <v-card-text>
        <v-container class="pt-0">
          <v-card class="pa-10 border20">
            <v-row class="mb-2 justify-space-between">
              <v-col cols="7">
                <h1 class="text-primary pa-3 text-left">Property Details</h1>
              </v-col>
              <v-col class="pa-3 text-right" cols="2">
                <v-btn
                  @click="fieldEnabled = true"
                  v-if="!fieldEnabled"
                  class="mb-2"
                  color="black"
                  icon="mdi-pen"
                ></v-btn>
                <v-btn
                  @click="cancelEdit()"
                  v-if="fieldEnabled"
                  class="mb-2"
                  color="black"
                  icon="mdi-close"
                ></v-btn>
                &nbsp;
                <v-btn
                  @click="SaveEdit()"
                  v-if="fieldEnabled"
                  class="mb-2"
                  color="primary"
                  icon="mdi-check"
                ></v-btn>
              </v-col>
            </v-row>

            <v-divider></v-divider>
            <br />
            <v-row>
              <!-- left col -->
              <v-col lg="6" md="6">
                <!-- details -->
                <v-row class="justify-center">
                  <v-col lg="6" md="6">
                    <v-text-field
                      density="compact"
                      v-model="editedItem.name"
                      :disabled="!fieldEnabled"
                      color="primary"
                      variant="outlined"
                      hide-details="auto"
                      label="Name"
                    ></v-text-field>
                  </v-col>
                  <v-col lg="6" md="6">
                    <v-text-field
                      density="compact"
                      v-model="editedItem.urlSlug"
                      :disabled="!fieldEnabled"
                      color="primary"
                      variant="outlined"
                      hide-details="auto"
                      label="URL Slug"
                    ></v-text-field>
                  </v-col>
                  <v-col lg="12" md="12">
                    <v-text-field
                      density="compact"
                      v-model="editedItem.address.line1"
                      :disabled="!fieldEnabled"
                      color="primary"
                      variant="outlined"
                      hide-details="auto"
                      label="Addess Line 1"
                    ></v-text-field>
                  </v-col>
                  <v-col lg="12" md="12">
                    <v-text-field
                      density="compact"
                      v-model="editedItem.address.line2"
                      :disabled="!fieldEnabled"
                      color="primary"
                      variant="outlined"
                      hide-details="auto"
                      label="Addess Line 2"
                    ></v-text-field>
                  </v-col>
                  <v-col lg="6" md="6">
                    <v-text-field
                      v-model="editedItem.address.area"
                      :disabled="!fieldEnabled"
                      color="primary"
                      variant="outlined"
                      hide-details="auto"
                      label="Area"
                      density="compact"
                    >
                    </v-text-field>
                  </v-col>
                  <v-col lg="6" md="6">
                    <v-text-field
                      v-model="editedItem.address.city"
                      :disabled="!fieldEnabled"
                      color="primary"
                      variant="outlined"
                      hide-details="auto"
                      label="City"
                      density="compact"
                    >
                    </v-text-field>
                  </v-col>

                  <!-- <v-col lg="6" md="6">
                    <v-autocomplete
                      v-model="editedItem.address.city"
                      :hide-no-data="false"
                      :items="cities"
                      item-title="name"
                      return-object
                      hide-selected
                      color="primary"
                      variant="outlined"
                      hide-details="auto"
                      label="City"
                      persistent-hint
                      density="compact"
                    >
                    </v-autocomplete>
                  </v-col> -->
                  <v-col lg="6" md="6">
                    <v-text-field
                      density="compact"
                      :disabled="!fieldEnabled"
                      v-model="editedItem.address.state"
                      color="primary"
                      type="number"
                      variant="outlined"
                      hide-details="auto"
                      label="State"
                    ></v-text-field>
                  </v-col>
                  <v-col lg="6" md="6">
                    <v-text-field
                      density="compact"
                      :disabled="!fieldEnabled"
                      v-model="editedItem.address.pin"
                      color="primary"
                      type="number"
                      variant="outlined"
                      hide-details="auto"
                      label="Pin Code"
                    ></v-text-field>
                  </v-col>

                  <v-col lg="6" md="6">
                    <!-- <v-autocomplete
                      v-model="editedItem.address.state"
                      :hide-no-data="false"
                      :items="state"
                      item-title="name"
                      item-value="name"
                      hide-selected
                      color="primary"
                      variant="outlined"
                      hide-details="auto"
                      label="State"
                      persistent-hint
                      density="compact"
                    >
                    </v-autocomplete> -->
                  </v-col>
                  <v-col lg="12" md="12">
                    <v-textarea
                      density="compact"
                      :disabled="!fieldEnabled"
                      v-model="editedItem.description"
                      color="primary"
                      variant="outlined"
                      hide-details="auto"
                      label="Description"
                    ></v-textarea>
                  </v-col>
                </v-row>
                <!-- categ -->
                <v-row class="justify-center">
                  <!-- <v-col lg="12" md="12">
                      <Tree />
                    </v-col> -->
                  <v-col lg="6" md="6">
                    <v-select
                      v-model="editedItem.category"
                      :items="category"
                      :disabled="!fieldEnabled"
                      item-title="name"
                      return-object
                      label="Category"
                      color="primary"
                      variant="outlined"
                      hide-details="auto"
                      persistent-hint
                      density="compact"
                      @update="getSubCategory()"
                    >
                    </v-select>
                    <!-- <v-combobox
                        v-model="editedItem.category"
                        :hide-no-data="false"
                        :items="category"
                        item-title="name"
                        hide-selected
                        color="primary"
                        variant="outlined"
                        hide-details="auto"
                        label="Category"
                        multiple
                        persistent-hint
                        density="compact"
                        chips
                        @change="updateArray('category', $event.target.value)"
                      >
                        <template v-slot:no-data>
                          <v-list-item>
                            <v-list-item-title>
                              No results matching. Press
                              <kbd>enter</kbd> to create a new one
                            </v-list-item-title>
                          </v-list-item>
                        </template>
                      </v-combobox> -->
                  </v-col>
                  <v-col lg="6" md="6">
                    <v-select
                      v-model="editedItem.subCategory"
                      :items="subCategory"
                      item-title="name"
                      :disabled="!fieldEnabled"
                      return-object
                      label="Sub-Category"
                      color="primary"
                      variant="outlined"
                      hide-details="auto"
                      persistent-hint
                      density="compact"
                      :hide-no-data="false"
                    >
                    </v-select>
                  </v-col>
                  <v-col lg="12" md="12">
                    <v-combobox
                      v-model="editedItem.features"
                      :hide-no-data="false"
                      :items="features"
                      item-title="name"
                      :disabled="!fieldEnabled"
                      item-value="name"
                      hide-selected
                      color="primary"
                      variant="outlined"
                      hide-details="auto"
                      label="Features & Amenities"
                      multiple
                      persistent-hint
                      density="compact"
                      chips
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

                  <!-- Specifications -->
                  <v-col lg="12" md="12">
                    <v-combobox
                      v-model="editedItem.specification"
                      :hide-no-data="false"
                      :disabled="!fieldEnabled"
                      :items="specificationItems"
                      item-title="name"
                      item-value="name"
                      hide-selected
                      color="primary"
                      variant="outlined"
                      hide-details="auto"
                      label="Specification"
                      multiple
                      persistent-hint
                      density="compact"
                      chips
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
                  <v-col lg="12" md="12">
                    <v-combobox
                      v-model="editedItem.propertyTags"
                      :hide-no-data="false"
                      :disabled="!fieldEnabled"
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
                  <!-- Builder -->
                  <v-col lg="12" md="12">
                    <v-text-field
                      density="compact"
                      v-model="editedItem.address"
                      :disabled="!fieldEnabled"
                      color="primary"
                      variant="outlined"
                      hide-details="auto"
                      label="Project Builder"
                    ></v-text-field>
                  </v-col>
                  <v-col lg="12" md="12">
                    <v-combobox
                      v-model="editedItem.approvedBanks"
                      :hide-no-data="false"
                      :disabled="!fieldEnabled"
                      :items="approvedBankItems"
                      item-title="name"
                      item-value="name"
                      hide-selected
                      color="primary"
                      variant="outlined"
                      hide-details="auto"
                      label="Approved Banks"
                      multiple
                      persistent-hint
                      density="compact"
                      chips
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
                </v-row>
                <!-- sqft range -->
                <v-row class="justify-center">
                  <v-col lg="4" md="4">
                    <v-text-field
                      density="compact"
                      v-model="editedItem.sqftMin"
                      :disabled="!fieldEnabled"
                      color="primary"
                      variant="outlined"
                      type="number"
                      hide-details="auto"
                      label=" Area (min)"
                    ></v-text-field>
                  </v-col>
                  <v-col lg="4" md="4">
                    <v-text-field
                      density="compact"
                      v-model="editedItem.sqftMax"
                      color="primary"
                      :disabled="!fieldEnabled"
                      type="number"
                      variant="outlined"
                      hide-details="auto"
                      label=" Area (max)"
                    ></v-text-field>
                  </v-col>
                  <v-col lg="4" md="4">
                    <v-select
                      v-model="editedItem.unit"
                      density="compact"
                      :disabled="!fieldEnabled"
                      label="Unit"
                      color="primary"
                      variant="outlined"
                      hide-details="auto"
                      :items="['Sq Ft', 'Sq Mtr', 'Cents', 'Acer']"
                    ></v-select>
                  </v-col>
                  <v-col lg="6" md="6">
                    <v-text-field
                      density="compact"
                      v-model="editedItem.priceMin"
                      color="primary"
                      :disabled="!fieldEnabled"
                      type="number"
                      variant="outlined"
                      hide-details="auto"
                      label=" Price range (min)"
                    ></v-text-field>
                  </v-col>
                  <v-col lg="6" md="6">
                    <v-text-field
                      density="compact"
                      v-model="editedItem.priceMax"
                      color="primary"
                      :disabled="!fieldEnabled"
                      type="number"
                      variant="outlined"
                      hide-details="auto"
                      label=" Price range (max)"
                    ></v-text-field>
                  </v-col>
                  <v-col lg="6" md="6">
                    <v-text-field
                      density="compact"
                      v-model="editedItem.bathRooms"
                      color="primary"
                      type="number"
                      :disabled="!fieldEnabled"
                      variant="outlined"
                      hide-details="auto"
                      label="Number of Bathrooms"
                    ></v-text-field>
                  </v-col>
                  <v-col lg="6" md="6">
                    <v-text-field
                      density="compact"
                      v-model="editedItem.balconys"
                      color="primary"
                      type="number"
                      variant="outlined"
                      :disabled="!fieldEnabled"
                      hide-details="auto"
                      label="Number of Balconies"
                    ></v-text-field>
                  </v-col>
                  <v-col lg="6" md="6">
                    <span>
                      <label for="startingDate"> Featured Start Date</label>
                      <input
                        v-model="editedItem.featuredStartDate"
                        :disabled="!fieldEnabled"
                        width="100%"
                        type="date"
                        id="startingDate"
                      />
                    </span>
                  </v-col>
                  <v-col lg="6" md="6">
                    <span>
                      <label for="endingDate">Featured End Date</label>
                      <input
                        v-model="editedItem.featuredEndDate"
                        :disabled="!fieldEnabled"
                        width="100%"
                        type="date"
                        id="endingDate"
                      />
                    </span>
                  </v-col>
                  <v-col lg="12" md="12">
                    <v-text-field
                      density="compact"
                      :disabled="!fieldEnabled"
                      v-model="editedItem.reraNumber"
                      color="primary"
                      variant="outlined"
                      hidess-details="auto"
                      label=" RERA Number"
                    ></v-text-field>
                  </v-col>
                </v-row>
                <v-row>
                  <!-- <v-col>
                    <v-checkbox
                      v-model="editedItem.isSold"
                      class="pb-0"
                      label="Sold"
                      value="true"
                      color="primary"
                    ></v-checkbox>
                  </v-col> -->
                  <!-- <v-col lg="9">
                    <v-autocomplete
                      v-model="editedItem.soldTo"
                      :items="soldToItems"
                      item-title="name"
                      item-value="_id"
                      label="Bought By"
                      color="primary"
                      variant="outlined"
                      hide-details="auto"
                      persistent-hint
                      density="compact"
                      multiple
                    >
                    </v-autocomplete>
                  </v-col> -->
                </v-row>
                <!-- seo -->
                <v-row class="justify-center">
                  <v-col lg="12" md="12">
                    <v-text-field
                      density="compact"
                      :disabled="!fieldEnabled"
                      v-model="editedItem.seoTitle"
                      color="primary"
                      variant="outlined"
                      hide-details="auto"
                      label="Seo title"
                    ></v-text-field>
                  </v-col>
                  <v-col lg="12" md="12">
                    <v-combobox
                      v-model="editedItem.seoKeyword"
                      :disabled="!fieldEnabled"
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
                  <v-col lg="12" md="12">
                    <v-textarea
                      density="compact"
                      v-model="editedItem.seoDescription"
                      :disabled="!fieldEnabled"
                      color="primary"
                      variant="outlined"
                      hide-details="auto"
                      label="Seo Descritption"
                    ></v-textarea>
                  </v-col>
                  <!-- <v-col v-for="(e, i) in type" :key="i" lg="4" md="4">
                       <v-text-field 
                        v-if="e.name != 'sale'"
                          density="compact"
                          v-model="editedItem.type[e.name]"
                          color="primary"
                          variant="outlined"
                          hide-details="auto"
                          :label="e.name"
                          type="number"
                        ></v-text-field>
                        <v-text-field 
                        v-else
                          density="compact"
                          v-model="editedItem.type[e.name]"
                          color="primary"
                          variant="outlined"
                          hide-details="auto"
                          label="Available"
                          type="number"
                        ></v-text-field>
                    </v-col> -->
                </v-row>
              </v-col>
              <!-- right col -->
              <v-col lg="6" md="6">
                <v-row class="justify-center">
                  <v-col lg="7" md="7" class="pb-0">
                    <h2
                      class="text-right text-fourthColor"
                      style="position: relative; top: 20px"
                    >
                      Project Photos
                    </h2>
                  </v-col>
                  <v-col lg="4" md="4" class="pb-0">
                    <v-switch
                      color="primary"
                      :disabled="!fieldEnabled"
                      hide-details
                      inset
                    ></v-switch>
                  </v-col>
                  <v-col lg="12" md="12">
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
                        class="my-auto"
                      >
                        <v-btn
                          v-if="showImage"
                          class="mx-1 rounded-lg inner-abs"
                          color="primary"
                          icon="mdi-eye"
                          @click="openViewPhoto(showImage)"
                        ></v-btn>
                      </v-img>
                    </v-card>
                  </v-col>
                  <v-col lg="11">
                    <v-sheet>
                      <span v-for="(each, j) in propertyImages" :key="j">
                        <v-avatar
                          style="border: 0.3px solid #808080"
                          size="80"
                          rounded="0"
                          class="ma-2 pa-1"
                        >
                          <v-img
                            style="position: absolute; top: 10px; width: 100%"
                            @click="selectedPicture(each)"
                            :src="each"
                            :aspect-ratio="4 / 3"
                          >
                          </v-img>
                          <v-icon
                            @click="selectFeaturedimage(each, j)"
                            :style="
                              each == getImage(editedItem.featuredImages) ||
                              each == editedItem.featuredImages
                                ? 'color:orange;position: absolute; top: 0; left: 0'
                                : 'color:black;position: absolute; top: 0; left: 0'
                            "
                            >mdi-star</v-icon
                          >

                          <v-icon
                            style="position: absolute; top: 0; right: 0"
                            @click="deleteImg(j)"
                            color="red"
                            >mdi-delete</v-icon
                          >
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
                            <v-card-title>Project Image Settings</v-card-title>
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
                                @click="updateDp()"
                                >SAVE</v-btn
                              >
                            </v-card-actions>
                          </v-card>
                        </v-container>
                      </v-dialog>
                    </div>
                  </v-col>
                  <v-col
                    lg="12"
                    md="12"
                    class="text-center"
                    style="position: relative; bottom: 20px"
                  >
                    <v-btn
                      variant="outlined"
                      class="mx-1 rounded-lg"
                      color="primary "
                      :disabled="!fieldEnabled"
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
                  <v-col lg="6" md="10" class="pb-0">
                    <h2
                      class="text-right text-fourthColor"
                      style="position: relative; top: 20px"
                    >
                      Project Video
                    </h2>
                  </v-col>
                  <v-col lg="3" md="3" class="pb-0">
                    <v-switch
                      color="primary"
                      :disabled="!fieldEnabled"
                      hide-details
                      inset
                    ></v-switch>
                  </v-col>
                  <v-col lg="10" md="10">
                    <v-card
                      class="pa-1 text-center justify-center"
                      height="250px"
                      variant="outlined"
                    >
                      <!-- <video
                          id="preview"
                          width="320"
                          height="240"
                          controls
                        ></video> -->
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
                        :disabled="!fieldEnabled"
                        :loading="isVideoLoading"
                        @click="importVideo"
                      ></v-btn>
                    </v-card>
                    <!-- <input
                        accept="video/*"
                        refs="uploadVideo"
                        id="videoId"
                        class="d-none"
                        type="file"
                        @change="previewVideo(event)"
                      /> -->
                  </v-col>
                </v-row>
                <br />
                <v-divider></v-divider>
                <br />
                <v-row class="justify-center">
                  <v-col lg="7" md="7" class="pb-0">
                    <h2
                      class="text-right text-fourthColor"
                      style="position: relative; top: 20px"
                    >
                      Location Map
                    </h2>
                  </v-col>
                  <v-col lg="4" md="4" class="pb-0">
                    <v-switch
                      color="primary"
                      :disabled="!fieldEnabled"
                      hide-details
                      inset
                    ></v-switch>
                  </v-col>
                  <v-col class="my-auto" lg="10" md="10" sm="4">
                    <v-hover>
                      <template v-slot:default="{ isHovering, props }">
                        <v-card
                          v-bind="props"
                          style="position: relative"
                          class="rounded-lg font-weight-medium my-auto px-3 py-2"
                          min-height="190px"
                          max-height="390px"
                          variant="outlined"
                        >
                          <iframe
                            v-if="
                              editedItem.location &&
                              editedItem.location.coordinates &&
                              editedItem.location.coordinates.length &&
                              editedItem.location.coordinates[0]
                            "
                            :src="`https://www.google.com/maps/embed/v1/place?key=${API_KEY}&q=${editedItem.location.coordinates[0]},${editedItem.location.coordinates[1]}`"
                            width="100%"
                            height="100%"
                            style="border: 0"
                            allowfullscreen=""
                            loading="lazy"
                            referrerpolicy="no-referrer-when-downgrade"
                          ></iframe>
                          <iframe
                            v-else
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d124440.31721982408!2d74.76966093397397!3d12.923146607515887!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba35a4c37bf488f%3A0x827bbc7a74fcfe64!2sMangaluru%2C%20Karnataka!5e0!3m2!1sen!2sin!4v1686630190843!5m2!1sen!2sin"
                            width="100%"
                            height="100%"
                            style="border: 0"
                            allowfullscreen=""
                            loading="lazy"
                            referrerpolicy="no-referrer-when-downgrade"
                          ></iframe>
                          <!-- <p class="basic-absolute text-center">Map</p> -->
                          <v-expand-transition
                            class="basic-absolute text-center"
                          >
                            <v-avatar
                              v-show="isHovering"
                              size="250"
                              class="inner-abs"
                              rounded="0"
                            >
                              <v-btn
                                class="mx-1 rounded-lg"
                                color="primary"
                                icon="mdi-pencil"
                                :disabled="!fieldEnabled"
                                @click="openMapDialog()"
                              ></v-btn>
                              <!-- <v-btn
                                  class="mx-1 rounded-lg"
                                  color="primary"
                                  icon="mdi-eye"
                                  @click="dialogMap = true"
                                ></v-btn> -->
                            </v-avatar>
                          </v-expand-transition>
                        </v-card>
                      </template></v-hover
                    >
                  </v-col>
                </v-row>
                <br />
                <br />
                <v-divider></v-divider>
                <br />
                <v-row class="justify-center">
                  <v-col lg="7" md="7" class="pb-0">
                    <h2
                      class="text-right text-fourthColor"
                      style="position: relative; top: 20px"
                    >
                      SEO Thumbnail
                    </h2>
                  </v-col>
                  <v-col lg="4" md="4" class="pb-0">
                    <v-switch
                      color="primary"
                      :disabled="!fieldEnabled"
                      hide-details
                      inset
                    ></v-switch>
                  </v-col>
                  <v-col lg="11" md="11">
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
                            max-height="200px"
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
                                :disabled="!fieldEnabled"
                                :loading="isSelectingseo"
                                @click="seoPicImport()"
                              ></v-btn>
                              <v-btn
                                v-if="seoImage && seoImage.length"
                                class="mx-1 rounded-lg"
                                color="primary"
                                :disabled="!fieldEnabled"
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
              <v-col lg="11" md="11">
                <v-card
                  class="border20"
                  style="width: 100%; border: 0.6px solid #808080"
                  elevation="0"
                >
                  <v-container fluid>
                    <v-row class="justify-center">
                      <br />
                      <h3 class="text-center text-primary">Near By Places</h3>
                    </v-row>
                    <v-dialog v-model="neighborhoodDialog" max-width="700px">
                      <v-container fluid>
                        <v-card class="pa-5">
                          <v-card-title> Add A Near By Place </v-card-title>
                          <v-card-text>
                            <v-row class="justify-center">
                              <v-col lg="6" md="6">
                                <v-hover>
                                  <template
                                    v-slot:default="{ isHovering, props }"
                                  >
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
                                          !(
                                            tempNeighbor.image &&
                                            tempNeighbor.image.length
                                          )
                                        "
                                      >
                                        Please upload an Image to preview
                                      </p>
                                      <v-img
                                        v-if="
                                          tempNeighbor.imagePath &&
                                          tempNeighbor.imagePath.length
                                        "
                                        max-height="290px"
                                        :aspect-ratio="1 / 1"
                                        :src="tempNeighbor.imagePath"
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
                              </v-col> </v-row
                            ><v-row class="justify-center">
                              <v-col cols="12" lg="6" md="6" sm="12">
                                <v-text-field
                                  v-model="tempNeighbor.name"
                                  density="compact"
                                  label="Name"
                                  color="primary"
                                  variant="outlined"
                                  hide-details="auto"
                                ></v-text-field>
                              </v-col>
                              <v-col cols="12" lg="6" md="6" sm="12">
                                <v-text-field
                                  v-model="tempNeighbor.distance"
                                  density="compact"
                                  label="Distance in Kms"
                                  color="primary"
                                  variant="outlined"
                                  hide-details="auto"
                                ></v-text-field> </v-col
                            ></v-row>
                          </v-card-text>
                          <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn
                              size="large"
                              variant="outlined"
                              color="primary"
                              @click="cancelNeighborChange()"
                              >Cancel</v-btn
                            >
                            <v-btn
                              size="large"
                              class="bg-primary"
                              @click="addNeighbor()"
                              >SAVE</v-btn
                            >
                            <v-spacer></v-spacer>
                          </v-card-actions>
                        </v-card>
                      </v-container>
                    </v-dialog>

                    <!--<v-row
                        class="my-0"
                        v-for="(each, i) in neighborHoodlist"
                        :key="i"
                      >
                        <v-col class="pb-0" lg="12" md="12">
                          <v-card
                            class="bg-white"
                            elevation="0"
                            style="border: 0.6px solid #808080"
                          >
                            <v-container class="my-0">
                              <h4 class="d-flex">
                                <span>
                                  {{ each.distance }} Kms &nbsp; - &nbsp;
                                  {{ each.name }}
                                </span>
                                <v-spacer></v-spacer>
                                <v-btn
                                  @click="neighborHoodlist.splice(i, 1)"
                                  size="small"
                                  icon="mdi-delete"
                                ></v-btn>
                              </h4>
                            </v-container>
                          </v-card>
                        </v-col>
                      </v-row>-->
                    <v-row justify="center">
                      <v-col>
                        <v-container fluid>
                          <v-row>
                            <v-col cols="12" lg="3" md="4">
                              <h4 class="text-fourthColor">
                                <v-btn
                                  :disabled="!fieldEnabled"
                                  @click="
                                    (neighborhoodDialog = true),
                                      (nhType = 'Add')
                                  "
                                  class="bg-primary mx-1"
                                  icon="mdi-plus"
                                ></v-btn>
                                &nbsp;Add a place
                              </h4>
                            </v-col>
                            <v-col>
                              <v-expansion-panels>
                                <v-expansion-panel
                                  v-for="(count, k) in neighborHoodlist"
                                  :key="k"
                                  :title="`${k + 1} - ${count.name}`"
                                >
                                  <v-expansion-panel-text>
                                    <span>
                                      <div class="d-flex">
                                        <v-avatar rounded="0" size="70">
                                          <v-img
                                            :src="count.imagePath"
                                          ></v-img></v-avatar
                                        >&nbsp;
                                        <p class="pt-2">
                                          {{ count.name }} in
                                          {{ count.distance }} Kms
                                        </p>
                                        <v-spacer></v-spacer>
                                        <v-btn
                                          variant="text"
                                          @click="
                                            (nhIndex = k),
                                              (neighborhoodDialog = true),
                                              (tempNeighbor = { ...count }),
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
                                          @click="neighborHoodlist.splice(k, 1)"
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
                  </v-container>
                </v-card>
              </v-col>
            </v-row>
            <br />
          </v-card>
        </v-container>
      </v-card-text>
      <!-- Save dialog -->
      <v-dialog v-model="dialogSave" max-width="500px">
        <v-card>
          <v-card-title class="text-h5"
            >Do you want to save the changes?</v-card-title
          >
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click="close">Discard</v-btn>
            <v-btn color="blue darken-1" text @click="saveData('draft')"
              >Save</v-btn
            >
            <v-spacer></v-spacer>
          </v-card-actions>
        </v-card>
      </v-dialog>

      <!-- crop neighbor pic -->
      <div class="text-center">
        <v-dialog
          transition="dialog-bottom-transition"
          v-model="profileDialogNH"
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
      <!-- view Image dialog -->
      <div class="text-center">
        <v-dialog max-width="600px" v-model="viewImageDialog">
          <v-card class="pa-5">
            <v-row class="justify-center">
              <v-col>
                <v-img :src="showCase" width="100%" height="100%" cover>
                </v-img>
              </v-col>
            </v-row>
          </v-card>
        </v-dialog>
      </div>
      <br />
      <!-- 
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          :loading="saveLoader"
          @click="$router.push(`/project`)"
          class="bg-primary mr-4"
        >
          <v-icon icon="mdi-close"></v-icon>
          &nbsp; Cancel &nbsp;
        </v-btn>
        <v-btn
          :loading="saveLoader"
          @click="$router.push(`/project`)"
          class="bg-primary mx-1"
        >
          <v-icon icon="mdi-check"></v-icon>
          &nbsp; Save & Publish &nbsp;
        </v-btn>
        <v-spacer></v-spacer>
      </v-card-actions> -->
    </v-card>
    <v-dialog v-model="dialogMap" max-width="700px">
      <v-container>
        <Map
          :location="location"
          @close="dialogMap = false"
          @update-location="
            (event) => {
              updateLocation(event);
            }
          "
        />
      </v-container>
    </v-dialog>
    <v-dialog v-model="dialogVideo" max-width="700px">
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
              "
              >SAVE</v-btn
            >
            <v-spacer></v-spacer>
          </v-card-actions>
        </v-card>
      </v-container>
    </v-dialog>
  </div>
</template>

<script>
import { useToast } from "vue-toast-notification";
export default {
  layout: "default",
  data() {
    return {
      config: useRuntimeConfig(),
      saveLoader: false,
      editFeatured: false,
      location: {
        coordinates: ["12.914107", "74.855735"],
        type: "Point",
      },
      API_KEY: useRuntimeConfig().public.GOOGLE_MAPS_API_KEY,
      center: { lat: 37.7749, lng: -122.4194 },
      soldToItems: [],
      markers: null,
      latitude: null,
      longitude: null,
      cities: ["Mangalore"],
      state: ["Karnataka"],
      area: [],
      type: { rent: 0, lease: 0, sale: 0 },
      // propId: "",
      // defaultBhkData: [
      //   {
      //     bhk: "",
      //     urlSlug: "",
      //     features: [],
      //     bathRooms: "",
      //     balconys: "",
      //     propertyTags: [],
      //     sqftMin: "",
      //     sqftMax: "",
      //     price: "",
      //     seoTitle: "",
      //     seoKeyword: "",
      //     seoDescription: "",
      //     type: {},
      //     video: "",
      //     images: [],
      //     floorData: [
      //       {
      //         name: "",
      //         sqft: "",
      //         price: 0,
      //         bathRooms: "",
      //         balconys: "",
      //         description: "",
      //         isSold: false,
      //         type: {},
      //         images: [""],
      //         isDeleted: false,
      //         urlSlug: "",
      //       },
      //     ],
      //   },
      // ],
      tempPropImgs: [],
      formType: "EDIT",
      totalBhk: [],
      dialog: false,
      edit: false,
      // should come from prop
      formTitle: "EDIT project",
      editedItem: {
        name: "",
        urlSlug: "",
        subCategory: "",
        address: "",
        area: "",
        landMark: "",
        bathRooms: "",
        balconys: "",
        city: "",
        pin: "",
        state: "",
        description: "",
        category: [],
        allCategory: [],
        features: [],
        propertyTags: [],
        appovedBanks: [],
        specification: [],
        assignedTo: "",
        sqftMin: "",
        sqftMax: "",
        priceMin: "",
        priceMax: "",
        featuredStartDate: "",
        featuredEndDate: "",
        reraNumber: "",
        seoTitle: "",
        seoKeyword: "",
        seoDescription: "",
        type: {
          rent: 0,
          lease: 0,
          sale: 0,
        },
        video: "",
        images: [],
        location: {
          map: "",
        },
        isSold: false,
        soldTo: [],
        neighborhood: [],
        bhkData: [],
        scheduledDate: "",
        isDeleted: false,
      },
      soldTo: "",
      dialogMap: false,
      // used items
      // categoryItems: ["Gaming", "Programming", "Vue", "Vuetify"],
      category: [],
      subCategory: [],
      featureItems: [],
      features: [],
      propertyTagsItems: [],
      specificationItems: [],
      approvedBankItems: [],
      propertyTags: [],
      assignedExecutive: [],
      assignedExecutiveItems: [],
      seoKeyword: [],
      seoKeywordItems: [],
      neighborHoodlist: [],
      profileDialogNH: false,
      neighborhoodDialog: false,
      nhType: "Add",
      nhIndex: -1,
      tempNeighbor: {
        name: "",
        distance: "",
        image: "",
        imagePath: "",
        editImage: false,
      },
      assignedTo: "",
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
      tempLocationUrl: "",
      editSaveStatus: false,
      dialogSave: false,
      dialogVideo: false,
      editedSeo: false,
      map: null,
      propertyFeaturedImageIndex: null,
      role: "",
    };
  },
  watch: {
    // tempLocationUrl(val) {
    //   setTimeout(this.loadMap("map"), 500);
    // },
    // latitude(val) {
    //   this.loadMap("point");
    // },
    // longitude(val) {
    //   this.loadMap("point");
    // },
    editedItem: {
      handler(val) {
        // console.log("asd", val );

        if (val.city) {
          if (typeof val.city == "object") {
            val.city = val.city.name;
          }
        }
        if (val.state) {
          if (typeof val.state == "object") {
            val.state = val.state.name;
          }
        }
        if (val.area) {
          if (typeof val.area == "object") {
            val.area = val.area.name;
          }
        }
        if (val.category) {
          if (typeof val.category == "object") {
            val.category = val.category.name;
            val.subCategory = "";
            this.getSubCategory();
          }
        }
        if (val.subCategory) {
          if (typeof val.subCategory == "object") {
            val.subCategory = val.subCategory.name;
          }
        }
        if (this.formType == "EDIT" && val.name && val.name.length) {
          val.urlSlug = (val.name + " " + val.city)
            .replace(/[^a-zA-Z0-9 ]/g, " ")
            .replace(/ +/g, " ")
            .trim()
            .split(" ")
            .join("-")
            .toLowerCase();

          this.editedItem.seoTitle = (val.name + " " + val.city)
            .replace(/[^a-zA-Z0-9 ]/g, " ")
            .replace(/ +/g, " ")
            .trim();
        }
        if (val.description && val.description.length) {
          val.seoDescription = val.description;
        }
        this.editSaveStatus = true;
      },
      deep: true,
    },
    // soldTo(val){
    //   if(val && val.length){
    //     val.forEach((e,i)=>{
    //       if(e && Object.keys(e).length && e._id){
    //         this.editedItem['soldTo'][i] = e._id
    //       }
    //     })
    //   }
    // }
  },
  methods: {
    // selectFeaturedimage(each, j) {
    //   this.editedItem.featuredImages = each;
    // },

    selectFeaturedimage(each, j) {
      this.editFeatured = true;
      this.propertyFeaturedImageIndex = j;
      this.editedItem.featuredImages = each;
      // console.log(each,this.editedItem.featuredImages)
    },
    openMapDialog() {
      this.dialogMap = true;
      this.location =
        this.editedItem.location &&
        this.editedItem.location.coordinates &&
        this.editedItem.location.coordinates.length
          ? this.editedItem.location
          : { coordinates: ["12.914107", "74.855735"], type: "Point" };
    },
    updateLocation(event) {
      //  console.log("locat", event);
      this.location = this.editedItem.location = event;
      this.dialogMap = false;
    },
    // updateArray(key, val) {
    //   this.editedItem[key].push(val.name ? val.name : val);
    //   console.log("kj", this.editedItem[key]);
    // },
    updatedBHKData(bhkData, i) {
      //  console.log("bhkData", bhkData);
      //  console.log("index", i);
      this.totalBhk[i] = bhkData;
      // this.totalBhk[i]["existingImgs"] = bhkData.existingImgs;
      // this.totalBhk[i]["addedImgs"] = bhkData.addedImgs;
      // console.log("totalBhk", this.totalBhk);
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
    async getCategories() {
      try {
        let { data } = await $fetch("/category/all", {
          method: "POST",
          baseURL: useRuntimeConfig().public.baseURL,
          server: false,
          headers: {
            Authorization: `Bearer ${useCookie("accessToken").value}`,
          },
          body: {
            options: {
              // sortBy: ["createdAt"],
              // sortDesc: [true],
            },
          },
        });
        let allCat = data.tableData;
        this.allCategory = data.tableData;
        this.category = allCat.filter((e) => {
          return e.type == "categories";
        });
        this.subCategory = allCat.filter((e) => {
          return e.type == "subCategory";
        });

        this.cities = allCat.filter((e) => {
          return e.type == "city";
        });
        this.state = allCat.filter((e) => {
          return e.type == "state";
        });
        this.area = allCat.filter((e) => {
          return e.type == "area";
        });
        this.featureItems = allCat.filter((e) => {
          return e.type == "Features & Amenities";
        });
        this.propertyTagsItems = allCat.filter((e) => {
          return e.type == "propertyTag";
        });

        this.type = allCat.filter((e) => {
          return e.type == "type";
        });

        // console.log("e", this.type, this.editedItem.type);
        if (this.editedItem.type && Object.keys(this.editedItem.type).length) {
          this.type.forEach((e) => {
            this.editedItem.type[e.name] = this.editedItem.type[e.name]
              ? this.editedItem.type[e.name]
              : 0;
          });
        } else {
          // console.log("else");
          this.editedItem["type"] = {};
          this.type.forEach((e) => {
            this.editedItem.type[e.name] = 0;
          });
        }
        // console.log("type", this.type,this.editedItem.type )
      } catch (err) {
        //  console.log("category error", err);

        useToast().error("Failed to fetch categories", {
          position: "top-right",
        });
      }
    },
    async getSubCategory() {
      try {
        if (this.editedItem.category) {
          // console.log("sub cat", this.allCategory, this.editedItem.category);
          this.subCategory = this.allCategory.filter((e) => {
            // if(this.editedItem.category && this.editedItem.category.name ){
            return (
              e.type == "subCategory" &&
              e.categories == this.editedItem.category
            );
            // }
          });
        }
      } catch (err) {
        console.log(err);
      }
    },
    async getOneProperty(id) {
      try {
        let { data } = await $fetch(
          `/property/${id}${
            this.$route.query.type && this.$route.query.type.length
              ? "?type=" + this.$route.query.type
              : ""
          }`,
          {
            method: "GET",
            baseURL: useRuntimeConfig().public.baseURL,
            server: false,
            headers: {
              Authorization: `Bearer ${useCookie("accessToken").value}`,
            },
          }
        );

        //  console.log("dd", data);
        this.editedItem = { ...data };
        // console.log("dd", this.editedItem);
        this.neighborHoodlist = [];
        if (
          this.editedItem.neighborhood &&
          this.editedItem.neighborhood.length
        ) {
          this.editedItem.neighborhood.forEach(async (e) => {
            this.neighborHoodlist.push({
              name: e.name,
              distance: e.distance,
              image: e.image,
              imagePath: getImage(e.image),
            });
          });
        }
        this.editedItem.featuredStartDate = this.editedItem.featuredStartDate
          ? new Date(this.editedItem.featuredStartDate)
              .toISOString()
              .split("T")[0]
          : null;
        this.editedItem.featuredEndDate = this.editedItem.featuredEndDate
          ? new Date(this.editedItem.featuredEndDate)
              .toISOString()
              .split("T")[0]
          : null;

        this.editedItem.priceMax = parseInt(this.editedItem.priceMax);
        this.editedItem.priceMin = parseInt(this.editedItem.priceMin);
        this.existingImgs = this.editedItem.images;
        if (this.editedItem.images && this.editedItem.images.length) {
          this.editedItem.images.forEach(async (e) => {
            this.propertyImages.push(getImage(e));
          });
        }
        if (this.editedItem.seoThumbnail) {
          this.seoImage = getImage(this.editedItem.seoThumbnail);
        }
        this.totalBhk = this.editedItem.bhkData;

        var istOffset = 5.5 * 60 * 60 * 1000;
        var istDate = new Date(
          new Date(this.editedItem.scheduledDate).getTime() + istOffset
        );
        this.editedItem.scheduledDate = istDate.toISOString().slice(0, 16);
      } catch (err) {
        console.log(err);
        useToast().error("Failed to fetch data", { position: "top-right" });
      }
    },
    async getImage() {
      console.log(
        "img",
        this.config.public.baseURL +
          "/img/" +
          "_" +
          "/" +
          this.config.public.s3URL +
          "/"
      );
      return (
        this.config.public.baseURL +
        "/img/" +
        "_" +
        "/" +
        this.config.public.s3URL +
        "/"
      );
    },
    async getExecutives() {
      try {
        let { data } = await $fetch("/executive/all", {
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
            filter: {
              isDeleted: [false],
            },
            type: "listAll",
          },
        });

        this.assignedExecutiveItems = data.tableData;
      } catch (err) {
        console.log(err);

        useToast().error("Failed to fetch data", { position: "top-right" });
      }
    },
    async cancelEdit() {
      if (this.editSaveStatus == true) {
        this.dialogSave = true;
      } else {
        // this.$router.push("/project");
      }
    },
    close() {
      this.dialogSave = false;
      this.$router.push("/project");
    },
    async saveData(saveType) {
      this.saveLoader = true;
      if (this.formType == "EDIT") {
        try {
          if (this.editedSeo) {
            this.editedItem["seoThumbnail"] = await this.uploadImage(
              this.seoImage,
              this.editedItem.urlSlug,
              "property"
            );
            this.seoImage = null;
          }
          if (this.editedItem["seoImg"]) {
            delete this.editedItem["seoImg"];
          }
          let images = [];
          images = this.existingImgs;

          if (this.addedImgs && this.addedImgs.length) {
            //  console.log("img", this.addedImgs);
            let url = "";
            await Promise.all(
              this.addedImgs.map(async (e, i) => {
                url = await this.uploadImage(
                  e,
                  this.editedItem.urlSlug,
                  "property"
                );
                images.push(url);
                url = "";
              })
            );
            this.addedImgs = [null];
            delete this.editedItem.addedImgs;
          }
          if (this.editFeatured) {
            this.editedItem.featuredImages =
              this.editedItem.images &&
              this.editedItem.images.length &&
              this.editedItem.images[this.propertyFeaturedImageIndex]
                ? this.editedItem.images[this.propertyFeaturedImageIndex]
                : "";
          } // if (images && images.length) {
          //   this.editedItem["images"] = images.filter(
          //     (element) => !element.startsWith("data:image/")
          //   );
          // }
          // this.editedItem["state"] = this.editedItem.state && this.editedItem.state.name?this.editedItem.state.name : this.editedItem.state;
          // this.editedItem["city"] = this.editedItem.city  && this.editedItem.city.name?this.editedItem.city.name : this.editedItem.city;
          // this.editedItem["area"] = this.editedItem.area && this.editedItem.area.name?this.editedItem.area.name : this.editedItem.area;

          // if (this.assignedTo && this.assignedTo.length) {
          //   this.editedItem.assignedTo = this.assignedTo;
          // }
          this.editedItem["bhkData"] = [];
          this.editedItem["bhkData"] = await this.getBhkData();
          this.editedItem["neighborhood"] = [];
          if (this.neighborHoodlist && this.neighborHoodlist.length) {
            //  console.log("neighbour", this.neighborHoodlist);
            for (let i = 0; i < this.neighborHoodlist.length; i++) {
              if (
                this.neighborHoodlist[i].editImage &&
                this.neighborHoodlist[i].imagePath.length
              ) {
                this.neighborHoodlist[i].image = await this.uploadImage(
                  this.neighborHoodlist[i].imagePath,
                  this.editedItem.urlSlug,
                  "property"
                );
                this.editedItem["neighborhood"].push({
                  name: this.neighborHoodlist[i].name,
                  distance: this.neighborHoodlist[i].distance,
                  image: this.neighborHoodlist[i].image,
                });
                delete this.neighborHoodlist[i].image;
                delete this.neighborHoodlist[i].imagePath;
              } else {
                this.editedItem["neighborhood"].push({
                  name: this.neighborHoodlist[i].name,
                  distance: this.neighborHoodlist[i].distance,
                  image: this.neighborHoodlist[i].image,
                });
              }
            }
          }
          for (let i = 0; i < this.editedItem["propertyTags"].length; i++) {
            if (
              typeof this.editedItem["propertyTags"][i] == "object" &&
              this.editedItem["propertyTags"][i].name
            ) {
              this.editedItem["propertyTags"][i] =
                this.editedItem["propertyTags"][i].name;
            }
          }
          this.editedItem["scheduledDate"] = new Date(
            this.editedItem.scheduledDate
          ).getTime();
          this.editedItem["featuredStartDate"] = new Date(
            this.editedItem.featuredStartDate
          ).getTime();
          this.editedItem["featuredEndDate"] = new Date(
            this.editedItem.featuredEndDate
          ).getTime();
          // console.log("edited data", this.editedItem);
          delete this.editedItem._id;
          delete this.editedItem.isEnabled;
          const { data } = await $fetch(`/property/draft/${this.propId}`, {
            method: "PUT",
            baseURL: useRuntimeConfig().public.baseURL,
            server: false,
            headers: {
              Authorization: `Bearer ${useCookie("accessToken").value}`,
            },
            body: this.editedItem,
          });
          if (data) {
            if (saveType == "publish") {
              await $fetch(`/property/publish/${this.propId}?draftId=${data}`, {
                method: "PUT",
                baseURL: useRuntimeConfig().public.baseURL,
                server: false,
                headers: {
                  Authorization: `Bearer ${useCookie("accessToken").value}`,
                },
              });
              useToast().success("Property updated & published successfully", {
                position: "top-right",
              });
            } else {
              useToast().success("Property updated & saved as draft", {
                position: "top-right",
              });
            }
            this.saveLoader = false;

            // this.getOneProperty(this.propId)
            window.location.reload();
          }

          this.$router.push("/pro");
        } catch (err) {
          console.log(err);
          this.saveLoader = false;
          useToast().error("Failed to update Property.", {
            position: "top-right",
          });
        }
      } else {
        try {
          if (this.seoImage) {
            this.editedItem["seoThumbnail"] = await this.uploadImage(
              this.seoImage,
              this.editedItem.urlSlug,
              "property"
            );
          }
          this.seoImage = null;
          if (this.editedItem["seoImage"]) {
            delete this.editedItem["seoImage"];
          }
          this.editedItem["images"] = [];

          if (this.propertyImages && this.propertyImages.length) {
            let url = "";
            await Promise.all(
              this.propertyImages.map(async (e, i) => {
                url = await this.uploadImage(
                  e,
                  this.editedItem.urlSlug,
                  "property"
                );
                this.editedItem["images"].push(url);
                url = "";
              })
            );
          }
          if (this.editFeatured) {
            this.editedItem.featuredImages =
              this.editedItem.images &&
              this.editedItem.images.length &&
              this.editedItem.images[this.propertyFeaturedImageIndex]
                ? this.editedItem.images[this.propertyFeaturedImageIndex]
                : "";
          }
          this.editedItem["address"] = this.editedItem.address;
          // this.editedItem["category"] = this.editedItem.category && this.editedItem.category.name ? this.editedItem.category.name : '';
          // this.editedItem["subCategory"] = this.editedItem.subCategory && this.editedItem.subCategory.name ? this.editedItem.subCategory.name : '';
          // this.editedItem["state"] = this.editedItem.state && this.editedItem.state.name?this.editedItem.state.name : this.editedItem.state;
          // this.editedItem["city"] = this.editedItem.city  && this.editedItem.city.name?this.editedItem.city.name : this.editedItem.city;
          // this.editedItem["area"] = this.editedItem.area && this.editedItem.area.name?this.editedItem.area.name : this.editedItem.area;
          this.editedItem["bhkData"] = [];
          this.editedItem["bhkData"] = await this.getBhkData();
          this.editedItem["neighborhood"] = [];
          if (this.neighborHoodlist && this.neighborHoodlist.length) {
            for (let i = 0; i < this.neighborHoodlist.length; i++) {
              if (
                this.neighborHoodlist[i].editImage &&
                this.neighborHoodlist[i].imagePath.length
              ) {
                this.neighborHoodlist[i].image = await this.uploadImage(
                  this.neighborHoodlist[i].imagePath,
                  this.editedItem.urlSlug,
                  "property"
                );
                this.editedItem["neighborhood"].push({
                  name: this.neighborHoodlist[i].name,
                  distance: this.neighborHoodlist[i].distance,
                  image: this.neighborHoodlist[i].image,
                });
                delete this.neighborHoodlist[i].imagePath;
              } else {
                this.editedItem["neighborhood"].push({
                  name: this.neighborHoodlist[i].name,
                  distance: this.neighborHoodlist[i].distance,
                  image: this.neighborHoodlist[i].image,
                });
              }
            }
          }
          for (let i = 0; i < this.editedItem["propertyTags"].length; i++) {
            if (
              typeof this.editedItem["propertyTags"][i] == "object" &&
              this.editedItem["propertyTags"][i].name
            ) {
              this.editedItem["propertyTags"][i] =
                this.editedItem["propertyTags"][i].name;
            }
          }
          this.editedItem["scheduledDate"] = new Date(
            this.editedItem.scheduledDate
          ).getTime();
          this.editedItem["featuredStartDate"] = this.editedItem
            .featuredStartDate
            ? new Date(this.editedItem.featuredStartDate).getTime()
            : null;
          this.editedItem["featuredEndDate"] = this.editedItem.featuredEndDate
            ? new Date(this.editedItem.featuredEndDate).getTime()
            : "";
          this.type.forEach((e) => {
            this.editedItem.type[e.name] = this.editedItem.type[e.name]
              ? parseInt(this.editedItem.type[e.name])
              : 0;
          });

          await $fetch(`/property?type=${saveType ? saveType : ""}`, {
            method: "POST",
            baseURL: useRuntimeConfig().public.baseURL,
            server: false,
            headers: {
              Authorization: `Bearer ${useCookie("accessToken").value}`,
            },
            body: this.removeEmptyValues(this.editedItem),
          });

          useToast().success("Property added successfully", {
            position: "top-right",
          });
          this.saveLoader = false;
          // this.getOneProperty(this.propId)
          this.$router.push("/properties");
        } catch (err) {
          console.log(err);
          this.saveLoader = false;
          useToast().error("Failed to add Property.", {
            position: "top-right",
          });
        }
      }
    },
    removeEmptyValues(obj) {
      // Convert the object to an array of key-value pairs
      const entries = Object.entries(obj);

      // Filter out key-value pairs where the value is empty
      const filteredEntries = entries.filter(
        ([_, value]) => value !== null && value !== undefined && value !== ""
      );

      // Convert the filtered array back to an object
      const filteredObj = Object.fromEntries(filteredEntries);

      return filteredObj;
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
    async uploadImage(image, urlSlug, path) {
      // console.log("img");
      try {
        const regex = /^data:\w+\/(\w+);base64,/;
        // console.log("pic", regex);
        const result = regex.exec(image);
        const fileExtension = result[1];
        const prefix = image.slice(0, image.indexOf(";base64,"));
        const mimeType = prefix.split(":")[1];

        let atob = await $fetch(image);

        const blob = new Blob([await atob.arrayBuffer()], {
          type: mimeType,
        });
        var formdata = new FormData();
        formdata.append("image", blob, `${urlSlug}.${fileExtension}`);
        formdata.append("urlSlug", urlSlug);
        formdata.append("path", path);

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
    async onFileChangedProfile(e) {
      // console.log(e);
      this.selectedFileProfile = e.target.files[0];
      if (this.selectedFileProfile) {
        this.tempPropImgs.push(this.selectedFileProfile);
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
      this.tempPropImgs.push(this.carriedImage);
      this.showImage = this.carriedImage;
      this.carriedImage = null;
      this.profileDialog = false;
    },
    // view image
    openViewPhoto(item) {
      this.viewImageDialog = true;
      this.showCase = item;
    },
    //neighbour

    saveCropNeighbor() {
      // this.tempNeighbor["image"] = this.carriedImage;
      this.tempNeighbor["imagePath"] = this.carriedImage;

      // console.log("save", this.tempNeighbor);
      this.profileDialogNH = false;
      this.carriedImage = null;
    },
    cancelCropNeighbor() {
      this.carriedImage = null;
      this.profileDialogNH = false;
    },
    addNeighbor() {
      // console.log("save");
      this.tempNeighbor["editImage"] = true;
      // console.log("save", this.tempNeighbor["editImage"]);
      if (this.nhType == "Add") {
        // console.log("Add");
        this.neighborHoodlist.push(this.tempNeighbor);
      } else {
        // console.log("edit");
        this.neighborHoodlist[this.nhIndex] = this.tempNeighbor;
      }
      // console.log("save", this.neighborHoodlist);
      this.carriedImage = null;
      this.tempNeighbor = {
        name: "",
        image: null,
        distance: "",
        imagePath: "",
      };
      this.neighborhoodDialog = false;
    },
    cancelNeighborChange() {
      this.carriedImage = null;
      this.tempNeighbor = { name: "", image: "", distance: "", imagePath: "" };
      this.neighborhoodDialog = false;
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
          this.profileDialogNH = true;
        });
      }
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
    // previewVideo() {
    //   var videoInput = document.getElementById("videoId");
    //   const preview = document.getElementById("preview");
    //   const file = videoInput.files[0];
    //   const reader = new FileReader();
    //   reader.onload = function () {
    //     preview.src = reader.result;
    //   };

    //   reader.readAsDataURL(file);
    // },

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
};
</script>
<script setup>
let fieldEnabled = ref(false);

let cancelEdit = async () => {
  fieldEnabled.value = false;
};
let SaveEdit = async () => {
  fieldEnabled.value = false;
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
