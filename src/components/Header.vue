<template>
      <v-app-bar
      app
      color="white"  
    >
    <v-container>
      <v-row>
      <div class="d-flex align-center">
        <v-img
          alt="School Logo "
          class="shrink mr-2"
          contain
          :src="require('@/assets/logo.jpg')"
          max-height="50"
          max-width="50"
        />
      </div> 
    <h5 class="white orange--text text--darken-2 mt-1">โรงเรียนลับแลศรีวิทยา <br> LIBRARY LABLAESRIWITTAYA SCHOOL </h5>
     </v-row>
    </v-container>

      <v-spacer></v-spacer>
      
      <v-tabs right color="orange accent-4" >
        <v-tab v-for="link in links"
          :key="link.text"
          router :to="link.route"
        >
         <h4 class="white">{{ link.text }}</h4>
        </v-tab>
      </v-tabs>
    

    </v-app-bar>
</template>

<script>
export default {
  data: () => ({
      links: [
        {text:'หน้าหลัก',route:"/"},
        {text:'เข้าสู่ระบบ',route:"/LoginUsers"},
      ],
    }),
}
</script>

<style scoped>

</style>