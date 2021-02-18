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
                        <v-card v-for="message in simple_messages" v-bind:key="message.number">
                            <v-card-title>
                                {{message.number}}
                            </v-card-title>
                            <v-card-text class="text-body-1 text-center">
                                {{message.text}}
                            </v-card-text>
                        </v-card>
                        
                    </v-flex>
                </div>

                
                <div  v-if="detailed===true" align-self-center>
                    <v-flex >
                        <v-card v-for="message in detailed_messages" v-bind:key="message.number">
                            <v-card-title>
                                {{message.number}}
                            </v-card-title>
                            
                            <v-card-text class="text-body-1 text-center">
                                {{message.text}}
                            </v-card-text>
                        </v-card>
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
                
                
            </v-toolbar>
        </v-footer>
        

    </v-container>
</template>

<script>

 export default {
     data (){
         return {
             detailed: false,
             title : "Help",
             caption : "Finding an Expert is as easy as 1, 2, 3.",
             simple_messages : [{number : 1, text : "Choose a category from the drop down menu"},
                                {number : 2, text : "Enter a keyword in the search bar"},
                                {number : 3, text : "Click the search button and get started with an Expert that meets your needs"}],
             
             detailed_messages : [{number: 1, text : "Click on the drop down menu and choose from one of the three categories: experience with a specific tech skill, enrollment/completion of a specific course, or membership/involvement in an organization "},
                                  { number: 2, text : "Once you have chosen a category, enter a keyword in the search bar and click the search button"},
                                  {number : 3, text: "That's it!  Upon clicking the search button, you will be supplied with the profiles of all the ExpertFinder members who meet your search criteria.  Each profile will contain all of the information that you need to find and contact the Expert right for you"}]

         }
     },
     methods: {
         goToSearch(){
             this.$router.push('/search');
         },
         goToAbout(){
             this.$router.push('/search/about');
         }
     },
 };
</script>

<style>

</style>
