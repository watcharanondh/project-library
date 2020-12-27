<template>
  <v-container class="grey lighten-4">
    <v-card class=" grey lighten-3 mx-auto pa-5" outlined>
      <v-row>
        <v-col cols="12" sm="3">
          <v-sheet color="grey lighten-4"> </v-sheet>
        </v-col>

        <v-col cols="12" sm="2">
          <v-row class=" pa-6 ma-5"> </v-row>
          <v-row justify="center">
            <h1>Admin</h1>
          </v-row>
          <v-row justify="center">
            <v-sheet class="" rounded="xl" min-height="10">
              <v-img
                contain
                :src="require('@/assets/lib/person.jpg')"
                max-height="200"
                max-width="200"
              ></v-img>
            </v-sheet>
          </v-row>
          <v-row justify="center">
            <h2>แอดมิน</h2>
          </v-row>
        </v-col>

        <v-col cols="12" sm="3">
          <v-sheet class="grey lighten-3" rounded="lg" min-height="56vh">
            <v-row class=" pa-6 ma-2"> </v-row>
            <v-row class=" pa-6 ma-2"> </v-row>
            <v-row class=" pa-6 ma-2">
              <v-btn
                block
                color="grey lighten-1"
                elevation="9"
                fab
                rounded
                x-large
              >
                <v-img
                  contain
                  :src="require('@/assets/lib/report.png')"
                  max-height="70"
                  max-width="70"
                ></v-img>
                <h3>ระบบจัดการสมาชิก</h3>
              </v-btn>
            </v-row>

            <v-row class=" pa-6 ma-2">
              <v-btn
                block
                color="grey lighten-1"
                elevation="9"
                fab
                rounded
                x-large
              >
                <v-img
                  contain
                  :src="require('@/assets/lib/manage.png')"
                  max-height="70"
                  max-width="70"
                ></v-img>
                <h3>แก้ไขข้อมูลส่วนตัว</h3>
              </v-btn>
            </v-row>
          </v-sheet>
        </v-col>
      </v-row>
    </v-card>
  </v-container>
</template>

<script>
export default {
  data: () => ({}),
};
</script>

<style></style>
