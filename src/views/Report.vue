<template>
  <v-container class="grey lighten-3">
    <v-row class="justify-center">
      <v-col cols="9">
        <v-card class="mx-auto pa-5" outlined>
          <!-- ปุ่มย้อนกลับ -->
          <v-btn
            @click="$router.push('/Librarian_Menu')"
            color="btnBack"
            rounded
          >
            <v-icon left>reply</v-icon>
            <span>ย้อนกลับ</span>
          </v-btn>
          <v-col>
            <v-row class="justify-center"><h1>ทำรายการออกรายงาน(Report)</h1></v-row>
          </v-col>
          <v-row>
            <v-col md="2">
              <v-row justify="end">
                <h3>ประเภทการออกรายงาน :</h3>
                <br /><br /><br /><br />
                <h3>วันที่ :</h3>
              </v-row>
            </v-col>
            <!-- ออกรายงาน -->
            <v-col md="3">
              <v-row class="no-gutters">
                <v-select
                  v-model="selectReporttype"
                  :items="Item_Reporttype"
                  item-text="name"
                  item-value="value"
                  placeholder="เลือกประเภทการออกรายงาน"
                  v-on:change="API_Reporttype"
                  return-object
                  single-line
                  filled
                  dense
                  solo
                  outlined
                  clearable
                >
                </v-select>
              </v-row>

              <v-menu
                ref="menu"
                v-model="menu"
                :close-on-content-click="false"
                transition="scale-transition"
                offset-y
                min-width="auto"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    v-model="setDate"
                    prepend-icon="mdi-calendar"
                    readonly
                    v-bind="attrs"
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-date-picker
                  ref="picker"
                  v-model="setDate"
                  :max="new Date().toISOString().substr(0, 10)"
                  min="1950-01-01"
                  @change="save"
                ></v-date-picker>
              </v-menu>

            <v-btn color="primary" class="mr-4" @click="Gat_API_Report_Data">
              แสดงค่า
            </v-btn>
            <v-btn color="error" @click="reset">
              Reset
            </v-btn>
            </v-col>
          </v-row>
          <!-- ปุ่มพิพม์ -->
          <v-row justify="center">
   
          </v-row>
           <br />
          <v-divider></v-divider>
          <br />
          
          <!-- table data on page // ตารางโชว์ข้อมูล -->
          <v-card class="mx-auto pa-5" outlined>
            <v-col cols="12">
              <v-data-table
                :headers="headers"
                :items="Gat_item_API"
                hide-default-footer
                disable-pagination
                class="elevation-1"
              >
                <!-- table Mudul to on page -->
                <template v-slot:item="{ item }">
                  <tr>
                    <td>{{ item.Field }}</td>
                    <td>{{ item.Indicator1 }}</td>
                    <td>{{ item.Indicator2 }}</td>
                    <td>{{ item.Subfield }}</td>
                  </tr>
                </template>
              </v-data-table>
            </v-col>
          </v-card>
          <!-- <span>{{ inModul }}</span> -->
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import axios from "axios";

export default {
  name: "Report",
  /////// check access permission /////////////
  mounted() {
    let Position = localStorage.getItem("Position");
    if (Position !== "librarian") {
      alert("ไม่สามารถเข้าใช้งานหน้านี้ได้");
      if (Position == "admin") {
        this.$router.push("/Admin_Menu");
      } else if (Position == "student" && Position !== "personnel") {
        this.$router.push("/Student_Personnel_Menu");
      } else {
        this.$router.push("/LoginUsers");
      }
      // this.$router.push(Position == 'admin'?"/Admin_Menu":"/Student_Personnel_Menu")
    }
  },
  /////////////////////////////////////////////////

  data: () => ({
    selectReporttype: "",
    Item_Reporttype: [
      { name: "รายงานข้อมูลสมาชิก", value: "1" },
      { name: "รายงานข้อมูลหนังสือ", value: "2" },
      { name: "รายงานสถิติข้อมูลการยืม-คืนหนังสือ", value: "bnrreport" },
      { name: "รายงานสถิติการเข้าใช้ห้องสมุด", value: "3" },
      { name: "รายงานค่าปรับ", value: "notreturnreport" },
      { name: "รายงานการตัดจำหน่ายหนังสือ", value: "4" },
    ],
    setDate:null,
    menu: false,

    //ค่าที่จะส่ง
    Report_type:'',
    sentDate:{},

    //Table สถิติการยืม
    Gat_item_API: [],
    headers: [
      {
        text: "ลำดับ",
        align: "center",
        value: "index",
      },
      { text: "หมายเลข ISBN", value: "Indicator1", align: "center" },
      { text: "ชื่อทรัพยากร", value: "Title", align: "center" },
      { text: "ผู้ยืม", value: "Subfield", align: "center" },
      { text: "ผู้ให้ยืม", value: "Subfield", align: "center" },
    ],
  }),

  watch: {
    menu(val) {
      val && setTimeout(() => (this.$refs.picker.activePicker = "YEAR"));
    },
  },

  methods: {
    save(setDate) {
      this.$refs.menu.save(setDate);
    },

    API_Reporttype() {
      this.Report_type = this.selectReporttype.value;
    },

    reset() {
      window.location.reload();
    },

 async Gat_API_Report_Data(){

   Object.assign(this.sentDate,{date:this.setDate});
  
    console.log('ประเภทการออกรายงาน: ',this.Report_type,'ปี/เดือน/วัน',this.sentDate);

 const url = `${process.env.VUE_APP_API_URL}/report/${this.Report_type}`;
        axios.post(url,this.sentDate).then((results) => {
          console.log(results.data);
          this.Gat_item_API = results.data
        });
  

      }
  },
};
</script>

<style scoped></style>
