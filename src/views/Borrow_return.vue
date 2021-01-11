<template>
  <v-container class="grey lighten-3">
    <v-row class="justify-center">
      <v-col cols="9">
        <v-card class="mx-auto pa-5" outlined>
          <!-- ปุ่มย้อนกลับ -->
          <v-btn @click="$router.push('/Librarian_Menu')" color="btnBack" rounded>
            <v-icon left>reply</v-icon>
            <span>ย้อนกลับ</span>
          </v-btn>
          <v-col>
            <v-row class="justify-center"><h1>รายงานการยืม-คืน</h1></v-row>
          </v-col>
          <v-row>
            <!-- ปุ่มค้นหาสมาชิกรวม -->
            <v-col md="2" class="pt-10">
             
                <v-btn color="primary" v-on:click="API_GetusersALL">
                  ค้นหาสมาชิกทั้งหมด
                </v-btn>
            
            </v-col>
              <!-- dialog dialogUsersData-->
                <v-dialog
                  :retain-focus="false"
                  v-model="dialogUsersData"
                  persistent
                  max-width="900px"
                >
                  <v-card>
                    <v-card-title>
                      <span class="headline">รายชื่อผู้ใช้งาน</span>
                    </v-card-title>
                    <hr />
                    <v-card-text>
                      <v-container>
                        <v-data-table
                          :headers="headers_modul_selectUser"
                          :items="Data_modul_selectUser"
                          :search="searchUser"
                          :items-per-page="5"
                        >
                      <!-- table top section -->
                        <template v-slot:top>
                          <v-toolbar flat color="green lighten-3">
                            <v-toolbar-title>ค้นหารายชื่อที่ต้องการหรือรหัส</v-toolbar-title>
                            <v-divider class="mx-4" inset vertical></v-divider>
                            <v-col md="5">
                              <v-row>
                                <v-text-field
                                  v-model="searchUser"
                                  clearable
                                  
                                  single-line
                                  hide-details
                                ></v-text-field>
                              </v-row>
                            </v-col>
                          </v-toolbar>
                        </template>
                          <!-- table tr section -->
                          <template v-slot:item="{ item }">
                            <tr v-on:click="API_SelectUserclick(item)" align="left">
                                  <td align="center">{{ item.member_ID }}</td>
                                  <td align="center">{{ item.mem_Citizenid }}</td>
                                  <td align="center">{{ item.FName }}</td>
                                  <td align="center">{{ item.LName }}</td>
                                  <td align="center">{{ item.Position }}</td>
                            </tr>
                          </template>
                        </v-data-table>
                      </v-container>
                    </v-card-text>
                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn
                        color="error"
                        @click="dialogUsersData = false">
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
                  v-model="BCcode"
                  label="กรุณากรอกรหัสหนังสือ"
                  v-on:keyup.enter="API_BCcode"
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
                <v-btn color="primary" v-on:click.stop="API_BCcode">
                  ค้นหา
                </v-btn>
              </v-row>
            </v-col>
          </v-row>

          <v-card v-if="card_ID" color="grey lighten-2" elevation="1" tile>
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
              <v-bottom-navigation :value="value" color="primary" class="rounded-t-xl">
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
            <v-card v-show="Expand_Borrow" height="500" width="2000">
              <v-data-table
                :headers="header_Expand_Borrow"
                :items="Data_Expand_Borrow"
                :items-per-page="5"
                class="elevation-1" 
              >
          <template v-slot:item="{ item }">
            <tr>
              <td>{{ item.Barcode }}</td>
              <td>{{ item.namebooks }}</td>
              <td>{{ item.Copy}}</td>
              <td>{{ item.Item_status}}</td>
            </tr>
          </template>
              
        <template v-slot:no-data>
      <v-btn
        color="primary"
        @click="initialize"
      >
        Reset
      </v-btn>
    </template>
              </v-data-table>
            </v-card>
          </v-expand-transition>

          <v-expand-transition>
            <v-card v-show="Expand_Return" height="500" width="2000">
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
            <v-card v-show="Expand_Backlog" height="500" width="2000">
              <v-data-table
                :headers="header_Expand_Backlog"
                :items="Data_Expand_Backlog"
                :items-per-page="5"
                class="elevation-1"
              >
            <template v-slot:item="{ item }">
            <tr>
              <td>{{ item.Barcode }}</td>
              <td>{{ item.nameBooks }}</td>
              <td>{{ item.Borrow | formatDate }}</td>
              <td>{{ item.Due | formatDate}}</td>
              <td>{{ item.datediff | formatDate}}</td>
            </tr>
          </template>
              </v-data-table>
            </v-card>
          </v-expand-transition>

          <v-expand-transition>
            <v-card v-show="Expand_Borrow_history" height="500" width="2000">
              <v-data-table
                :headers="header_Expand_Borrow_history"
                :items="Data_Expand_Borrow_history"
                :items-per-page="5"
              >
          <template v-slot:item="{ item }">
            <tr>
              <td>{{ item.Barcode }}</td>
              <td>{{ item.nameBooks }}</td>
              <td>{{ item.Borrow | formatDate }}</td>
              <td>{{ item.Due | formatDate}}</td>
              <td>{{ item.Returns | formatDate}}</td>
            </tr>
          </template>
              </v-data-table>
            </v-card>
          </v-expand-transition>

          <v-expand-transition>
            <v-card v-show="Expand_Fines" height="500" width="2000">
              <v-data-table
                :headers="header_Expand_Fines"
                :items="Data_Expand_Fines"
                :items-per-page="5"
                class="elevation-1"
              >
            <template v-slot:item="{ item }">
            <tr>
              <td>{{ item.namebooks }}</td>
              <td>{{ item.Returns | formatDate}}</td>
              <td>{{ item.Due | formatDate}}</td>
              <td>{{ item.fine_type }}</td>
              <td>{{ item.datediff }}</td>
              <td>{{ item.Amount }}</td>
              <td>{{ item.IsPaid }}</td>
            </tr>
          </template>
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

  /////// check access permission /////////////  
   mounted() {
     let Position = localStorage.getItem("Position");
           if(Position !== 'librarian') {
          alert('ไม่สามารถเข้าใช้งานหน้านี้ได้');
          if (Position == 'admin') {
          this.$router.push("/Admin_Menu")
          } else if(Position == 'student' && Position !== "personnel"){
          this.$router.push("/Student_Personnel_Menu")
          }else{
          this.$router.push("/LoginUsers")
          }
       }
  },
  /////////////////////////////////////////////////

  name: "Borrow-return",
  data: () => ({
    value: 1,
    searchUser:'',
    Member_ID: "",
    BCcode: "",
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
    Data_modul_selectUser: [],
    headers_modul_selectUser: [
      {text: "รหัส",align: "center",value: "member_ID",},
      {text: "รหัสบัตรประชาชน", align: "center", value: "mem_Citizenid",},
      {text: "ชื่อ", align: "center", value: "FName",},
      {text: "นามสกุล", align: "center", value: "LName",},
      {text: "Position", align: "center", value: "Position",},

    ],

    //Table Expand_Borrow
    Data_Expand_Borrow: [],
    header_Expand_Borrow: [ 
      {
        text: "Barcode",
        align: "start",
        value: "Barcode",
      },
      { text: "ชื่อทรัพยากร", value: "namebooks", align: "start" },
      { text: "ฉบับที่", value: "Copy", align: "start" },
      { text: "สถานะ", value: "Item_status", align: "start" },
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
        text: "Barcode",
        align: "start",
        value: "Barcode", 
      },
      { text: "ชื่อทรัพยากร", value: "nameBooks", align: "start" },
      { text: "วันที่ยืม", value: "Borrow", align: "start" },
      { text: "กำหนดคืน", value: "Due", align: "start" },
      { text: "เกินกำหนด(วัน)", value: "datediff", align: "start" },
    ],
    //Table Expand_Borrow_history
    Data_Expand_Borrow_history: [],
    header_Expand_Borrow_history: [
      {
        text: "Barcode",
        align: "start",
        value: "Barcode",
      },
      { text: "ชื่อทรัพยากร", value: "nameBooks", align: "start" },
      { text: "วันที่ยืม", value: "Borrow", align: "start" },
      { text: "กำหนดคืน", value: "Due", align: "start" },
      { text: "วันที่คืน", value: "Returns", align: "start" },
    ],
    //Table Expand_Fines
    Data_Expand_Fines: [],
    header_Expand_Fines: [
      {
        text: "ชื่อทรัพยากร",
        align: "start",
        value: "namebooks",
      },
      { text: "กำหนดคืน", value: "Returns", align: "start" },
      { text: "วันที่คืน", value: "Due", align: "start" },
      { text: "ประเภท", value: "fine_type", align: "start" },
      { text: "วันที่เกิน", value: "datediff", align: "start" },
      { text: "จำนวนค่าปรับ", value: "Amount", align: "start" },
      { text: "สถานะ", value: "IsPaid", align: "start" },
    ],

  }),

  methods: {
    //เรียกรายชื่อผู้ใช้
    API_GetusersALL() {
      this.dialogUsersData = true;
      const url = `${process.env.VUE_APP_API_URL}/allmember/listalluser`;
      axios.get(url).then((results) => {
        this.Data_modul_selectUser = results.data;
      });
    },
    //ใส่รหัสโค้ดยืมหนังสือ
    API_BCcode(){
      const url = `${process.env.VUE_APP_API_URL}/bnr/listbookbnr/${this.BCcode}`;
       axios.get(url).then((results) => {
         console.log(results.data);
        this.Data_Expand_Borrow.push( results.data[0])
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

    //เลือกผู้ใช้งานและแสดงข้อมูล
    API_SelectUserclick(item) {
      this.card_ID = item.member_ID,
      this.card_IDC = item.mem_Citizenid,
      this.card_Position = item.Position,
      this.card_Fname = item.FName,
      this.card_Lname = item.LName

      const url = `${process.env.VUE_APP_API_URL}/bnr/listbnr/${this.card_ID}`;
      axios.get(url).then((results) => {
         console.log(results.data);
         this.Data_Expand_Borrow_history = results.data.bnr_history;
         this.Data_Expand_Fines = results.data.finebooks;
         this.Data_Expand_Backlog = results.data.databorrow;
      });
      
      this.dialogUsersData=false
      
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
