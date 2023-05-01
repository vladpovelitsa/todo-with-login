<template>
  <label :class="['app-input', { '--error': this.error }]">
    <span class="app-input__label" v-if="label">
      {{ label }}
    </span>
    <input
      class="app-input__field"
      :type="type"
      :placeholder="placeholder"
      :required="required"
      v-if="type !== 'textarea'"
      @input="$emit('input', $event.target.value)"
      :value="$attrs.modelValue"
    />
    <textarea
      class="app-input__field"
      :placeholder="placeholder"
      :required="required"
      v-else
      @input="$emit('input', $event.target.value)"
      :value="$attrs.modelValue"
    ></textarea>
    <span class="app-input__error" v-if="error">
      {{ error }}
    </span>
  </label>
</template>

<script>
export default {
  name: "AppInput",
  model: {
    prop: "modelValue",
    event: "input",
  },
  props: {
    label: String,
    type: {
      type: String,
      default: "text",
    },
    required: Boolean,
    placeholder: String,
    error: String,
  },
};
</script>

<style lang="scss" scoped>
.app-input {
  display: block;
  position: relative;
  &__label {
    display: block;
    margin-bottom: 14px;
    font-size: 15px;
    line-height: 1.4;
  }
  &__field {
    width: 100%;
    padding: 10px;
    border: 1px solid transparent;
    background: #fff;
    border-radius: 5px;
    box-sizing: border-box;
    letter-spacing: -0.025em;
    &::placeholder {
      color: #353535;
    }
  }
  &__error {
    color: red;
    font-size: 12px;
    position: absolute;
    left: 0;
    top: 100%;
    padding: 2px 10px;
  }
  &.--error {
    .app-input {
      &__field {
        border-color: red;
      }
    }
  }
}
</style>
