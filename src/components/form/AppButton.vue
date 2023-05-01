<template>
  <button class="app-button" :type="type" :disabled="disabled || loading">
    <slot v-if="!loading">Submit</slot>
    <span v-else>Loading...</span>
  </button>
</template>

<script>
export default {
  name: "AppButton",
  props: {
    type: {
      type: String,
      default: "submit",
    },
    loading: Boolean,
    disabled: Boolean,
  },
};
</script>

<style lang="scss" scoped>
.app-button {
  display: flex;
  justify-content: center;
  align-items: center;
  background: #519945;
  border-radius: 5px;
  padding: 10px 30px;
  gap: 10px;
  color: #fff;
  font-weight: 700;
  letter-spacing: -0.025em;
  width: 100%;
  border: 1px solid transparent;
  cursor: pointer;
  &[disabled] {
    filter: grayscale(100%);
  }
}
</style>
