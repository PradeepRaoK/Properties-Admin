<template>
  <div class="row">
    <div class="col-6">
      <h3>Draggable {{ draggingInfo }}</h3>

      <draggable
        v-model="list"
        :disabled="!enabled"
        :list="list"
        :item-key="itemKey"
        class="list-group"
        ghost-class="ghost"
      >
        <template #item="{ element: list }">
          <div
            class="list-group-item"
            v-for="element in list"
            :key="element.name"
          >
            {{ element.name }}
          </div>
        </template>
      </draggable>
    </div>
  </div>
</template>

<script>
let id = 1;
export default {
  name: "simple",
  display: "Simple",
  order: 0,

  data() {
    return {
      enabled: true,
      list: [
        { name: "John", id: 0 },
        { name: "Joao", id: 1 },
        { name: "Jean", id: 2 },
      ],
      dragging: false,
    };
  },
  computed: {
    draggingInfo() {
      return this.dragging ? "under drag" : "";
    },
  },
  methods: {
    itemKey() {
      return (list) => list.id;
    },
    checkMove: function (e) {
      window.console.log("Future index: " + e.draggedContext.futureIndex);
    },
  },
};
</script>
<style scoped>
.buttons {
  margin-top: 35px;
}

.ghost {
  opacity: 0.5;
  background: #c8ebfb;
}
</style>
