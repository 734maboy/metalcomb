<template>
  <v-container
    fluid
  >
    <v-layout
      class="
        d-flex 
        flex-column 
        justify-center
        align-center
        mt-10
        "
    >
        <h3
          class="
            align-self-center
            mb-5
          "
        >
          Форма авторизации
        </h3>
 
      <v-form
        class="
          d-flex
          flex-column 
        "
      >
        <v-text-field
          v-model="email"
          label="Почта"
          outlined
          dense
          prepend-icon="mdi-at"
          counter
          type="email"
          required
          style="width: 400px;"
        >
        </v-text-field>
        <v-text-field
          v-model="password"
          label="Пароль"
          outlined
          dense
          prepend-icon="mdi-lock-open"
          counter="25"
          maxlength="25"
          type="password"
          required
          style="width: 400px;"
        >
        </v-text-field>
        <v-btn
          color="primary"
          class="align-self-center"
          @click="logIn"
        >
          Войти
        </v-btn>
        <v-container
          fluid
        >
          <v-alert 
            :value="error"
            type="warning"
            transition="slide-x-transition"
          >
          <v-row
            align="center"
            no-gutters
          >
            <v-col class="grow" >
              Неверная почта или пароль!
            </v-col>
            <v-col class="shrink">
              <v-icon
                @click="error = false"
              >mdi-close-circle</v-icon>
            </v-col>
          </v-row>
        </v-alert>
        </v-container>
      </v-form>
    </v-layout> 
  </v-container>
</template>


<script>
  import Axios from 'axios'
export default {
  data() {
    return {
      error: false,
      email: '',
      password: '',
    }
  },
  methods: {
    logIn() {
      
      Axios.get('http://localhost:3000/users?email='+this.email.trim() +'&password='+this.password.trim())
      .then( response => { 
        if (response.data.length == 1) {
          this.$store.commit('logIn', response.data[0].username); 
          this.$router.push('/');
        } else {
          this.error = true;
        }
      })
      .catch( error => {
        alert(error);
      })
      .finally( () => {
        this.email = '';
        this.password = '';
      });
    }
  },
}
</script>

