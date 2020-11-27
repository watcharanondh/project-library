<template>
  <v-parallax height="607" class="grey lighten-3">
    <v-container>
      <v-img
        :src="require('@/assets/WC.jpg')"
        class="my-3"
        contain
        height="350"
      />

      <h4 class="subheading black--text text-center mt-9">
        สืบค้นหนังสือ
      </h4>

      <v-layout row>
        <v-flex xs12 md4></v-flex>
        <v-flex xs12 md4 mt-5>
          <div :form="form">
          <v-text-field
            auto-select-first
            clearable
            deletable-chips
            filled
            rounded
            solo
            type="text"
            class="todo-input"
            v-model="searchBook"
            @keyup.enter="addTodo"
          ></v-text-field>
          </div>
          <!-- <button type="submit" @click="onLogin($event)" >ค้นหา</button> -->
        </v-flex>
        <v-flex xs12 md4></v-flex>
      </v-layout>
      <h2 class="subtitle-1 font-weight-thin mb-4 black--text text-center">
        ระบุคำค้น เช่น ชื่อหนังสือ, ชื่อผู้แต่ง , หมายเลข ISBN ฯลฯ
      </h2>
    </v-container>
  </v-parallax>
</template>

<script>

export default {
   methods: {
    addTodo() {
      if (this.searchBook.trim() == 0) {
        return;
      }
      this.$emit('searchBook')
      //window.location = "/SearchBooklist";
    },
  },

  data() {
    return {
      form: {
       searchBook:""
      }    
  }
}
}
</script>

<style scoped></style>

    