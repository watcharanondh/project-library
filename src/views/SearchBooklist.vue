<template>
  <v-container>
    <v-row>
      <v-col md="4"> </v-col>
      <v-col md="4">
        <v-col>
          <v-text-field
            label="book"
            single-line
            auto-select-first
            clearable
            deletable-chips
            filled
            rounded
            solo
            outlined
            type="text"
            class="todo-input"
            v-model="searchBookname"
            v-on:keyup.enter="Get_API_Databook"
          ></v-text-field>
        </v-col>
      </v-col>
      <v-col md="4">
        <v-col class="ma-2">
          <v-btn v-on:click="Get_API_Databook">ค้นหา</v-btn>
        </v-col>
      </v-col>
    </v-row>

    <v-row>
      <!--col1-->
      <v-col sm="2">
        <v-sheet color="grey lighten-3"></v-sheet>
      </v-col>
      <!--col2-->
      <v-col cols="12" sm="8">
        <!-- Table section -->
        <v-card>
          <v-data-table
            :search="search"
            :headers="headers"
            :items="mDataArray"
            v-model="search"
            @keyup.enter="getData"
          >
            <!-- table top section -->
            <template v-slot:top>
              <v-toolbar flat color="white">
                <v-toolbar-title>สืบค้นหนังสือที่เกี่ยวข้อง</v-toolbar-title>
                <v-spacer></v-spacer>
                <v-divider class="mx-5" inset vertical></v-divider>
                <v-text-field
                  v-model="searchBookname"
                  append-icon="search"
                  label="Search"
                  single-line
                  hide-details
                ></v-text-field>
              </v-toolbar>
            </template>

            <!-- table tr section -->
            <template v-slot:item="{ item }">
              <tr v-on:click="InfoBookclick(item)">
                <td>{{ item.Bib_ID }}</td>
                <td>
                  <v-img
                    :src="item.PicPath"
                    aspect-ratio="1"
                    width="100"
                    height="100"
                  ></v-img>
                </td>
                <td>{{ item.Title }}</td>
                <td>{{ item.Author }}</td>
                <td>{{ item.Publish }}</td>
                <td>{{ item.CallNo }}</td>
              </tr>
            </template>
          </v-data-table>
        </v-card>
      </v-col>
      <!--col3-->
      <v-col sm="2"><v-sheet color="grey lighten-3"></v-sheet> </v-col>
    </v-row>
  </v-container>
</template>
<script>
import axios from "axios";
export default {
  name: "SearchBooklist",
  data() {
    return {
      search: "",
      mDataArray: [],
      searchBookname: "",
      numid: "",

      headers: [
        {
          text: "ID",
          align: "left",
          sortable: false,
          value: "Bib_ID",
        },
        { text: "", value: "PicPath" },
        { text: "ชื่อเรื่อง", value: "Title" },
        { text: "ผู้แต่ง", value: "Author" },
        { text: "ผู้เผยแพร่", value: "Publish" },
        { text: "CallNo", value: "CallNo" },
      ],
    };
  },

  mounted() {
    this.searchBookname = this.$store.getters["keyword"];
  },

  methods: {
    Get_API_Databook() {
      if (this.searchBookname.trim() == 0) {
        return alert("กรุณากรอกข้อมูลหนังสือที่ต้องการค้น");
      } else {
        const url = `${process.env.VUE_APP_API_URL}/bibdata/findbook/${this.searchBookname}?StartPage=1&perPage=5`;
        axios.get(url).then((results) => {
          //this.results = response.data.Results;
          //console.log(JSON.stringify(results.data.Results));
          this.mDataArray = results.data.Results;
        });
      }
    },
    InfoBookclick(item) {
      this.numid = item.Bib_ID;
      console.log(this.numid);
      this.$store.dispatch({
        type: "inPutNumberbookID",
        numid: this.numid,
      });
      this.$router.push("/InformationBooks");
      // this.$router.push({
      //   path: "InformationBooks",
      //   query: { textSearch: this.books_ID },
      // });
    },
  },
};
</script>

<style lang="css" scoped></style>
