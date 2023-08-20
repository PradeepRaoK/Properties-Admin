<template>
  <div>
    <v-container>
      <v-row>
        <v-col>
          <PhoneDetailsTable />
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <EmailDetailsTable />
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <SociamMediaTable />
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>
<script setup>
let phoneDetails = ref({
  title: "Phone Details",
  data: [
    { id: 1, link: "", text: "+91 9191923392" },
    {
      id: 2,
      link: "",
      text: "+91 9191923333",
    },
    {
      id: 3,
      link: "",
      text: "+91 9193223392",
    },
  ],
});
let emailDetails = ref({
  title: "Email Details",
  data: [
    { id: 1, link: "", text: "abc@gmail.com" },
    {
      id: 2,
      link: "",
      text: "abc@gmail.com",
    },
    {
      id: 3,
      link: "",
      text: "1abc@gmail.com",
    },
  ],
});
let socialMediaDetails = ref({
  title: "Social Media Details",
  data: [
    { id: 1, link: "", text: "+1987981273", icon: "mdi-whatsapp" },
    {
      id: 2,
      link: "sfkjshfkshfk",
      text: "abc@gmail.com",
      icon: "mdi-facebook",
    },
    {
      id: 3,
      link: "",
      text: "1abc@gmail.com",
      icon: "mdi-gmail",
    },
    {
      id: 4,
      link: "",
      text: "1abc@sd.com",
      icon: "mdi-instagram",
    },
  ],
});
</script>
