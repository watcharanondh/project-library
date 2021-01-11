<template>
  <v-container class="grey lighten-3">
    <v-row>
      <v-col cols="6" md="4">
        <v-card class="pa-2" outlined tile color="grey lighten-3">
          <v-btn @click="$router.push('/SearchBooklist')" color="btnBack" rounded>
            <v-icon left>reply</v-icon>
            <span>ย้อนกลับ</span>
          </v-btn>
        </v-card>
      </v-col>
      <v-col cols="12" md="3">
        <v-card
          v-for="item in BookInfo"
          :key="item.Title"
          class="pa-2"
          elevation="5"
          outlined
          shaped
        >
          <h1>{{ item.Title }}</h1>
        </v-card>
      </v-col>
    </v-row>

    <!--หัวข้อชื่อหนังสือ และ ข้อมูลรายละเอียด-->
    <v-row>
      <v-col cols="12" md="4">
        <v-card
          v-for="item in BookInfo"
          :key="item.PicPath"
          class="pa-2"
          shaped
          outlined
          tile
          color="grey lighten-3"
        >
          <div>
             <v-img
              :src="item.PicPath"
              alt=""
              class="my-3"
              contain
              height="350"
              ></v-img>
          </div>
        </v-card>
      </v-col>
      <v-col md="5">
        <v-card
          v-for="item in BookInfo"
          :key="item"
          class="pa-2"
          elevation="5"
          outlined
          shaped
        >
          <h4>
            <div>ผู้แต่ง : {{ item.Author }}</div>
          </h4>
          <br />
          <h4>
            <div>สำนักพิมพ ์: {{ item.Publish }}</div>
          </h4>
          <br />
          <h4>
            <div>เลขเรียกหนังสือ : {{ item.CallNo }}</div>
          </h4>
          <br />
          <h4>
            <div>หมายเลข ISBN : {{ item.ISBN }}</div>
          </h4>
          <br />
        </v-card>
      </v-col>
    </v-row>

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
      <v-col md="4">
        <!-- รายการ -->
        <div class="text-left">
          <div class="text-left">
            <v-card>
              <v-data-table
                :headers="headers_list"
                :items="items"
                disable-pagination
                hide-default-footer
                class="elevation-1"
              >
                <template v-slot:item="{ item }">
                  <tr>
                    <td align="center">{{ item.Barcode }}</td>
                    <td align="center">{{ item.Copy }}</td>
                    <td align="center">{{ item.CallNo }}</td>
                    <td align="center">
                      <v-chip :color="getColor(item.item_status)" dark>
                        {{ item.item_status }}
                      </v-chip>
                    </td>
                  </tr>
                </template>
              </v-data-table>
            </v-card>
          </div>
        </div>
      </v-col>
      <v-col md="2"> </v-col>
      <v-col md="5">
        <!-- ดู Marc21 -->
        <div class="text-left">
          <v-card>
            <v-data-table
              :headers="headers_Marc21"
              :items="Marc21"
              disable-pagination
              hide-default-footer
              class="elevation-1"
            >
              <template v-slot:item="{ item }">
                <tr>
                  <td align="center">{{ item.Field }}</td>
                  <td align="center">{{ item.Indicator1 }}</td>
                  <td align="center">{{ item.Indicator1 }}</td>
                  <td>{{ item.Subfield }}</td>
                </tr>
              </template>
            </v-data-table>
          </v-card>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import axios from "axios";

export default {
  name: "Informationbooks",
  data: () => ({
    BookInfo: [],
    Marc21: [],
    items: [],

    headers_list: [
      { text: "Barcode", value: "Barcode", align: "center" },
      { text: "Copy", value: "Copy", align: "center" },
      { text: "CallNo", value: "CallNo", align: "center" },
      { text: "Status", value: "item_status", align: "center" },
    ],

    headers_Marc21: [
      { text: "Field", value: "Field", align: "center" },
      { text: "Indicator1", value: "Indicator1", align: "center" },
      { text: "Indicator2", value: "Indicator2", align: "center" },
      { text: "Subfield", value: "Subfield", align: "Subfield" },
    ],
  }),
  mounted() {
    axios
      .get(
        `${process.env.VUE_APP_API_URL}/bibdata/allbib/${this.$store.getters["numid"]}`
      )
      .then((response) => {
        //this.bookinfo = response.data;
        this.BookInfo = response.data[0];
        this.Marc21 = response.data[1];
        this.items = response.data[2];
      });
  },

  methods: {
    getColor(item_status) {
      if (item_status == "Available") return "green";
      else {
        return "red";
      }
    },
  },
};
</script>

<style scoped>

</style>
