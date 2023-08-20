<template>
  <v-card elevation="0" style="background: transparent">
    <v-container>
      <v-card class="pa-10 border20">
        <v-row class="mb-2 justify-space-between">
          <v-col cols="7">
            <h2 class="text-primary pa-3 text-left">
              BHK details &nbsp;
              <v-btn
                color="primary"
                @click="totalBhk.push(defaultBhkData)"
                icon="mdi-plus"
              ></v-btn>
            </h2>
          </v-col>
        </v-row>
        <v-container>
          <v-row class="justify-center">
            <v-col class="mx-0 px-0" lg="11" md="12">
              <v-expansion-panels class="pa-0">
                <v-expansion-panel
                  v-for="(count, k) in totalBhk"
                  :key="k"
                  class="bg-fourthColor pa-0"
                >
                  <v-expansion-panel-title class="d-flex text-primary">
                    <span>{{ count.bhk ? count.bhk : "" }} BHK details </span>
                    <v-spacer></v-spacer>
                    <v-btn
                      @click="totalBhk.splice(k, 1)"
                      size="small"
                      icon="mdi-delete"
                    ></v-btn>
                  </v-expansion-panel-title>
                  <v-expansion-panel-text>
                    <BhkComponent
                      :category="allCategory"
                      :bhkData="count"
                      @updatedBHKData="updatedBHKData($event, k)"
                    />
                  </v-expansion-panel-text>
                </v-expansion-panel>
              </v-expansion-panels>
            </v-col>
          </v-row>
        </v-container>
      </v-card>
    </v-container>
  </v-card>
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
      cities: [],
      state: [],
      area: [],
      type: {},
      propId: "",
      defaultBhkData: [
        {
          bhk: "",
          urlSlug: "",
          features: [],
          bathRooms: "",
          balconys: "",
          propertyTags: [],
          sqftMin: "",
          sqftMax: "",
          price: "",
          seoTitle: "",
          seoKeyword: "",
          seoDescription: "",
          type: {},
          video: "",
          images: [],
          floorData: [
            {
              name: "",
              sqft: "",
              price: 0,
              bathRooms: "",
              balconys: "",
              description: "",
              isSold: false,
              type: {},
              images: [""],
              isDeleted: false,
              urlSlug: "",
            },
          ],
        },
      ],
      tempPropImgs: [],
      formType: "ADD",
      totalBhk: [],
      dialog: false,
      edit: false,
      // should come from prop
      formTitle: "ADD property",
      editedItem: {
        name: "",
        urlSlug: "",
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
        if (this.formType != "EDIT" && val.name && val.name.length) {
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
    // async getImage() {
    //   console.log("img",  this.config.public.baseURL +
    //     "/img/" +
    //     "_" +
    //     "/" +
    //     this.config.public.s3URL +
    //     "/")
    //   return (
    //     this.config.public.baseURL +
    //     "/img/" +
    //     "_" +
    //     "/" +
    //     this.config.public.s3URL +
    //     "/"
    //   );
    // },
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
    async goBack() {
      if (this.editSaveStatus == true) {
        this.dialogSave = true;
      } else {
        this.$router.push("/properties");
      }
    },
    close() {
      this.dialogSave = false;
      this.$router.push("/properties");
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
            project: {
              name: 1,
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
    async getBhkData() {
      try {
        //     console.log("bhk", this.totalBhk);

        await Promise.all(
          this.totalBhk.map(async (bhk, i) => {
            bhk["urlSlug"] = bhk["urlSlug"] + "-" + this.editedItem.urlSlug;
            if (bhk.editedSeo) {
              bhk["seoThumbnail"] = await this.uploadImage(
                bhk.seoImg,
                bhk.urlSlug,
                `property/${this.editedItem.urlSlug}`
              );
            }
            delete bhk.seoImg;
            bhk["images"] = bhk.existingImgs;
            delete bhk.existingImgs;
            if (bhk.addedImgs && bhk.addedImgs.length) {
              let url = "";
              await Promise.all(
                bhk.addedImgs.map(async (eImg, i) => {
                  url = await this.uploadImage(
                    eImg,
                    bhk.urlSlug,
                    `property/${this.editedItem.urlSlug}`
                  );
                  bhk["images"].push(url);
                  url = "";
                })
              );
              bhk.addedImgs = [null];
              delete bhk.addedImgs;
            }
            this.type.forEach((e) => {
              bhk.type[e.name] = bhk.type[e.name]
                ? parseInt(bhk.type[e.name])
                : 0;
            });
            if (bhk.floorData && bhk.floorData.length) {
              await Promise.all(
                bhk.floorData.map(async (eachFloor, i) => {
                  eachFloor["urlSlug"] =
                    eachFloor["urlSlug"] + "-" + bhk.urlSlug;
                  eachFloor["images"] = eachFloor.existingImgs;
                  delete eachFloor.existingImgs;
                  if (eachFloor.addedImgs && eachFloor.addedImgs.length) {
                    let url = "";
                    await Promise.all(
                      eachFloor.addedImgs.map(async (img, i) => {
                        url = await this.uploadImage(
                          img,
                          eachFloor.urlSlug,
                          `property/${this.editedItem.urlSlug}/${bhk.urlSlug}`
                        );
                        eachFloor["images"].push(url);
                        url = "";
                      })
                    );
                  }
                  this.type.forEach((e) => {
                    eachFloor.type[e.name] = eachFloor.type[e.name]
                      ? parseInt(eachFloor.type[e.name])
                      : 0;
                  });
                  eachFloor.addedImgs = [null];
                  delete eachFloor.addedImgs;
                })
              );
            }
          })
        );
        //    console.log("bhk", this.totalBhk);
        return this.totalBhk;
      } catch (err) {
        console.log(err);
      }
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

          // this.$router.push("/properties");
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
      this.seoImage = this.carriedImage;
      this.carriedImage = null;
      this.seoDialog = false;
      this.editedSeo = true;
    },
    async getUser() {
      try {
        const response = await $fetch("/admin/auth/user", {
          method: "GET",
          server: false,
          baseURL: useRuntimeConfig().public.baseURL,
          headers: {
            Authorization: `Bearer ${useCookie("accessToken").value}`,
          },
        });

        console.log(response.data.role);
        this.role = response.data.role;
        if (this.role == "ADMIN") {
          this.getExecutives();
        }
      } catch (err) {
        console.log(err);
      }
    },
  },
  async created() {
    let route = this.$route.path;
    // this.propId = route.split("/")[2];
    // if (this.propId != "new-property") {
    //   this.formType = "EDIT";
    //   this.getOneProperty(this.propId);
    // } else {
    this.totalBhk = [];
    // }
    // this.getCategories();
    // this.getUser();
    // this.getTransactors();
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
