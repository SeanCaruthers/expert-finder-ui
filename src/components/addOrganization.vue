<template>
   <div id="addition" >
        <button icon v-on:click="editing = true">
            <v-icon>
                mdi-plus
            </v-icon>
        </button>
    <v-form id="courseInput" v-show="editing">
        <v-text-field v-model="organizationName">
        </v-text-field>
        <v-btn v-on:click="addNewOrg">
            Add Organization
        </v-btn>
        <v-btn v-on:click="editing = false">
            Cancel
        </v-btn>
    </v-form>
   </div>
</template>

<script>
 import { mapActions } from "vuex";
 export default {
     props: {
         userId : Number
     },
     data (){
         return {   
             // Need to get userId from profile page
             // Probably need to props[] that
             organizationName: '',
             editing: false,                             
         };             
     },
     computed: {
     },
     methods: {
         ...mapActions(["setSelectedProfile"]),
         addNewOrg(){
             this.editing = false;
             this.axios.post('/add/adduserorganization', {
                 user_id: this.userId,
                 organization_name: this.organizationName,
             }).then(() => {
                 this.queryUserProfile(this.userId);
             }).catch((err) =>{
                 console.log(err);
             });
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
     },
 }
</script>
<style>
 #addition {
     width: 100%;
 }
</style>
