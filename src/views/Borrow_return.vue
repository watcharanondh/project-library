<template>
  <v-container class="grey lighten-3">
    <v-row class="justify-center">
      <v-col cols="9">
        <v-card class="mx-auto pa-5" outlined>
          <!-- ปุ่มย้อนกลับ -->
          <v-btn @click="$router.push('/Librarian_Menu')" color="success">
            <v-icon left>reply</v-icon>
            <span>ย้อนกลับ</span>
          </v-btn>
          <v-col>
            <v-row class="justify-center"><h1>รายงานการยืม-คืน</h1></v-row>
          </v-col>
          <v-row>
            <!-- รหัสสมาชิก -->
            <v-col md="3">
              <h3>ค้นหาสมาชิก</h3>
              <v-row class="no-gutters">
                <v-text-field
                  v-model="Getusers_search"
                  label="กรุณากรอกขื่อสมาชิก"
                  v-on:keyup.enter="API_Getusers_search"
                  dense
                  solo
                  outlined
                  clearable
                  required
                ></v-text-field>
              </v-row>
            </v-col>
            <!-- ปุ่มค้นหาสมาชิก -->
            <v-col md="" class="pt-10">
              <v-row>
                <v-btn color="primary" v-on:click="API_Getusers_search">
                  ค้นหา
                </v-btn>
              </v-row>
            </v-col>
            <!-- ปุ่มค้นหาสมาชิกรวม -->
            <v-col md="" class="pt-10">
              <v-row>
                <v-btn color="primary" v-on:click="API_GetusersALL">
                  ค้นหาสมาชิกทั้งหมด
                </v-btn>
              </v-row>
            </v-col>
            <!-- ดู สมาชิกรวม -->
            <v-dialog
              :retain-focus="false"
              v-model="dialogUsersData"
              persistent
              max-width="1500px"
            >
              <v-card>
                <v-data-table
                  :headers="headers_UsersDataALL"
                  :items="item"
                  :items-per-page="5"
                  class="elevation-1"
                >
                  <template v-slot:item="{ item }">
                    <tr>
                      <td align="center">{{ item.member_ID }}</td>
                      <td align="center">{{ item.mem_Citizenid }}</td>
                      <td align="center">{{ item.FName }}</td>
                      <td align="center">{{ item.LName }}</td>
                      <td align="center">{{ item.Position }}</td>
                    </tr>
                  </template>
                </v-data-table>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="red" @click="dialogUsersData = false">
                    ยกเลิก
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>

            <!-- รหัสหนังสือ -->
            <v-col md="3">
              <v-row class="no-gutters">
                <h3>รหัสหนังสือ</h3>
                <v-text-field
                  v-model="marc21"
                  label="กรุณากรอกรหัสหนังสือ"
                  v-on:keyup.enter="API_Bookcode"
                  dense
                  solo
                  outlined
                  clearable
                  required
                ></v-text-field>
              </v-row>
            </v-col>

            <v-col md="1" class="pt-10">
              <v-row>
                <!-- Button modal -->
                <v-btn color="primary" v-on:click.stop="Selectmarc21">
                  ค้นหา
                </v-btn>
              </v-row>
            </v-col>
          </v-row>

          <v-card color="grey lighten-2" elevation="1" tile>
            <v-subheader><h3>รายละเอียดสมาชิก</h3></v-subheader>
            <v-col>
              <v-row>
                <v-col cols="1">
                  <v-row justify="end">
                    <v-subheader><h4>ID :</h4></v-subheader>
                  </v-row>
                </v-col>
                <v-col md="2">
                  <v-text-field v-model="card_ID" outlined readonly>
                  </v-text-field>
                </v-col>

                <v-col cols="2">
                  <v-row justify="end">
                    <v-subheader><h4>หมายเลขบัตรประชาชน :</h4></v-subheader>
                  </v-row>
                </v-col>
                <v-col md="2">
                  <v-text-field v-model="card_IDC" outlined readonly>
                  </v-text-field>
                </v-col>

                <v-col cols="2">
                  <v-row justify="end">
                    <v-subheader><h4>Position :</h4></v-subheader>
                  </v-row>
                </v-col>
                <v-col md="2">
                  <v-text-field v-model="card_Position" outlined readonly>
                  </v-text-field>
                </v-col>
              </v-row>
            </v-col>

            <v-col>
              <v-row>
                <v-col cols="1">
                  <v-row justify="end">
                    <v-subheader><h4>ชื่อ :</h4></v-subheader>
                  </v-row>
                </v-col>
                <v-col md="3">
                  <v-text-field v-model="card_Fname" outlined readonly>
                  </v-text-field>
                </v-col>

                <v-col cols="1">
                  <v-row justify="end">
                    <v-subheader><h4>นามสกุล :</h4></v-subheader>
                  </v-row>
                </v-col>
                <v-col md="3">
                  <v-text-field v-model="card_Lname" outlined readonly>
                  </v-text-field>
                </v-col>
              </v-row>
            </v-col>
          </v-card>

          <v-row justify="start" style="min-height: 1px;">
            <v-col class="shrink">
              <v-bottom-navigation :value="value" color="primary">
                <v-btn
                  color=""
                  @click="
                    (Expand_Borrow = true),
                      (Expand_Return = false),
                      (Expand_Backlog = false),
                      (Expand_Borrow_history = false),
                      (Expand_Fines = false)
                  "
                >
                  <h4>ยืมหนังสือ</h4>
                </v-btn>
                <v-btn
                  @click="
                    (Expand_Return = true),
                      (Expand_Borrow = false),
                      (Expand_Backlog = false),
                      (Expand_Borrow_history = false),
                      (Expand_Fines = false)
                  "
                >
                  <h4>คืนหนังสือ</h4>
                </v-btn>
                <v-btn
                  @click="
                    (Expand_Backlog = true),
                      (Expand_Borrow = false),
                      (Expand_Return = false),
                      (Expand_Borrow_history = false),
                      (Expand_Fines = false)
                  "
                >
                  <h4>หนังสือค้าง</h4>
                </v-btn>
                <v-btn
                  @click="
                    (Expand_Borrow_history = true),
                      (Expand_Borrow = false),
                      (Expand_Return = false),
                      (Expand_Backlog = false),
                      (Expand_Fines = false)
                  "
                >
                  <h4>ประวัติการยืม</h4>
                </v-btn>
                <v-btn
                  @click="
                    (Expand_Fines = true),
                      (Expand_Borrow = false),
                      (Expand_Return = false),
                      (Expand_Backlog = false),
                      (Expand_Borrow_history = false)
                  "
                >
                  <h4>ค่าปรับค้าง</h4>
                </v-btn>
              </v-bottom-navigation>
            </v-col>
          </v-row>
          <v-expand-transition>
            <v-card v-show="Expand_Borrow" height="200" width="2000">
              <v-data-table
                :headers="header_Expand_Borrow"
                :items="Data_Expand_Borrow"
                :items-per-page="5"
                class="elevation-1"
              >
              </v-data-table>
            </v-card>
          </v-expand-transition>

          <v-expand-transition>
            <v-card v-show="Expand_Return" height="200" width="2000">
              <v-data-table
                :headers="header_Expand_Return"
                :items="items_Borrowbooks"
                :items-per-page="5"
                class="elevation-1"
              >
              </v-data-table>
            </v-card>
          </v-expand-transition>

          <v-expand-transition>
            <v-card v-show="Expand_Backlog" height="200" width="2000">
              <v-data-table
                :headers="header_Expand_Backlog"
                :items="Data_Expand_Backlog"
                :items-per-page="5"
                class="elevation-1"
              >
              </v-data-table>
            </v-card>
          </v-expand-transition>

          <v-expand-transition>
            <v-card v-show="Expand_Borrow_history" height="200" width="2000">
              <v-data-table
                :headers="header_Expand_Borrow_history"
                :items="Data_Expand_Borrow_history"
                :items-per-page="5"
                class="elevation-1"
              >
              </v-data-table>
            </v-card>
          </v-expand-transition>

          <v-expand-transition>
            <v-card v-show="Expand_Fines" height="200" width="2000">
              <v-data-table
                :headers="header_Expand_Fines"
                :items="Data_Expand_Fines"
                :items-per-page="5"
                class="elevation-1"
              >
              </v-data-table>
            </v-card>
          </v-expand-transition>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import axios from "axios";

export default {
  name: "Borrow-return",
  data: () => ({
    value: 1,
    Member_ID: "",
    Book_code: "",
    Getusers_search: "",

    card_ID: "",
    card_IDC: "",
    card_Position: "",
    card_Fname: "",
    card_Lname: "",

    dialogUsersData: false,
    Expand_Borrow: false,
    Expand_Return: false,
    Expand_Backlog: false,
    Expand_Borrow_history: false,
    Expand_Fines: false,

    //Table User All
    Data_UserALL:[],
    headers_UsersDataALL:[
      {
        text: "รหัส",
        align: "start",
        value: "member_ID",
      },
      { text: "รหัสบัตรประชาชน", value: "mem_Citizenid", align: "start" },
      { text: "ชื่อ", value: "FName", align: "start" },
      { text: "นามสกุล", value: "LName", align: "start" },
      { text: "Position", value: "Position", align: "start" },
    ],

    //Table Expand_Borrow
    Data_Expand_Borrow: [],
    header_Expand_Borrow: [
      {
        text: "ลำดับ",
        align: "start",
        value: "index",
      },
      { text: "ชื่อทรัพยากร", value: "Resource_name", align: "start" },
    ],
    //Table Expand_Return
    Data_Expand_Return: [],
    header_Expand_Return: [
      {
        text: "ลำดับ",
        align: "start",
        value: "index",
      },
      { text: "ชื่อทรัพยากร", value: "Resource_name", align: "start" },
    ],
    //Table Expand_Backlog
    Data_Expand_Backlog: [],
    header_Expand_Backlog: [
      {
        text: "ลำดับ",
        align: "start",
        value: "index",
      },
      { text: "ชื่อทรัพยากร", value: "Resource_name", align: "start" },
      { text: "วันที่ยืม", value: "Resource_name", align: "start" },
      { text: "กำหนดคืน", value: "Resource_name", align: "start" },
      { text: "เกินกำหนด(วัน)", value: "Resource_name", align: "start" },
    ],
    //Table Expand_Borrow_history
    Data_Expand_Borrow_history: [],
    header_Expand_Borrow_history: [
      {
        text: "ลำดับ",
        align: "start",
        value: "index",
      },
      { text: "ชื่อทรัพยากร", value: "Resource_name", align: "start" },
      { text: "วันที่ยืม", value: "Resource_name", align: "start" },
      { text: "กำหนดคืน", value: "Resource_name", align: "start" },
      { text: "สถานะค่าปรับ", value: "Resource_name", align: "start" },
    ],
    //Table Expand_Fines
    Data_Expand_Fines: [],
    header_Expand_Fines: [
      {
        text: "ลำดับ",
        align: "start",
        value: "index",
      },
      { text: "ชื่อทรัพยากร", value: "Resource_name", align: "start" },
      { text: "จำนวนค่าปรับ", value: "Resource_name", align: "start" },
      { text: "ประเภทค่าปรับ", value: "Resource_name", align: "start" },
    ],

    //ค่าจากการ API ใน Modul
    Data_modul_1: [],
    Data_modul_2: [],
    Data_modul_3: [],
    headers1: [
      { text: "Field", value: "Field" },
      { text: "Indicator1", value: "Indicator1" },
      { text: "Indicator2", value: "Indicator2" },
      { text: "Subfield", value: "Subfield" },
      { text: "Action", value: "action" },
    ],
    headers_modul_1: [
      {
        text: "ตำแหน่งที่ 1",
        align: "center",
        value: "Code",
      },
      { text: "ชื่อตัวบ่งชี้", value: "Description" },
      { text: "ข้อมูลตัวบ่งชี้", value: "" },
    ],

    headers_modul_2: [
      {
        text: "ตำแหน่งที่ 2",
        align: "center",
        value: "Code",
      },
      { text: "ชื่อตัวบ่งชี้", value: "Description" },
      { text: "ข้อมูลตัวบ่งชี้", value: "" },
    ],

    headers_modul_3: [
      {
        text: "รหัส",
        align: "center",
        value: "Code",
      },
      { text: "ชื่อเขตข้อมูลย่อย", value: "Name_Eng" },
      { text: "ข้อมูลเขตข้อมูลย่อย", value: "" },
    ],
  }),

  methods: {
    API_GetusersALL() {
      this.dialogUsersData = true;
      const url = `${process.env.VUE_APP_API_URL}/allmember/listalluser`;
      axios.get(url).then((results) => {
        this.headers_UsersDataALL = results.data;
        console.log(results.data);
      });
    },
    API_Getusers_search() {
      const url = `${process.env.VUE_APP_API_URL}/bnr/listuserbnr/${this.Getusers_search}`;
      axios.get(url).then((results) => {
        console.log(results);
        (this.card_ID = results.data[0].member_ID),
          (this.card_IDC = results.data[0].mem_Citizenid),
          (this.card_Position = results.data[0].Position),
          (this.card_Fname = results.data[0].FName),
          (this.card_Lname = results.data[0].LName),
          console.log(results);
        console.log(results.data.mem_Citizenid);
      });
    },

    close() {
      this.dialog = false;
      this.dialogspecial = false;
      this.$nextTick(() => {
        this.editedAddmodul = Object.assign({}, this.defaultItem);
        this.marc21 = "";
        this.Data_modul_1 = [];
        this.Data_modul_2 = [];
        this.Data_modul_3 = [];
        this.editedAddmodul.Subfield = {};
        this.editedIndex = -1;
      });
    },

    removeEmpty(object1) {
      Object.keys(object1).forEach(function(key) {
        (object1[key] && typeof object1[key] === "object") ||
          ((object1[key] === "" || object1[key] === null) &&
            delete object1[key]);
      });
      return object1;
    },

    //ไปหน้า Dialog เพิ่มฉบับ
    API_InfoBookclick(item) {
      //console.log(item);
      this.numid = item.Bib_ID;
      //console.log(this.numid);
      const url = `${process.env.VUE_APP_API_URL}/bibdata/bibitem/${this.numid}`;
      axios.get(url).then((results) => {
        return (this.Data_modul_additemsNo = results.data);
      });
      this.dialogAdditemsNo = true;
    },

    reset() {
      window.location.reload();
    },

    saveMudul() {
      this.editedAddmodul.Field = this.numField;
      let object1 = this.editedAddmodul.Subfield;
      this.removeEmpty(object1);
      if (this.editedIndex > -1) {
        this.editedAddmodul.Subfield = object1;
        Object.assign(
          this.inModul.databib[this.editedIndex],
          this.editedAddmodul
        );
      } else {
        this.editedAddmodul.Subfield = object1;
        this.inModul.databib.push(this.editedAddmodul);
      }

      this.close();
    },

    submit() {
      if (this.inModul.length <= 1) {
        alert("กรุณากรอกข้อมูลให้ครบ");
      } else {
        axios
          .post(`${process.env.VUE_APP_API_URL}/bibdata/bulkadd`, this.inModul)
          .then((res) => {
            //console.log("response: ", res);
            alert(res);
            alert("บันทึกข้อมูลเรียบร้อยแล้ว");
            window.location.reload();
          });
      }
    },
  },
};
</script>

<style scoped></style>
