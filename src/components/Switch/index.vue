<template>
  <icon-svg
    :type="type"
    :style="{ fontSize: size, color: color }"
    @click="change"
  />
</template>
<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  props: {
    list: {
      type: Array,
      required: true,
    },
    value: {
      type: Boolean,
      default: true,
    },
    size: {
      type: String,
      default: "30px",
    },
    color: {
      type: String,
      default: "#fff",
    },
  },
  emits: ["change", "update:value"],
  data() {
    return {
      off: this.value,
    };
  },
  methods: {
    change() {
      this.off = !this.off;
      this.$emit("update:value", this.off);
      this.$emit("change", this.off);
    },
  },
  computed: {
    type() {
      return this.off ? this.list[0] : this.list[1];
    },
  },
});
</script>
