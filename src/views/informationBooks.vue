<template>
  <div id="macr21books-table">
    <v-container class="grey lighten-3">
      <v-row>
        <v-col cols="6" md="4">
          <v-card class="pa-2" outlined tile color="grey lighten-3"> </v-card>
        </v-col>
        <v-col cols="12" md="3">
          <v-card 
            v-for="item in bookinfo[0]"
            :key="item.Title"
            class="pa-2" outlined tile color="grey lighten-3">
            {{item.Title}}
          </v-card>
        </v-col>
      </v-row>

      <!--หัวข้อชื่อหนังสือ และ ข้อมูลรายละเอียด-->
      <v-row>
        <v-col cols="12" md="4">
          <v-card
            v-for="item in bookinfo[0]"
            :key="item.PicPath"
            class="pa-2"
            outlined
            tile
            color="grey lighten-3"
          >
            <v-img
              :src="item.PicPath"
              alt=""
                class="my-3"
                contain
                height="350"
              
            />
          </v-card>
        </v-col>
        <v-col cols="12" md="8">
          <v-card  v-for="item in bookinfo[0]"
            :key="item"
          class="pa-2" outlined tile color="grey lighten-3">
            ผู้แต่ง : {{item.Author}} <br />
            สำนักพิมพ ์: {{item.Publish}}
            <br />
            เลขเรียกหนังสือ : {{item.CallNo}} <br />
            หมายเลข ISBN : {{item.ISBN}} <br />
          </v-card>
        </v-col>
      </v-row>

      <!-- รายการ กับ MARC21 -->
      <v-row>
        <v-col md="1">
          <v-card class="pa-2 white--text" outlined tile color="grey darken-2">
            <div class="text-center">รายการ</div>
          </v-card>
        </v-col>
        <v-col md="5">
          <v-card class="pa-2" outlined tile color="grey lighten-3"> </v-card>
        </v-col>

        <v-col md="1">
          <v-card class="pa-2 white--text" outlined tile color="grey darken-2">
            <div class="text-center">MARC</div>
          </v-card>
        </v-col>
      </v-row>

      <v-row>
        <v-col md="3">
          <div class="text-left">
            <table>
              <thead>
                <tr>
                  <th>Barcode</th>
                  <th>Copy</th>
                  <th>CallNo</th>
                  <th>สถานะ</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(items, index) in bookinfo[2]" :key="index">
                  <td>{{ items.Barcode }}</td>
                  <td>{{ items.Bib_ID }}</td>
                  <td>{{ items.CallNo }}</td>
                  <td>{{ items.borrowandreturn_bnr_ID }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </v-col>
        <v-col md="3"> </v-col>
        <v-col md="1">
          <div class="text-left">
            <table>
              <thead>
                <tr>
                  <th>Tag</th>
                  <th>Indicator1</th>
                  <th>Indicator2</th>
                  <th>Subfield</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(item, index) in bookinfo[1]" :key="index">
                  <td>{{ item.Field }}</td>
                  <td>{{ item.Indicator1 }}</td>
                  <td>{{ item.Indicator2 }}</td>
                  <td>{{ item.Subfield }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "macr21books-table",
  data() {
    return {
      configs: this.$config,
      bookID: "",
      bookinfo:[],
    };
  },
  mounted() {
    this.bookID = this.$route.query.textSearch;
    axios
      .get(`${this.$config.apiUrl}/bibdata/allbib/${this.bookID}`)
      .then(response => {
        this.bookinfo = response.data;
        console.log("response: ", this.bookinfo)
      })
  },
  // methods: {
  //     test() {
  //     axios.get(`${this.$config.apiUrl}/bibdata/allbib/001`).then((res) => {
  //       (this.bibitem = res)
  //       //console.log(res);
  //     });
  //     //this.bibitem = res.response;
  //   },
  // },
};
</script>

<style scoped>
table {
  font-family: Arial, Helvetica, sans-serif;
  border-collapse: collapse;
  width: 100%;
}

table td,
table th {
  border: 1px solid #ddd;
  padding: 8px;
}

table tr:nth-child(even) {
  background-color: #f2f2f2;
}

table tr:hover {
  background-color: #ddd;
}

table th {
  padding-top: 12px;
  padding-bottom: 12px;
  text-align: left;
  background-color: #2671d3;
  color: white;
}
</style>
