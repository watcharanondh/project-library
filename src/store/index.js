import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
      bookname:'',
  },
  mutations: {
      setBoodname(state,value){
          state.bookname += value.bookname;
      }
  },
  getters:{
       getBookname:state=>state.bookname
      // getBookname(state){
      //   return state.bookname
      // }
  },
  actions: {
    // addAction(context){
    //   context.commit('setBoodname',this.getters.getBookname)
    // }
  },
  modules: {
  }
})
