export default {
  check(field, additionalFunc) {
    if (field.value === "") {
      field.error = "This is required field";
    } else {
      additionalFunc();
    }
  },
};
