<template>
  <v-app>
    <Header/>
    <Content />
    <Footer />
  </v-app>
</template>

<script>
import Header from "@/components/core/Header";
import Footer from "@/components/core/Footer";
import Content from "@/components/core/Content";
import store from "@/store/index";

export default {
  name: "App",
  store,
  components: {
    Header,
    Footer,
    Content,
  },
  mounted() {
    this.$store.dispatch({ type: "restoreLogin" });
  },

};
</script>
