//components/Icon-svg
<template>
  <svg class="svg-icon" aria-hidden="true">
    <use :xlink:href="`#${type}`"></use>
  </svg>
</template>

<script lang="ts">
export default {
  name: 'icon-svg',
  props: {
    type:{
      type: String,
      required: true
    }
  },

}
</script>

<style>
.svg-icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
  cursor: pointer;
}
</style>


