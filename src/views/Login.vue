<template>
  <v-container fill-height fluid>
    <v-row align="center" justify="center">
      <v-col cols="12" md="6" class="mt-15">
        <v-toolbar dark color="primary">
          <v-toolbar-title>Login</v-toolbar-title>
        </v-toolbar>
        <v-card class="pa-5" elevation="20">
          <v-form
            ref="form"
            @submit.prevent="validate"
            v-model="valid"
            lazy-validation
          >
            <v-text-field
              v-model="username"
              :rules="usernameRules"
              label="Username"
              required
            ></v-text-field>
            <v-text-field
              :type="'password'"
              v-model="password"
              :rules="passwordRules"
              label="Password"
              required
            ></v-text-field>

            <v-row>
              <v-col cols="12" sm="6">
                <v-btn type="submit" :disabled="!valid" color="info"
                  >Login</v-btn
                >
              </v-col>
              <v-col cols="12" sm="6"
                ><span @click="goToSignup">
                  <a>Need an account?</a>
                </span></v-col
              >
            </v-row>
          </v-form>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
// import axios from "axios";
import { mapActions } from "vuex";
export default {
  data() {
    return {
      valid: true,
      username: "",
      password: "",
      usernameRules: [(v) => !!v || "Username is required"],
      passwordRules: [(v) => !!v || "Password is required"],
      select: null,
    };
  },
  methods: {
    ...mapActions(["signIn", "setUser", "setContactInfo"]),
    validate() {
      let username = this.username;
      let password = this.password;
      if (this.$refs.form.validate()) {
        this.signIn({ username, password });
        this.snackbar = true;
      }
    },
    goToSignup() {
      this.$router.push("/signup");
    },
  },
};
</script>

<style>
</style>
