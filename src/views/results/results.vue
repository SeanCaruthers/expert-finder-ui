<template>
    <v-container fill-height fluid>
 
        <!-- FIX THE OFFSET. The Navbar/Header covers the toolbar -->
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
                    <!-- Button. Takes back to the Search Page -->
                    <v-spacer> </v-spacer>
                    <v-btn @click="goToSearch()" class="ma-10" color="primary" dark>
                        Back to Search
                        <v-icon dark right>
                            mdi-account-search-outline
                        </v-icon>                                
                    </v-btn>
                </v-toolbar>
            </v-col>
        </v-row>
        <v-row>
            <v-col cols="1">
                <v-form @submit.prevent="goToSearch">
                    <v-btn icon href="/search"> 
                        <v-icon>mdi-arrow-left</v-icon>
                        back to search
                    </v-btn>
                    
                </v-form>
            </v-col>
        </v-row>

        <v-row class="justify-center">
            <v-col cols="5">
                
                <v-card elevation="10">
                    

                    <v-card elevation="20">
                        <v-card-title>
                            <v-list class="align-center">
                                <v-list-item v-for="keyword in getSearchKeywords"
                                             v-bind:key="keyword">
                                    {{ keyword }}
                                </v-list-item>
                            </v-list>
                        </v-card-title>
                        <v-card-text>
                           
                        </v-card-text>
                        <v-card-actions>
                            <v-btn @click="goToSearch()" text color="primary" class="align-center">
                                Refine the search parameters                         
                            </v-btn>
                        </v-card-actions>
                    </v-card>
                    
                    

                    

                </v-card>
            </v-col>

        </v-row>

        
        <v-expansion-panels>

            <v-row>
                <v-col cols="12">
            <v-card elevation="20">
            <!-- REAL DATA. THIS ITERATOR SHOULD USES THE GLOBAL VARS SET IN SEARCH RESULTS PAGE -->
            <v-expansion-panel v-for="expert in getSearchResults"  v-bind:key="expert.id"> 

                
                <v-expansion-panel-header elevation="20">
                    <template v-slot:default="{ open }">

                        <v-row no-gutters class="justify-center">

                            <v-col cols="7">

                                {{expert.firstname}} {{expert.lastname}}

                            </v-col>
                            <v-col cols="3"></v-col>
                            <v-col
                                cols="2"
                                class="text--secondary"
                            >
                                <v-fade-transition leave-absolute>
                                    <span v-if="open" key="0">
                                        ...
                                    </span>
                                    <span v-else key="1">
                                        Click to view details. 
                                    </span>
                                </v-fade-transition>
                            </v-col>
                            
                        </v-row>
                    </template>

                </v-expansion-panel-header>
                
                <v-expansion-panel-content>

                    <v-expansion-panels >
                      
                        <v-expansion-panel>
                            
                            <v-expansion-panel-header>

                                Skills

                                <template v-slot:actions>
                                    <v-icon color="primary"> $expand </v-icon>
                                </template>

                            </v-expansion-panel-header>
                            
                            <v-expansion-panel-content>
                                
                                <ul>
                                    <li v-for="skill in expert.skills" v-bind:key="skill">{{ skill }}</li>
                                </ul>
                                
                            </v-expansion-panel-content>

                        </v-expansion-panel>

                        <v-expansion-panel>

                            <v-expansion-panel-header>

                                Organizations

                                <template v-slot:actions>
                                    <v-icon color="primary"> $expand </v-icon>
                                </template>
                                
                            </v-expansion-panel-header>
                            
                            <v-expansion-panel-content>
                                
                                
                                <ul>
                                    <li v-for="organization in expert.organizations" v-bind:key="organization">{{ organization }}</li>
                                </ul>
                                
                                
                                
                            </v-expansion-panel-content>
                            
                        </v-expansion-panel>

                        <v-expansion-panel>

                            <v-expansion-panel-header>
                                Courses

                                <template v-slot:actions>
                                    <v-icon color="primary"> $expand </v-icon>
                                </template>

                            </v-expansion-panel-header>

                            <v-expansion-panel-content>

                                <ul>
                                    <li v-for="course in expert.courses" v-bind:key="course">
                                        {{ course }}
                                    </li>
                                </ul>

                            </v-expansion-panel-content>
                            
                        </v-expansion-panel>

                        <v-row class="justify-end">
                            
                            
                            <v-col cols="2">
                                
                                <v-btn  @click="queryUserProfile(expert.id)" color="primary">
                                    View profile
                                </v-btn>
                                
                                
                            </v-col>
                            
                            <v-col cols="1">
                                <v-btn icon  color="primary"
                                       v-bind:href="'mailto:'+getContactInfo.emailPrimary"
                                       v-if="getContactInfo.emailPrimary!==null">
                                    
                                    <v-icon x-large >
                                        mdi-email
                                    </v-icon>
                                    
                                </v-btn>
                            </v-col>
                        </v-row>
                        
                    </v-expansion-panels>

                </v-expansion-panel-content>       
                
            </v-expansion-panel>
            
            </v-card>
                </v-col>
            </v-row>
        </v-expansion-panels>  
    </v-container>
</template>

<script>
 import { mapGetters, mapActions} from "vuex";
 export default {
     data (){
         return {
             category: "",
             keywords: [],
             experts: [],
             title: "Search results"
         };
     },
     computed: {
         ...mapGetters(["getSearchResults",
                        "getSearchKeywords",
                        "getSearchCategory",
                        "getSelectedProfile",
                        "getContactInfo"]),
         
     },
     
     methods: {
         ...mapActions(["setSelectedProfile"]),
         goToSearch() {
             this.$router.push("/search");
         }, 
         queryUserProfile(id) {
             this.axios.post("/profile", {
                 id
             }).then(response => {
                 
                 this.setSelectedProfile(response.data);
                 

             }).then(() => {
                 this.goToProfile();
             }).catch(err => {
                 console.log(err);
             });
             
         },
         goToProfile(){
             this.$router.push(`/profile`);
         },
     }   
 }
 
</script>
