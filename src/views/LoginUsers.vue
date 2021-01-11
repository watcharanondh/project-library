<template>
  <v-container>
    <v-row class="justify-center">
      <v-card style="width:400px;">
        <v-img
          class="white--text align-end"
          src="@/assets/logo.jpg"
          height="10rem"
        >
          <v-card-title primary-title>
            ระบบสมาชิก
          </v-card-title>
        </v-img>
        <v-card-text>
          <v-form @submit.prevent="submit">
            <!-- Username -->
            <v-text-field
              name="username"
              label="ชื่อผู้ใช้งาน"
              id="username"
              v-model="account.username"
              :rules="usernameRules"
            />
            <!-- Password -->
            <v-text-field
              name="password"
              label="รหัสผ่าน"
              id="password"
              v-model="account.password"
              :rules="passwordRules"
              :append-icon="isShowPassword ? 'visibility' : 'visibility_off'"
              @click:append="isShowPassword = !isShowPassword"
              :type="isShowPassword ? 'text' : 'password'"
            />
            <v-row align="center" justify="space-around">
              <v-btn type="submut" block color="primary" elevation="2">เข้าสู่ระบบ</v-btn>
            </v-row>
          </v-form>
        </v-card-text>
      </v-card>
    </v-row>
  </v-container>
</template>

<script>
export default {

    /////// check access permission /////////////  
   mounted() {
     let Position = localStorage.getItem("Position");
        if(Position == 'admin') {
          this.$router.push("/Admin_Menu")
       }else if (Position == 'librarian') {
          this.$router.push("/Librarian_Menu")
       }else if (Position == 'student' || Position == 'personnel' ) {
          this.$router.push("/Student_Personnel_Menu")
       }
  },
  /////////////////////////////////////////////////

    data(){
        return {
            isShowPassword:false,
            account:{
              username:"",
              password:""
            },
            usernameRules:[v1=>!!v1 || "กรุณากรอกชื่อผู้ใช้งาน"],
            passwordRules:[v1=>!!v1 || "กรุณากรอกรหัสผ่าน"]
        }
    },
    methods:{
      submit(){
        this.$store.dispatch({
          type:"doLogin",
          username: this.account.username,
          password: this.account.password
        })
      }
    }
};
</script>

<style></style>
