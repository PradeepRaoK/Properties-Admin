<template>
    <div>
      <cropper
        class="cropper"
        :src="src"
        :stencil-props="aspect"
        ref="cropper"
        @change="crop"
      ></cropper>
    </div>
  </template>
  <script>
  import { Cropper } from "vue-advanced-cropper";
  import "vue-advanced-cropper/dist/style.css";
  
  export default {
    props: ["tempDp", "src", "aspect"],
    data() {
      return {
        image: null,
        tempImg: null,
      };
    },
    watch: {
      value(val) {},
    },
    computed: {
      rat() {
        let dis = 0;
  
        return dis;
      },
    },
    methods: {
      crop() {
        const { coordinates, canvas, image } = this.$refs.cropper.getResult();
        this.tempImg = canvas.toDataURL('image/jpeg', 0.9);
        this.image = canvas.toDataURL('image/jpeg', 0.9);
        this.emitVal();
      },
      emitVal() {
        this.$emit("tempDp", this.image);
        // console.log(JSON.stringify(this.image));
      },
    },
    components: {
      Cropper,
    },
  };
  </script>
  <style scoped>
  .cropper {
    max-height: 400px;
    background: #ddd;
  }
  </style>
  