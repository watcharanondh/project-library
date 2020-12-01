<template>
  <v-app id="app">
    <Header/>
    <v-main>
      <router-view></router-view>
    </v-main>
    <Footer/>
  </v-app>
</template>

<script>

import Header from './components/Header';
import Footer from './components/Footer';
import store from './store/index';
import Dashboard from './views/Dashboard';
import informationBooks from './views/informationBooks';

export default {
  name: 'App',
  store,
  Dashboard,
  informationBooks,
  
  components: {
    Header,
    Footer,
  },


};
</script>
