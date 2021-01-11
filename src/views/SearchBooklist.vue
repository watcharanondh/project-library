<template>
  <v-container style="background:#E0E0E0;color:white">
    <v-row>
      <!--col1-->
      <v-col sm="2">
        <v-sheet color="black"></v-sheet>
      </v-col>
      <!--col2-->
      <v-col cols="12" sm="8">
        <!-- Table section -->
        <v-card>
          <v-data-table
            :search="searchBookname"
            :headers="headers"
            :items="mDataArray"
            :items-per-page="5"
            class="elevation-1"
          >
            <!-- table top section -->
            <template v-slot:top>
              <v-toolbar dark flat color="orange lighten-2">
                <v-toolbar-title class="text--black">สืบค้นหนังสือที่เกี่ยวข้อง</v-toolbar-title>
                <v-divider class="mx-5" inset vertical></v-divider>
                <v-spacer></v-spacer>
                <v-divider class="mx-5" inset vertical></v-divider>
                <v-row>
                  <v-text-field
                    v-model="searchBookname"
                    v-on:keyup.enter="Get_API_Databook"
                    clearable
                    flat
                    solo-inverted
                    hide-details
                    prepend-inner-icon="mdi-magnify"
                    label="ค้นหา"
                  ></v-text-field>
                </v-row>
                <div class="ms-10">
                  <v-btn
                    @click="Get_API_Databook"
                    color="primary"
                    dark
                    class="mb-2"
                  >
                    <v-icon left>search</v-icon>
                    <span>ค้นหา</span>
                  </v-btn>
                </div>
              </v-toolbar>
            </template>
            <!-- table tr section -->
            <template v-slot:item="{item}">
              <tr v-on:click="InfoBookclick(item)">
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
  data: () => ({
    mDataArray: [],
    searchBookname: "",
    numid: "",

    headers: [
      { text: "รูป", value: "PicPath", align: "center" },
      { text: "ชื่อเรื่อง", value: "Title", align: "center" },
      { text: "ผู้แต่ง", value: "Author", align: "center" },
      { text: "ผู้เผยแพร่", value: "Publish", align: "center" },
      { text: "CallNo", value: "CallNo", align: "center" },
    ],
  }),

  mounted() {
    this.searchBookname = this.$store.getters["keyword"];
    const url = `${process.env.VUE_APP_API_URL}/bibdata/findbook/${this.searchBookname}?StartPage=1&perPage=5`;
        axios.get(url).then((results) => {
          this.mDataArray = results.data.Results;
        });
  },


  methods: {
    Get_API_Databook() {
      if (this.searchBookname.trim() == 0) {
        return alert("กรุณากรอกข้อมูลหนังสือที่ต้องการค้นหา");
      } else {
        const url = `${process.env.VUE_APP_API_URL}/bibdata/findbook/${this.searchBookname}?StartPage=1&perPage=5`;
        axios.get(url).then((results) => {
          this.mDataArray = results.data.Results;
        });
      }
    },
    InfoBookclick(item) {
      console.log(item);
      this.$store.dispatch({
        type: "inPutNumberbookID",
        numid: item.Bib_ID,
      });
      this.$router.push("/InformationBooks");
    },

  }
};
</script>

<style></style>
