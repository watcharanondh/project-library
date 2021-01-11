<template>
  <v-container style="background:#E0E0E0;color:white;height:100%">
    <v-img
      :src="require('@/assets/homepage/WC.jpg')"
      class="my-3"
      contain
      height="350"
    />
    <br/>
    <h4 class="subheading black--text text-center ">
      สืบค้นหนังสือ
    </h4>
    <br/>
    <v-layout row>
      <v-flex xs12 md4></v-flex>
      <v-flex xs12 md4>
        <div>
          <v-text-field
            auto-select-first
            clearable
            deletable-chips
            filled
            rounded
            solo
            type="text"
            class="DashBoard"
            v-model="searchBook"
            v-on:keyup.enter="searchBookname"
          ></v-text-field>
        </div>
      </v-flex>
      <v-flex xs12 md4></v-flex>
    </v-layout>
     <br/>
    <h2 class="subtitle-1 font-weight-thin mb-4 black--text text-center">
      ระบุคำค้น เช่น ชื่อหนังสือ, ชื่อผู้แต่ง , หมายเลข ISBN ฯลฯ
    </h2>
  </v-container>
</template>

<script>
export default {
  name: "DashBoard",
  data() {
    return {
      searchBook: "",
    };
  },
  methods: {
    searchBookname() {
      if (this.searchBook.trim() == 0) {
        return alert("กรุณากรอกข้อมูลหนังสือที่ต้องการค้น");
      } else {
        this.$store.dispatch({
          type: "inPutkeyword",
          keyword: this.searchBook,
        });
        this.$router.push("/SearchBooklist");
      }
    },
  },
};
</script>

<style scoped></style>
