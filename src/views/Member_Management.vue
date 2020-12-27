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
            <v-row class="justify-center"><h1>การจัดการสมาชิก</h1></v-row>
          </v-col>
          <v-row class="justify-center">
            <v-col md="3" class="pa-6 ma-2"></v-col>
            <!-- ปุ่มเลือกประเภท Users แก้ไข -->
            <v-col md="1" class="pa-6 ma-2">
              <v-btn color="primary" v-on:click="API_admin">
                แอดมิน
              </v-btn>
            </v-col>
            <v-col md="1" class="pa-6 ma-2 mr-7">
              <v-btn color="primary" v-on:click="API_librarian">
                บรรณารักษ์
              </v-btn>
            </v-col>
            <v-col md="1" class="pa-6 ma-2 mr-5">
              <v-btn color="primary" v-on:click="API_personnel">
                บุคคลากร
              </v-btn>
            </v-col>
            <v-col md="1" class="pa-6 ma-2">
              <v-btn color="primary" v-on:click="API_student">
                นักเรียน
              </v-btn>
            </v-col>
            <v-col md="2" class="pa-6 ma-2"></v-col>

            <v-col md="1" class="pa-6 ma-2 mr-7">
              <v-btn color="primary" v-on:click="Add_users">
                <v-icon left>add</v-icon>
                <span>เพิ่มสมาชิก</span>
              </v-btn>
            </v-col>
          </v-row>

          <!-- table data show Users-->
          <v-card class="mx-auto pa-5" outlined>
            <v-col cols="12">
              <v-data-table
                :headers="headers"
                :items="DataUsers"
                :items-per-page="10"
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
                  <!-- dialogDelete ยืนยันการลบ -->
                  <v-dialog
                    :retain-focus="false"
                    v-model="dialogDelete"
                    max-width="500px"
                  >
                    <v-card>
                      <v-card-title class="headline"
                        >คุณแน่ใจที่ต้องการลบบรรทัดนี้ ?
                      </v-card-title>
                      <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="blue darken-1" text @click="closeDelete"
                          >ยกเลิก</v-btn
                        >
                        <v-btn
                          color="blue darken-1"
                          text
                          @click="deleteItemConfirm"
                          >ยืนยัน</v-btn
                        >
                        <v-spacer></v-spacer>
                      </v-card-actions>
                    </v-card>
                  </v-dialog>
                </template>
              </v-data-table>
            </v-col>
          </v-card>
        </v-card>
      </v-col>
    </v-row>

    <!-- เพิ่มสมาชิกผู้ใช้งาน -->
    <v-dialog
      :retain-focus="false"
      v-model="dialogAddusers"
      persistent
      max-width="900px"
    >
      <v-card>
        <v-card-title>
          <span class="headline">เพิ่มสมาชิกใหม่</span>
        </v-card-title>
        <hr />
        <v-container>
          <v-card class="grey lighten-3 mx-auto pa-5" outlined>
            <v-row>
              <v-col sm="1">
                <v-sheet color="grey lighten-5"> </v-sheet>
              </v-col>

              <v-col sm="2">
                <v-row class=" pa-6 ma-2"> </v-row>
                <v-row class=" pa-6 ma-2"> </v-row>
                <v-row justify="center">
                  <v-row class="no-gutters">
                    <v-autocomplete
                      v-model="select"
                      :items="editedAddmodul.Type_users"
                      item-text="name"
                      item-value="value"
                      v-on:change="setSelectedtype"
                      label="Admin"
                      return-object
                      filled
                      dense
                      solo
                      outlined
                    >
                    </v-autocomplete>
                  </v-row>
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
                  <h3>อัพรูป</h3>
                </v-row>
              </v-col>

              <v-col sm="9">
                <v-sheet class="grey lighten-3" rounded="lg" min-height="56vh">
                  <v-row>
                    <v-col cols="4">
                      <v-row justify="end">
                        <v-subheader><h4>รหัส :</h4></v-subheader>
                      </v-row>
                    </v-col>
                    <v-col md="3">
                      <v-text-field 
                      v-model="editedAddmodul.Identification_code" value="123456789"  solo dense>
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
                        v-model="editedAddmodul.ID_card_number"
                        value="1509901566182"
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
                      <v-text-field v-model="editedAddmodul.fullname.Firstname" value="วัทนพร" solo dense></v-text-field>
                    </v-col>
                    <v-row justify="center" class=" mt-3">
                      <v-subheader><h4>นาม-สกุล :</h4></v-subheader>
                    </v-row>
                    <v-col md="3">
                      <v-text-field  v-model="editedAddmodul.fullname.Lastname" value="ปันทะโชติ" solo dense></v-text-field>
                    </v-col>
                  </v-row>

                  <v-row>
                    <v-col cols="4">
                      <v-row justify="end">
                        <v-subheader><h4>ระดับชั้น :</h4></v-subheader>
                      </v-row>
                    </v-col>
                    <v-col md="3">
                      <v-text-field
                        v-model="editedAddmodul.Grade_Level"
                        value="มัธยมศึกษาปีที่ 3"
                        solo
                        dense
                      ></v-text-field>
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
                        v-model="editedAddmodul.classroom"
                        value="ห้องปกครอง"
                        solo
                        dense
                      ></v-text-field>
                    </v-col>
                  </v-row>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="red" @click="dialogAddusers = false">
                      ยกเลิก
                    </v-btn>
                    <v-btn color="success" @click="dialogAddusers = false">
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
  </v-container>
</template>

<script>
import axios from "axios";

export default {
  name: "AddBook",
  data: () => ({
    dialog: false,
    dialogAddusers: false,
    dialogwarn: false,
    dialogDelete: false,
    editedIndex: -1,

    //ค่าจาก Modul
    inModul: {},

   

    //แก้ไขใน modul
    editedAddmodul: {
       Type_users: [
      { name: "Admin", value:  "Book"  },
      { name: "librarian", value: "Mixed"  },
      { name: "personnel", value: "Article" },
      { name: "student", value: "Book" },
    ],
      Identification_code: "",
      ID_card_number: "",
      fullname: { Firstname: "", Lastname: "" },
      Grade_Level: "",
      classroom: "",
      image: null,
    },

    //เซ็ตค่าเดิม
    defaultItem: {
      Type_users: "",
      Identification_code: "",
      ID_card_number: "",
      fullname: { Firstname: "", Lastname: "" },
      Grade_Level: "",
      classroom: "",
      image: null,
    },

    //Table on Page
    headers: [
      {
        text: "ลำดับ",
        align: "start",
        value: "index",
      },
      { text: "รหัสประจำตัว", value: "Indicator1", align: "left" },
      { text: "รหัสบัตรประชาชน", value: "Indicator2", align: "left" },
      { text: "ชื่อ-นามสุกล", value: "Subfield", align: "left" },
      { text: "Actions", value: "actions", sortable: false },
    ],

    //ค่าจากการ API ใน Modul
    Data_modul_1: [],
    Data_modul_2: [],
    Data_modul_3: [],
    headers1: [
      { text: "ลำดับ", value: "index" },
      { text: "รหัสประจำตัว", value: "code1" },
      { text: "รหัสบัตรประชาชน", value: "code2" },
      { text: "ชื่อ-นามสุกล", value: "Subfield" },
      { text: "Action", value: "action" },
    ],
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "เพิ่มสมาชิก" : "แก้ไขสมาชิก";
    },
  },

  watch: {
    dialog(val) {
      val || this.close();
    },
    dialogDelete(val) {
      val || this.closeDelete();
    },
  },

  created() {
    this.initialize();
  },

  methods: {
    setSelectedtype() {
      this.inModul = this.select.value;
    },

    initialize() {
      this.inModul = [];
    },

    // เรียกดูข้อมูล admin
    API_admin() {
      this.Data_modul_1 = [];
      this.Data_modul_2 = [];
      this.Data_modul_3 = [];
      this.editedIndex = -1;

      const url = `${process.env.VUE_APP_API_URL}/bibdata/bibitem/${this.numid}`;
      axios.get(url).then((results) => {
        return (this.Data_modul_additemsNo = results.data);
      });
      this.dialogAdditemsNo = true;
    },
    // เรียกดูข้อมูล librarian
    API_librarian() {
      this.Data_modul_1 = [];
      this.Data_modul_2 = [];
      this.Data_modul_3 = [];
      this.editedIndex = -1;
      const url = `${process.env.VUE_APP_API_URL}/bibdata/bibitem/${this.numid}`;
      axios.get(url).then((results) => {
        return (this.Data_modul_additemsNo = results.data);
      });
      this.dialogAdditemsNo = true;
    },
    // เรียกดูข้อมูล personnel
    API_personnel() {
      this.Data_modul_1 = [];
      this.Data_modul_2 = [];
      this.Data_modul_3 = [];
      this.editedIndex = -1;
      const url = `${process.env.VUE_APP_API_URL}/bibdata/bibitem/${this.numid}`;
      axios.get(url).then((results) => {
        return (this.Data_modul_additemsNo = results.data);
      });
      this.dialogAdditemsNo = true;
    },
    // เรียกดูข้อมูล student
    API_student() {
      this.Data_modul_1 = [];
      this.Data_modul_2 = [];
      this.Data_modul_3 = [];
      this.editedIndex = -1;
      const url = `${process.env.VUE_APP_API_URL}/bibdata/bibitem/${this.numid}`;
      axios.get(url).then((results) => {
        return (this.Data_modul_additemsNo = results.data);
      });
      this.dialogAdditemsNo = true;
    },

    //เพิ่มสมาชิกใหม่
    Add_users() {
      this.dialogAddusers = true;
    },

    editItem(item) {
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
    },

    deleteItem(item) {
      this.editedIndex = this.inModul.databib.indexOf(item);
      this.editedAddmodul = Object.assign({}, item);
    },

    deleteItemConfirm() {
      this.inModul.databib.splice(this.editedIndex, 1);
      this.closeDelete();
    },

    closeDelete() {
      this.dialogDelete = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedAddmodul = Object.assign({}, this.defaultItem);
        this.Data_modul_1 = [];
        this.Data_modul_2 = [];
        this.Data_modul_3 = [];
        this.editedIndex = -1;
      });
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
