import Vue from "vue";
import Vuex from "vuex";
import api from "@/services/api";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    isLogged: false,

    username: "",
    member_ID:"",
    Citizenid:"",
    FName: "",
    LName: "",
    profile_img:"",
    Position:"",
    Class:"",
    Classroom:"",
    
    
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
    SET_member_ID(state, value) {
      state.member_ID = value;
    },
    SET_Citizenid(state, value) {
      state.Citizenid = value;
    },
    SET_Position(state, value) {
      state.Position = value;
    },
    SET_LName(state, value) {
      state.LName = value;
    },
    SET_profile_img(state, value) {
      state.profile_img = value;
    },
    SET_Class(state, value) {
      state.Class = value;
    },
    SET_Classroom(state, value) {
      state.Classroom = value;
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
    Position(state){
      return state.Position;
    }
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
      // let userInfo = JSON.parse(localStorage.users)[0];
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
      commit("SET_member_ID", "");
      commit("SET_Citizenid", "");
      commit("SET_Position", "");
      commit("SET_FName", "");
      commit("SET_LName", "");
      commit("SET_profile_img", "");
      commit("SET_Class", "");
      commit("SET_Classroom","");
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
