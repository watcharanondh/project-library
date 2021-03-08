<template>
  <v-container class="grey lighten-3">
    <v-row class="justify-center">
      <v-col cols="9">
        <v-card class="mx-auto pa-5" height="4000" width="2000" outlined>
          <!-- ปุ่มย้อนกลับ -->
          <v-col>
            <v-row>
              <v-btn
                @click="$router.push('/Librarian_Menu')"
                color="btnBack"
                rounded
              >
                <v-icon left>reply</v-icon>
                <span>ย้อนกลับ</span>
              </v-btn>
            </v-row>
          </v-col>

          <v-col>
            <v-row class="justify-center"
              ><h1>ทำรายการออกรายงาน(Report)</h1></v-row
            >
          </v-col>

          <v-row>
            <v-col>
              <!-- ประเภทการออกรายงาน -->
              <v-row>
                <v-col cols="5">
                  <v-row justify="end">
                    <h3 class="mt-2">
                      ประเภทการออกรายงาน :
                    </h3>
                  </v-row>
                </v-col>
                <v-col md="7">
                  <v-select
                    v-model="selectReporttype"
                    :items="Item_Reporttype"
                    item-text="name"
                    item-value="value"
                    placeholder="เลือกประเภทการออกรายงาน"
                    v-on:change="API_Reporttype"
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

              <!-- ปุ่มค้นหาสมาชิกรวม -->
              <div v-if="Report_type == 'bnruserreport'">
                <v-row>
                  <v-col cols="5">
                    <v-row justify="end">
                      <h3 class="mt-2">
                        สมาชิกทั้งหมด
                      </h3>
                    </v-row>
                  </v-col>
                  <v-col md="7">
                    <v-btn color="primary" v-on:click="API_GetusersALL">
                      ค้นหา
                    </v-btn>
                  </v-col>
                </v-row>
              </div>

              <!-- เดือน/ปี -->
              <div v-if="Report_type == 'statbnrreport'">
                <v-row>
                  <v-col cols="5">
                    <v-row justify="end">
                      <h3 class="mt-2">
                        เลือกเดือน/ปี :
                      </h3>
                    </v-row>
                  </v-col>
                  <v-col md="7">
                    <v-menu
                      ref="menu"
                      v-model="menu"
                      :close-on-content-click="false"
                      transition="scale-transition"
                      offset-y
                      min-width="auto"
                    >
                      <template v-slot:activator="{ on, attrs }">
                        <v-text-field
                          v-model="date"
                          label="คลิกเลือกเดือน/ปี"
                          readonly
                          single-line
                          filled
                          dense
                          solo
                          outlined
                          clearable
                          v-bind="attrs"
                          v-on="on"
                        ></v-text-field>
                      </template>
                      <v-date-picker
                        type="month"
                        ref="picker"
                        v-model="date"
                        :max="new Date().toISOString().substr(0, 7)"
                        min="1950-01"
                        @change="save"
                      ></v-date-picker>
                    </v-menu>
                  </v-col>
                </v-row>

                <!-- ปุ่มแสดงค่าที่เลือก -->
                <v-row>
                  <v-col cols="5">
                    <v-row> </v-row>
                  </v-col>
                  <v-col md="7">
                    <v-btn
                      color="primary"
                      class="mr-4"
                      @click="Gat_API_Report_Data"
                    >
                      แสดงค่า
                    </v-btn>
                    <v-btn color="error" @click="reset">
                      Reset
                    </v-btn>
                  </v-col>
                </v-row>
              </div>

              <div
                v-if="
                  Report_type == 'databibreport' ||
                    Report_type == 'notreturnreport' ||
                    Report_type == 'bnrreport' ||
                    Report_type == 'finesreport' ||
                    Report_type == 'descriptreport'
                "
              >
                <!-- วัน/เดือน/ปี -->
                <v-row>
                  <v-col cols="5">
                    <v-row justify="end">
                      <h3 class="mt-2">
                        เลือกวันเดือนปี :
                      </h3>
                    </v-row>
                  </v-col>
                  <v-col md="7">
                    <v-text-field
                      v-model="dateRangeText"
                      single-line
                      filled
                      dense
                      solo
                      outlined
                      clearable
                    ></v-text-field>
                  </v-col>
                </v-row>

                <!-- ปุ่มแสดงค่าที่เลือก -->
                <v-row>
                  <v-col cols="5">
                    <v-row> </v-row>
                  </v-col>
                  <v-col md="7">
                    <v-btn
                      color="primary"
                      class="mr-4"
                      @click="Gat_API_Report_Data"
                    >
                      แสดงค่า
                    </v-btn>
                    <v-btn color="error" @click="reset">
                      Reset
                    </v-btn>
                  </v-col>
                </v-row>
              </div>
            </v-col>

            <v-col cols="12" sm="6">
              <div
                v-if="
                  Report_type == 'databibreport' ||
                    Report_type == 'notreturnreport' ||
                    Report_type == 'bnrreport' ||
                    Report_type == 'finesreport' ||
                    Report_type == 'descriptreport'
                "
              >
                <v-date-picker v-model="dates" range></v-date-picker>
              </div>
            </v-col>
          </v-row>

          <!-- ปุ่มพิมพ์ -->
          <v-row justify="center">
            <v-btn color="success" @click="print()">พิมพ์</v-btn>
          </v-row>
          <br />

          <div id="printMe">
            <div v-if="Report_type == 'bnruserreport'">
              <!--Table รายงานข้อมูลสมาชิก -->
              <v-card class="mx-auto pa-5" outlined>
                <v-card-actions>
                  <v-col>
                    <v-row justify="center">
                      <h2>{{ Title_bnruserreport }}</h2>
                    </v-row>
                    <v-row justify="center">
                      <h4>ระหว่างวันที่ : {{ DateThai_bnruserreport }}</h4>
                    </v-row>
                    <v-row justify="center">
                      <h4>
                        รายการรวมทั้งหมด :
                        {{ Item_number_bnruserreport }}
                      </h4>
                    </v-row>
                    <v-divider></v-divider>
                  </v-col>
                </v-card-actions>
                <v-col cols="12">
                  <v-data-table
                    :headers="headers_bnruserreport"
                    :items="GatData_bnruserreport"
                    hide-default-footer
                    disable-pagination
                  >
                    <template v-slot:item="{ item, index }">
                      <tr>
                        <td align="center">{{ index + 1 }}</td>
                        <td>{{ item.Barcode }}</td>
                        <td>{{ item.ISBNs }}</td>
                        <td>{{ item.nameBooks }}</td>
                        <td>{{ item.membernames }}</td>
                        <td>{{ item.librariannames }}</td>
                        <td>{{ item.Borrow }}</td>
                        <td>{{ item.Due }}</td>
                      </tr>
                    </template>
                  </v-data-table>
                </v-col>
              </v-card>
            </div>

            <div v-if="Report_type == 'databibreport'">
              <!--Table รายงานข้อมูลหนังสือ -->
              <v-card class="mx-auto pa-5" outlined>
                <v-card-actions>
                  <v-col>
                    <v-row justify="center">
                      <h2>{{ Title_databibreport }}</h2>
                    </v-row>
                    <v-row justify="center">
                      <h4>ระหว่างวันที่ : {{ DateThai_databibreport }}</h4>
                    </v-row>
                    <v-row justify="center">
                      <h4>
                        รายการรวมทั้งหมด :
                        {{ Item_number_databibreport }}
                      </h4>
                    </v-row>
                    <v-divider></v-divider>
                  </v-col>
                </v-card-actions>
                <v-col cols="12">
                  <v-data-table
                    :headers="headers_databibreport"
                    :items="GatData_databibreport"
                    hide-default-footer
                    disable-pagination
                  >
                    <template v-slot:item="{ item, index }">
                      <tr>
                        <td align="center">{{ index + 1 }}</td>
                        <td>{{ item.Barcode }}</td>
                        <td>{{ item.namebooks }}</td>
                        <td>{{ item.item_status }}</td>
                        <td>{{ item.item_in }}</td>
                        <td>{{ item.item_description }}</td>
                        <td>{{ item.librariannames }}</td>
                      </tr>
                    </template>
                  </v-data-table>
                </v-col>
              </v-card>
            </div>

            <div v-if="Report_type == 'notreturnreport'">
              <!--Table รายงานข้อมูลหนังสือค้างส่ง -->
              <v-card class="mx-auto pa-5" outlined>
                <v-card-actions>
                  <v-col>
                    <v-row justify="center">
                      <h2>{{ Title_notreturnreport }}</h2>
                    </v-row>
                    <v-row justify="center">
                      <h4>ระหว่างวันที่ : {{ DateThai_notreturnreport }}</h4>
                    </v-row>
                    <v-row justify="center">
                      <h4>
                        รายการรวมทั้งหมด :
                        {{ Item_number_notreturnreport }}
                      </h4>
                    </v-row>
                    <v-divider></v-divider>
                  </v-col>
                </v-card-actions>
                <v-col cols="12">
                  <v-data-table
                    :headers="headers_notreturnreport"
                    :items="GatData_notreturnreport"
                    hide-default-footer
                    disable-pagination
                  >
                    <template v-slot:item="{ item, index }">
                      <tr>
                        <td align="center">{{ index + 1 }}</td>
                        <td>{{ item.Barcode }}</td>
                        <td>{{ item.ISBNs }}</td>
                        <td>{{ item.nameBooks }}</td>
                        <td>{{ item.membernames }}</td>
                        <td>{{ item.librariannames }}</td>
                        <td>{{ item.Borrow }}</td>
                        <td>{{ item.Returns }}</td>
                      </tr>
                    </template>
                  </v-data-table>
                </v-col>
              </v-card>
            </div>

            <div v-if="Report_type === 'bnrreport'">
              <!--Table รายงานสถิติข้อมูลการยืม-คืนหนังสือ -->
              <v-card class="mx-auto pa-5" outlined>
                <v-card-actions>
                  <v-col>
                    <v-row justify="center">
                      <h2>{{ Title_bnrreport }}</h2>
                    </v-row>
                    <v-row justify="center">
                      <h4>ระหว่างวันที่ : {{ DateThai_bnrreport }}</h4>
                    </v-row>
                    <v-row justify="center">
                      <h4>รายการรวมทั้งหมด : {{ Item_number_bnrreport }}</h4>
                    </v-row>
                    <v-divider></v-divider>
                  </v-col>
                </v-card-actions>
                <v-col cols="12">
                  <v-data-table
                    :headers="headers_bnrreport"
                    :items="GatData_bnrreport"
                    hide-default-footer
                    disable-pagination
                  >
                    <template v-slot:item="{ item, index }">
                      <tr>
                        <td align="center">{{ index + 1 }}</td>
                        <td>{{ item.Barcode }}</td>
                        <td>{{ item.ISBNs }}</td>
                        <td>{{ item.nameBooks }}</td>
                        <td>{{ item.membernames }}</td>
                        <td>{{ item.librariannames }}</td>
                        <td>{{ item.Borrow }}</td>
                        <td>{{ item.Due }}</td>
                      </tr>
                    </template>
                  </v-data-table>
                </v-col>
              </v-card>
            </div>

            <div v-if="Report_type === 'statbnrreport'">
              <!--Table รายงานสถิติการเข้าใช้ห้องสมุด -->
              <v-card class="mx-auto pa-5" outlined>
                <v-card-actions>
                  <v-col>
                    <v-row justify="center">
                      <h2>{{ Title_statbnrreport }}</h2>
                    </v-row>
                    <v-row justify="center">
                      <h4>ระหว่างวันที่ : {{ DateThai_statbnrreport }}</h4>
                    </v-row>
                    <v-row justify="center">
                      <h4>
                        รายการรวมทั้งหมด :
                        {{ Item_number_statbnrreport }}
                      </h4>
                    </v-row>
                    <v-divider></v-divider>
                  </v-col>
                </v-card-actions>
                <v-col cols="12">
                  <!-- ประจำวันในสัปดาห์ -->
                  <v-data-table
                    :headers="headers_statbnrreport_day"
                    :items="GatData_statbnrreport_date"
                    hide-default-footer
                    disable-pagination
                  >
                    <template v-slot:item="{ item }">
                      <tr>
                        <td align="center">{{ item.Mon }}</td>
                        <td align="center">{{ item.Tue }}</td>
                        <td align="center">{{ item.Wed }}</td>
                        <td align="center">{{ item.Thu }}</td>
                        <td align="center">{{ item.Fri }}</td>
                        <td align="center">{{ item.Sat }}</td>
                        <td align="center">{{ item.Sun }}</td>
                      </tr>
                    </template>
                  </v-data-table>
                  <!-- ประจำสัปดาห์ในเดือน -->
                  <v-data-table
                    :headers="headers_statbnrreport_week"
                    :items="GatData_statbnrreport_week"
                    hide-default-footer
                    disable-pagination
                  >
                    <template v-slot:item="{ item }">
                      <tr>
                        <td align="center">{{ item.WEEK1 }}</td>
                        <td align="center">{{ item.WEEK2 }}</td>
                        <td align="center">{{ item.WEEK3 }}</td>
                        <td align="center">{{ item.WEEK4 }}</td>
                        <td align="center">{{ item.WEEK5 }}</td>
                      </tr>
                    </template>
                  </v-data-table>
                  <!-- ประจำเดือนนั้นๆ -->
                  <v-data-table
                    :headers="headers_statbnrreport_month"
                    :items="GatData_statbnrreport_month"
                    hide-default-footer
                    disable-pagination
                  >
                    <template v-slot:item="{ item }">
                      <tr>
                        <td align="center">{{ item.MONTH }}</td>
                        <td align="center">{{ item.COUNT }}</td>
                      </tr>
                    </template>
                  </v-data-table>
                </v-col>
              </v-card>
            </div>
            <div v-if="Report_type === 'finesreport'">
              <!--Table  รายงานค่าปรับ -->
              <v-card class="mx-auto pa-5" outlined>
                <v-card-actions>
                  <v-col>
                    <v-row justify="center">
                      <h2>{{ Title_finesreport }}</h2>
                    </v-row>
                    <v-row justify="center">
                      <h4>ระหว่างวันที่ : {{ DateThai_finesreport }}</h4>
                    </v-row>
                    <v-row justify="center">
                      <h4>รายการรวมทั้งหมด : {{ Item_number_finesreport }}</h4>
                    </v-row>
                    <v-divider></v-divider>
                  </v-col>
                </v-card-actions>
                <v-col cols="12">
                  <v-data-table
                    :headers="headers_finesreport"
                    :items="GatData_finesreport"
                    hide-default-footer
                    disable-pagination
                  >
                    <template v-slot:item="{ item, index }">
                      <tr>
                        <td align="center">{{ index + 1 }}</td>
                        <td>{{ item.fine_type }}</td>
                        <td>{{ item.receipt_NO }}</td>
                        <td>{{ item.Amount }}</td>
                        <td>{{ item.IsPaid }}</td>
                        <td>{{ item.Description }}</td>
                        <td>{{ item.createdAt }}</td>
                      </tr>
                    </template>
                  </v-data-table>
                  <v-col>
                    <v-row
                      justify="center"
                      style="padding-left: 135px; font-weight: bold;"
                    >
                      <span class="w-200  pr-16 mr-16">{{
                        TotalFineAmount
                      }}</span>
                    </v-row>
                  </v-col>
                </v-col>
              </v-card>
            </div>
            <div v-if="Report_type === 'descriptreport'">
              <!--Table รายงานการตัดจำหน่ายหนังสือ -->
              <v-card max-height="900px" class="mx-auto pa-5" outlined>
                <v-card-actions>
                  <v-col>
                    <v-row justify="center">
                      <h2>{{ Title_descriptreport }}</h2>
                    </v-row>
                    <v-row justify="center">
                      <h4>ระหว่างวันที่ : {{ DateThai_descriptreport }}</h4>
                    </v-row>
                    <v-row justify="center">
                      <h4>
                        รายการรวมทั้งหมด :
                        {{ Item_number_descriptreport }}
                      </h4>
                    </v-row>
                    <v-divider></v-divider>
                  </v-col>
                </v-card-actions>
                <v-col cols="12">
                  <v-data-table
                    :headers="headers_descriptreport"
                    :items="GatData_descriptreport"
                    hide-default-footer
                    disable-pagination
                    class="elevation-1"
                  >
                    <template v-slot:item="{ item, index }">
                      <tr>
                        <td align="center">{{ index + 1 }}</td>
                        <td align="center">{{ item.Barcode }}</td>
                        <td align="strat">{{ item.namebooks }}</td>
                        <td align="center">{{ item.Copy }}</td>
                        <td align="strat">{{ item.item_in }}</td>
                        <td align="strat">{{ item.desc_in }}</td>
                        <td align="strat">{{ item.item_out }}</td>
                        <td align="center">{{ item.desc_out }}</td>
                        <td align="strat">{{ item.librariannames }}</td>
                      </tr>
                    </template>
                  </v-data-table>
                </v-col>
              </v-card>
            </div>

            <!-- ปิดท้าย -->
          </div>
        </v-card>
      </v-col>
    </v-row>
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
                <tr v-on:click="Gat_API_Report_Data(item)" align="left">
                  <td align="center">{{ item.member_ID }}</td>
                  <td align="center">{{ item.mem_Citizenid }}</td>
                  <td align="center">{{ item.FName }}</td>
                  <td align="center">{{ item.LName }}</td>
                  <td align="center">{{ item.Position | ChangeName }}</td>
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
  </v-container>
</template>

<script>
import axios from "axios";

export default {
  name: "Report",
  /////////// check access permission /////////////
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
      // this.$router.push(Position == 'admin'?"/Admin_Menu":"/Student_Personnel_Menu")
    }
  },
  /////////////////////////////////////////////////

  data: () => ({
    selectReporttype: "",
    Item_Reporttype: [
      { name: "รายงานข้อมูลสมาชิก", value: "bnruserreport" },
      { name: "รายงานข้อมูลหนังสือ", value: "databibreport" },
      { name: "รายงานข้อมูลหนังสือค้างส่ง", value: "notreturnreport" },
      { name: "รายงานสถิติข้อมูลการยืม-คืนหนังสือ", value: "bnrreport" },
      { name: "รายงานสถิติการเข้าใช้ห้องสมุด", value: "statbnrreport" },
      { name: "รายงานค่าปรับ", value: "finesreport" },
      { name: "รายงานการตัดจำหน่ายหนังสือ", value: "descriptreport" },
    ],
    output: null,
    setDate: null,
    dates: [],
    date: null,
    menu: false,

    TotalFineAmount: "",

    dialogUsersData: false,
    searchUser: "",

    //ค่าที่จะส่ง
    Report_type: "",
    sentDate: {},

    //Table User All
    Data_modul_selectUser: [],
    headers_modul_selectUser: [
      { text: "รหัส", align: "center", value: "member_ID" },
      { text: "รหัสบัตรประชาชน", align: "center", value: "mem_Citizenid" },
      { text: "ชื่อ", align: "center", value: "FName" },
      { text: "นามสกุล", align: "center", value: "LName" },
      { text: "Position", align: "center", value: "Position" },
    ],

    //Table รายงานข้อมูลสมาชิก
    Title_bnruserreport: "",
    DateThai_bnruserreport: "",
    Item_number_bnruserreport: "",
    GatData_bnruserreport: [],
    headers_bnruserreport: [
      { text: "ลำดับ", align: "center", value: "index", sortable: false },
      { text: "Barcode", align: "center", value: "Barcode", sortable: false },
      { text: "ISBN", align: "center", value: "ISBNs", sortable: false },
      {
        text: "ชื่อทรัพยากร",
        align: "center",
        value: "nameBooks",
        sortable: false,
      },
      {
        text: "ผู้ยืม",
        align: "center",
        value: "membernames",
        sortable: false,
      },
      {
        text: "ผู้ให้ยืม",
        align: "center",
        value: "librariannames",
        sortable: false,
      },
      { text: "วันที่ยืม", align: "center", value: "Borrow", sortable: false },
      { text: "วันที่คืน", align: "center", value: "Due", sortable: false },
    ],
    //Table รายงานข้อมูลหนังสือ
    Title_databibreport: "",
    DateThai_databibreport: "",
    Item_number_databibreport: "",
    GatData_databibreport: [],
    headers_databibreport: [
      { text: "ลำดับ", align: "center", value: "index", sortable: false },
      { text: "Barcode", align: "start", value: "Barcode", sortable: false },
      {
        text: "ชื่อทรัพยากร",
        align: "start",
        value: "namebooks",
        sortable: false,
      },
      { text: "สถานะ", align: "start", value: "item_status", sortable: false },
      {
        text: "วันที่นำเข้า",
        align: "start",
        value: "item_in",
        sortable: false,
      },
      {
        text: "คำอธิบาย",
        align: "start",
        value: "item_description",
        sortable: false,
      },
      {
        text: "ผู้จัดการ",
        align: "start",
        value: "librariannames",
        sortable: false,
      },
    ],
    //Table รายงานข้อมูลหนังสือค้างส่ง
    Title_notreturnreport: "",
    DateThai_notreturnreport: "",
    Item_number_notreturnreport: "",
    GatData_notreturnreport: [],
    headers_notreturnreport: [
      { text: "ลำดับ", align: "center", value: "index", sortable: false },
      { text: "Barcode", align: "center", value: "Barcode", sortable: false },
      { text: "ISBN", align: "center", value: "ISBNs", sortable: false },
      {
        text: "ชื่อทรัพยากร",
        align: "center",
        value: "nameBooks",
        sortable: false,
      },
      {
        text: "ผู้ยืม",
        align: "center",
        value: "membernames",
        sortable: false,
      },
      {
        text: "ผู้ให้ยืม",
        align: "center",
        value: "librariannames",
        sortable: false,
      },
      { text: "วันที่ยืม", align: "center", value: "Borrow", sortable: false },
      { text: "วันที่คืน", align: "center", value: "Returns", sortable: false },
    ],
    //Table รายงานสถิติข้อมูลการยืม-คืนหนังสือ
    Title_bnrreport: "",
    DateThai_bnrreport: "",
    Item_number_bnrreport: "",
    GatData_bnrreport: [],
    headers_bnrreport: [
      { text: "ลำดับ", align: "center", value: "index", sortable: false },
      { text: "Barcode", align: "center", value: "Barcode", sortable: false },
      { text: "ISBN", align: "center", value: "ISBNs", sortable: false },
      {
        text: "ชื่อทรัพยากร",
        align: "center",
        value: "nameBooks",
        sortable: false,
      },
      {
        text: "ผู้ยืม",
        align: "center",
        value: "membernames",
        sortable: false,
      },
      {
        text: "ผู้ให้ยืม",
        align: "center",
        value: "librariannames",
        sortable: false,
      },
      { text: "วันที่ยืม", align: "center", value: "Borrow", sortable: false },
      { text: "วันที่คืน", align: "center", value: "Due", sortable: false },
    ],
    //Table รายงานสถิติการเข้าใช้ห้องสมุด
    Title_statbnrreport: "",
    DateThai_statbnrreport: "",
    Item_number_statbnrreport: "",
    GatData_statbnrreport_date: [],
    GatData_statbnrreport_week: [],
    GatData_statbnrreport_month: [],
    headers_statbnrreport_day: [
      { text: "วันจันทร์", align: "center", value: "Mon", sortable: false },
      { text: "วันอังคาร", align: "center", value: "Tue", sortable: false },
      { text: "วันพุธ", align: "center", value: "Wed", sortable: false },
      { text: "วันพฤหัสบดี", align: "center", value: "Thu", sortable: false },
      { text: "วันศุกร์", align: "center", value: "Fri", sortable: false },
      { text: "วันเสาร์", align: "center", value: "Sat", sortable: false },
      { text: "วันอาทิตย์", align: "center", value: "Sun", sortable: false },
    ],
    headers_statbnrreport_week: [
      { text: "สัปดาห์ที่1", align: "center", value: "WEEK1", sortable: false },
      { text: "สัปดาห์ที่2", align: "center", value: "WEEK2", sortable: false },
      { text: "สัปดาห์ที่3", align: "center", value: "WEEK3", sortable: false },
      { text: "สัปดาห์ที่4", align: "center", value: "WEEK4", sortable: false },
      { text: "สัปดาห์ที่5", align: "center", value: "WEEK5", sortable: false },
    ],
    headers_statbnrreport_month: [
      { text: "เดือน", align: "center", value: "MONTH", sortable: false },
      {
        text: "จำนวน(รายการ)",
        align: "center",
        value: "COUNT",
        sortable: false,
      },
    ],
    //Table รายงานค่าปรับ
    Title_finesreport: "",
    DateThai_finesreport: "",
    Item_number_finesreport: "",
    GatData_finesreport: [],
    headers_finesreport: [
      { text: "ลำดับ", align: "center", value: "index", sortable: false },
      {
        text: "ชนิดค่าปรับ",
        align: "start",
        value: "fine_type",
        sortable: false,
      },
      {
        text: "เลขที่ใบเสร็จ",
        align: "start",
        value: "receipt_NO",
        sortable: false,
      },
      { text: "จำนวน(บาท)", align: "start", value: "Amount", sortable: false },
      { text: "สถานะ", align: "start", value: "IsPaid", sortable: false },
      {
        text: "คำอธิบาย",
        align: "start",
        value: "Description",
        sortable: false,
      },
      {
        text: "วันที่ทำรายการ",
        align: "start",
        value: "createdAt",
        sortable: false,
      },
    ],

    //Table รายงานการตัดจำหน่ายหนังสือ
    Title_descriptreport: "",
    DateThai_descriptreport: "",
    Item_number_descriptreport: "",
    GatData_descriptreport: [],
    headers_descriptreport: [
      { text: "ลำดับ", align: "center", value: "index", sortable: false },
      { text: "Barcode", align: "center", value: "Barcode", sortable: false },
      {
        text: "ชื่อทรัพยากร",
        align: "center",
        value: "namebooks",
        sortable: false,
      },
      { text: "ฉบับที่", align: "center", value: "Copy", sortable: false },
      {
        text: "วันที่นำเข้า",
        align: "center",
        value: "item_in",
        sortable: false,
      },
      {
        text: "ตัดจำหน่ายนำเข้า",
        align: "center",
        value: "desc_in",
        sortable: false,
      },
      {
        text: "วันที่นำออก",
        align: "center",
        value: "item_out",
        sortable: false,
      },
      {
        text: "ตัดจำหน่ายนำออก",
        align: "center",
        value: "desc_out",
        sortable: false,
      },
      {
        text: "ผู้จัดการ",
        align: "center",
        value: "librariannames",
        sortable: false,
      },
    ],
  }),

  watch: {
    menu(val) {
      val && setTimeout(() => (this.$refs.picker.activePicker = "YEAR"));
    },
  },

  computed: {
    dateRangeText() {
      return this.dates.join(" ~ ");
    },
  },

  methods: {
    save(date) {
      this.$refs.menu.save(date);
    },
    API_GetusersALL() {
      this.dialogUsersData = true;
      this.GatData_bnruserreport = [];
      const url = `${process.env.VUE_APP_API_URL}/allmember/listalluser`;
      axios.get(url).then((results) => {
        this.Data_modul_selectUser = results.data;
      });
    },

    //ฟังก์ชันพิมพ์
    print() {
      this.$htmlToPaper("printMe");
    },

    //เลือกประเภทการออกรายงาน
    API_Reporttype() {
      this.Report_type = this.selectReporttype.value;
    },

    reset() {
      window.location.reload();
    },

    Gat_API_Report_Data(item) {
      this.GatData_bnruserrepor = [];
      this.GatData_databibreport = [];
      this.GatData_notreturnreport = [];
      this.GatData_bnrreport = [];
      this.GatData_statbnrreport = [];
      (this.GatData_statbnrreport_date = []),
        (this.GatData_statbnrreport_week = []),
        (this.GatData_statbnrreport_month = []),
        (this.GatData_finesreport = []);
      this.GatData_descriptreport = [];

      var sentDate = Object.assign(
        {},
        { startDate: this.dates[0], endDate: this.dates[1] }
      );

      //รายงานข้อมูลสมาชิก
      if (this.Report_type == "bnruserreport") {
        const url = `${process.env.VUE_APP_API_URL}/report/bnruserreport`;
        axios.post(url, { member_ID: item.member_ID }).then((results) => {
          this.Title_bnruserreport = results.data.Title;
          this.DateThai_bnruserreport = results.data.DateThai;
          this.Item_number_bnruserreport = results.data.Total;
          if (results.data.Data == "ไม่พบข้อมูลรายงานข้อมูลการยืมสมาชิก") {
            alert("ไม่พบข้อมูลรายงานข้อมูลการยืมสมาชิก");
          } else {
            this.GatData_bnruserreport = results.data.Data;
          }
        });
        this.dialogUsersData = false;

        //รายงานข้อมูลหนังสือ
      } else if (this.Report_type == "databibreport") {
        const url = `${process.env.VUE_APP_API_URL}/report/databibreport`;
        axios.post(url, sentDate).then((results) => {
          this.Title_databibreport = results.data.Title;
          this.DateThai_databibreport = results.data.DateThai;
          this.Item_number_databibreport = results.data.Total;
          if (results.data.Data == "ไม่พบข้อมูลรายงานข้อมูลหนังสือ") {
            alert("ไม่พบข้อมูลรายงานข้อมูลหนังสือ");
          } else {
            this.GatData_databibreport = results.data.Data;
          }
        });

        //รายงานข้อมูลหนังสือค้างส่ง
      } else if (this.Report_type == "notreturnreport") {
        const url = `${process.env.VUE_APP_API_URL}/report/notreturnreport`;
        axios.post(url, sentDate).then((results) => {
          this.Title_notreturnreport = results.data.Title;
          this.DateThai_notreturnreport = results.data.DateThai;
          this.Item_number_notreturnreport = results.data.Total;
          if (results.data.Data == "ไม่พบข้อมูลรายงานหนังสือค้างส่ง") {
            alert("ไม่พบข้อมูลรายงานหนังสือค้างส่ง");
          } else {
            this.GatData_notreturnreport = results.data.Data;
          }
        });

        //รายงานสถิติข้อมูลการยืม-คืนหนังสือ
      } else if (this.Report_type == "bnrreport") {
        const url = `${process.env.VUE_APP_API_URL}/report/bnrreport`;
        axios.post(url, sentDate).then((results) => {
          this.Title_bnrreport = results.data.Title;
          this.DateThai_bnrreport = results.data.DateThai;
          this.Item_number_bnrreport = results.data.Total;
          if (
            results.data.Data == "ไม่พบข้อมูลรายงานสถิติข้อมูลการยืม-คืนหนังสือ"
          ) {
            alert("ไม่พบข้อมูลรายงานสถิติข้อมูลการยืม-คืนหนังสือ");
          } else {
            this.GatData_bnrreport = results.data.Data;
          }
        });

        //รายงานสถิติการเข้าใช้ห้องสมุด
      } else if (this.Report_type == "statbnrreport") {
        const url = `${process.env.VUE_APP_API_URL}/report/statbnrreport`;
        axios.post(url, { Date: this.date }).then((results) => {
          this.Title_statbnrreport = results.data.Title;
          this.DateThai_statbnrreport = results.data.DateThai;
          this.Item_number_statbnrreport = results.data.Total;
          this.GatData_statbnrreport_date = results.data.Data[1];
          this.GatData_statbnrreport_week = results.data.Data[0];
          this.GatData_statbnrreport_month = results.data.Data[2];
        });

        //รายงานค่าปรับ
      } else if (this.Report_type == "finesreport") {
        const url = `${process.env.VUE_APP_API_URL}/report/finesreport`;
        axios.post(url, sentDate).then((results) => {
          this.Title_finesreport = results.data.Title;
          this.DateThai_finesreport = results.data.DateThai;
          this.Item_number_finesreport = results.data.Total;
          this.TotalFineAmount = results.data.TotalFineAmount;
          if (results.data.Data == "ไม่พบข้อมูลรายงานค่าปรับ") {
            alert("ไม่พบข้อมูลรายงานค่าปรับ");
          } else {
            this.GatData_finesreport = results.data.Data;
          }
        });

        //รายงานการตัดจำหน่ายหนังสือ
      } else if (this.Report_type == "descriptreport") {
        const url = `${process.env.VUE_APP_API_URL}/report/descriptreport`;
        axios.post(url, sentDate).then((results) => {
          this.Title_descriptreport = results.data.Title;
          this.DateThai_descriptreport = results.data.DateThai;
          this.Item_number_descriptreport = results.data.Total;
          if (results.data.Data == "ไม่พบข้อมูลรายงานการตัดจำหน่ายหนังสือ") {
            alert("ไม่พบข้อมูลรายงานการตัดจำหน่ายหนังสือ");
          } else {
            this.GatData_descriptreport = results.data.Data;
          }
        });
      }
    },
  },
};
</script>

<style>
.pointer {
  cursor: pointer;
}
.w-200 {
  font-weight: 600;
  margin-left: -255px;
}
</style>
