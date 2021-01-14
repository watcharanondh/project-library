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
            <v-row class="justify-center"><h1>จัดการข้อมูลสารสนเทศ</h1></v-row>
          </v-col>
          <v-row>
            <!-- รูปแบบระเบียนมีไว้ให้เลือกของ Marc21 -->
            <v-col md="3">
              <h3>รูปแบบระเบียน</h3>
              <v-row class="no-gutters">
                <v-select
                  v-model="Select_Template_Name"
                  :items="template"
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
              </v-row>
            </v-col>
            <!-- ปุ่มค้นหารูปแบบระเบียน -->
            <v-col md="1" class="pt-10">
              <v-row>
                <v-btn
                  color="primary"
                  v-on:click="API_Findtemp(Select_Template_Name)"
                >
                  ค้นหา
                </v-btn>
              </v-row>
            </v-col>

            <!-- ช่องกรอก Marc21 -->
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
                <v-btn color="primary" v-on:click.stop="Selectmarc21">
                  ค้นหา
                </v-btn>
                <!-- dialog เพิ่มขอบเขต และ แก้ไข -->
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

            <!-- ปุ่มเพิ่มฉบับหนังสือหลายเล่ม -->
            <v-col cols="12" md="2" class="pt-10">
              <v-row>
                <v-btn color="accent" v-on:click="dialogAdditems = true">
                  เพิ่มรายการ(item)
                </v-btn>
              </v-row>
            </v-col>

            <!-- ช่องเพิ่มรูปปกหนังสือ -->
            <v-col md="3" class="pt-4">
              <h3>เพิ่มรูปปกหนังสือ</h3>
              <v-row class="no-gutters">
                <input
                  v-on:change="onFileSelected"
                  type="file"
                  name=""
                  id=""
                  label="เพิ่มรูปปกหนังสือ"
                  clearable
                />
                 <br />
              </v-row>
            </v-col>

            <!-- ประเภททรัพยากร -->
            <v-col cols="12" md="3" class="pt-1">
              <h3>ประเภททรัพยากร</h3>
              <v-select
                v-model="select"
                :items="resourcetype"
                item-text="name"
                item-value="value"
                v-on:change="setSelectedtype"
                return-object
                single-line
                filled
                dense
                solo
                outlined
                clearable
              >
              </v-select>
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
          <!-- table data on page // ตารางรวมข้อมูลทั้งหมดก่อนกดส่ง -->
          <v-card class="mx-auto pa-5" outlined>
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

                  <!--เขตข้อมูลกรณีพิเศษ-->
                  <v-dialog
                    :retain-focus="false"
                    v-model="dialogspecial"
                    max-width="500px"
                  >
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
                </template>
              </v-data-table>
            </v-col>
          </v-card>
        </v-card>
      </v-col>
    </v-row>
    <!-- dialog เพิ่มรายการ(items)-->
    <v-dialog
      :retain-focus="false"
      v-model="dialogAdditems"
      persistent
      max-width="900px"
    >
      <v-card>
        <v-card-title>
          <span class="headline">เพิ่มItem</span>
        </v-card-title>
        <hr />
        <v-card-text>
          <v-container>
            <v-data-table
              :headers="headers_modul_additems"
              :items="Data_modul_additems"
              :search="additems"
              :items-per-page="5"
              class="elevation-1"
              disable-pagination
            >
              <!-- table top section -->
              <template v-slot:top>
                <v-toolbar flat color="green lighten-3">
                  <v-toolbar-title>ค้นหาบรรณานุกรม</v-toolbar-title>
                  <v-divider class="mx-4" inset vertical></v-divider>
                  <v-col cols="1" sm="1" md="3" class="">
                    <v-row>
                      <v-text-field
                        v-model="additems"
                        v-on:keyup.enter="API_Additems"
                        label="ค้นหา"
                        clearable
                        loading
                        single-line
                        hide-details
                      ></v-text-field>
                    </v-row>
                  </v-col>
                  <v-col cols="1" sm="1" md="2" class="ma-2">
                    <v-row>
                      <v-btn
                        @click="API_Additems"
                        color="primary"
                        dark
                        class="mb-2"
                      >
                        <v-icon left>search</v-icon>
                        <span>ค้นหา</span>
                      </v-btn>
                    </v-row>
                  </v-col>
                </v-toolbar>
              </template>
              <!-- table tr section -->
              <template v-slot:item="{ item, index }">
                <tr v-on:click="API_InfoBookclick(item)" align="left">
                  <td align="center">{{ index + 1 }}</td>
                  <td class="primary--text">{{ item.Title }}</td>
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
              (additems = ''),
                (Data_modul_additems = []),
                (dialogAdditems = false)
            "
          >
            ยกเลิก
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- เพิ่มรายการฉบับที่ No. -->
    <v-dialog
      :retain-focus="false"
      v-model="dialogAdditemsNo"
      persistent
      max-width="1600px"
    >
      <v-card>
        <v-card-title>
          <span class="headline">เพิ่ม Item (ฉบับ)</span>
        </v-card-title>
        <hr />
        <v-card-text>
          <v-container>
            <v-data-table
              :headers="headers_modul_additemsNo"
              :items="Data_modul_additemsNo"
              class="elevation-1"
            >
              <!-- table top section -->
              <template v-slot:top>
                <v-toolbar flat color="green lighten-3">
                  <v-toolbar-title>เพิ่มเล่มฉบับที่</v-toolbar-title>
                  <v-divider class="mx-2" inset vertical></v-divider>
                  <v-row>
                    <v-col md="1" class="ma-4">
                      <v-row>
                        <v-text-field
                          v-model="additemsNo"
                          type="number"
                          min="1"
                          clearable
                          single-line
                          hide-details
                          solo
                        ></v-text-field>
                      </v-row>
                    </v-col>
                    <v-col md="1" class="mt-5">
                      <v-row>
                        <v-btn
                          @click="API_AdditemsNo"
                          color="primary"
                          dark
                          class="mb-2"
                        >
                          <v-icon left>add</v-icon>
                          <span>เพิ่ม</span>
                        </v-btn>
                      </v-row>
                    </v-col>

                    <v-col cols="1" sm="1" md="2" class="mt-5">
                      <v-row>
                        <v-btn
                          @click="API_Marc21(Data_modul_additemsNo)"
                          color="primary"
                          dark
                          class="mb-2"
                        >
                          <span>ดู MARC21</span>
                        </v-btn>
                      </v-row>
                    </v-col>
                    <v-col class="mt-5">
                      <v-row>
                        <v-text-field
                          v-model="ides"
                          label="คำอธิบายที่มาตัดจำหน่าย"
                          clearable
                          single-line
                          hide-details
                          solo
                        ></v-text-field>
                      </v-row>
                    </v-col>
                  </v-row>
                </v-toolbar>
              </template>
              <!-- table tr section -->
              <template v-slot:item="{ item, index }">
                <tr align="center">
                  <td align="center">{{ index + 1 }}</td>
                  <td>{{ item.Booknames }}</td>
                  <td align="center">{{ item.Copy }}</td>
                  <td>{{ item.CallNos }}</td>
                  <td class="primary--text" @click="printfBC(item.Barcode)">{{ item.Barcode }}</td>
                  <td>{{ item.item_description }}</td>
                  <td align="center">
                    <v-icon @click="deleteItemNo(item)">
                      delete
                    </v-icon>
                  </td>
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
              (additemsNo = ''),
                (ides = ''),
                (Data_modul_additemsNo = []),
                (dialogAdditemsNo = false)
            "
          >
            ยกเลิก
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <!-- ดู Marc21 -->
    <v-dialog
      :retain-focus="false"
      v-model="dialoglookmarc21"
      persistent
      max-width="900px"
    >
      <v-card>
        <v-data-table
          :headers="headers_Marc21"
          :items="Marc21"
          :items-per-page="5"
          class="elevation-1"
        >
          <template v-slot:item="{ item }">
            <tr>
              <td align="center">{{ item.Field }}</td>
              <td align="center">{{ item.Indicator1 }}</td>
              <td align="center">{{ item.Indicator1 }}</td>
              <td>{{ item.Subfield }}</td>
            </tr>
          </template>
        </v-data-table>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="error" @click="dialoglookmarc21 = false">
            ยกเลิก
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- ตัดจำหน่ายที่มาที่ไป -->
    <v-dialog
      :retain-focus="false"
      v-model="dialogdeleteItemNo"
      persistent
      max-width="900px"
    >
      <v-card>
        <v-container>
          <v-card class="grey lighten-4 mx-auto pa-5" outlined>
            <v-row justify="center">
              <v-card-title>
                <span class="headline">ตัดจำหน่าย</span>
              </v-card-title>
            </v-row>

            <v-row>
              <v-col cols="4">
                <v-row justify="end">
                  <v-subheader><h4>ฉบับที่ :</h4></v-subheader>
                </v-row>
              </v-col>
              <v-col md="2">
                <v-text-field v-model="itemNo.Copy" disabled> </v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="4">
                <v-row justify="end">
                  <v-subheader><h4>ชื่อทรัพยากร :</h4></v-subheader>
                </v-row>
              </v-col>
              <v-col md="6">
                <v-text-field v-model="itemNo.Booknames" disabled>
                </v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="4">
                <v-row justify="end">
                  <v-subheader><h4>เลขเรียกทรัพยากร :</h4></v-subheader>
                </v-row>
              </v-col>
              <v-col md="3">
                <v-text-field v-model="itemNo.CallNos" disabled> </v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="4">
                <v-row justify="end">
                  <v-subheader><h4>Barcodes :</h4></v-subheader>
                </v-row>
              </v-col>
              <v-col md="3">
                <v-text-field
                  v-model="itemNo.Barcode"
                  label="Barcodes"
                  disabled
                >
                </v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="4">
                <v-row justify="end">
                  <v-subheader><h4>ที่มาตัดจำหน่าย(เดิม) :</h4></v-subheader>
                </v-row>
              </v-col>
              <v-col md="6">
                <v-text-field v-model="itemNo.item_description" disabled>
                </v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="4">
                <v-row justify="end">
                  <v-subheader><h4>ตัดจำหน่าย(ใหม่) :</h4></v-subheader>
                </v-row>
              </v-col>
              <v-col md="6">
                <v-text-field
                  v-model="item_descriptionNEW"
                  solo
                  dense
                  clearable
                >
                </v-text-field>
              </v-col>
            </v-row>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="error" @click="dialogdeleteItemNo = false">
                ยกเลิก
              </v-btn>
              <v-btn
                color="success"
                @click="deleteItemNoAPI(item_descriptionNEW)"
              >
                บันทึก
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-container>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import axios from "axios";

export default {
  name: "AddBookandItem",

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

  data: () => ({
    template: [],
    Select_Template_Name: "",
    marc21: "",
    additems: "",
    additemsNo: "",
    ides: "",
    dialog: false,
    dialogspecial: false,
    dialogwarn: false,
    dialogDelete: false,
    dialogAdditems: false,
    dialogAdditemsNo: false,
    dialoglookmarc21: false,
    dialogdeleteItemNo: false,

    editedIndex: -1,
    codes: "$a",
    FieldName: "",
    numField: "",
    imageURL:"https://dl.acm.org/specs/products/acm/releasedAssets/images/cover-default--book.svg",

    MaxBC: "",
    item_descriptionNEW: "",
    Bib_ID_New:"",
    itemNo: {
      Copy: null,
      Barcode: "",
      Bib_ID: "",
      Booknames: "",
      CallNos: "",
      item_status: "",
      libid_getitemin: null,
      item_description: "",
    },

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

    //Resource Type
    select: { name: "Book", value: { $a: "Book" } },
    resourcetype: [
      { name: "Mixed", value: { $a: "Mixed" } },
      { name: "Article", value: { $a: "Article" } },
      { name: "Book", value: { $a: "Book" } },
      { name: "Computer File", value: { $a: "Computer File" } },
      { name: "Map", value: { $a: "Map" } },
      { name: "Music", value: { $a: "Music" } },
      { name: "Serial", value: { $a: "Serial" } },
      { name: "Visual", value: { $a: "Visual" } },
    ],

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
    Data_modul_additems: [],
    headers_modul_additems: [
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

    //Table AdditemsNo
    Data_modul_additemsNo: [],
    headers_modul_additemsNo: [
      {
        text: "ลำดับ",
        align: "center",
        value: "index",
      },
      {
        text: "ชื่อรายการทรัพยากร",
        value: "Booknames",
        align: "center",
      },
      { text: "ฉบับที่", value: "Copy", align: "center" },
      { text: "เลขเรียกทรัพยากร", value: "CallNos", align: "center" },
      { text: "Barcodes", value: "Barcode", align: "center" },
      { text: "คำอธิบาย", value: "item_description", align: "center" },
      { text: "Actions", value: "actions", align: "center" },
    ],

    //Table look Marc21
    Marc21: [],
    headers_Marc21: [
      { text: "Field", value: "Field", align: "center" },
      { text: "Indicator1", value: "Indicator1", align: "center" },
      { text: "Indicator2", value: "Indicator2", align: "center" },
      { text: "Subfield", value: "Subfield", align: "Subfield" },
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
  async created() {
    this.initialize();
    let uri = `${process.env.VUE_APP_API_URL}/tempbib/listTempSelect`;
    await axios.get(uri).then((response) => {
      this.mArray = response.data;
      var _this = this;
      this.mArray.forEach(function(value) {
        _this.template.push({
          temp_Name: `${value.Name}`,
          temp_ID: `${value.template_ID}`,
        });
      });
    });
  },

  methods: {

    //ข้อมูล Filde ที่ห้ามลบและต้องมี ในการเพิ่มหนังสื่อใหม่ทุกครั้ง หน้าเพิ่มทรัพยากร
    initialize() {
      this.inModul.databib = [
        {
          Field: "960",
          Indicator1: "",
          Indicator2: "",
          Subfield: { $a: ""},
        },
        {
          Field: "964",
          Indicator1: "",
          Indicator2: "",
          Subfield: { $a: "Book" },
        },
      ];
    },


    //เลือก Template ที่ใช้เป็นตัวอย่าง หน้าเพิ่มทรัพยากร
    API_Findtemp(Select_Template_Name) {
      const url = `${process.env.VUE_APP_API_URL}/tempbib/listtemplatebib/${Select_Template_Name}`;
      axios.get(url).then((results) => {
        let temp = results.data[0].temp_databibs;
        for (const element of temp) {
          this.inModul.databib.push(element);
        }
        console.log(results.data);
      });
    },

    //เลือกประเภททรัพยากร หน้าเพิ่มทรัพยากร
    setSelectedtype() {
      this.inModul.databib[1].Subfield = this.select.value;
    },


    // ค้นหาเขตข้อมูล Marc21 หน้าเพิ่มทรัพยากร
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
          console.log(results);
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

///////////////////////////////////// เกี่ยวกับการแก้ไข ////////////////////////////////////////////////////////

    //แก้ไขแต่ละ Field หน้าเพิ่มทรัพยากร
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


 //////////////////////// ฟังก์ชันเกี่ยวกับการลบ //////////////////////////////////


    //ลบแต่ละ Field หน้าเพิ่มทรัพยากร
    deleteItem(item) {
      if (item.Field == "964" || item.Field == "960") {
        this.dialogwarn = true;
      } else {
        this.editedIndex = this.inModul.databib.indexOf(item);
        this.editedAddmodul = Object.assign({}, item);
        this.dialogDelete = true;
      }
    },

    //ยืนยันกการลบ Filde หน้าเพิ่มทรัพยากร
    deleteItemConfirm() {
      this.inModul.databib.splice(this.editedIndex, 1);
      this.closeDelete();
    },

    //ยกเลิกการลบ Filde หน้าเพิ่มทรัพยากร
    closeDelete() {
      this.dialogDelete = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    //Clear ค่าต่างๆเมื่อ กดปิดหรือ หยังจากทำ การยิง api เสร็จ หน้าและใน Modul หน้าเพิ่มทรัพยากร
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

    //ฟังก์ชันลบค่าว่างใน Subfilde หน้าเพิ่มทรัพยากร
    removeEmpty(object1) {
      Object.keys(object1).forEach(function(key) {
        (object1[key] && typeof object1[key] === "object") ||
          ((object1[key] === "" || object1[key] === null) &&
            delete object1[key]);
      });
      return object1;
    },

    //รีเฟรชหน้าเว็บ ทุกหน้าที่เรียกใช้
    reset() {
      window.location.reload();
    },

    //ฟังชั่นตัดจำหน่าย
    //เก็บตัวแปรก่อนลบทรัพยากร หน้าเพิ่มฉบับ
    deleteItemNo(item) {
      this.itemNo = {
        Copy: item.Copy,
        Barcode: item.Barcode,
        Bib_ID: item.Bib_ID,
        Booknames: item.Booknames,
        CallNos: item.CallNos,
        libid_getitemin: item.libid_getitemin,
        item_description: item.item_description,
      };
      this.dialogdeleteItemNo = true;
    },

    //ยิง api เพื่อลบทรัพยากร หน้าเพิ่มฉบับ
    async deleteItemNoAPI() {
    if (this.item_descriptionNEW ==''){
        alert('กรุณากรอกคำอธิบายตัดจำหน่าย')
    }else{
      this.updateDel = {
        brcd: this.itemNo.Barcode,
        libid: localStorage.getItem("member_ID"),
        ides: this.itemNo.item_description + '||' + this.item_descriptionNEW,
      }
      const url = `${process.env.VUE_APP_API_URL}/bibdata/edititemdes`;
      await axios.put(url, this.updateDel).then((res) => {
        alert("ลบทรัพยากรเรียบร้อยแล้ว", res);
        this.item_descriptionNEW = "";
        this.dialogdeleteItemNo = false;
      });
    }
      axios.get(`${process.env.VUE_APP_API_URL}/bibdata/bibitem/${this.itemNo.Bib_ID}`).then((results) => {
                return (this.Data_modul_additemsNo = results.data.data);
        });
    },


  ///////////////////////////////////////API รับ/ส่ง ข้อมูล///////////////////////////////////////////////////////

      //อัพเดทรูป หน้าเพิ่มทรัยากร
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
        alert('อัพโหลดรูปเรียบร้อยแล้ว กรุณาตรวจสอบที่ Field ที่ 960')
        console.log(response.data.data);

        this.inModul.databib[0].Subfield.$a = response.data.data.link;
      });
  },

    //เพิ่มรายการ (Items)  หน้าเพิ่มฉบับ
    API_Additems() {
      if (this.additems.trim() == 0) {
        alert("กรุณากรอกข้อมูลหนังสือบรรณานุกรมที่ต้องการค้นหา");
      } else {
        const url = `${process.env.VUE_APP_API_URL}/bibdata/findbook/${this.additems}?StartPage=1&perPage=5`;
        axios.get(url).then((results) => {
          return (this.Data_modul_additems = results.data.Results);
        });
      }
    },

    //ไปหน้า Dialog เพิ่มฉบับ หน้าเพิ่มฉบับ
    API_InfoBookclick(item) {
      
      this.Bib_ID_New = item.Bib_ID;
      this.numID = item.Bib_ID;
      
      const url = `${process.env.VUE_APP_API_URL}/bibdata/bibitem/${this.numID}`;
      axios.get(url).then((results) => {
        //console.log(results.data);
        this.Data_modul_additemsNo = results.data.data;
        this.MaxBC = results.data.maxBarcode;
      });
      this.dialogAdditemsNo = true;
    },

    //ฟังกชั่นเพิ่มฉบับ หน้าเพิ่มฉบับ
    async API_AdditemsNo() {
      this.lib_id = localStorage.getItem("member_ID");

      if (this.additemsNo == ''){
        alert("ไม่ได้ใส่หมายเลขฉบับที่");
      } else {
        //Apiเช็ค item ?
  await axios.get(`${process.env.VUE_APP_API_URL}/bibdata/bibitem/${this.Bib_ID_New}`).then((results) => {
            this.Ck_item= results.data.maxBarcode;
            console.log(this.Ck_item);
        if(this.Ck_item !== null ){
          //กรณีที่มีฉบับแล้ว
            this.str1 = this.Bib_ID_New.substr(0, 6);
            this.barcords = this.MaxBC;
            this.int1 = (parseInt(this.barcords.substr(6, 12)) + 1).toString();
            this.str2 = this.int1.padStart(6, "0");
            this.brcd_id = this.str1 + this.str2;
        }else{
          //กรณีที่ไม่มีสร้างฉบับใหม่
            this.str1 = this.Bib_ID_New.substr(0, 6);
            this.barcords = '1';
            this.str2 = this.barcords.padStart(6, "0");
            this.brcd_id = this.str1 + this.str2;
        }

         this.all = {
          brcd: this.brcd_id,
          bbid: this.Bib_ID_New,
          copy: this.additemsNo,
          lbin: this.lib_id,
          ides: this.ides,
        };

        const url = `${process.env.VUE_APP_API_URL}/bibdata/addnewitem`;
         axios.post(url, this.all).then((res) => {
          alert("เพิ่มฉบับเรียบร้อยแล้ว" , res);
          console.log(res);
          this.Data_modul_additemsNo = [];
          this.additemsNo = "";
          this.ides ='';

          axios.get(`${process.env.VUE_APP_API_URL}/bibdata/bibitem/${this.Bib_ID_New}`).then((results) => {
            return this.Data_modul_additemsNo = results.data.data;
            });


          });
        });  




      }
    },

    //ฟังกชั่นดู Marc21  หน้าเพิ่มฉบับ
    API_Marc21(Data_modul_additemsNo) {
      this.lookmarc21 = Data_modul_additemsNo[0].Bib_ID;
      this.dialoglookmarc21 = true;
      axios
        .get(`${process.env.VUE_APP_API_URL}/bibdata/allbib/${this.lookmarc21}`)
        .then((response) => {
          this.Marc21 = response.data[1];
        });
    },

//////////////////////////////////////พิมพ์ บาร์โค้ด////////////////////////////////////////////////////
      printfBC(){

      },


//////////////////////////////// ปุ่มการบันทึกข้อมูล///////////////////////////////////////////
    
    //บันทึกข้อมูลใน Modul เอามาลงในตารางก่อนบันทึกจริง หน้าเพิ่มทรัพยากร
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

    //บันทึกทั้งหมดตอนสุดท้าย หน้าเพิ่มทรัพยากร
    submit() {
      if (this.inModul.length <= 1) {
        alert("กรุณากรอกข้อมูลให้ครบ");
      } else {
        axios
          .post(`${process.env.VUE_APP_API_URL}/bibdata/bulkadd`, this.inModul)
          .then((res) => {
            //console.log("response: ", res);
            alert("บันทึกข้อมูลเรียบร้อยแล้ว",res);
            window.location.reload();
          });
      }
    },
  },
};
</script>

<style scoped></style>
