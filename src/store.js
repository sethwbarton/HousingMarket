import Vue from 'vue';
import Vuex from 'vuex';

import axios from 'axios';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: {},
    loggedIn: false,
    loginError: '',
    registerError: '',
    feed: [],
    searchResults: [],
  },
  getters: {
    user: state => state.user,
    loggedIn: state => state.loggedIn,
    loginError: state => state.loginError,
    registerError: state => state.registerError,
    feed: state => state.feed,
    searchResults: state => state.searchResults,
  },
  mutations: {
    setUser (state, user) {
      state.user = user;
    },
    setLogin (state, status) {
      state.loggedIn = status;
    },
    setLoginError (state, message) {
      state.loginError = message;
    },
    setRegisterError (state, message) {
      state.registerError = message;
    },
    setFeed (state, feed) {
      state.feed = feed;
    },
    setSearchResults (state, searchResults) {
      state.searchResults = searchResults;
    },
  },
  actions: {

    // Registration, Login //
register(context,user) {
  axios.post("/api/users",user).then(response => {
context.commit('setUser', response.data.user);
context.commit('setLogin',true);
context.commit('setRegisterError',"");
context.commit('setLoginError',"");
  }).catch(error => {
context.commit('setLoginError',"");
context.commit('setLogin',false);
if (error.response) {
if (error.response.status === 403)
  context.commit('setRegisterError',"That email address already has an account.");
else if (error.response.status === 409)
  context.commit('setRegisterError',"That user name is already taken.");
return;
}
context.commit('setRegisterError',"Sorry, your request failed. We will look into it.");
  });
},

login(context,user) {
  axios.post("/api/login",user).then(response => {
    context.commit('setUser', response.data.user);
    context.commit('setLogin', true);
    context.commit('setRegisterError',"");
    context.commit('setLoginError',"");
  }).catch(error => {
    context.commit('setRegisterError', '');
    if (error.response) {
      if (error.response.status === 403 || error.response.status === 400)
        context.commit('setLoginError', 'Invalid login.');
        context.commit('setRegisterError', '');
        return;
    }
    context.commit('setLoginError','Sorry, your request failed. We are looking into it!');
  });
},

logout(context,user) {
  context.commit('setUser', {});
  context.commit('setLogin', false);
},

// Posting a Contract //
getFeed(context) {
  axios.get('/api/users/' + context.state.user.id + '/contracts').then(response => {
    context.commit('setFeed', response.data.contracts);
  }).catch( err => {
    console.log("getFeed failed:", err);
  });
},

addContract(context, contract) {
  axios.post('/api/users/' + context.state.user.id + '/contracts',contract).then(response => {
    console.log(contract);
    return context.dispatch('getFeed');
  }).catch(err => {
    console.log('/api/user/' + context.state.user.id + '/contracts');
    console.log('addContract failed:', err);
  });
},

doSearch(context,keywords) {
    axios.get('/api/contracts/search?keywords=' + keywords.keywords).then(response => {
      context.commit('setSearchResults',response.data.contracts);
    }).catch(err => {
      console.log("doSearch failed: ", err);
    });
},

  }
});
