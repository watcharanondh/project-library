<template>
  <v-container class="grey lighten-4">
    <v-card class="grey lighten-3 mx-auto pa-5" outlined>
      <v-row class="justify-center">
        <v-col cols="9">
          <v-card class="mx-auto pa-5" outlined>
            <!-- ปุ่มย้อนกลับ -->
            <v-btn @click="$router.push('/Librarian_Menu')" color="success">
              <v-icon left>reply</v-icon>
              <span>ย้อนกลับ</span>
            </v-btn>
            <v-col>
              <v-row class="justify-center"><h1>การจัดการสมาชิก</h1></v-row>
            </v-col>
            <v-row justify="start">
              <v-col class="shrink">
                <v-bottom-navigation color="primary" horizontal>
                  <v-btn @click="searchUsers = 'personnel'">
                    <h2>บุคลากร</h2>
                  </v-btn>
                  <v-btn @click="searchUsers = 'student'">
                    <h2>นักเรียน</h2>
                  </v-btn>
                </v-bottom-navigation>
              </v-col>

              <v-col md="8" class="pa-6 ma-2"></v-col>

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
                      <td>{{ item.Position }}</td>
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

      <!-- เพิ่ม/แก้ไข สมาชิกผู้ใช้งาน -->
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
                  <span class="headline">เพิ่มและแก้ไขผู้ใช้งาน</span>
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
                        v-model="Put_Users.Position"
                        :items="items_Type"
                        label="เลือกประเภทผู้ใช้งาน"
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
                          value="วัทนพร"
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
                          value="ปันทะโชติ"
                          solo
                          dense
                        ></v-text-field>
                      </v-col>
                    </v-row>

                    <v-row>
                      <v-col cols="4">
                        <v-row justify="end">
                          <v-subheader><h4>ระดับชั้น :</h4></v-subheader>
                        </v-row>
                      </v-col>
                      <v-col md="4">
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
                      </v-col>
                    </v-row>
                    <v-row>
                      <v-col cols="4">
                        <v-row justify="end">
                          <v-subheader><h4>ห้อง :</h4></v-subheader>
                        </v-row>
                      </v-col>
                      <v-col sm="6" md="3">
                        <v-text-field
                          v-model="Put_Users.Classroom"
                          label="ห้อง"
                          value="ห้องปกครอง"
                          solo
                          dense
                        ></v-text-field>
                      </v-col>
                    </v-row>
                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn color="red" @click="close">
                        ยกเลิก
                      </v-btn>
                      <v-btn color="success" @click="saveMudul">
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
    searchUsers: "",
    dialogAddusers: false,
    formTitle:'',
    imageURL: "https://i.imgur.com/A44vyNC.png",

    items_Type: ['personnel', 'student'],
    items_Grade: ['ไม่มี','มัธยมศึกษาปีที่ 1', 'มัธยมศึกษาปีที่ 2', 'มัธยมศึกษาปีที่ 3', 'มัธยมศึกษาปีที่ 4','มัธยมศึกษาปีที่ 5','มัธยมศึกษาปีที่ 6'],


    //เพิ่ม Users in Modul
    Put_Users: {
      member_ID: "",
      mem_Citizenid: "",
      FName: "",
      LName: "",
      Class: "",
      Classroom: "",
      profile_img: "",
    },

    //เซ็ตค่าเดิม
    Edit_Item: {
      member_ID: "",
      mem_Citizenid: "",
      FName: "",
      LName: "",
      Class: "",
      Classroom: "",
      profile_img: "",
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

  created() {
    let uri = `${process.env.VUE_APP_API_URL}/allmember/listalluser/`;
    axios.get(uri).then((response) => {
      this.Data_Users = response.data;
    });
  },

  methods: {
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
      console.log(this.Put_Users.profile_img);
    });
  },
  
    editItem(item) {
      this.edited_ID = item.member_ID;
      axios.get(`${process.env.VUE_APP_API_URL}/allmember/listedituser/${this.edited_ID} `,{ headers: {'Authorization': 'Basic abcd1234'}})
        .then((res) => {
          this.edited_item = res.data;
          this.imageURL = res.data.profile_img
          Object.assign(this.Put_Users, this.edited_item);
          this.dialogAddusers = true;
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
    },

 async saveMudul() {
      console.log(this.Put_Users);
    await  axios.get(`${process.env.VUE_APP_API_URL}/allmember/checkmemberexist/${this.Put_Users.member_ID}`)
        .then((res) => {
          this.check_ID = res.data.IsMemberId;

          if(this.check_ID == true){
           axios.put(`${process.env.VUE_APP_API_URL}/allmember/edituserbylib`,this.Put_Users).then((res) => {
                alert("แก้ไขข้อมูลเรียบร้อยแล้ว", res.data.msg);
                this.close();
                
            });
          }else{
           axios.post(`${process.env.VUE_APP_API_URL}/allmember/adduser`,this.Put_Users).then((res) => {
                alert("บันทึกข้อมูลเรียบร้อยแล้ว", res.data.msg);
                this.close();
            }); 
          }
        });
    },
  },
};
</script>

<style scoped></style>
