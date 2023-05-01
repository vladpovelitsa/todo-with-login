<template>
  <section class="login">
    <app-form @submit-form="tryLogin">
      <template v-slot:form-title> description</template>
      <template v-slot:form-fields>
        <app-input
          label="description"
          placeholder="Username"
          v-model="username.value"
          :error="username.error"
        />
        <app-input
          placeholder="Phone Number"
          type="tel"
          :error="userPhone.error"
          v-model="userPhone.value"
        />
      </template>
      <template v-slot:form-buttons>
        <app-button type="submit" :loading="loading">
          <template v-slot:default> Register</template>
        </app-button>
      </template>
    </app-form>
  </section>
</template>

<script>
import AppForm from "@/components/form/AppForm.vue";
import AppInput from "@/components/form/AppInput.vue";
import AppButton from "@/components/form/AppButton.vue";
import CheckField from "@/mixins/checkField";

export default {
  name: "LoginView",
  components: { AppButton, AppInput, AppForm },
  data() {
    return {
      username: {
        value: "",
        error: "",
      },
      userPhone: {
        value: "",
        error: "",
      },
      users: [],
      loading: false,
    };
  },
  filters: {
    onlyLetters: function (str) {
      if (str) {
        return str.toString().replace(/[^A-Za-zА-Яа-я|.|_]/g, "");
      }
    },
    cleanPhone: function (phone) {
      if (phone) {
        return phone.toString().replace(/[^0-9|-|(|)| |x]/g, "");
      }
    },
  },
  methods: {
    async tryLogin() {
      this.username.error = this.userPhone.error = "";
      if (!this.users.length) {
        await this.fetchUsers();
      }
      CheckField.check(this.username, () => {
        let user = this.users.find(
          (user) => user.username === this.username.value
        );
        if (user) {
          this.checkPhoneNumber(user);
        } else {
          this.username.error = "Username is not founded, try again";
        }
      });
    },
    async fetchUsers() {
      this.loading = true;
      this.users = await fetch(
        "https://jsonplaceholder.typicode.com/users"
      ).then((res) => res.json());
      this.loading = false;
    },
    checkPhoneNumber(user) {
      CheckField.check(this.userPhone, () => {
        let correctPhone =
          this.$options.filters.cleanPhone(user.phone) === this.userPhone.value;

        if (correctPhone) {
          this.$router.push(`user/${user.id}`);
        } else {
          this.userPhone.error = "Wrong phone number, try again";
        }
      });
    },
  },
  watch: {
    "username.value": function () {
      this.username.value = this.$options.filters.onlyLetters(
        this.username.value
      );
    },
    "userPhone.value": function () {
      this.userPhone.value = this.$options.filters.cleanPhone(
        this.userPhone.value
      );
    },
  },
};
</script>

<style lang="scss" scoped>
.login {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 25px;
  box-sizing: border-box;
}
</style>
