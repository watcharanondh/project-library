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

    <v-row>
      <!--col1-->
      <v-col sm="2">
        <v-sheet color="grey lighten-3"></v-sheet>
      </v-col>
      <!--col2-->
      <v-col cols="1" sm="8">
        <v-sheet min-height="70vh" rounded="lg">
          <v-divider class="mt-2 mb-2"></v-divider>
          <div class="d-flex flex-wrap">
            <v-card
              v-for="item in results"
              :key="item.Bib_ID"
              class="ma-4"
              max-width="344"
              outlined
              @click="handleBookclick(Book)"
            >
              <v-list-item three-line>
                <v-list-item-content>
                  <div class="overline mb-4">เผยแพร่:{{ item.Publish }}</div>
                  <v-list-item-title class="headline mb-1">
                    {{ item.Title }}
                  </v-list-item-title>
                  <v-list-item-subtitle>
                    ผู้แต่ง:{{ item.Title }} <br />
                    CallNo:{{ item.CallNo }} <br />
                  </v-list-item-subtitle>
                </v-list-item-content>

                <img
                  :src="item.PicPath"
                  alt=""
                  :style="{ width: '80px', marginTop: '30px' }"
                />
              </v-list-item>
            </v-card></div
        ></v-sheet>
        <div class="text-center">
          <v-pagination v-model="page" :length="5"></v-pagination>
        </div>
      </v-col>
      <!--col3-->
      <v-col sm="2"><v-sheet color="grey lighten-3"></v-sheet> </v-col>
    </v-row>
  </div>
</template>
<script>
import axios from "axios";
export default {
  name: "todo-input",
  data() {
    return {
      page: 1,
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
      //console.log(url);
      axios.get(url).then((response) => {
        this.results = response.data.Results;
        console.log(this.results);
      });
    },
    handleBookclick(Book) {
      window.location = Book.url;
    },
  },
};
</script>

<style lang="css" scoped></style>
