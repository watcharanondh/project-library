<template>
  <div>
    <v-row>
      <v-col md="4"> </v-col>
      <v-col md="4">
        <v-col>
          <v-text-field
            label="book"
            single-line
            outlined
            type="text"
            class="todo-input"
            v-model="searchBookname"
            @keyup.enter="getData"
          ></v-text-field>
        </v-col>
      </v-col>
      <v-col md="4">
        <v-col class="ma-2"> 
          <v-btn @click="getData">ค้นหา</v-btn>
        </v-col>
      </v-col>
    </v-row>

    <v-divider class="mt-2 mb-2"></v-divider>
    <div class ="d-flex flex-wrap">
      <v-card
        v-for="[key, bookname] in Object.entries(results)"
        :key="bookname.Bib_ID"
        class="ma-4"
        max-width="344"
        outlined
        @click="handleBookclick(Book)"
      >
        <v-list-item three-line>
          <v-list-item-content>
            <div class="overline mb-4">Publishing:{{ key }}</div>
            <v-list-item-title class="headline mb-1">
              {{ bookname.field }}
            </v-list-item-title>
            <v-list-item-subtitle></v-list-item-subtitle>
          </v-list-item-content>

          <img
            :src="image"
            alt="กำลังดำเนินการ..."
            :style="{ width: '80px', marginTop: '30px' }"
          />
        </v-list-item>
      </v-card>
    </div>
  </div>
</template>
<script>
import axios from "axios";
export default {
  name: "todo-input",
  data() {
    return {
      searchBookname: "",
      results: [],
    };
  },

  mounted() {
    //console.log(this.$route.query.textSearch);
    this.searchBookname = this.$route.query.textSearch;
  },

  methods: {
    getData() {
      if (this.searchBookname.trim() == 0) {
        return;
      }
      const url = `${this.$config.apiUrl}/bibdata/findbook/${this.searchBookname}?StartPage=1&perPage=5`;
      axios.get(url).then((res) => {
        // console.log(res);
        this.results = res.data.Results;
        let temp = {};
        res.data.Results.forEach((element1) => {
          element1.forEach((element2) => {
            console.log(element2);
            if (!temp[element2.Bib_ID]) {
              temp[element2.Bib_ID] = { field: "", subField: "" };
            }
            temp[element2.Bib_ID].field += " " + element2.Field;
            temp[element2.Bib_ID].subField += " " + element2.Subfield;
          });
        });
        this.results = temp;
        console.log(temp);
      });
    },
    handleBookclick(Book) {
      window.location = Book.url;
    },
  },
};
</script>

<style lang="css" scoped></style>
