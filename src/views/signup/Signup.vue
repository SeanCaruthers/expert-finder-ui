<template>
  <v-container fill-height fluid>
    <v-row align="center" justify="center">
      <v-col cols="12" md="6" class="mt-15">
        <v-toolbar dark color="primary">
          <v-toolbar-title>Signup</v-toolbar-title>
        </v-toolbar>
        <v-card class="pa-5" elevation="20">
          <v-form
            ref="form"
            @submit.prevent="validate"
            v-model="valid"
            lazy-validation
          >
            <v-text-field
              v-model="firstName"
              :rules="firstNameRules"
              label="First Name"
              required
            ></v-text-field>
            <v-text-field
              v-model="lastName"
              :rules="lastNameRules"
              label="Last Name"
              required
            ></v-text-field>
            <v-text-field
              v-model="emailAddress"
              :rules="emailAddressRules"
              label="Email"
              required
            ></v-text-field>
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
                  >sign Up</v-btn
                >
              </v-col>
              <v-col cols="12" sm="6"
                ><span @click="goToLogin">
                  <a>Have an account?</a>
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
import { mapActions } from "vuex";
export default {
  data() {
    return {
      valid: true,
      firstName: "",
      lastName: "",
      emailAddress: "",
      username: "",
      password: "",
      usernameRules: [(v) => !!v || "Username is required"],
      passwordRules: [(v) => !!v || "Password is required"],
      firstNameRules: [(v) => !!v || "First Name is required"],
      lastNameRules: [(v) => !!v || "Last Name is required"],
      emailAddressRules: [
        (v) => !!v || "Email is required",
        (v) => /.+@.+/.test(v) || "Email must be valid",
      ],
      select: null,
    };
  },
  methods: {
    ...mapActions(["signUp", "setUser", "setContactInfo"]),
    validate() {
      if (this.$refs.form.validate()) {
        const firstName = this.firstName;
        const lastName = this.lastName;
        const email = this.emailAddress;
        const username = this.username;
        const password = this.password;
        this.signUp({ firstName, lastName, email, username, password });
        this.snackbar = true;
      }
    },
    goToLogin() {
      this.$router.push("/login");
    },
  },
};
</script>

<style>
</style>
