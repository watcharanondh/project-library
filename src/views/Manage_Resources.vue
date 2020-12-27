<template>
  <v-container class="grey lighten-4">
    <v-card class="grey lighten-3 mx-auto pa-5" outlined>
      <v-row>
        <v-col sm="1">
          <v-btn
            block
            elevation="5"
            @click="$router.push('/Librarian_Menu')"
            color="amber"
            x-large
          >
            <v-icon left>reply</v-icon>
            <span>ย้อนกลับ</span>
          </v-btn>
        </v-col>

        <v-col cols="12" sm="3"><h1>การจัดการข้อมูลทรัพยากร</h1></v-col>

        <v-col cols="12" sm="4">
          <v-sheet class="grey lighten-3" rounded="xl" min-height="56vh">
            <v-row class=" pa-6 ma-2"> </v-row>
            <v-row class=" pa-6 ma-2">
              <v-btn
                block
                color="grey lighten-1"
                elevation="9"
                fab
                rounded
                x-large
                 @click="$router.push('/CreateTemplate')"
              >
                <v-img
                  contain
                  :src="require('@/assets/lib/Borrow.png')"
                  max-height="70"
                  max-width="70"
                ></v-img>
                <h3>เทมเพลต</h3>
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
                @click="$router.push('/AddBook')"
              >
                <v-img
                  contain
                  :src="require('@/assets/lib/report.png')"
                  max-height="70"
                  max-width="70"
                ></v-img>
                <h3>จัดการข้อมูลสารสนเทศ</h3>
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
                 @click="$router.push('/Editresource')"
              >
                <v-img
                  contain
                  :src="require('@/assets/lib/manage.png')"
                  max-height="70"
                  max-width="70"
                ></v-img>
                <h3>แก้ไขบรรณานุกรม</h3>
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
