<template>
    <!-- The Vuetify API, VueX API and their docs were used extensively in the creation of this Vue.
         Additionally, any icons used have been sourced from material designed icons

         information on the Vuetify API and material design can be found at the below links

         https://vuetifyjs.com/en/
         https://materialdesignicons.com/
         https://vuex.vuejs.org/
         https://vuejs.org/
    -->
    <v-container fill-height fluid>

        <v-row>
            <v-col>
            </v-col>
        </v-row>
        <v-row>
            <v-col>
            </v-col>
        </v-row>
        <v-row>
            <v-col>
            </v-col>
        </v-row>
        
        <v-row align="center" justify="center">
            <v-col cols="12">
                <v-toolbar dark color="primary">
                    <v-toolbar-title>
                        {{title}}
                    </v-toolbar-title>
                </v-toolbar>
            </v-col>
        </v-row>

 
        
        <v-row class="justify-center">
            <v-col cols="12">
                <div>
                    {{caption}}
                </div>
            </v-col>
        </v-row>

        <v-row>
            <v-col cols="12" md="12">
                <v-main >
                    <v-form ref="form" v-model="valid" @submit.prevent="submitSearch" >
                        
                        
                        <v-row class="justify-center">
                            <v-col cols="11">
                                <v-select v-model="category" v-bind:items="options" label="Category" filled>
                                </v-select>
                            </v-col>
                            
                            <v-col cols="1">
                                <v-form  @submit.prevent="goToHelp">
                                    <v-btn icon href="/search/help"> 
                                        <v-icon>
                                            mdi-help
                                        </v-icon>
                                    </v-btn>
                                </v-form>
                            </v-col>
                        </v-row>

                        <v-row class="justify-center">
                            <v-col cols="12">
                                
                                <v-text-field :rules="searchRules" required
                                                                   solo rounded v-model="keywords"
                                                                   hint="Separate keywords by commas.">
                                </v-text-field>
                                <v-btn type="submit" :disabled="!valid">
                                    Find Expert
                                </v-btn>
                                
                            </v-col>
                        </v-row>
                        
                    </v-form>
                </v-main>
            </v-col>
        </v-row>


        <v-footer fixed outlined padless shaped>
            <v-toolbar>
                <v-spacer></v-spacer>
                <div>
                    <v-btn @click="goToHelp()" color="grey">
                        <span>Instructions</span> 
                    </v-btn>
                </div>
            </v-toolbar>
        </v-footer>

        

    </v-container>
</template>

<script>
 // import vuex for state management
 import { mapActions, mapGetters} from "vuex";


 // define our local scope data and methods
 export default {
     data (){
         return {
             caption: "Find an expert by skill, course or organization",
             title : "Search",
             options : ["skill",
                        "course",
                        "organization"],
             category : "skill",
             keywords : "",
             searchRules: [(v) => !!v || "Please enter the keywords that you would like to search by"],
             valid : true
         };
     },
     computed: {
         ...mapGetters(["getSearchResults",
                        "getSearchKeywords",
                        "getSearchCategory"]),
         
     },
     methods: {
         ...mapActions(["setSearchResults",
                        "setSearchKeywords",
                        "setSearchCategory"]),
         
         goToResults() {
             this.$router.push('/results');
         },
         
         goToLogin() {
             this.$router.push("/login");
         },
         goToHelp() {
             this.$router.push("/search/help");
         },
         goToAbout() {
             this.$router.push("/search/about");
         },
         submitSearch(){
             
             // set our request body variables for search criteria
             let category = this.category;
             let keywords = this.keywords;

             // send request
             this.axios.post(`search/${this.category}`, {
                 category,
                 keywords
             }).then((response) => {

                 // after receiving response, set data to the store and go to results page
                 this.setSearchResults(response.data.experts);
                 this.setSearchKeywords(response.data.keywords);
                 this.setSearchCategory(response.data.category);
                 
                 
                 
             }).then(() => {
                 this.goToResults();
             }).catch((err) => {
                 console.log(err);
             });
         }
     },
 };
</script>

<style>

</style>

