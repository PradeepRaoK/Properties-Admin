<template>
  <v-container>
    <v-card class="pa-5">
      <v-card-title> Add Location Data </v-card-title>
      <!--<v-card-text>-->
        <v-row class="mt-4 mb-4">
          <!--<v-col>-->
            <!-- <v-text-field
              v-model="tempLocationUrl"
              density="compact"
              label="Search Location"
              color="primary"
              variant="outlined"
              hide-details="auto"
            ></v-text-field> -->
            <vue-google-autocomplete
              id="address"
              style="width: 100%; height: 30px"
              placeholder="Please type your address and click on down arrow"
              v-on:placechanged="getAddressData"
              country="in"
              
            >
            </vue-google-autocomplete>
          <!--</v-col>-->
        </v-row>
        <v-row>
          <GoogleMap
            ref="mapRef"
            :api-key="API_KEY"
            style="width: 100%; height: 250px"
            :center="center"
            :zoom="15"
            :streetViewControl="false"
            :mapTypeControl="false"
            @click="(e) => clicked(e)"
          >
            <Marker
              :options="{
                position: center,
              }"
            />
          </GoogleMap>
        </v-row>

        <v-row>
          <v-col>
            <v-text-field
              v-model="latitude"
              density="compact"
              label="Latitude"
              color="primary"
              variant="outlined"
              hide-details="auto"
            ></v-text-field>
          </v-col>
          <v-col>
            <v-text-field
              v-model="longitude"
              density="compact"
              label="Longitude"
              color="primary"
              variant="outlined"
              hide-details="auto"
            ></v-text-field>
          </v-col>
          <v-col>
            <v-btn @click="loadLatLon()">Load</v-btn>
          </v-col>
        </v-row>
      <!--</v-card-text>-->
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          size="large"
          variant="outlined"
          color="primary"
          @click="
            tempLocationUrl = '';
            latitude = '';
            longitude = '';
          $emit('close');
          "
          >Cancel</v-btn
        >
        <v-btn size="large" class="bg-primary" @click="$emit('updateLocation', {
    coordinates:[latitude, longitude],
    type:'Point'
  } )">SAVE</v-btn>
        <v-spacer></v-spacer>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script>
import { GoogleMap, Marker } from "vue3-google-map";
import VueGoogleAutocomplete from "vue-google-autocomplete";
export default {
  components: { GoogleMap, Marker, VueGoogleAutocomplete },
};
</script>

<script setup>
// const emit = defineEmits(['updateLocation'])
let props = defineProps({
  location: {
    type: Object,
  },
});
let gmap = null;
const mapRef = ref(null);
const API_KEY = useRuntimeConfig().public.GOOGLE_MAPS_API_KEY;
let tempLocationUrl = ref("");
let latitude = ref("12.914107");
let longitude = ref("74.855735");
let center = ref();

if(props.location && props.location.coordinates && props.location.coordinates.length){
  latitude.value = props.location.coordinates[0]
  longitude.value = props.location.coordinates[1]
}
loadLatLon();

// watch(
//   () => mapRef.value?.ready,
//   (ready) => {
//     if (ready) {
//       gmap = mapRef.value.map;
//     }
//   }
// );

let saveLocation = ()=>{
  let data = {
    coordinates:[latitude.value, longitude.value],
    type:"Point"
  }
  // emit('updateLocation', data )
}

function clicked(e) {
  center.value = { lat: e.latLng.lat(), lng: e.latLng.lng() };
  latitude.value = e.latLng.lat();
  longitude.value = e.latLng.lng();
}

function loadLatLon() {
  center.value = {
    lat: parseFloat(latitude.value),
    lng: parseFloat(longitude.value),
  };
}

function getAddressData(addressData, placeResultData, id) {
  latitude.value = addressData.latitude;
  longitude.value = addressData.longitude;
  loadLatLon();
}
</script>
