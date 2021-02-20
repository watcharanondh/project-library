<template>
  <v-container class="grey lighten-4">
    <v-card class="grey lighten-3 mx-auto pa-5" outlined>
      <v-row class="justify-center">
        <v-col cols="9">
          <v-card class="mx-auto pa-5" outlined>
            <!-- ปุ่มย้อนกลับ -->
            <v-btn @click="$router.push(redir_path)" color="btnBack" rounded>
              <v-icon left>reply</v-icon>
              <span>ย้อนกลับ</span>
            </v-btn>
            <v-col>
              <v-row class="justify-center"><h1>การจัดการสมาชิก</h1></v-row>
            </v-col>
            <v-row justify="start">
              <v-col class="shrink">
                <v-bottom-navigation color="primary" horizontal class="rounded-t-xl">
                  <v-btn v-if="Position == 'admin'" @click="searchUsers = 'librarian'">
                    <h2>บรรณารักษ์</h2>
                  </v-btn>
                  <v-btn @click="searchUsers = 'personnel'">
                    <h2>บุคลากร</h2>
                  </v-btn>
                  <v-btn @click="searchUsers = 'student'">
                    <h2>นักเรียน</h2>
                  </v-btn>
                </v-bottom-navigation>
              </v-col>

              <v-col v-if="Position != 'admin'" md="1"></v-col>
              <v-col md="7" class="pa-6 ma-2"></v-col>

              <v-col md="1">
                <v-btn color="primary" v-on:click="dialogAddusers=true">
                  <v-icon left>add</v-icon>
                  <span>เพิ่มสมาชิก</span>
                </v-btn>
              </v-col>
            </v-row>

            <!-- table data show Users-->
            <v-card class="mx-auto pa-5" outlined>
              <v-col cols="12">
                <v-data-table
                  :search="searchUsers"
                  :headers="header_Users"
                  :items="Data_Users"
                  :items-per-page="10"
                  class="elevation-1"
                >
                  <!-- table top section -->
                  <template v-slot:top>
                    <v-toolbar dark flat color="orange lighten-2">
                      <v-toolbar-title class="text--black"
                        >ค้นหาผู้ใช้งานที่เกียวข้อง</v-toolbar-title
                      >
                      <v-divider class="mx-5" inset vertical></v-divider>
                      <v-spacer></v-spacer>
                      <v-divider class="mx-5" inset vertical></v-divider>
                      <v-row>
                        <v-text-field
                          v-model="searchUsers"
                          clearable
                          flat
                          solo-inverted
                          hide-details
                          prepend-inner-icon="mdi-magnify"
                          label="ค้นหา"
                        ></v-text-field>
                      </v-row>
                    </v-toolbar>
                  </template>
                  <!-- table data to on page -->
                  <template v-slot:item="{ item }">
                    <tr>
                      <td align="center">{{ item.member_ID }}</td>
                      <td>{{ item.mem_Citizenid }}</td>
                      <td>{{ item.FName }}</td>
                      <td>{{ item.LName }}</td>
                      <td>{{ item.Position | ChangeName}}</td>
                      <td>{{ item.Class }}</td>
                      <td>{{ item.Classroom }}</td>
                      <td>
                        <v-icon class="mr-2" @click="editItem(item)">
                          edit
                        </v-icon>
                        <span class="ma-1"></span>
                        <v-icon @click="deleteItem(item)">
                          delete
                        </v-icon>
                      </td>
                    </tr>
                  </template>
                </v-data-table>
              </v-col>
            </v-card>
          </v-card>
        </v-col>
      </v-row>

      <!-- เพิ่ม สมาชิกผู้ใช้งาน -->
      <v-dialog
        :retain-focus="false"
        v-model="dialogAddusers"
        persistent
        max-width="900px"
      >
        <v-card>
          <v-container>
            <v-card class="grey lighten-4 mx-auto pa-5" outlined>
              <v-row justify="center">
                <v-card-title>
                  <span class="headline">เพิ่มผู้ใช้งาน</span>
                </v-card-title>
              </v-row>
              <v-row>
                <v-col sm="1">
                  <v-sheet color="grey lighten-4"> </v-sheet>
                </v-col>

                <v-col sm="2">
                  <v-row class=" pa-6 ma-2"> </v-row>
                  <v-row class=" pa-6 ma-2"> </v-row>
                  <v-row justify="center">
                    <v-row class="no-gutters">
                      <v-select
                        v-model="select"
                        :items="items_Type"
                        item-text="name"
                        item-value="value"
                        v-on:change="setSelectedtype"
                        label="เลือกประเภทผู้ใช้งาน"
                        return-object
                        single-line
                        filled
                        dense
                        solo
                        outlined
                      >
                      </v-select>
                    </v-row>
                  </v-row>

                  <v-row justify="center">
                    <v-sheet min-height="10">
                    <v-img
                      contain
                      v-if="imageURL"
                      :src="imageURL"
                      max-height="150"
                      max-width="150"
                    ></v-img>
                    </v-sheet>
                  </v-row>
                  <v-row justify="start">
                    <br/>
                    <input
                      v-on:change="onFileSelected"
                      type="file"
                      name=""
                      id=""
                      label="เพิ่มรูปโปรไฟล์"
                      clearable
                    />
                  </v-row>
                </v-col>

                <v-col sm="9">
                  <v-sheet
                    class="grey lighten-4"
                    rounded="lg"
                    min-height="56vh"
                  >
                    <v-row>
                      <v-col cols="4">
                        <v-row justify="end">
                          <v-subheader><h4>รหัส :</h4></v-subheader>
                        </v-row>
                      </v-col>
                      <v-col md="3">
                        <v-text-field
                          v-model="Put_Users.member_ID"
                          label="รหัส"
                          solo
                          dense
                        >
                        </v-text-field>
                      </v-col>
                    </v-row>

                    <v-row>
                      <v-col cols="4">
                        <v-row justify="end">
                          <v-subheader
                            ><h4>รหัสประจำตัวประชาชน :</h4></v-subheader
                          >
                        </v-row>
                      </v-col>
                      <v-col md="4">
                        <v-text-field
                          v-model="Put_Users.mem_Citizenid"
                          label="รหัสประจำตัวประชาชน"
                          solo
                          dense
                        ></v-text-field>
                      </v-col>
                    </v-row>

                    <v-row>
                      <v-col cols="4">
                        <v-row justify="end">
                          <v-subheader><h4>ชื่อ :</h4></v-subheader>
                        </v-row>
                      </v-col>
                      <v-col md="3">
                        <v-text-field
                          v-model="Put_Users.FName"
                          label="ชื่อ"
                          solo
                          dense
                        ></v-text-field>
                      </v-col>
                      <v-row justify="center" class=" mt-3">
                        <v-subheader><h4>นาม-สกุล :</h4></v-subheader>
                      </v-row>
                      <v-col md="3">
                        <v-text-field
                          v-model="Put_Users.LName"
                          label="นาม-สกุล"
                          solo
                          dense
                        ></v-text-field>
                      </v-col>
                    </v-row>

                    <v-row>
                      <v-col cols="4">
                        <v-row justify="end">
                          <div v-if="this.chkpo==1">
                          <v-subheader><h4>ระดับชั้น :</h4></v-subheader>
                          </div>
                           <div v-if="this.chkpo==2">
                            <v-subheader><h4>ประเภท :</h4></v-subheader>
                          </div>
                        </v-row>
                      </v-col>
                      <v-col md="4">
                        <!-- นักเรียน -->
                        <div v-if="this.chkpo==1">
                        <v-select
                          v-model="Put_Users.Class"
                          :items="items_Grade" 
                          label="เลือกระดับชั้นเรียน"
                          return-object
                          filled
                          dense
                          solo
                          outlined
                        >
                        </v-select>
                      </div>
                      <!-- บุคคลกร -->
                        <div v-if="this.chkpo==2">
                        <v-select
                          v-model="Put_Users.Class"
                          :items="items_personnel" 
                          label="เลือกระดับประเภทบุคคลกร"
                          return-object
                          filled
                          dense
                          solo
                          outlined
                        >
                        </v-select>
                        </div>
                      </v-col>
                    </v-row>
                    <v-row>
                      <v-col cols="4">
                        <v-row justify="end">
                          <div v-if="this.chkpo==1">
                              <v-subheader><h4>ห้องเรียน :</h4></v-subheader>
                           </div>
                          <div v-if="this.chkpo==2">
                              <v-subheader><h4>ห้องประจำการ :</h4></v-subheader>
                           </div>
                        </v-row>
                      </v-col>
                      <v-col sm="6" md="3">
                        <div v-if="this.chkpo==1">
                            <v-text-field
                              v-model="Put_Users.Classroom"
                              label="ห้อง"
                              solo
                              dense
                            ></v-text-field>
                        </div>
                        <div v-if="this.chkpo==2">
                            <v-text-field
                              v-model="Put_Users.Classroom"
                              label="ห้อง"
                              solo
                              dense
                            ></v-text-field>
                        </div>
                        <div v-if="this.chkpo==0">
                        </div>
                      </v-col>
                    </v-row>
                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn color="error" @click="close">
                        ยกเลิก
                      </v-btn>
                      <v-btn color="success" @click="saveMudul_Add">
                        บันทึก
                      </v-btn>
                    </v-card-actions>
                  </v-sheet>
                </v-col>
              </v-row>
            </v-card>
          </v-container>
        </v-card>
      </v-dialog>

      <!--แก้ไขสมาชิกผู้ใช้งาน -->
      <v-dialog
        :retain-focus="false"
        v-model="dialogEditusers"
        persistent
        max-width="900px"
      >
        <v-card>
          <v-container>
            <v-card class="grey lighten-4 mx-auto pa-5" outlined>
              <v-row justify="center">
                <v-card-title>
                  <span class="headline">แก้ไขผู้ใช้งาน</span>
                </v-card-title>
              </v-row>
              <v-row>
                <v-col sm="1">
                  <v-sheet color="grey lighten-4"> </v-sheet>
                </v-col>

                <v-col sm="2">
                  <v-row class=" pa-6 ma-2"> </v-row>
                  <v-row class=" pa-6 ma-2"> </v-row>
                  <v-row justify="center">
                    <v-row class="no-gutters">
                      <v-select
                        v-model="select"
                        :items="items_Type"
                        item-text="name"
                        item-value="value"
                        v-on:change="setSelectedtype"
                        label="เลือกประเภทผู้ใช้งาน"
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
                  </v-row>

                  <v-row justify="center">
                    <v-sheet min-height="10">
                    <v-img
                      contain
                      v-if="imageURL"
                      :src="imageURL"
                      max-height="150"
                      max-width="150"
                    ></v-img>
                    </v-sheet>
                  </v-row>
                  <v-row justify="start">
                    <br/>
                    <input
                      v-on:change="onFileSelected"
                      type="file"
                      name=""
                      id=""
                      label="เพิ่มรูปโปรไฟล์"
                      clearable
                    />
                  </v-row>
                </v-col>

                <v-col sm="9">
                  <v-sheet
                    class="grey lighten-4"
                    rounded="lg"
                    min-height="56vh"
                  >
                    <v-row>
                      <v-col cols="4">
                        <v-row justify="end">
                          <v-subheader><h4>รหัส :</h4></v-subheader>
                        </v-row>
                      </v-col>
                      <v-col md="3">
                        <v-text-field
                          v-model="Put_Users.member_ID"
                          label="รหัส"
                          solo
                          dense
                          disabled
                        >
                        </v-text-field>
                      </v-col>
                    </v-row>

                    <v-row>
                      <v-col cols="4">
                        <v-row justify="end">
                          <v-subheader
                            ><h4>รหัสประจำตัวประชาชน :</h4></v-subheader
                          >
                        </v-row>
                      </v-col>
                      <v-col md="4">
                        <v-text-field
                          v-model="Put_Users.mem_Citizenid"
                          label="รหัสประจำตัวประชาชน"
                          solo
                          dense
                          disabled
                        ></v-text-field>
                      </v-col>
                    </v-row>

                    <v-row>
                      <v-col cols="4">
                        <v-row justify="end">
                          <v-subheader><h4>ชื่อ :</h4></v-subheader>
                        </v-row>
                      </v-col>
                      <v-col md="3">
                        <v-text-field
                          v-model="Put_Users.FName"
                          label="ชื่อ"
                          solo
                          dense
                        ></v-text-field>
                      </v-col>
                      <v-row justify="center" class=" mt-3">
                        <v-subheader><h4>นาม-สกุล :</h4></v-subheader>
                      </v-row>
                      <v-col md="3">
                        <v-text-field
                          v-model="Put_Users.LName"
                          label="นาม-สกุล"
                          solo
                          dense
                        ></v-text-field>
                      </v-col>
                    </v-row>

                    <v-row>
                      <v-col cols="4">
                        <v-row justify="end">
                          <div v-if="this.chkpoE==1">
                                <v-subheader><h4>ระดับชั้น :</h4></v-subheader>
                          </div>
                          <div v-if="this.chkpoE==2">
                                <v-subheader><h4>ประเภท :</h4></v-subheader>
                          </div>
                        </v-row>
                      </v-col>
                      <v-col md="4">
                      <!-- นักเรียน -->
                        <div v-if="this.chkpoE==1">
                        <v-select
                          v-model="Put_Users.Class"
                          :items="items_Grade" 
                          label="เลือกระดับชั้นเรียน"
                          return-object
                          filled
                          dense
                          solo
                          outlined
                        >
                        </v-select>
                      </div>
                      <!-- บุคคลกร -->
                        <div v-if="this.chkpoE==2">
                        <v-select
                          v-model="Put_Users.Class"
                          :items="items_personnel" 
                          label="เลือกระดับประเภทบุคคลกร"
                          return-object
                          filled
                          dense
                          solo
                          outlined
                        >
                        </v-select>
                        </div>
                      </v-col>
                    </v-row>
                    <v-row>
                      <v-col cols="4">
                        <v-row justify="end">
                         <div v-if="this.chkpoE==1">
                              <v-subheader><h4>ห้องเรียน :</h4></v-subheader>
                           </div>
                          <div v-if="this.chkpoE==2">
                              <v-subheader><h4>ห้องประจำการ :</h4></v-subheader>
                           </div>
                        </v-row>
                      </v-col>
                      <v-col sm="6" md="3">
                         <div v-if="this.chkpoE==1">
                            <v-text-field
                              v-model="Put_Users.Classroom"
                              label="ห้อง"
                              solo
                              dense
                            ></v-text-field>
                        </div>
                        <div v-if="this.chkpoE==2">
                            <v-text-field
                              v-model="Put_Users.Classroom"
                              label="ห้อง"
                              solo
                              dense
                            ></v-text-field>
                        </div>
                         <div v-if="this.chkpoE==0">
                        </div>
                      </v-col>
                    </v-row>
                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn color="error" @click="close">
                        ยกเลิก
                      </v-btn>
                      <v-btn color="success" @click="saveMudul_Edit">
                        บันทึก
                      </v-btn>
                    </v-card-actions>
                  </v-sheet>
                </v-col>
              </v-row>
            </v-card>
          </v-container>
        </v-card>
      </v-dialog>
    </v-card>
  </v-container>
</template>

<script>
import axios from "axios";

export default {
  name: "Member_Management",
  data: () => ({
    Position:localStorage.getItem("Position"),
    searchUsers: "",
    dialogAddusers: false,
    dialogEditusers: false,
    formTitle:'',
    imageURL: "https://i.imgur.com/A44vyNC.png",
    redir_path:'',
    chkpo:null,
    chkpoE:null,

    select:'',
    items_Type: [
      { name: "บุคคลากร", value: "personnel" },
      { name: "นักเรียน", value: "student" },
    ],
    items_Grade: ['มัธยมศึกษาปีที่ 1', 'มัธยมศึกษาปีที่ 2', 'มัธยมศึกษาปีที่ 3', 'มัธยมศึกษาปีที่ 4','มัธยมศึกษาปีที่ 5','มัธยมศึกษาปีที่ 6'],
    items_personnel: ['ผู้อำนวยการ','รองผู้อำนวยการ','ครู','ผู้ช่วยครู','ครูฝึกหัด', 'เจ้าพนักงานการเงินและบัญชี', 'เจ้าพนักงานธุรการ','นักการ-ภารโรง'],

    Oldmem_ID: null,

    //เพิ่ม Users in Modul
    Put_Users: {
      member_ID: "",
      mem_Citizenid: "",
      Position:"",
      FName: "",
      LName: "",
      Class: 'ไม่มี',
      Classroom: "",
      profile_img: 'https://i.imgur.com/A44vyNC.png',
    },

    //เซ็ตค่าเดิม
    Edit_Item: {
      member_ID: "",
      mem_Citizenid: "",
      Position:"",
      FName: "",
      LName: "",
      Class: "",
      Classroom: "",
      profile_img: null,
    },

    //Table on Page
    Data_Users: [],
    header_Users: [
      {
        text: "รหัสประจำตัว",
        align: "start",
        value: "member_ID",
      },
      { text: "รหัสบัตรประชาชน", value: "mem_Citizenid", align: "start" },
      { text: "ชื่อ", value: "FName", align: "start" },
      { text: "นามสกุล", value: "LName", align: "start" },
      { text: "Position", value: "Position", align: "start" },
      { text: "Class", value: "Class", align: "start" },
      { text: "Classroom", value: "Classroom", align: "start" },
      { text: "Actions", value: "actions", sortable: false },
    ],

  }),

    /////// check access permission /////////////  
   mounted() {
     let Position = localStorage.getItem("Position");
           if(Position !== 'librarian' && Position !== 'admin') {
          alert('ไม่สามารถเข้าใช้งานหน้านี้ได้');
          if(Position == 'student' && Position !== "personnel"){
          this.$router.push("/Student_Personnel_Menu")
          }else{
          this.$router.push("/LoginUsers")
          }
          // this.$router.push(Position == 'admin'?"/Admin_Menu":"/Student_Personnel_Menu")
       }

        if(Position == 'admin'){
            this.redir_path = '/Admin_Menu'
            this.items_Type.push({ name: "บรรณารักษ์", value: "librarian" });
            
        }else if(Position == 'librarian'){
            this.redir_path = '/Librarian_Menu'
        }else{
            this.redir_path = '/Student_Personnel_Menu'
          }
  },
  /////////////////////////////////////////////////

  created() {
    let uri = localStorage.getItem("Position") == 'admin' ? `${process.env.VUE_APP_API_URL}/allmember/listalluseradmin/`: `${process.env.VUE_APP_API_URL}/allmember/listalluser/`;
    // let uri = `${process.env.VUE_APP_API_URL}/allmember/listalluser/`;
    axios.get(uri).then((response) => {
      this.Data_Users = response.data;
    });
  },

  methods: {
  setSelectedtype() {
    //console.log(this.select.value);
      this.Put_Users.Position = this.select.value;
      if(this.select.value=='student'){
                this.chkpo=1;
      }else if(this.select.value=='personnel'){
                this.chkpo=2;
      }else{
                this.chkpo=0;
     }
    },



  //อัพเดทรูป โปรไฟล์
  async onFileSelected(event) {

          const reader = new FileReader();
          reader.onload = event => {
            // for preview
            this.imageURL = event.target.result;
          };
          reader.readAsDataURL(event.target.files[0]);


          let data = new FormData();
          let file = event.target.files[0];
          
          data.append('image', file)

      var config = {
        method: 'post',
        url: 'https://api.imgur.com/3/image',
        headers: {
          'Authorization': 'Client-ID 546c25a59c58ad7', 
        },
        data : data
      };

      await axios(config).then((response ) => {
      alert('อัพโหลดรูปเรียบร้อยแล้ว')
      this.Put_Users.profile_img = response.data.data.link;
    });
  },
  
    editItem(item) {
      this.edited_ID = item.member_ID;
      axios.get(`${process.env.VUE_APP_API_URL}/allmember/listedituser/${this.edited_ID} `,{ headers: {'Authorization': 'Basic abcd1234'}})
        .then((res) => {
          //console.log('แก้ไข',res.data);
          if(res.data.Position=='student'){
                this.chkpoE=1;
                this.Put_Users = res.data;
          }else if(res.data.Position=='personnel'){
                this.chkpoE=2;
                this.Put_Users = res.data;
          }else{
                this.Put_Users = res.data;
                this.chkpoE=0;
          }
          this.select = res.data.Position;
          this.imageURL = res.data.profile_img
         //Object.assign(this.Put_Users, this.edited_item);
          this.dialogEditusers = true;
        });
    },

    deleteItem(item) {
    this.api_id = item.member_ID;
     let cf = confirm("ต้องการยืนยันการลบผู้ใช้นี้ใช้หรือไม่");
      if(cf){
          axios.delete(`${process.env.VUE_APP_API_URL}/allmember/deluser/${this.api_id}`).then((res) => {
              alert("ลบผู้ใช้นี้เรียบร้อยแล้ว", res.data.msg);
              window.location.reload();
              });
      }
        
    },

    close() {
      this.$nextTick(() => {
        this.Put_Users = Object.assign({}, this.Edit_Item);
      });
      window.location.reload();
      this.dialogAddusers = false;
      this.dialogEditusers = false;

    },
      saveMudul_Add(){
        if(this.Put_Users.member_ID == ''){
          alert('ยังไม่ได้ใส่รหัสประจำตัว กรุณากรอกรหัสประจำตัวที่ไม่ซํ้ากับผู้ใช้งานอื่น')
        }else if(this.Put_Users.mem_Citizenid == '') {
          alert('ยังไม่ได้ใส่รหัสประบัตรประชาชน กรุณากรอกรหัสประบัตรประชาชน')
        }else if(this.Put_Users.Position == ''){
          alert('ยังไม่ได้ใส่รหัสตำแหน่ง กรุณากรอกตำแหน่ง')
        }else if(this.Put_Users.FName == ''){
          alert('ยังไม่ได้ใส่ชื่อจริง กรุณากรอกชื่อจริง')
        }else if(this.Put_Users.LName == ''){
          alert('ยังไม่ได้ใส่นามสกุล กรุณากรอกนามสกุล')
        }else if(this.Put_Users.Class == ''){
          alert("ยังไม่ได้ใส่เลือกระดับชั้น หากไม่มีให้เลือก 'ไม่มี' ")
        }else if(this.Put_Users.Classroom == ''){
          alert('ยังไม่ได้ใส่ห้อง กรุณากรอกห้อง')
        }else{
          
          
        axios.post(`${process.env.VUE_APP_API_URL}/allmember/adduser`,this.Put_Users).then((res) => {
                      //console.log(res.data.Response);
                      if(res.data.Response == 'OK'){
                        alert("บันทึกข้อมูลเรียบร้อยแล้ว");
                        this.close();
                      }else{
                        alert(`บันทึกข้อมูลไม่สำเร็จเนื่องจาก ${res.data.msg} `);
                      }
                  }); 
        }
      },

      saveMudul_Edit() {
           axios.put(`${process.env.VUE_APP_API_URL}/allmember/edituserbylib`,this.Put_Users).then((res) => {
                alert("แก้ไขข้อมูลเรียบร้อยแล้ว", res.data.msg);
                  this.close();
            });
        },
  },
};
</script>

<style scoped></style>
