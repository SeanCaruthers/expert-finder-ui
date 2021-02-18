<template>
    <div id="addition" >
        <button icon v-on:click="editing = true">
            <v-icon>
                mdi-plus
            </v-icon>
        </button>
        <v-form id="courseInput" v-show="editing">
            <v-text-field v-model="courseName"></v-text-field>
            <v-btn v-on:click="addNewCourse">
                Add Course
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
         userId : String
     },
     data (){
         return {   
             // Need to get userId from profile page
             // Probably need to props[] that
             courseName: '',
             editing: false,                             
         };             
     },
     computed: {
     },
     methods: {
         ...mapActions(["setSelectedProfile"]),
         addNewCourse(){
             this.editing = false;
             this.axios.post('/add/addusercourse', {
                 user_id: this.userId,
                 course_name: this.courseName,
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
