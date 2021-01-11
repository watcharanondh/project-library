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
            <v-row class="justify-center"><h1>แก้ไขข้อมูลส่วนตัว</h1></v-row>
          </v-col>
          <v-row>
            <!-- ซ้าย -->
            <v-col sm="4">
              <v-row class=" pa-6 ma-2"> </v-row>
              <v-row class=" pa-6 ma-2"> </v-row>
              <v-row justify="center">
              <h2>{{Position | capitalize }}</h2>
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
              <v-row justify="center">
                <v-col cols="7">
                  <input
                      v-on:change="onFileSelected"
                      type="file"
                      name=""
                      id=""
                      label="เพิ่มรูปโปรไฟล์"
                      clearable
                    />
                </v-col>
              </v-row>
               
            </v-col>


            <v-col>
              <v-row>
                <v-col cols="3">
                  <v-row justify="end">
                    <v-subheader><h4>รหัส :</h4></v-subheader>
                  </v-row>
                </v-col>
                <v-col md="2">
                  <v-text-field
                    v-model="Put_Users.member_ID"
                    solo
                    dense
                    disabled
                  >
                  </v-text-field>
                </v-col>
              </v-row>

              <v-row>
                <v-col cols="3">
                  <v-row justify="end">
                    <v-subheader><h4>รหัสประจำตัวประชาชน :</h4></v-subheader>
                  </v-row>
                </v-col>
                <v-col md="4">
                  <v-text-field
                    v-model="Put_Users.mem_Citizenid"
                    solo
                    dense
                  ></v-text-field>
                </v-col>
              </v-row>

              <v-row>
                <v-col cols="3">
                  <v-row justify="end">
                    <v-subheader><h4>ชื่อ :</h4></v-subheader>
                  </v-row>
                </v-col>
                <v-col md="3">
                  <v-text-field
                    v-model="Put_Users.FName"
                    solo
                    dense
                  ></v-text-field>
                </v-col>
                 <v-col md="2">
                <v-row  justify="center">
                  <v-subheader><h4>นาม-สกุล :</h4></v-subheader>
                </v-row>
                 </v-col>
                <v-col md="3">
                  <v-text-field
                    v-model="Put_Users.LName"
                    solo
                    dense
                  ></v-text-field>
                </v-col>
              </v-row>

              <v-row>
                <v-col cols="3">
                  <v-row justify="end">
                    <v-subheader><h4>ระดับชั้น :</h4></v-subheader>
                  </v-row>
                </v-col>
                <v-col md="4">
                  <v-autocomplete
                    v-model="Put_Users.Class"
                    :items="items_Grade"
                    return-object
                    filled
                    dense
                    solo
                    outlined
                  >
                  </v-autocomplete>
                </v-col>
              </v-row>

              <v-row>
                <v-col cols="3">
                  <v-row justify="end">
                    <v-subheader><h4>ห้อง :</h4></v-subheader>
                  </v-row>
                </v-col>
                <v-col md="3">
                  <v-text-field
                    v-model="Put_Users.Classroom"
                    solo
                    dense
                  >
                  </v-text-field>
                </v-col>
              </v-row>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="error" @click="reset">
                  ยกเลิก
                </v-btn>
                <v-btn color="success" @click="submit">
                  บันทึก
                </v-btn>
              </v-card-actions>
            </v-col>

          </v-row>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import axios from "axios";

export default {
  name: "Edit",
  data: () => ({
    Position:localStorage.getItem("Position"),
    imageURL:localStorage.getItem("profile_img"),

    items_Grade: ['ไม่มี','มัธยมศึกษาปีที่ 1', 'มัธยมศึกษาปีที่ 2', 'มัธยมศึกษาปีที่ 3', 'มัธยมศึกษาปีที่ 4','มัธยมศึกษาปีที่ 5','มัธยมศึกษาปีที่ 6'],

    //แก้ไข Users in Modul
    Put_Users: {
      member_ID: "",
      mem_Citizenid: "",
      FName: "",
      LName: "",
      Class: "",
      Classroom: "",
      profile_img: "",
    },

  }),

  headers: {
          'Authorization': 'Basic abcd1234', 
        },

 async mounted() {
       var config = {
        method: 'get',
        url: `${process.env.VUE_APP_API_URL}/allmember/listedituser/${localStorage.getItem("member_ID")}`,
        headers: {
          'Authorization': 'Basic abcd1234', 
        },
      };

   await axios(config)
          .then((res) => {
            console.log(res.data);
            this.Put_Users = res.data;
            this.imageURL = res.data.profile_img
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

    reset() {
      window.location.reload();
    },

    submit(){
        axios.put(`${process.env.VUE_APP_API_URL}/allmember/edituserbyuser`,this.Put_Users).then((res) => {
                alert("บันทึกข้อมูลและแก้ไขเรียบร้อยแล้ว", res.data.msg);
                this.reset();
            });  
      }
  },
};
</script>

<style scoped></style>
