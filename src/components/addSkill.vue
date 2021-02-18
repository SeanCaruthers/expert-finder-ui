<template>
    <div id="addition" >
        <button icon v-on:click="editing = true">
            <v-icon>
                mdi-plus
            </v-icon>
        </button>
        <v-form id="skillInput" v-show="editing">
            <v-text-field v-model="skillName">
            </v-text-field>
            <v-btn v-on:click="addSkill">
                Add Skill
            </v-btn>
            <v-btn v-on:click="editing = false">
                Cancel
            </v-btn>
        </v-form>
    </div>
</template>

<script>
 import { mapActions } from "vuex";
 // define our local scope data and methods
 export default {
     props: {
         userId : Number
     },
     data (){
         return {   
             // Need to get userId from profile page
             // Probably need to props[] that
             skillName: '',
             editing: false,                             
         };             
     },
     computed: {
     },
     methods: {
         ...mapActions(["setSelectedProfile"]),
         addSkill(){
             this.editing = false;
             this.axios.post('/add/adduserskill', {
                 user_id: this.userId,
                 skill_name: this.skillName,
             }).then(() => {
                 this.queryUserProfile(this.userId)
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
