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
              แสดงชื่อtype
              </v-row>

              <v-row justify="center">
                <v-sheet min-height="10">
                  <v-img
                    contain
                    :src="require('@/assets/lib/person.jpg')"
                    max-height="150"
                    max-width="150"
                  ></v-img>
                </v-sheet>
              </v-row>
              <v-row justify="center">
                <v-col cols="7">
                <v-file-input
                  v-model="image"
                  label="เพิ่มรู้ประจำตัว"
                  clearable
                ></v-file-input>
                </v-col>
              </v-row>
               
            </v-col>
            <!-- ซ้าย จบ-->

            <!-- ขวา-->
            <v-col>
              <v-row>
                <v-col cols="3">
                  <v-row justify="end">
                    <v-subheader><h4>รหัส :</h4></v-subheader>
                  </v-row>
                </v-col>
                <v-col md="3">
                  <v-text-field
                    v-model="editedAddmodul.Identification_code"
                    value="123456789"
                    solo
                    dense
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
                    v-model="editedAddmodul.ID_card_number"
                    value="1509901566182"
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
                    v-model="editedAddmodul.fullname.Firstname"
                    value="วัทนพร"
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
                    v-model="editedAddmodul.fullname.Lastname"
                    value="ปันทะโชติ"
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
                    v-model="select"
                    :items="editedAddmodul.Grade_Level"
                    item-text="name"
                    item-value="value"
                    label="Admin"
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
                    v-model="editedAddmodul.classroom"
                    value="ห้องปกครอง"
                    solo
                    dense
                  >
                  </v-text-field>
                </v-col>
              </v-row>

              <v-card-actions>
                <v-spacer></v-spacer>
                 <v-btn color="yellow" @click="API_Gat_update_users">
                  แก้ไข
                </v-btn>
                <v-btn color="red" @click="API_Gat_update_users">
                  ยกเลิก
                </v-btn>
                <v-btn color="success" @click="API_Gat_update_users">
                  บันทึก
                </v-btn>
              </v-card-actions>
            </v-col>

            <!-- ขวา จบ-->
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
   


    //Resource Type
    select: { name: "Book", value: { "\\a": "Book" } },
    resourcetype: [
      { name: "Mixed", value: { "\\a": "Mixed" } },
      { name: "Article", value: { "\\a": "Article" } },
      { name: "Book", value: { "\\a": "Book" } },
      { name: "Computer File", value: { "\\a": "Computer File" } },
      { name: "Map", value: { "\\a": "Map" } },
      { name: "Music", value: { "\\a": "Music" } },
      { name: "Serial", value: { "\\a": "Serial" } },
      { name: "Visual", value: { "\\a": "Visual" } },
    ],

    editedAddmodul: {
      Type_users: [
        { name: "Admin", value: "Admin" },
        { name: "librarian", value: "librarian" },
        { name: "personnel", value: "personnel" },
        { name: "student", value: "student" },
      ],

      Identification_code: "",
      ID_card_number: "",
      fullname: { Firstname: "", Lastname: "" },
      Grade_Level: [
        { name: "มัธยมศึกษาปีที่ 1", value: "มัธยมศึกษาปีที่ 1" },
        { name: "มัธยมศึกษาปีที่ 2", value: "มัธยมศึกษาปีที่ 2" },
        { name: "มัธยมศึกษาปีที่ 3", value: "มัธยมศึกษาปีที่ 3" },
        { name: "มัธยมศึกษาปีที่ 4", value: "มัธยมศึกษาปีที่ 4" },
        { name: "มัธยมศึกษาปีที่ 5", value: "มัธยมศึกษาปีที่ 5" },
        { name: "มัธยมศึกษาปีที่ 6", value: "มัธยมศึกษาปีที่ 6" },
      ],
      classroom: "",
      image: null,
    },
  }),


  methods: {

    onFileSelected(event) {
      const reader = new FileReader();
      reader.onload = (event) => {
        // for preview
        this.imageURL = event.target.result;
      };
      reader.readAsDataURL(event.target.files[0]);

      //for upload
      this.inModul.databib[0].image = event.target.files[0];
    },

   

    editItem(item) {
      if (item.Field == "964" || item.Field == "960") {
        this.dialogwarn = true;
      } else if (item.Field == "Leader") {
        this.editedIndex = this.inModul.databib.indexOf(item);
        this.editedAddmodul = Object.assign({}, item);
        this.dialogspecial = true;
      } else {
        this.editedIndex = this.inModul.databib.indexOf(item);
        this.editedAddmodul = Object.assign({}, item);
        const url = `${process.env.VUE_APP_API_URL}/marc/addmarc/${item.Field}`;
        axios.get(url).then((results) => {
          this.Data_modul_1 = results.data[0].indicator1;
          this.Data_modul_2 = results.data[0].indicator2;
          this.Data_modul_3 = results.data[0].subfields;
          this.FieldName = results.data[0].Name;

          if (this.Data_modul_3.length <= 0) {
            this.dialogspecial = true;
          } else {
            this.dialog = true;
          }
        });
      }
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

    reset() {
      window.location.reload();
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
