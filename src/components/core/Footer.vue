<template>
  <v-footer
    dark
    padless
  >
    <v-card
      class="flex"
      flat
      tile
    >
      <v-card-title class=" orange darken-1 teal">

<v-container>
      <v-row>
      <div class="d-flex align-center">
        <v-img
          alt="School Logo "
          class="shrink mr-2"
          contain
          :src="require('@/assets/logo.jpg')"
          max-height="150"
          max-width="150"
        />
      </div> 
    <h6 class="white--text text--darken-2 ml-1 mt-3"> โรงเรียนลับแลศรีวิทยา <br>
                      เลขที่ 153 หมู่ที่ 3 ตำบลไผ่ล้อม อำเภอลับแล จังหวัดอุตรดิตถ์ รหัสไปรษณีย์ 53210 <br> 
                      โทรศัพท์ 055-453416 โทรสาร 055-453419 <br>
                      E-mail : lablaesri@hotmail.com  <br>
                      Facebook : โรงเรียนลับแลศรีวิทยา ล.ศ.  
      </h6>
     </v-row>
    </v-container>
        <v-spacer></v-spacer>

      </v-card-title>

      <v-card-text class="py-2 white--text text-center">
       <strong>LIBRARY LABLAESRIWITTAYA SCHOOL</strong> — {{ new Date().getFullYear() }}
      </v-card-text>
    </v-card>
  </v-footer>
</template>

<script>
  export default {

  }
</script>
<style scoped>

</style>