<template>
  <v-container class="grey lighten-4">
    <v-card class="grey lighten-3 mx-auto pa-5" outlined>
      <v-row class="justify-center">
        <v-col cols="9">
          <v-card class="mx-auto pa-5" outlined>
            <!-- ปุ่มย้อนกลับ -->
            <v-btn @click="$router.push('/Student_Personnel_Menu')" color="btnBack" rounded>
              <v-icon left>reply</v-icon>
              <span>ย้อนกลับ</span>
            </v-btn>
            <v-col>
              <v-row class="justify-center"><h1>รายการยืม-คืนหนังสือ</h1></v-row>
            </v-col>
            <v-row justify="start" style="min-height: 1px;">
            <v-col class="shrink">
              <v-bottom-navigation :value="value" color="primary" class="rounded-t-xl">
                <v-btn @click="Expand_Borrow = true,Expand_his_brw = false ">
                  <h3>รายการยืม</h3>
                </v-btn>
                <v-btn @click=" Expand_his_brw = true, Expand_Borrow = false " >
                  <h3>ประวัติการยืม</h3>
                </v-btn>
              </v-bottom-navigation>
            </v-col>
            </v-row>
           <v-expand-transition>
            <v-card v-show="Expand_Borrow" height="500" width="2000">
              <v-data-table
                :headers="header_borrow"
                :items="Data_borrow"
                :items-per-page="5"
                class="elevation-1" 
                >
              <template v-slot:item="{ item,index }">
              <tr>
                <td align = "center">{{ index + 1 }}</td>
                <td>{{ item.nameBooks }}</td>
                <td>{{ item.Borrow }}</td>
                <td>{{ item.Returns}}</td>
                <td>{{ item.datediff}}</td>
              </tr>
              </template>
              </v-data-table>
            </v-card>
          </v-expand-transition>
              <v-expand-transition>
                <v-card v-show="Expand_his_brw" height="500" width="2000">
                  <v-data-table
                    :headers="header_his_brw"
                    :items="Data_his_brw"
                :items-per-page="5"
                class="elevation-1"
              >
              <template v-slot:item="{ item,index }">
              <tr>
                <td align = "center">{{ index + 1 }}</td>
                <td>{{ item.nameBooks }}</td>
                <td>{{ item.Borrow }}</td>
                <td>{{ item.Due}}</td>
                <td>
                  <div v-if="item.databib_item == 'Available'" class="green--text text--darken-2">
                   {{ item.databib_item }}
                </div>
                <div v-else class="red--text text--darken-2">
                   {{ item.databib_item }}
                </div>
                </td>
              </tr>
              </template>
              </v-data-table>
            </v-card>
          </v-expand-transition>
          </v-card>
        </v-col>
      </v-row>
    </v-card>
  </v-container>
</template>

<script>
import axios from "axios";

export default {
  name: "Member_BorrowAndReturn",
  data: () => ({
    Position:localStorage.getItem("Position"),
    Expand_Borrow: false,
    Expand_Return: false,
    //borrow data
    Data_borrow: [],
    header_borrow: [
      { text: "ลำดับ", value: "index", align: "center" },
      { text: "ชื่อทรัพยากร", value: "nameBooks", align: "start" },
      { text: "วันที่ยืม", value: "Borrow", align: "start" },
      { text: "กำหนดคืน", value: "Returns", align: "start" },
      { text: "เกินกำหนด(วัน)", value: "datediff", align: "start" }
    ],
    //borrow history data
    Data_his_brw: [],
    header_his_brw: [
      { text: "ลำดับ", value: "index", align: "center" },
      { text: "ชื่อทรัพยากร", value: "nameBooks", align: "start" },
      { text: "วันที่ยืม", value: "Borrow", align: "start" },
      { text: "วันที่คืน", value: "Due", align: "start" },
      { text: "สถานะ", value: "databib_item", align: "start" }
    ],

  }),

   mounted() {
     ////////////// check access permission /////////////  
     let Position = localStorage.getItem("Position");
       if(Position !== "student" && Position !== "personnel" ) {
          alert('ไม่สามารถเข้าใช้งานหน้านี้ได้');
          if (Position == 'admin') {
          this.$router.push("/Admin_Menu")
          } else if(Position == 'librarian'){
          this.$router.push("/Librarian_Menu")
          }else{
          this.$router.push("/LoginUsers")
          }
       }
    /////////////////////////////////////////////////////

    //////////////// APT GET DATA////////////////////////
     let memberID = localStorage.getItem("member_ID");
    let uri = `${process.env.VUE_APP_API_URL}/bnr/listbnr/${memberID}`;
    axios.get(uri).then((response) => {
      this.Data_borrow = response.data.databorrow;
      this.Data_his_brw = response.data.bnr_history;
    });
  ////////////////////////////////////////////////////////

  }
};
</script>

<style scoped></style>
