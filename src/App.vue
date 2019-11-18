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
          icon
          text
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
            icon
            text
          >
            <v-icon>
              mdi-login-variant
            </v-icon>
          </v-btn> 
        </router-link>
        <router-link to="/signup">
          <v-btn
            depressed
            icon
            text
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
        <router-link to="/import">
          <v-btn
            depressed
            text
          >
          Импорт
            <!-- <v-icon>
              mdi-file-upload
            </v-icon> -->
          </v-btn> 
        </router-link>
        <router-link to="/export" >
          <v-btn
            depressed
            text
          >
          Экспорт
            <!-- <v-icon>
              mdi-file-download
            </v-icon> -->
          </v-btn>
        </router-link>
        <v-spacer></v-spacer>
        <span> {{username}} </span>
        <v-btn
          depressed
          text
          icon
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
  },
  created() {
    Axios.get('http://localhost:3000/orders?_expand=resource&_expand=customer')
    .then( resp => {
      let orders = resp.data.length > 0 ? resp.data : [];
      this.$store.commit('fillOrders', orders);
    })
  },
};
</script>
