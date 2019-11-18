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
          Форма регистрации
        </h3>
 
      <v-form
        ref="form"
        class="
          d-flex
          flex-column 
        "
        v-model="valid"
      >
        <v-text-field
          :rules="nameRules"
          v-model="name"
          label="Имя пользователя"
          outlined
          dense
          prepend-icon="mdi-account-circle"
          counter="25"
          maxlength="25"
          required
          style="width: 400px;"
        >
        </v-text-field>
        <v-text-field
          :rules="emailRules"
          v-model="email"
          label="Почта"
          outlined
          dense
          prepend-icon="mdi-at"
          counter
          required
          type="email"
          style="width: 400px;"
        >
        </v-text-field>
        <v-text-field
          v-model="firstPassword"
          :rules="passwordCommonRules"
          label="Пароль"
          outlined
          dense
          prepend-icon="mdi-lock"
          counter="25"
          maxlength="25"
          type="password"
          required
          style="width: 400px;"
        >
        </v-text-field>
        <v-text-field
          v-model="secondPassword"
          :rules="passwordFinalRules"
          label="Повторите пароль"
          outlined
          dense
          prepend-icon="mdi-lock"
          counter="25"
          maxlength="25"
          type="password"
          required
          style="width: 400px;"
        >
        </v-text-field>
        <v-container
          fluid
          class="
            align-self-center
            d-flex
            flex-row
            justify-space-around
            "
        >
          <v-btn
            :disabled="!valid"
            color="success"
            @click="validate"
          >
            Регистрация
          </v-btn>
          <v-btn
            color="warning"
            @click="reset"
          >
            Очистить
          </v-btn>
        </v-container>
        <v-alert 
          :value="success"
          type="success"
          transition="slide-x-transition"
        >
          <v-row
            align="center"
            no-gutters
          >
            <v-col class="grow" >
              Вы успешно зарегистрировались!
            </v-col>
            <v-col class="shrink">
              <v-icon
                @click="success = false"
              >mdi-close-circle</v-icon>
            </v-col>
          </v-row>
        </v-alert>
        <v-alert 
          :value="warning"
          type="warning"
          transition="slide-x-transition"
        >
          <v-row
            align="center"
            no-gutters
            class="grow"
          >
            <v-layout
              style="
                max-width: 260px;
                height: fit-content;
              "
            >
              {{ warningMessage }}
            </v-layout>
            <v-spacer></v-spacer>
            <v-col class="shrink">
              <v-icon
                @click="warning = false"
              >mdi-close-circle</v-icon>
            </v-col>
          </v-row>
        </v-alert>
        <v-alert 
          :value="error"
          type="error"
          transition="slide-x-transition"
        >
          <v-row
            align="center"
            no-gutters
          >
            <v-col class="grow" >
              Произошла критическая ошибка
            </v-col>
            <v-col class="shrink">
              <v-icon
                @click="error = false"
              >mdi-close-circle</v-icon>
            </v-col>
          </v-row>
        </v-alert>
      </v-form>
    </v-layout> 
  </v-container>
</template>

<script>
import Axios from 'axios';
export default {
  data() {
    return {
      valid: true,
      success: false,
      warning: false,
      error: false,
      warningMessage: '',
      name: '',
      nameRules: [
        v => !!v || 'Имя обязательно',
        v => (v && v.trim().length <= 25) || 'Имя должно содержать меньше 25 символов',
        v => (v && v.trim().length > 3) || 'Имя должно содержать больше 3 символов',
      ],
      email: '',
      emailRules: [
        v => !!v || 'Почта обязательна',
        v => /.+@.+\..+/.test(v) || 'Неккоректная почта',
      ],
      firstPassword: '',
      secondPassword: '',
      passwordCommonRules: [
        v => !!v || 'Пароль обязателен',
        v => (v && v.trim().length > 6) || 'Пароль должен содержать больше 6 символов',
        v => (v && v.trim().length <= 25) || 'Пароль должен содержать меньше 25 символов',
      ],
      passwordFinalRules: [
        v => (v == this.firstPassword && v == this.secondPassword) || 'Пароли не равны',
      ],
    }
  },
  methods: {
    async validate() {
      if (this.$refs.form.validate()) {
        try {
          
          let responseEmail = await Axios.get('http://localhost:3000/users?email='+this.email.trim());
          let responseName = await Axios.get('http://localhost:3000/users?username='+this.name.trim());
          
          let summaryLength = responseEmail.data.length + responseName.data.length;

          if (summaryLength == 0) {
            Axios.post('http://localhost:3000/users', {
              username: this.name.trim(),
              email: this.email.trim(),
              password: this.firstPassword.trim()
            })
            .then(function (response) {
              console.log(response);
            })
            .catch(function (error) {
              console.log(error);
            });
            this.success = true;
            this.reset();
          } else {
            if (responseEmail.data.length > 0 && responseName.data.length > 0 ) {
              this.warningMessage = 'Пользователь с такой почтой и именем уже существует';
            } else {
              if ( responseEmail.data.length > 0 ) {
                this.warningMessage = 'Пользователь с такой почтой уже существует';
              }
              if ( responseName.data.length > 0 ) {
                this.warningMessage = 'Пользователь с таким именем уже существует';
              }
            }
              this.warning = true;
          }
        } catch (error) {
          console.log(error);
        }
      }
    },
    reset() {
      this.$refs.form.reset();
      this.warning = false;
      this.error = false;
    },
  },

}
</script>
