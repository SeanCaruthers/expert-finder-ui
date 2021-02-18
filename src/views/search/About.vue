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

        
        <v-row class="justify-left">
            <v-col cols="1">
                <v-form @submit.prevent="goToSearch">
                    <v-btn icon href="/search"> 
                        <v-icon>mdi-arrow-left</v-icon>
                        back to search
                    </v-btn>
                    
                </v-form>
            </v-col>

            <v-col cols="10">
                <div >
                    {{caption}}
                </div>
            </v-col>
        </v-row>
        <v-row class="justify-end">
            <v-col cols="1">
                <div>
                    <h5>
                        More
                    </h5>
                    <v-switch v-model="detailed" inset>
                        detailed
                    </v-switch>  
                </div>
            </v-col>
        </v-row>

        <v-row>
            <v-col>
                <div  v-if="detailed===false" align-self-center>
                    <v-flex >
                        <v-list v-for="message in less" v-bind:key="message.number">
                            
                            <v-list-item class="text-body-1 text-center">
                                <v-list-item-icon>
                                    <v-icon>
                                        mdi-circle medium
                                    </v-icon>
                                </v-list-item-icon>
                                {{message.text}}
                            </v-list-item>
                        </v-list>
                        
                    </v-flex>
                </div>

                <div  v-if="detailed===true" align-self-center>
                    <v-flex >
                        
                        <v-list v-for="message in more" v-bind:key="message.number">
                            
                            
                            <v-list-item class="text-body-1 text-center">
                                <v-list-item-icon>
                                    <v-icon>
                                        mdi-circle medium
                                    </v-icon>
                                </v-list-item-icon> 
                                {{message.text}}
                            </v-list-item>
                        </v-list>
                        
                    </v-flex>
                </div>
            </v-col>
        </v-row>
        <v-footer fixed outlined padless shaped>
            <v-toolbar>
                <v-btn @click="goToSearch()" color="grey">
                    <span>Back to Search</span> 
                </v-btn>
                <v-spacer></v-spacer>
                <v-btn @click="goToHelp()" color="grey">
                    <span>Instructions</span> 
                </v-btn>
                
            </v-toolbar>
        </v-footer>
    </v-container>
</template>
<script>

 export default {
     
     data (){
         
         return {
             
             title : "About",
             
             caption: "a little about the project",
             
             less : [

                 {number : 1, text :  "Made by ecampus students for ecampus students."},
                 {number : 2, text : "ExpertFinder is here to help you find an Expert that you need."},
                 {number : 3, text : "Recruiting a team member with a specific skill?"} 

             ],

             more : [

                 {number : 4, text : "Looking for help with material related to a specific course?"},
                 {number : 5, text : "Trying to make connections with a potential workplace?"},
                 {number : 6, text : "ExpertFinder is here to aid you in your search."}

             ],

             detailed : false
             
         };
     },

     
     methods: {
         
         goToSearch(){
             this.$router.push('/search');
             
         },
         
         goToHelp(){
             this.$router.push('/search/help');
         }
         
     },
     
 };
</script>

<style>
 
 
</style>
