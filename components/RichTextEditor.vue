<template>
  <div>
    <ClientOnly>
      <QuillEditor ref="editorRef" theme="snow" toolbar="essential" />
    </ClientOnly>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from "vue";
import { QuillEditor } from "@vueup/vue-quill";
import "@vueup/vue-quill/dist/vue-quill.snow.css";
import BlotFormatter from "quill-blot-formatter";

const editorRef = ref(null);

const modules = {
  name: "blotFormatter",
  module: BlotFormatter,
  options: {
    /* options */
  },
};

onMounted(() => {
  const quill = editorRef.value?.$refs.quill;

  if (quill) {
    watch(
      () => quill.getContents(),
      (delta) => {
        const htmlContent = convertDeltaToHtml(delta);
        console.log(htmlContent);
      }
    );
  }
});

function convertDeltaToHtml(delta) {
  return delta;
}
</script>
