<template>
  <v-container class="grey lighten-4">
    <v-card class="grey lighten-3 mx-auto pa-5" outlined>
      <v-row>
        <v-col cols="12" sm="2">
          <v-sheet color="grey lighten-3"> </v-sheet>
        </v-col>

        <v-col cols="12" sm="2">
           <v-row class=" pa-6 ma-2"> </v-row>
          <v-row justify="center">
            <h1>{{PositionTH}}</h1>
          </v-row>
          <v-row justify="center">
            <v-sheet class="" rounded="xl" min-height="10">
              <v-img
                contain
                :src="imageURL"
                max-height="200"
                max-width="200"
              ></v-img>
            </v-sheet>
          </v-row>
          <v-row justify="center">
            <h2>{{FName}} {{LName}}</h2>
          </v-row>
        </v-col>

        <v-col cols="12" sm="6">
          <v-sheet class="grey lighten-3" rounded="xl" min-height="56vh">
            <v-row>
              <v-col sm="5" class="ma-9">
                <v-row>
                  <v-btn
                    block
                    color="grey lighten-1"
                    elevation="9"
                    fab
                    rounded
                    x-large
                    @click="$router.push('/Member_Management')"
                  >
                    <v-img
                      contain
                      :src="require('@/assets/lib/teamwork.png')"
                      max-height="70"
                      max-width="70"
                    ></v-img>
                    <h3>ระบบจัดการสมาชิก</h3>
                  </v-btn>
                </v-row>
              </v-col>

              <v-col sm="5" class="ma-9">
                <v-row>
                  <v-btn
                    block
                    color="grey lighten-1"
                    elevation="9"
                    fab
                    rounded
                    x-large
                    @click="$router.push('/Report')"
                  >
                    <v-img
                      contain
                      :src="require('@/assets/lib/report.png')"
                      max-height="70"
                      max-width="70"
                    ></v-img>
                    <h3>การออกรายงาน</h3>
                  </v-btn>
                </v-row>
              </v-col>

              <v-col sm="5" class="ma-9">
                <v-row>
                  <v-btn
                    block
                    color="grey lighten-1"
                    elevation="9"
                    fab
                    rounded
                    x-large
                     @click="$router.push('/Manage_Resources')"
                  >
                    <v-img
                      contain
                      :src="require('@/assets/lib/manage.png')"
                      max-height="70"
                      max-width="70"
                    ></v-img>
                    <h3>จัดการข้อมูลทรัพยากร</h3>
                  </v-btn>
                </v-row>
              </v-col>

              <v-col sm="5" class="ma-9">
                <v-row>
                  <v-btn
                    block
                    color="grey lighten-1"
                    elevation="9"
                    fab
                    rounded
                    x-large
                    @click="$router.push('/Edit_Personal_Information')"
                  >
                    <v-img
                      contain
                      :src="require('@/assets/lib/Editpersonal.png')"
                      max-height="70"
                      max-width="70"
                    ></v-img>
                    <h3>แก้ไขข้อมูลส่วนตัว</h3>
                  </v-btn>
                </v-row>
              </v-col>

              <v-col sm="5" class="ma-9">
                <v-row>
                  <v-btn
                    block
                    color="grey lighten-1"
                    elevation="9"
                    fab
                    rounded
                    x-large
                    @click="$router.push('/Borrow_return')"
                  >
                    <v-img
                      contain
                      :src="require('@/assets/lib/Borrow.png')"
                      max-height="70"
                      max-width="70"
                    ></v-img>
                    <h3>ทำรายการยืม-คืน</h3>
                  </v-btn>
                </v-row>
              </v-col>
            </v-row>
          </v-sheet>
        </v-col>
      </v-row>
    </v-card>
  </v-container>
</template>

<script>
export default {
  name: "Librarian_Menu",
  data: () => ({
    PositionTH:'',
    Position:localStorage.getItem("Position"),
    FName:localStorage.getItem("FName"),
    LName:localStorage.getItem("LName"),
    imageURL:localStorage.getItem("profile_img"),
  }),
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
              if (Position == 'admin') {
          return this.PositionTH = 'แอดมิน'
        }else if (Position == 'librarian'){
          return this.PositionTH = 'บรรณารักษ์'
        }else if (Position == 'personnel'){
          return this.PositionTH = 'บุคลากร'
        }else if (Position == 'student'){
          return  this.PositionTH = 'นักเรียน'
        }
  },
};
</script>

<style></style>
