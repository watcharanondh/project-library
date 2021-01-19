import Vue from "vue";
import Vuex from "vuex";
import api from "@/services/api";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    isLogged: false,
    username: "",
    keyword: "",
    numid: "",
  },
  mutations: {
    SET_INPUT_KEYWORD(state, word) {
      state.keyword = word;
    },
    SET_INPUT_NUMID(state, id) {
      state.numid = id;
    },
    SET_LOGGED_IN(state) {
      state.isLogged = true;
    },
    SET_LOGGED_OUT(state) {
      state.isLogged = false;
    },
    SET_USERNAME(state, value) {
      state.username = value;
    },


  },
  getters: {
    keyword(state) {
      return state.keyword;
    },
    numid(state) {
      return state.numid;
    },
    isLogin(state) {
      return state.isLogged;
    },
    username(state) {
      return `ผู้ใช้: 
      ${state.username}`;
    },
  },
  actions: {
    inPutkeyword({ commit }, { keyword }) {
      commit("SET_INPUT_KEYWORD", keyword);
    },
    inPutNumberbookID({ commit }, { numid }) {
      commit("SET_INPUT_NUMID", numid);
    },
    doLogin({ commit, dispatch }, { username, password }) {
      let result = api.login({ username, password });
      if (result == true) {
        commit("SET_LOGGED_IN");
        commit("SET_USERNAME", username);
        // commit("SET_member_ID", userInfo.member_ID);
        // commit("SET_Citizenid", userInfo.mem_Citizenid);
        // commit("SET_Position", userInfo.Position);
        // commit("SET_FName", userInfo.FName);
        // commit("SET_LName", userInfo.LName);
        // commit("SET_profile_img", userInfo.profile_img);
        // commit("SET_Class", userInfo.Class);
        // commit("SET_Classroom", userInfo.Classroom);
      } else {
        dispatch("doLogout", {});
      }
    },
    doLogout({ commit }) {
      api.logoff();
      commit("SET_LOGGED_OUT");
      commit("SET_USERNAME", "");
    },

    restoreLogin({ commit }) {
      if (api.isLoggedIn() == true) {
        let username = localStorage.getItem('username');
        //console.log(username);
        commit("SET_LOGGED_IN");
        commit("SET_USERNAME", username);
      }
      
    },
    
    
  },
  modules: {},
});
