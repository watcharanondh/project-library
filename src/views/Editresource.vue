<template>
  <v-container class="grey lighten-3">
    <v-row class="justify-center">
      <v-col md="3">
        <v-img
          v-if="imageURL"
          :src="imageURL"
          height="auto"
          width="auto"
        ></v-img>
      </v-col>
      <v-col cols="9">
        <v-card class="mx-auto pa-5" outlined>
          <!-- ปุ่มย้อนกลับ -->
          <v-btn @click="$router.push('/Manage_Resources')" color="btnBack" rounded>
            <v-icon left>reply</v-icon>
            <span>ย้อนกลับ</span>
          </v-btn>
          <v-col>
            <v-row class="justify-center"><h1>แก้ไขบรรณานุกรม</h1></v-row>
          </v-col>
          <v-row>
            <!-- ค้นหาบรรณานุกรม -->
            <v-col md="3">
              <h3>ค้นหาบรรณานุกรม</h3>
              <v-row class="no-gutters">
                <v-text-field
                  v-model="Findbibliography"
                  label="ค้นหาบรรณานุกรม"
                  v-on:keyup.enter="API_Findbibliography"
                  dense
                  solo
                  outlined
                  clearable
                  required
                ></v-text-field>
              </v-row>
            </v-col>

            <!-- ปุ่มค้นหาบรรณานุกรม -->
            <v-col md="1" class="pt-10">
              <v-row>
                <v-btn color="primary" v-on:click.stop="API_Findbibliography">
                  ค้นหา
                </v-btn>
                <!-- dialog บรรณานุกรม -->
                <v-dialog
                  :retain-focus="false"
                  v-model="dialogFindbibliography"
                  persistent
                  max-width="900px"
                >
                  <v-card>
                    <v-card-title>
                      <span class="headline">ค้นหาบรรณานุกรม</span>
                    </v-card-title>
                    <hr />
                    <v-card-text>
                      <v-container>
                        <v-data-table
                          :headers="headers_modul_Findbibliography"
                          :items="Data_modul_Findbibliography"
                          :items-per-page="5"
                          class="elevation-1"
                          disable-pagination
                        >
                          <!-- table tr section -->
                          <template v-slot:item="{ item, index }">
                            <tr
                              v-on:click="API_EditInfoBookclick(item)"
                              align="left"
                            >
                              <td align="center">{{ index + 1 }}</td>
                              <td class="blue--text">{{ item.Title }}</td>
                              <td>{{ item.ISBN }}</td>
                            </tr>
                          </template>
                        </v-data-table>
                      </v-container>
                    </v-card-text>
                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn
                        color="error"
                        @click="
                          (Findbibliography = ''),
                            (Data_modul_Findbibliography = []),
                            (dialogFindbibliography = false)
                        "
                      >
                        ยกเลิก
                      </v-btn>
                    </v-card-actions>
                  </v-card>
                </v-dialog>
              </v-row>
            </v-col>

            <v-col md="2">
              <v-row class="no-gutters">
                <h3>เขตข้อมูล</h3>
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

            <v-col md="1" class="pt-10">
              <v-row>
                <!-- Button modal -->
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

            <!-- ช่องเพิ่มรูปปกหนังสือ -->
            <v-col md="3" class="pt-4">
              <h3>เพิ่มรูปปกหนังสือ</h3>
              <v-row class="no-gutters">
                <input
                  v-if="this.inModul.databib[0]"
                  v-on:change="onFileSelected"
                  type="file"
                  name=""
                  id=""
                  label="เพิ่มรูปปกหนังสือ"
                  clearable
                />
              </v-row>
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
            <!-- table data on page // ตารางรวมข้อมูลทั้งหมดก่อนกดส่ง -->
            <v-col cols="12">
              <v-data-table
                :headers="headers"
                :items="inModul.databib"
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

                  <!-- dialogwarn แจ้งเตือนไม่ให้ลบ -->
                  <v-dialog
                    :retain-focus="false"
                    v-model="dialogwarn"
                    max-width="500px"
                  >
                    <v-card>
                      <v-card-title class="headline"
                        >Field
                        นี้จำเป็นต้องมีไม่สามารถแก้ไขหรือลบได้</v-card-title
                      >
                      <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="error" @click="dialogwarn = false"
                          >ยกเลิก</v-btn
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
  name: "Editresource",

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
          // this.$router.push(Position == 'admin'?"/Admin_Menu":"/Student_Personnel_Menu")
       }
  },
  /////////////////////////////////////////////////

  data: () => ({
    template: [],
    marc21: "",
    Findbibliography: "",
    dialog: false,
    dialogspecial: false,
    dialogwarn: false,
    dialogDelete: false,
    dialogFindbibliography: false,

    editedIndex: -1,
    codes: "$a",
    FieldName: "",
    numField: "",
    imageURL:"https://dl.acm.org/specs/products/acm/releasedAssets/images/cover-default--book.svg",

    //ค่าจาก Modul
    inModul: {
      databib: [],
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
    //Table Additems
    Data_modul_Findbibliography: [],
    headers_modul_Findbibliography: [
      {
        text: "ลำดับ",
        align: "center",
        value: "index",
      },
      {
        text: "ชื่อรายการทรัพยากร",
        value: "Title",
        align: "center",
      },
      { text: "ISBN", value: "ISBN", align: "center" },
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
      this.inModul.databib[0].Subfield = this.select.value;
    },

    initialize() {
      this.inModul.databib = [];
    },

    //อัพเดทรูป
    async onFileSelected(event) {
      const reader = new FileReader();
      reader.onload = (event) => {
        // for preview
        this.imageURL = event.target.result;
      };
      reader.readAsDataURL(event.target.files[0]);

      let data = new FormData();
      let file = event.target.files[0];

      data.append("image", file);

      var config = {
        method: "post",
        url: "https://api.imgur.com/3/image",
        headers: {
          Authorization: "Client-ID 546c25a59c58ad7",
        },
        data: data,
      };
      await axios(config).then((response) => {
        // alert('อัพโหลดรูปเรียบร้อยแล้ว กรุณาตรวจสอบที่ Field ที่ 960')
        console.log(response.data.data);
        console.log(this.inModul.databib);
        this.inModul.databib[this.field960Key].Subfield.$a = response.data.data.link;
      });
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
            console.log(this.Data_modul_3.length);
            this.dialogspecial = true;
          } else {
            this.dialog = true;
          }
        });
      }
    },

    API_Findbibliography() {
      if (this.Findbibliography.trim() == 0) {
        alert("กรุณากรอกข้อมูลหนังสือบรรณานุกรมที่ต้องการค้นหา");
      } else {
        const url = `${process.env.VUE_APP_API_URL}/bibdata/findbook/${this.Findbibliography}?StartPage=1&perPage=5`;
        axios.get(url).then((results) => {
          return (this.Data_modul_Findbibliography = results.data.Results);
        });
        this.dialogFindbibliography = true;
      }
    },

    API_EditInfoBookclick(item) {
      this.Editmarc21 = item.Bib_ID;
      const url = `${process.env.VUE_APP_API_URL}/bibdata/subfObjDatabib/${this.Editmarc21}`;
      axios.get(url).then((results) => {
        let Marc21s = results.data;
        for (const [key, element] of Marc21s.entries()) {
          if (element.Field == "960") {
            this.field960Key = key;
            this.imageURL = element.Subfield.$a
          }
          this.inModul.databib.push(element);
        }
      });
      this.dialogFindbibliography = false;
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
          this.numField = results.data[0].Field;

          if (this.Data_modul_3.length <= 0) {
            this.dialogspecial = true;
          } else {
            this.dialog = true;
          }
        });
      }
    },

    deleteItem(item) {
      if (item.Field == "964" || item.Field == "960") {
        this.dialogwarn = true;
      } else {
        this.editedIndex = this.inModul.databib.indexOf(item);
        this.editedAddmodul = Object.assign({}, item);
        this.dialogDelete = true;
      }
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
      if (this.inModul.databib.length <= 0) {
        alert("กรุณากรอกข้อมูลให้ครบก่อนแก้ไข");
      } else {
        this.inModul.databib.forEach((element) => {
          delete element.createdAt;
          delete element.updatedAt;
        });

        axios
          .put(`${process.env.VUE_APP_API_URL}/bibdata/edit`, this.inModul)
          .then((response) => {
            console.log("response: ", response);
            alert("บันทึกข้อมูลเรียบร้อยแล้ว");
            window.location.reload();
          });
      }
    },
  },
};
</script>

<style scoped></style>
