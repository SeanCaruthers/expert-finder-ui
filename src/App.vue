<template>
  <v-app>
    <div id="app">
      <nav>
          <v-app-bar class="toolbar" app>
              <v-toolbar-title class="text-uppercase grey--text">
                  <span class="font-weight-light">
                      Expert
                  </span>
                  <span>
                      Finder
                  </span>
              </v-toolbar-title>

              <v-spacer></v-spacer>

              <v-toolbar-title v-if="contactInfo !== null" class="text-uppercase grey--text mx-5">
                  <span>
                      Welcome, {{ contactInfo.firstName }}
                  </span>
              </v-toolbar-title>

              <v-btn id="AboutLink" v-if="contactInfo !== null" @click="goToAbout()" color="grey">
                  <span>
                      About
                  </span>
              </v-btn>

              <v-btn v-if="contactInfo !== null" @click="logout()" color="grey">
                  <span>
                      Sign Out
                  </span>
              </v-btn>

              
          </v-app-bar>
      </nav>

      <v-container>
          <v-row align="center" justify="center">
              <router-view />
          </v-row>
      </v-container>
    </div>
  </v-app>
</template>

<script>

 import { mapGetters, mapActions } from "vuex";
 export default {
     data: () => {
         return {
             get token() {
                 return localStorage.getItem("token") || "";
             },
             set token(value) {
                 localStorage.setItem("token", value);
             },
             user: null,
             contactInfo: null,
             searchResults: null,
             searchCategory: null,
             searchKeywords: null,
             selectedProfile : null,
         };
     },
     async created() {
         if (this.token) {
             const res = await this.axios.get("users/me");

             // login state properties and setters
             this.user = res.data.user;
             this.contactInfo = res.data.contactInfo;
             this.setUser = res.data.user;
             this.setContactInfo = res.data.contactInfo;

             // create our search store properties
             this.searchResults = null;               
             this.setSearchResults = null;
             this.searchKeywords = null;
             this.setSearchKeywords = null;
             this.searchCategory = null;
             this.setSearchCategory = null;

             // create our results store properties
             this.selectedProfile = null;
             this.setSelectedProfile = null;

             if (this.$router.history.current.path === "/") {
                 this.$router.push("/search");
             }
         } else {
             this.$router.push("/login");
         }
     },
     computed: {
         ...mapGetters([
             "getContactInfo",
             "getUser",
             "getSearchResults",
             "getSearchKeywords",
             "getSearchCategory",
             "getSelectedProfile",
         ]),
     },
     methods: {
         ...mapActions([
             "setUser",
             "setContactInfo",
             "setSearchResults",
             "setSearchCategory",
             "setSearchKeywords",
             "setSelectedProfile",
         ]),
         logout() {
             localStorage.removeItem("token");

             // login state properties and setters
             this.user = null;
             this.contactInfo = null;
             this.setUser = null;
             this.setContactInfo = null;

             // search state properties and setters
             this.searchResults = null;
             this.searchCategory = null;
             this.searchKeywords = null;
             this.setSearchResults = null;
             this.setSearchCategory = null;
             this.setSearchKeywords = null;

             // results state properties and setters
             this.selectedProfile = null;
             this.setSelectedProfile = null;
             
             
             this.$router.push("/login");
         },
         goToAbout() {
             this.$router.push("/search/about");
         },
         goToSetupProfile(){
             this.$router.push("/setupProfile");
         },
     },
 };
</script>

<style lang="scss">
 #app {
     font-family: Avenir, Helvetica, Arial, sans-serif;
     -webkit-font-smoothing: antialiased;
     -moz-osx-font-smoothing: grayscale;
     text-align: center;
     color: #2c3e50;
 }

 #nav {
     padding: 30px;

     a {
         font-weight: bold;
         color: #2c3e50;

         &.router-link-exact-active {
             color: #42b983;
         }
     }
 }

 #AboutLink {
     margin: 2%;
 }
</style>

