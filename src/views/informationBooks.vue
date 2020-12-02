<template>
  <div id="macr21books-table">
    <v-container class="grey lighten-3">
      <v-row>
        <v-col cols="6" md="4">
          <v-card class="pa-2" outlined tile color="grey lighten-3"> </v-card>
        </v-col>
        <v-col cols="12" md="3">
          <v-card class="pa-2" outlined tile color="grey lighten-3">
            หนังสือเรียนรายวิชาพื้นฐานคณิตศาสตร์ ม.1 เล่ม 1
          </v-card>
        </v-col>
      </v-row>

      <!--หัวข้อชื่อหนังสือ และ ข้อมูลรายละเอียด-->
      <v-row>
        <v-col cols="12" md="4">
          <v-card class="pa-2" outlined tile color="grey lighten-3">
            <v-img
              :src="require('@/assets/logo.jpg')"
              class="my-3"
              contain
              height="200"
              Width="500"
            />
          </v-card>
        </v-col>
        <v-col cols="12" md="8">
          <v-card class="pa-2" outlined tile color="grey lighten-3">
            ผู้แต่ง : สาขาคณิตศาสตร์มัธยมศึกษา <br />
            สำนักพิมพ ์: สถาบันส่งเสริมการสอนวิทยาศาสตร์และเทคโนโลยี (สสวท.)
            <br />
            เลขเรียกหนังสือ : 510 ส837ค 2559 <br />
            หมายเลข ISBN : 9743940774 <br />
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
                <tr v-for="(datas, index) in bibitem.data" :key="index">
                  <td>{{ datas.Barcode }}</td>
                  <td>{{ datas.Bib_ID }}</td>
                  <td>{{ datas.CallNo }}</td>
                  <td>{{ datas.borrowandreturn_bnr_ID }}</td>
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
                <tr v-for="(item, index) in book.data" :key="index">
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
      book: [],
      bibitem: [],
    };
  },
  mounted(){
    axios
      .get(`${this.$config.apiUrl}/bibdata/bibinfo/004`)
      .then((response) => (this.book = response));
    axios
      .get(`${this.$config.apiUrl}/bibdata/bibitem/004`)
      .then((res) => {(this.bibitem = res)
        console.log(res) });
  },
  // methods: {
  //     test() {
  //     axios.get(`${this.$config.apiUrl}/bibdata/bibitem/004`).then((res) => {
  //       (this.bibitem = res)
  //       //console.log(res);
  //     });
  //     //this.bibitem = res.response;
  //   },
  // },
}
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
