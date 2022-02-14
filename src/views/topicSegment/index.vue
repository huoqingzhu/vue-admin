<template>
  <router-view :key="$route.path" />
</template>

<script>
export default {
  name: "topicSegment",
  data() {
    return {};
  },
  computed: {},
  watch: {},
  methods: {},
  created() {},
  mounted() {
    this.$nextTick(() => {});
  },
  components: {},
  beforeDestroy() {},
};
</script>
