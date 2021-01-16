<template>
  <v-container class="grey lighten-3">
    <v-row class="justify-center">
      <v-col cols="9">
        <v-card class="mx-auto pa-5" outlined>
          <!-- ปุ่มย้อนกลับ -->
          <v-btn
            @click="$router.push('/Manage_Resources')"
            color="btnBack"
            rounded
          >
            <v-icon left>reply</v-icon>
            <span>ย้อนกลับ</span>
          </v-btn>
          <v-col>
            <v-row class="justify-center"><h1>เทมเพลต</h1></v-row>
          </v-col>
          <v-row>
            <!-- ชื่อระเบียน -->
            <v-col cols="12" md="6">
              <h3>ชื่อระเบียน:</h3>
              <v-text-field
                v-model="Template_Name"
                label="โปรดระบุชื่อระเบียน"
                dense
                solo
                outlined
                clearable
                required
              ></v-text-field>
            </v-col>
            <!-- ประเภททรัพยากร -->
            <v-col cols="12" md="6">
              <h3>ประเภททรัพยากร</h3>
              <v-text-field
                v-model="Resourcetype_Name"
                label="โปรดระบุประเภททรัพยากร"
                dense
                solo
                outlined
                clearable
                required
              ></v-text-field>
            </v-col>
            <!-- เทมเพลต -->
            <v-col cols="12 " md="5">
              <h3>เทมเพลต</h3>
              <v-select
                v-model="Select_Template_Name"
                :items="Gat_template"
                item-text="temp_Name"
                item-value="temp_ID"
                placeholder="รูปแบบระเบียน"
                filled
                dense
                solo
                outlined
                required
              >
              </v-select>
            </v-col>
            <!-- ค้นหาเทมที่จะลบ -->
            <v-col cols="12 mt-7" md="1">
              <v-btn color="info" v-on:click="deleteTemp(Select_Template_Name)">ลบ</v-btn>
            </v-col>
            <!-- คำอธิบายเพิ่มเติม -->
            <v-col cols="12" md="6">
              <h3>คำอธิบายเพิ่มเติม:</h3>
              <v-textarea
                label="โปรดระบุคำอธิบายเพิ่มเติม"
                v-model="Additionaldescription_Name"
                rows="2"
                row-height="20"
                solo
                outlined
                dense
                clearable
              >
              </v-textarea>
            </v-col>
          </v-row>

          <!-- ปุ่มบันทึกข้อมูลทั้งหน้าก่อนส่ง -->
          <v-row class="justify-center">
            <v-btn color="error" class="mr-4" @click="reset">
              ยกเลิก
            </v-btn>

            <v-btn color="success" @click="submit">
              บันทึก
            </v-btn>
          </v-row>
          <br />
          <v-card class="mx-auto pa-5" outlined>
            <!-- ช่องMarc21 -->
            <v-row class="justify-center">
              <v-col cols="12" md="1" class="pt-5">
                <v-row><h4>เพิ่มเขตข้อมูล</h4></v-row>
              </v-col>
              <v-col cols="12" md="2">
                <v-row class="no-gutters">
                  <v-text-field
                    v-model="marc21"
                    label="ค้นหาเขตข้อมูล"
                    v-on:keyup.enter="Selectmarc21"
                    dense
                    solo
                    outlined
                    clearable
                    required
                  ></v-text-field>
                </v-row>
              </v-col>

              <v-col cols="12" md="1" class="pt-4">
                <v-row class="no-gutters">
                  <!-- ปุ่มค้นหา Button modal -->
                  <v-btn color="primary" v-on:click="Selectmarc21">
                    ค้นหา
                  </v-btn>
                  <!-- ฟอร์มหน้า เพิ่มขอบเขต และ แก้ไข -->
                  <v-dialog
                    :retain-focus="false"
                    v-model="dialog"
                    persistent
                    max-width="900px"
                  >
                    <v-card>
                      <v-card-title>
                        <span class="headline"
                          >{{ formTitle }} {{ numField }} {{ FieldName }}</span
                        >
                      </v-card-title>
                      <hr />
                      <v-card-text>
                        <v-container>
                          <v-data-table
                            :headers="headers_modul_1"
                            :items="Data_modul_1"
                            hide-default-footer
                            class="elevation-1"
                            disable-pagination
                          >
                            <!-- table Indicator1-->
                            <template v-slot:item="{ item }">
                              <tr align="center">
                                <td>{{ item.Code }}</td>
                                <td align="left">{{ item.Description }}</td>
                                <td>
                                  <v-checkbox
                                    v-model="editedAddmodul.Indicator1"
                                    :value="item.Code"
                                  ></v-checkbox>
                                </td>
                              </tr>
                            </template>
                          </v-data-table>
                          <br />
                          <v-data-table
                            :headers="headers_modul_2"
                            :items="Data_modul_2"
                            hide-default-footer
                            class="elevation-1"
                            disable-pagination
                          >
                            <!-- table Indicator2-->
                            <template v-slot:item="{ item }">
                              <tr align="center">
                                <td>{{ item.Code }}</td>
                                <td align="left">{{ item.Description }}</td>
                                <td>
                                  <v-checkbox
                                    v-model="editedAddmodul.Indicator2"
                                    :value="item.Code"
                                  ></v-checkbox>
                                </td>
                              </tr>
                            </template>
                          </v-data-table>
                          <br />
                          <v-data-table
                            :headers="headers_modul_3"
                            :items="Data_modul_3"
                            hide-default-footer
                            class="elevation-1"
                            disable-pagination
                          >
                            <!-- table Subfield-->
                            <template v-slot:item="{ item }">
                              <tr>
                                <td align="center">{{ item.Code }}</td>
                                <td align="left">{{ item.Name_Eng }}</td>
                                <td>
                                  <v-text-field
                                    v-model="editedAddmodul.Subfield[item.Code]"
                                    outlined
                                  ></v-text-field>
                                </td>
                              </tr>
                            </template>
                          </v-data-table>
                          <br />
                        </v-container>
                      </v-card-text>
                      <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="error" @click="close">
                          ยกเลิก
                        </v-btn>
                        <v-btn color="success" @click="saveMudul">
                          เพิ่ม
                        </v-btn>
                      </v-card-actions>
                    </v-card>
                  </v-dialog>
                </v-row>
              </v-col>
            </v-row>
            <!-- table data on page // ตารางรวมข้อมูลทั้งหมดก่อนกดส่ง -->
            <v-col cols="12">
              <v-data-table
                :headers="headers"
                :items="inModul.datatemp"
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
                        >คุณแน่ใจที่ต้องการลบบรรทัดนี้ ?</v-card-title
                      >
                      <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="error" text @click="closeDelete"
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

    <!--เขตข้อมูลกรณีพิเศษ-->
    <v-dialog :retain-focus="false" v-model="dialogspecial" max-width="500px">
      <v-card>
        <v-card-title>
          <span class="headline"
            >{{ formTitle }} {{ numField }} {{ FieldName }}
          </span>
        </v-card-title>
        <hr />
        <v-card class="mx-auto pa-5">
          <v-text-field
            v-model="editedAddmodul.Subfield[codes]"
            outlined
          ></v-text-field>
        </v-card>
        <br />
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="error" @click="close">
            ยกเลิก
          </v-btn>
          <v-btn color="success" @click="saveMudul">
            เพิ่ม
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import axios from "axios";

export default {
  name: "CreateTemplate",

  ////////////// check access permission //////////////
  mounted() {
      let uri = `${process.env.VUE_APP_API_URL}/tempbib/listTempSelect`;
          axios.get(uri).then((response) => {
          this.mArray = response.data;
          var _this = this;
          this.mArray.forEach(function(value) {_this.Gat_template.push({
              temp_Name: `${value.Name}`,
              temp_ID: `${value.template_ID}`,
            });
          });
        });

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
    Select_Template_Name: [],
    Gat_template: [],
    template: [],
    Template_Name: "",
    Resourcetype_Name: "",
    Additionaldescription_Name: "",
    marc21: "",
    dialog: false,
    dialogspecial: false,
    dialogDelete: false,
    dialogFindbibliography: false,

    editedIndex: -1,
    codes: "\\a",
    FieldName: "",
    numField: "",

    //ค่าจาก Modul
    inModul: {
      template: [],
      datatemp: [],
    },

    //แก้ไขใน modul
    editedAddmodul: {
      Field: "",
      Indicator1: "",
      Indicator2: "",
      Subfield: {},
    },

    //เซ็ตค่าเดิม
    defaultItem: {
      Field: "",
      Indicator1: "",
      Indicator2: "",
      Subfield: {},
    },

    //Table on Page
    headers: [
      {
        text: "Field",
        align: "start",
        value: "name",
      },
      { text: "Indicator1", value: "Indicator1", align: "left" },
      { text: "Indicator2", value: "Indicator2", align: "left" },
      { text: "Subfield", value: "Subfield", align: "left" },
      { text: "Actions", value: "actions", sortable: false },
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

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "เขตข้อมูล" : "แก้ไขเขตข้อมูล";
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
      this.inModul.datatemp[0].Subfield = this.select.value;
    },

    initialize() {
      this.inModul.datatemp = [];
    },

    // เขตข้อมูล Marc21
    Selectmarc21() {
      this.Data_modul_1 = [];
      this.Data_modul_2 = [];
      this.Data_modul_3 = [];
      this.editedIndex = -1;
      if (this.marc21.trim() == 0) {
        alert("กรุณากรอกขอบเขตข้อมูลที่ต้องการค้นหา");
      } else if (
        (this.marc21.charAt(0).toUpperCase() + this.marc21.slice(1)).trim() ==
        "Leader"
      ) {
        this.numField = (
          this.marc21.charAt(0).toUpperCase() + this.marc21.slice(1)
        ).trim();
        this.FieldName = "";
        this.dialogspecial = true;
      } else {
        const url = `${process.env.VUE_APP_API_URL}/marc/addmarc/${this.marc21}`;
        axios.get(url).then((results) => {
          this.Data_modul_1 = results.data[0].indicator1;
          this.Data_modul_2 = results.data[0].indicator2;
          this.Data_modul_3 = results.data[0].subfields;
          this.FieldName = results.data[0].Name;
          this.numField = results.data[0].Field;
          if (this.Data_modul_3.length <= 0) {
            this.dialogspecial = true;
          } else {
            this.dialog = true;
          }
        });
      }
    },

    editItem(item) {
      if (item.Field == "Leader") {
        this.editedIndex = this.inModul.datatemp.indexOf(item);
        this.editedAddmodul = Object.assign({}, item);
        this.dialogspecial = true;
      } else {
        this.editedIndex = this.inModul.datatemp.indexOf(item);
        this.editedAddmodul = Object.assign({}, item);
        const url = `${process.env.VUE_APP_API_URL}/marc/addmarc/${item.Field}`;
        axios.get(url).then((results) => {
          this.Data_modul_1 = results.data[0].indicator1;
          this.Data_modul_2 = results.data[0].indicator2;
          this.Data_modul_3 = results.data[0].subfields;
          this.FieldName = results.data[0].Name;
          this.numField = results.data[0].Field;

          if (this.Data_modul_3.length <= 0) {
            this.dialogspecial = true;
          } else {
            this.dialog = true;
          }
        });
      }
    },
    deleteTemp(){
        console.log(this.Select_Template_Name);
       let uri = `${process.env.VUE_APP_API_URL}/tempbib/deltempbib/${this.Select_Template_Name}`;
          axios.delete(uri).then((response) => {
            alert('ลบเทมเพลตเรียบร้อยแล้ว',response)
            this.reset();
        });
    },

    deleteItem(item) {
      this.editedIndex = this.inModul.datatemp.indexOf(item);
      this.editedAddmodul = Object.assign({}, item);
      this.dialogDelete = true;
    },

    deleteItemConfirm() {
      this.inModul.datatemp.splice(this.editedIndex, 1);
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
          this.inModul.datatemp[this.editedIndex],
          this.editedAddmodul
        );
      } else {
        this.editedAddmodul.Subfield = object1;
        this.inModul.datatemp.push(this.editedAddmodul);
      }

      this.close();
    },

    submit() {
      this.table = this.inModul.datatemp.length;
      if (
        this.table <= 0 ||
        this.Template_Name == "" ||
        this.Resourcetype_Name == "" ||
        this.Additionaldescription_Name == ""
      ) {
        alert("กรุณากรอกข้อมูลให้ครบ");
      } else {
        this.inModul.template.push({
          Name: `${this.Template_Name}`,
          Type: `${this.Resourcetype_Name}`,
          Description: `${this.Additionaldescription_Name}`,
        });
        axios.post(`${process.env.VUE_APP_API_URL}/tempbib/addtempbib`,this.inModul)
          .then((res) => {
            alert("บันทึกข้อมูลเรียบร้อยแล้ว", res);
            window.location.reload();
          });
      }
    },
  },
};
</script>

<style scoped></style>
