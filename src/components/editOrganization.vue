<template>
  <div>
    <v-btn icon @click="editing = true">
        <v-icon>mdi-pencil</v-icon>
    </v-btn>

    <v-form v-show="editing">
        <v-text-field v-model="organizationName">
        </v-text-field>
        <v-btn @click="editUserOrganization()">
            Edit
        </v-btn>
        <v-btn @click="editing = false">
            Cancel
        </v-btn>
    </v-form>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
    props: {
     userId : Number,
     organizationId : Number
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
         ...mapGetters(["getSelectedProfile"]),
     },
     methods: {
         ...mapActions(["setSelectedProfile"]),
        editUserAttribute(attribute, attribute_id, user_id){
            this.editing = false

             /*
                information on adding body to delete route in axios found here: 
                
                https://stackoverflow.com/questions/51069552/axios-delete-request-with-body-and-headers

                information used: specifying the data property for the delete request payload to correctly
                pass variables into the request body

                .*/

            let replacement_name = this.organizationName;

            console.log(replacement_name)
            console.log(attribute_id)
            console.log(user_id)

             this.axios.put(`/profile/${attribute}`, {
                 data : {
                     replacement_name,
                     attribute_id,
                     user_id
                 }
             }).then(response => {
                 console.log(response.status);
                 if(response.status === 200){
                     this.queryUserProfile(user_id);
                     
                 }
                 else {
                     alert("Oops, looks like we were unable to edit the selected entry");
                 }
             }).then(() => {
                 this.$router.push('/profile');
             

             }).catch(err => {
                 console.log(err);
             });
             
         },
         editUserOrganization(){
             console.log("After click")
             this.editUserAttribute('organization', this.organizationId, this.userId); 
         },
         queryUserProfile() {
             this.axios.post("/profile", {
                 id: this.userId
             }).then((response) => {
                 this.setSelectedProfile(response.data);
             }).catch((err) => {
                 console.log(err);
             });
             
         },
     },
}
</script>
