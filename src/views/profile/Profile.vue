<template>
    <!--
         The Vuetify API, VueX API and their docs were used extensively in the creation of this Vue.
         Additionally, any icons used have been sourced from material designed icons

         information on the Vuetify API and material design can be found at the below links

         https://vuetifyjs.com/en/
         https://materialdesignicons.com/
         https://vuex.vuejs.org/
         https://vuejs.org/

         Profile page image utilized is free for commercial use without attribution and was found on Pixabay.com at
         https://pixabay.com/vectors/blank-profile-picture-mystery-man-973460/

         The creator of the image can be found at their profile here
         https://pixabay.com/images/id-973460/
    -->
    
    <v-container id="main" fill-height fluid block>
        <v-row>
            <v-col cols="12"></v-col>
        </v-row>
        <v-row>
            <v-col cols="12"></v-col>
        </v-row>
        <!-- TOOLBAR AND BUTTON BACK TO SEARCH -->
        <v-toolbar dark color="primary">
            Profile
            <v-spacer>
            </v-spacer>
            <div>
                <!-- Button. Takes back to the Search Page -->
                <v-btn @click="goToSearch()" class="ma-10" color="primary" dark>
                    Back to Search
                    <v-icon dark right>
                        mdi-account-search-outline
                    </v-icon>                                
                </v-btn>
            </div>
        </v-toolbar>
        
        <v-row>
           <v-col cols="1">
                <v-form @submit.prevent="goToResults">
                    <v-btn icon href="/results"> 
                        <v-icon>mdi-arrow-left</v-icon>
                        back to results
                    </v-btn>
                    
                </v-form>
            </v-col>
        </v-row>
        <v-row rows="12">
            <v-col cols="12">
                <div v-for="section in getSelectedProfile" v-bind:key="section">
                    <div v-for="contact in section.contact" v-bind:key="contact.id">
                        <v-row align="center">
                            <v-col cols="4">
                                <v-card id="fill" class="text-center" :elevation=elevation>
                                    <v-card-text > {{contact.firstName}} {{contact.lastName}}</v-card-text>
                                </v-card>
                            </v-col>
                        </v-row>
                    </div>
                    <div v-for="profile in section.profile" v-bind:key="profile.id">
                        <v-row >
                            <v-col cols="4">
                                <v-card :elevation=elevation>
                                    <v-img src="../../assets/profile/profile.png" contain="true"></v-img>
                                </v-card>
                            </v-col>
                            <v-col cols="8">
                                <v-card  class="text-center" :elevation=elevation>
                                    <v-card-title>Bio</v-card-title>
                                    <v-card-text id="bio" > {{profile.bio}} </v-card-text>
                                </v-card>
                            </v-col>
                        </v-row>
                    </div>
                    <v-row>

                        
                        <v-col cols="4">
                            <v-card  id="fill" :elevation="elevation">
                                <v-card-title> Skills </v-card-title>
                                <v-card   :elevation=elevation>
                                    
                                    <v-simple-table id="size">
                                        <template v-slot:default>
                                            <thead>
                                                <tr>
                                                    <th class="text-center">
                                                        name
                                                    </th>
                                                    
                                                    <th  class="text-center">
                                                        modify
                                                    </th>
                                                    
                                                    <th  class="text-center">
                                                        delete
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody  v-for="skill in section.skills" v-bind:key="skill.id">
                                                <tr>
                                                    <td>
                                                        {{skill.name}}
                                                    </td>   
                                                    
                                                    <td>
                                                        <edit-skill :userId="section.id" :skillId="skill.id"/>
                                                    </td>
                                                    
                                                    <td>
                                                        
                                                        <v-btn icon @click="deleteUserSkill(skill.id, section.id)">
                                                            <v-icon>
                                                                mdi-delete
                                                            </v-icon>
                                                        </v-btn>
                                                    </td>
                                                    
                                                </tr>
                                            </tbody>
                                        </template>
                                    </v-simple-table>

                                </v-card>
                                <v-card-actions id="height">
                                    <add-skill :userId="section.id"/>
                                </v-card-actions>
                                </v-card>
                        </v-col>

                        
                        <v-col cols="4">
                            <v-card  id="fill" :elevation="elevation">
                                <v-card-title> Courses </v-card-title>
                                <v-card :elevation=elevation>
                                    
                                    <v-simple-table id="size">
                                        <template v-slot:default>
                                            <thead>
                                                <tr>
                                                    <th class="text-center">
                                                        name
                                                    </th>
                                                    <th  class="text-center">
                                                        modify
                                                    </th>
                                                    
                                                    <th  class="text-center">
                                                        delete
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody  v-for="course in section.courses" v-bind:key="course.id">
                                                <tr>
                                                    <td>
                                                        {{course.name}}
                                                    </td>
                                                    <td>
                                                        <edit-course :userId="section.id" :courseId="course.id"/>
                                                    </td>
                                                    <td>
                                                        <v-btn icon @click="deleteUserCourse(course.id, section.id)">
                                                            <v-icon>mdi-delete</v-icon>
                                                        </v-btn>
                                                    </td>
                                                
                                            </tr>
                                        </tbody>
                                    </template>
                                </v-simple-table>

                            </v-card>
                            
                            <v-card-actions id="height">
                                <add-course :userId="section.id"/>
                            </v-card-actions>
                            
                            </v-card>
                        </v-col>

                        
                        <v-col cols="4">
                            <v-card  id="fill" :elevation="elevation">
                                <v-card-title>Organizations </v-card-title>
                                <v-card :elevation=elevation>
                                    
                                    
                                    <v-simple-table id="size">
                                        <template v-slot:default>
                                            <thead>
                                                <tr>
                                                    <th class="text-center">
                                                        name
                                                    </th>
                                                    <th  class="text-center">
                                                        modify
                                                    </th>
                                                    
                                                    <th  class="text-center">
                                                        delete
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody  v-for="organization in section.organizations" v-bind:key="organization.id">
                                                <tr>
                                                    <td>
                                                        {{organization.name}}
                                                    </td>
                                                    <td>
                                                        <edit-organization :userId="section.id" :organizationId="organization.id"/>
                                                    </td>
                                                    <td>
                                                        <v-btn icon @click="deleteUserOrganization(organization.id, section.id)">
                                                            <v-icon>mdi-delete</v-icon>
                                                        </v-btn>
                                                    </td>
                                                    
                                                </tr>
                                            </tbody>
                                        </template>
                                    </v-simple-table>

                                    
                                    
                                    
                                </v-card>
                                <v-card-actions id="height">
                                    <add-organization :userId="section.id"/>
                                </v-card-actions>
                            </v-card>
                        </v-col>

                        
                    </v-row>
                    <v-row>
                        <v-col cols="12"></v-col>
                    </v-row>
                    <v-row>
                        <v-col cols="12"></v-col>
                    </v-row>
                    <v-row class="justify-center">
                        <v-col cols="4"></v-col>
                        <div v-for="link in section.links" v-bind:key="link.id">
                            <div v-if=hovering >
                                <v-card v-if=githubLinkCheck(link.name)
                                        @mouseleave=hideGithubRepositories()
                                        width="500" height="500">
                                    
                                    <v-card-title> Repositories </v-card-title>
                                    <v-simple-table >
                                        <template v-slot:default>
                                            <thead>
                                                <tr>
                                                    <th class="text-center">
                                                        name
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr  v-for="repository in repositories"
                                                     v-bind:key="repository.url">
                                                    <td>
                                                        <v-btn v-bind:href="repository.url">
                                                            {{repository.name}}
                                                        </v-btn>
                                                        
                                                    </td>
                                                    
                                                </tr>
                                                <tr>
                                                    <td>
                                                        <v-btn v-bind:href="link.url" color="primary">
                                                            View on github
                                                        </v-btn>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </template>
                                    </v-simple-table>
                                </v-card>
                            </div>
                            <v-col cols="1">
                                
                                
                                <v-btn v-if=githubLinkCheck(link.name) icon
                                       @mouseover=showGithubRepositories()
                                       v-on:load=queryUserRepositories(link.url);
                                       v-bind:href="link.url">
                                    
                                    
                                    <v-icon v-if=!hovering x-large>
                                        mdi-{{link.name}}
                                    </v-icon>
                                    
                                </v-btn>
                                
                                <v-btn v-if=!githubLinkCheck(link.name) icon
                                       v-bind:href="link.url" hint="Go to">
                                    
                                    <v-icon x-large>mdi-{{link.name}}</v-icon>
                                </v-btn> 
                            </v-col>
                        </div>
                          
                        <!--  For syntax on email links in vue https://forum.vuejs.org/t/how-to-set-up-a-mailto-href-vue-2-0/2001/ -->
                        <v-col cols="1" v-if="getContactInfo.emailPrimary!==null">
                            
                            <v-btn icon
                                
                                v-bind:href="'mailto:'+getContactInfo.emailPrimary">
                                <v-icon x-large>mdi-email</v-icon>
                            </v-btn>
                        </v-col>
                        
                        <v-col cols="4">
                        </v-col>
                    </v-row>
                </div>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
 import { mapGetters, mapActions } from "vuex";
 import addSkill from   '../../components/addSkill.vue';
 import addCourse from '../../components/addCourse.vue';
 import addOrganization from '../../components/addOrganization.vue';
 import editSkill from '../../components/editSkill.vue';
 import editCourse from '../../components/editCourse.vue';
 import editOrganization from '../../components/editOrganization.vue';

 export default {
     components:{
         addSkill,
         addCourse,
         addOrganization,
         editSkill,    
         editCourse,
         editOrganization

     },
     data (){
         return {
             elevation: "20",
             hovering : false,
             repositories : [],
             
         };
     },
     computed: {
         ...mapGetters(["getSelectedProfile", "getContactInfo"]),
     },
     mounted: function(){
         let links = this.getSelectedProfile[0].links;
         let link;
         links.forEach(element => { if(element.name==="github") { link = element; } });
         if(link.url){
             this.queryUserRepositories(link.url);
         }
     },
     
     methods: {
         ...mapActions(["setSelectedProfile"]),
         goToSearch() {
             this.$router.push("/search");
         },
          goToResults() {
             this.$router.push("/results");
         },
         deleteUserAttribute(attribute, attribute_id, user_id){

             /*
                information on adding body to delete route in axios found here: 
                
                https://stackoverflow.com/questions/51069552/axios-delete-request-with-body-and-headers

                information used: specifying the data property for the delete request payload to correctly
                pass variables into the request body

                .*/
             this.axios.delete(`/profile/${attribute}`, {
                 data : {
                     attribute_id,
                     user_id
                 }
             }).then(response => {
                 console.log(response.status);
                 if(response.status === 200){
                     this.queryUserProfile(user_id);
                     
                 }
                 else {
                     alert("Oops, looks like we were unable to delete the selected entry");
                 }
             }).then(() => {
                 
                 this.$router.push('/profile');
                 

             }).catch(err => {
                 console.log(err);
             });
             
         },
         deleteUserSkill(attribute_id, user_id){
             this.deleteUserAttribute('skill', attribute_id, user_id); 
         },
         deleteUserCourse(attribute_id, user_id){
             this.deleteUserAttribute('course', attribute_id, user_id); 
         },
         deleteUserOrganization(attribute_id, user_id){
             this.deleteUserAttribute('organization', attribute_id, user_id); 
         },
         queryUserProfile(id) {
             this.axios.post("/profile", {
                 id
             }).then((response) => {
                 this.setSelectedProfile(response.data);
             }).catch((err) => {
                 console.log(err);
             });
             
         },
         githubLinkCheck(name){
             return name === "github";
         },
         showGithubRepositories(){
             setTimeout(() => {
                 this.hovering=true;
             }, 300);
         },
         hideGithubRepositories(){
             setTimeout(() => {
                 this.hovering=false;
             }, 300);
         },
         
         queryUserRepositories(url){
             this.axios.post("/profile/repositories", {
                 url
             }).then((response) => {
                 this.repositories =response.data;
             }).catch((err) => {
                 console.log(err);
             });
         }

     }
 }
</script>

<style>
 #fill {
     height: 100%;
 }


 #size {
     
 }
 #height {
     

 }

 #repositories{  
     position: fixed;
     top: 70%;
     bottom: 0%;
     left: 0%;
     right: 50%;
     width: 50%;
     min-width: 50%;
     
 }
</style>
