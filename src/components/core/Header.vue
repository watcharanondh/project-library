<template>
  <div>
    <v-app-bar app color="white">
      <v-row>
        <v-toolbar-title>
          <div class="d-flex align-center">
            <v-img
              alt="School Logo "
              class="shrink mr-2"
              contain
              :src="require('@/assets/homepage/logo.jpg')"
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
          <h4>{{ link.text }}</h4>
        </v-tab>
    
          <div class="mt-5" v-if="$store.state.isLogged">
            <h4 class="orange--text  justify-center">
            สวัสดี : {{ fname | capitalize }}
            </h4>
          </div>
      </v-tabs>
     
          <v-btn v-if="$store.state.isLogged" icon @click="onClickLogOff">
            <v-icon>logout</v-icon>
          </v-btn>
    </v-app-bar>
  </div>
</template>

<script>
export default {
  name: "Header",
  fname:"",
  computed: {
    version() {
      return process.env.VUE_APP_VERSION;
    },
  },

  data: () => ({
    Position: localStorage.getItem("Position"),
    links: [
      { text: "หน้าหลัก", route: "/Dashboard" },
      { text: "เข้าสู่ระบบ", route: "/LoginUsers" },
    ],
  }),

  methods: {
    onClickLogOff() {
      this.$store.dispatch("doLogout");
      this.links.pop();
      this.links.push({ text: "เข้าสู่ระบบ", route: "/LoginUsers" });
      
    },
  },

  mounted() {
   this.fname  = localStorage.getItem("FName");
    if (this.Position == "admin") {
      this.links.push({ text: "Admin", route: "/Admin_Menu" });
      this.links.splice(1, 1);
    } else if (this.Position == "librarian") {
      this.links.push({ text: "บรรณารักษ์", route: "/Librarian_Menu" });
      this.links.splice(1, 1);
    } else if (this.Position == "personnel") {
      this.links.push({ text: "บุคลากร", route: "/Student_Personnel_Menu" });
      this.links.splice(1, 1);
    } else if (this.Position == "student") {
      this.links.push({ text: "นักเรียน", route: "/Student_Personnel_Menu" });
      this.links.splice(1, 1);
    }
  },
};
</script>

<style scoped></style>
