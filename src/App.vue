<template>
  <v-app>
    <v-app-bar
      app
      color="primary"
      dark
    >
      <router-link to="/">
        <v-btn
          depressed
          color="primary"
        >
          <v-icon>
            mdi-home
          </v-icon>
        </v-btn>
      </router-link>
      <template v-if="!isLogged" >
        <router-link to="/login">
          <v-btn
            depressed
            color="primary"
          >
            <v-icon>
              mdi-login-variant
            </v-icon>
          </v-btn> 
        </router-link>
        <router-link to="/signup">
          <v-btn
            depressed
            color="primary"
          >
            <v-icon>
              mdi-account-plus
            </v-icon>
          </v-btn> 
        </router-link>
      </template>
      <template
        v-else
      >
        <v-spacer></v-spacer>
        <span> {{username}} </span>
        <v-btn
          color="primary"
          depressed
          @click="logOut"
        >
          <v-icon>mdi-exit-run</v-icon>
        </v-btn>
      </template>

    </v-app-bar>

    <v-content>
      <router-view></router-view>
    </v-content>
  </v-app>
</template>

<script>

import Axios from 'axios';

export default {
  name: 'App',

  components: {
  },

  data: () => ({
    //
  }),
  
  computed: {
    isLogged() {
      return this.$store.state.logged;
    },
    username() {
      return this.$store.state.username;
    }
  },
  methods: {
    logOut() {
      this.$store.commit('logOut');
      this.$router.push('/');
    }
  }
};
</script>
