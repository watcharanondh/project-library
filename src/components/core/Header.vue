<template>
  <div>
    <v-app-bar app color="#FFFFFF">
      <v-row>
        <v-toolbar-title>
          <div class="d-flex align-center">
            <v-img
              alt="School Logo "
              class="shrink mr-2"
              contain
              :src="require('@/assets/logo.jpg')"
              max-height="50"
              max-width="50"
            />
            <h5 class="white orange--text text--darken-2 mt-1">
              โรงเรียนลับแลศรีวิทยา <br />
              LIBRARY LABLAESRIWITTAYA SCHOOL {{ version }}
            </h5>
          </div>
        </v-toolbar-title>
      </v-row>

      <v-spacer></v-spacer>

      <v-tabs right color="orange accent-4">
        <v-tab v-for="link in links" :key="link.text" router :to="link.route">
          <h4 class="white">{{ link.text }}</h4>
        </v-tab>
      </v-tabs>
      <v-spacer></v-spacer>
      <div v-if="$store.state.isLogged">{{$store.getters["username"] | capitalize}}</div>
      <v-btn v-if="$store.state.isLogged" icon @click="onClickLogOff">
        <v-icon>logout</v-icon>
      </v-btn>
    </v-app-bar>
  </div>
</template>

<script>
export default {
  name: "Header",
  computed: {
    version() {
      return process.env.VUE_APP_VERSION
    }
  },
methods:{
    onClickLogOff(){
    this.$store.dispatch('doLogout')
  }
},
  data: () => ({
    links: [
      { text: "หน้าหลัก", route: "/Dashboard" },
      { text: "เข้าสู่ระบบ", route: "/LoginUsers" },
    ],
  }),
};
</script>

<style scoped></style>
