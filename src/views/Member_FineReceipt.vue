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
              <v-row class="justify-center"><h1>รายการค่าปรับ</h1></v-row>
            </v-col>

            <!-- table Fine -->
            <v-card class="mx-auto pa-5" outlined>
              <v-col cols="12">
                <v-data-table
                  :headers="headers_Fines"
                  :items="Fines_Data"
                  :items-per-page="10"
                  
                  class="elevation-1"
                >
                  <!-- table fine data body -->
                  <template v-slot:item="{ item,index }">
                    <tr>
                      <td align="center">{{ ++index }}</td>
                      <td>{{ item.namebooks }}</td>
                      <td>{{ item.Returns | formatDate  }}</td>
                      <td>{{ item.datediff }}</td>
                      <td>{{ item.Amount }}</td>
                      <td>{{ item.IsPaid }}</td>
                    </tr>
                  </template>
                </v-data-table>
              </v-col>
            </v-card>
          </v-card>
        </v-col>
      </v-row>
    </v-card>
  </v-container>
</template>

<script>
import axios from "axios";

export default {
  name: "Member_FineReceipt",
  data: () => ({
    Position:localStorage.getItem("Position"),
    //set Header And data body
    Fines_Data: [],
    headers_Fines: [
      { text: "ลำดับ", value: "index", align: "center" },
      { text: "ชื่อทรัพยากร", value: "namebooks", align: "start" },
      { text: "วันที่คืน", value: "Returns", align: "start" },
      { text: "เกินกำหนด(วัน)", value: "datediff", align: "start" },
      { text: "ค่าปรับ(บาท)", value: "Amount", align: "start" },
      { text: "สถานะค่าปรับ", value: "IsPaid", align: "start" }
    ],

  }),

   mounted() {
     /////// check access permission /////////////  
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
          // this.$router.push(Position == 'admin'?"/Admin_Menu":"/Librarian_Menu")
       }
      /////////////////////////////////////////////////

  /////////////////// API GET DATA ///////////////////////////
    let memberID = localStorage.getItem("member_ID");
    let uri = `${process.env.VUE_APP_API_URL}/bnr/listbnr/${memberID}`;
    axios.get(uri).then((response) => {
      this.Fines_Data = response.data.finebooks;
    });
    ////////////////////////////////////////////////////////////
  }
};
</script>

<style scoped></style>
