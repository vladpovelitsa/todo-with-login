<template>
  <div id="app">
    <app-header />
    <router-view />
    <app-footer />
  </div>
</template>
<script>
import AppHeader from "@/components/common/AppHeader.vue";
import AppFooter from "@/components/common/AppFooter.vue";

export default {
  name: "App",
  components: { AppFooter, AppHeader },
};
</script>
