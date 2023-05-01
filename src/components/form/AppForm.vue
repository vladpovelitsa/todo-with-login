<template>
  <form class="form" @submit.prevent="$emit('submit-form')">
    <section class="form__name">
      <slot name="form-title"></slot>
    </section>
    <section class="form__content">
      <slot name="form-fields"></slot>
    </section>
    <section class="form__buttons">
      <slot name="form-buttons"></slot>
    </section>
  </form>
</template>

<script>
export default {
  name: "AppForm",
};
</script>

<style lang="scss" scoped>
.form {
  background: #c4c4c4;
  border-radius: 5px;
  width: 100%;
  max-width: 447px;
  &__name {
    background: #a5a5a5;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 10px;
    padding: 15px 0;
    border-radius: 5px 5px 0 0;
  }
  &__content {
    padding: 15px 25px 25px;
    display: flex;
    flex-direction: column;
    gap: 20px;
  }
  &__buttons {
    padding: 0 25px 25px;
  }
}
</style>
