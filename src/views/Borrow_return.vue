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
                        class="pointer"
                    >
                      <!-- table top section -->
                      <template v-slot:top>
                        <v-toolbar flat color="green lighten-3">
                          <v-toolbar-title
                            >ค้นหารายชื่อที่ต้องการหรือรหัส</v-toolbar-title
                          >
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
                          <td align="center">{{ item.Position | ChangeName}}</td>
                        </tr>
                      </template>
                    </v-data-table>
                  </v-container>
                </v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="error" @click="dialogUsersData = false">
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
                  <v-text-field v-model="Posit" outlined readonly>
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

          <v-row justify="start">
            <v-col class="shrink">
              <v-bottom-navigation color="primary" class="rounded-t-xl">
                <v-btn
                  @click="
                    (switchBorrow_return = '1'),
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
                    (switchBorrow_return = '2'),
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
          <!-- ยืมหนังสือ -->
          <v-expand-transition>
            <v-card v-show="Expand_Borrow" height="1000" width="2000">
              <v-data-table
                :headers="header_Expand_Borrow"
                :items="Data_Expand_Borrow"
                disable-pagination
                hide-default-footer
              >
                <template v-slot:item="{ item }">
                  <tr>
                    <td>{{ item.Barcode }}</td>
                    <td>{{ item.namebooks }}</td>
                    <td>{{ item.Copy }}</td>
                    <td>{{ item.Item_status }}</td>
                    <td align="center">
                      <v-icon @click="deleteBorrow(item)">delete</v-icon>
                    </td>
                  </tr>
                </template>
              </v-data-table>
              <v-card-actions>
                <v-row justify="center">
                  <v-btn
                    class="mr-4"
                    color="error"
                    @click="Data_Expand_Borrow = []"
                  >
                    ลบทั้งหมด
                  </v-btn>
                  <v-btn
                    color="primary"
                    @click="saveBorrow(Data_Expand_Borrow)"
                  >
                    บันทึก
                  </v-btn>
                </v-row>
              </v-card-actions>
            </v-card>
          </v-expand-transition>
          <!-- คืนหนังสือ -->
          <v-expand-transition>
            <v-card v-show="Expand_Return" height="1000" width="2000">
              <v-data-table
                :headers="header_Expand_Return"
                :items="Data_Expand_Return"
                disable-pagination
                hide-default-footer
              >
                <template v-slot:item="{ item }">
                  <tr>
                    <td>{{ item.Barcode }}</td>
                    <td>{{ item.namebooks }}</td>
                    <td>{{ item.Copy }}</td>
                    <td>{{ item.Item_status }}</td>
                    <td align="center">
                      <v-icon @click="deleteReturn(item)">delete</v-icon>
                    </td>
                  </tr>
                </template>
              </v-data-table>
              <v-card-actions>
                <v-row justify="center">
                  <v-btn
                    class="mr-4"
                    color="error"
                    @click="Data_Expand_Return = []"
                  >
                    ลบทั้งหมด
                  </v-btn>
                  <v-btn color="primary" @click="saveReturn">
                    บันทึก
                  </v-btn>
                </v-row>
              </v-card-actions>
            </v-card>
          </v-expand-transition>

          <!-- หนังสือค้าง -->
          <v-expand-transition>
            <v-card v-show="Expand_Backlog" height="500" width="2000">
              <v-data-table
                :headers="header_Expand_Backlog"
                :items="Data_Expand_Backlog"
              >
                <template v-slot:item="{ item }">
                  <tr>
                    <td>{{ item.Barcode }}</td>
                    <td>{{ item.nameBooks }}</td>
                    <td>{{ item.Borrow }}</td>
                    <td>{{ item.Returns }}</td>
                    <td>{{ item.datediff }}</td>
                  </tr>
                </template>
              </v-data-table>
            </v-card>
          </v-expand-transition>

          <!-- ประวัติการยืม -->
          <v-expand-transition>
            <v-card v-show="Expand_Borrow_history" height="500" width="2000">
              <v-data-table
                :headers="header_Expand_Borrow_history"
                :items="Data_Expand_Borrow_history"
              >
                <template v-slot:item="{ item }">
                  <tr>
                    <td>{{ item.Barcode }}</td>
                    <td>{{ item.nameBooks }}</td>
                    <td>{{ item.Borrow }}</td>
                    <td>{{ item.Returns }}</td>
                    <td>{{ item.Due }}</td>
                  </tr>
                </template>
              </v-data-table>
            </v-card>
          </v-expand-transition>

          <!-- ค่าปรับค้าง -->
          <v-expand-transition>
            <v-card v-show="Expand_Fines" height="500" width="2000">
              <v-data-table
                :headers="header_Expand_Fines"
                :items="Data_Expand_Fines"
              >
                <template v-slot:item="{ item }">
                  <tr>
                    <td>{{ item.namebooks }}</td>
                    <td>{{ item.Returns }}</td>
                    <td>{{ item.Due }}</td>
                    <td>{{ item.fine_type }}</td>
                    <td>{{ item.datediff }}</td>
                    <td>{{ item.Amount }}</td>
                    <!-- <td>{{ item.IsPaid }}</td> -->
                    <td>
                      <div
                        v-if="item.IsPaid == 'ชำระแล้ว'"
                        class="green--text text--darken-2"
                      >
                        {{ item.IsPaid }}
                      </div>
                      <div v-else class="red--text text--darken-2">
                        {{ item.IsPaid }}
                      </div>
                    </td>
                    <td align="center">
                      <v-icon @click="dialogS=true">library_add_check</v-icon>
                    </td>
                  </tr>
                </template>
              </v-data-table>
            </v-card>
          </v-expand-transition>
        </v-card>
      </v-col>
    </v-row>

    <!-- dialogจัดการค่าปรับ -->
    <v-dialog
         :retain-focus="false"
         v-model="dialogS"
         max-width="500px">
        <v-card >
          <v-card-title class="justify-center">
            <span class="headline">จัดการค่าปรับ</span>
              </v-card-title>
              
                <v-row justify="center">
                  <v-col  justify="center" md="6">
                <v-text-field
                  v-model="managefines.Description"
                  label="คำอธิบาย"
                  v-on:keyup.enter="selectF"
                  dense
                  solo
                  outlined
                  clearable
                  required
                ></v-text-field>
                  </v-col>
                  </v-row>
                      <v-card-actions>
                        <v-spacer></v-spacer>
              <v-btn color="error" @click="dialogS=false">ยกเลิก</v-btn>
            <v-btn color="success" @click="Manage_fines">จัดการ</v-btn>
        </v-card-actions>
      </v-card>
     
    </v-dialog>
  </v-container>
</template>

<script>
import axios from "axios";

export default {
  name: "Borrow-return",

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
    }
  },
  /////////////////////////////////////////////////

  data: () => ({
    switchBorrow_return: "",
    searchUser: "",
    Member_ID: "",
    BCcode: "",
    Getusers_search: "",
    managefines:{
      receipt_ID:null,
      Description:'',
      },
    databorrow: [],
    datareturn: [],

    card_ID: "",
    card_IDC: "",
    card_Position: "",
    card_Fname: "",
    card_Lname: "",
    Posit:'',
    editedIndex: -1,
    
    
    dialogS:false,
    dialogUsersData: false,
    Expand_Borrow: false,
    Expand_Return: false,
    Expand_Backlog: false,
    Expand_Borrow_history: false,
    Expand_Fines: false,
    

    //Table User All
    Data_modul_selectUser: [],
    headers_modul_selectUser: [
      { text: "รหัส", align: "center", value: "member_ID" },
      { text: "รหัสบัตรประชาชน", align: "center", value: "mem_Citizenid" },
      { text: "ชื่อ", align: "center", value: "FName" },
      { text: "นามสกุล", align: "center", value: "LName" },
      { text: "Position", align: "center", value: "Position" },
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
      { text: "Actions", value: "actions", align: "center" },
    ],
    //Table Expand_Return
    Data_Expand_Return: [],
    header_Expand_Return: [
      {
        text: "Barcode",
        align: "start",
        value: "Barcode",
      },
      { text: "ชื่อทรัพยากร", value: "namebooks", align: "start" },
      { text: "ฉบับที่", value: "Copy", align: "start" },
      { text: "สถานะ", value: "Item_status", align: "start" },
      { text: "Actions", value: "actions", align: "center" },
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
      { text: "กำหนดคืน", value: "Returns", align: "start" },
      { text: "วันที่คืน", value: "Due", align: "start" },
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
      { text: "Actions", value: "actions", align: "center" },
    ],
  }),

  methods: {
    //เรียกรายชื่อผู้ใช้ทั้งหมดมาดู
    API_GetusersALL() {
      this.dialogUsersData = true;
      const url = `${process.env.VUE_APP_API_URL}/allmember/listalluser`;
      axios.get(url).then((results) => {
        this.Data_modul_selectUser = results.data;
      });
    },
    //ใส่บาร์โค้ดยืมหนังสือ และ คืนหนังสือ
    API_BCcode() {
      
      if (this.switchBorrow_return == "1") {
        const url = `${process.env.VUE_APP_API_URL}/bnr/listbookbnr/${this.BCcode}`;
        axios.get(url).then((results) => {
          return this.Data_Expand_Borrow.push(results.data[0]);
          
        });
      } else if (this.switchBorrow_return == "2") {
        const url = `${process.env.VUE_APP_API_URL}/bnr/listbookbnr/${this.BCcode}`;
        axios.get(url).then((results) => {
          return this.Data_Expand_Return.push(results.data[0]);
        });
      }
      this.BCcode =''
    },

    //เลือกผู้ใช้งานและแสดงข้อมูล
    API_SelectUserclick(item) {
      (this.Data_modul_selectUser = []),
        (this.card_ID = item.member_ID),
        (this.card_IDC = item.mem_Citizenid),
        (this.card_Position = item.Position),
        (this.card_Fname = item.FName),
        (this.card_Lname = item.LName);
        this.Data_Expand_Borrow_history =[],
        this.Data_Expand_Backlog =[],
        this.Data_Expand_Fines =[],

      this.Change_TH(item.Position)
      const url = `${process.env.VUE_APP_API_URL}/bnr/listbnr/${this.card_ID}`;
      axios.get(url).then((results) => {
        
        if(results.data.databorrow =='ไม่พบรายการหนังสือคงค้าง'){
          alert('ไม่พบรายการหนังสือคงค้าง');
        }else{
          this.Data_Expand_Backlog = results.data.databorrow;
        }
        
        if(results.data.bnr_history =='ไม่พบประวัติการยืม'){
          alert('ไม่พบประวัติการยืม');
        }else{
          this.Data_Expand_Borrow_history = results.data.bnr_history;
        }

        if(results.data.finebooks =='ไม่พบรายการค่าปรับคงค้าง'){
          alert('ไม่พบรายการค่าปรับคงค้าง');
        }else{
          this.Data_Expand_Fines = results.data.finebooks;
          this.Data_Expand_Fines.forEach((element) => {
          Object.assign(this.managefines,{'receipt_ID':element.receipt_ID}); 
          });
        }  
        
      });
          this.dialogUsersData = false;
    },

    //ลบแถวในตารางยืม
    deleteBorrow(item) {
      this.editedIndex = this.Data_Expand_Borrow.indexOf(item);
      this.Data_Expand_Borrow.splice(this.editedIndex, 1);
    },

    //ลบแถวในตารางคืน
    deleteReturn(item) {
      this.editedIndex = this.Data_Expand_Return.indexOf(item);
      this.Data_Expand_Return.splice(this.editedIndex, 1);
    },

    //เปลี่ยนภาษา
    Change_TH(card_Position) {
       if (card_Position == 'personnel') {
            return this.Posit='บุคลากร'
          }else if (card_Position == 'student'){
            return this.Posit='นักเรียน'
          }
    },

    //รีโหลดหน้าใหม่
    reset() {
      window.location.reload();
    },

    Manage_fines(){
      const url = `${process.env.VUE_APP_API_URL}/bnr/updatefinereceipt`;
      axios.put(url, { receipt_ID: this.managefines.receipt_ID, Description: this.managefines.Description }).then((results) => {
        alert("บันทึกจัดการค่าปรับเรียบร้อยแล้ว", results);
        this.dialogS = false;
        this.reset()
      });

    },

    //บันทึกยืม
    saveBorrow() {
      (this.BCcode = ""), (this.databorrow = []);
      this.Data_Expand_Borrow.forEach((element) => {
        this.databorrow.push({
          Librarian_ID: localStorage.getItem("member_ID"),
          Member_ID: this.card_ID,
          Barcode: element.Barcode,
        });
      });
      const url = `${process.env.VUE_APP_API_URL}/bnr/addborrow`;
      axios.post(url, { databorrow: this.databorrow }).then((results) => {
        alert("บันทึกการยืมหนังสือเรียบร้อยแล้ว", results);
        this.Data_Expand_Borrow = [];
        window.location.reload();
      });
    },

    //บันทึกคืน
    saveReturn() {
      (this.BCcode = ""), (this.datareturn = []);
      this.Data_Expand_Return.forEach((element) => {
        this.datareturn.push(element.Barcode);
      });
      const url = `${process.env.VUE_APP_API_URL}/bnr/multiupdreturn`;
      axios.put(url, { Barcode: this.datareturn }).then((results) => {
        alert("บันทึกการคืนหนังสือเรียบร้อยแล้ว", results);
        window.location.reload();
      });
    },
  },
};
</script>

<style scoped>
.pointer {cursor: pointer;}
</style>
