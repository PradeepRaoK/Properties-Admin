<script setup lang="ts">
import { QuillEditor } from "@vueup/vue-quill";
import "@vueup/vue-quill/dist/vue-quill.snow.css";
import BlotFormatter from "quill-blot-formatter";
</script>
<template>
  <div>
    <ClientOnly>
      <QuillEditor theme="snow" toolbar="essential" />
    </ClientOnly>
  </div>
</template>
