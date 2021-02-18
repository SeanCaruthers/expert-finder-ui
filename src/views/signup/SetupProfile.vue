<template>
  <v-container fill-height fluid>
    <v-row align="center" justify="center">
      <v-col cols="12" md="6" class="mt-15">
        <v-toolbar dark color="primary">
            <v-toolbar-title>Profile setup</v-toolbar-title>
        </v-toolbar>
        <v-card class="pa-5" elevation="20">
            <v-form ref="form" @submit.prevent="validate"
                    v-model="valid" lazy-validation >
                <v-textarea v-model="bio" :rules="bioRules" hint="Tell everyone a little bit about yourself."
                            label="Bio" required>
                </v-textarea>
                
                <v-text-field label="Skills" v-model="skills"
                              hint="What are you an expert in? Separate entries by comma."
                              :items="skills" multiple chips >
                </v-text-field>
                
                <v-text-field label="Courses" v-model="courses"
                              hint="What courses have you taken? Separate entries by comma." multiple chips >
                </v-text-field>
                
                <v-text-field v-model="organizations"
                              hint="What organizations do you belong to? Separate entries by comma."
                              label="Organizations">
                </v-text-field>
                
                <v-text-field v-model="github"
                              hint="Your github profile link" label="github">
                </v-text-field>
                <v-text-field v-model="linkedin"
                              hint="Your linkedin profile link" label="linkedin">
                </v-text-field>
                <v-text-field v-model="twitter"
                              hint="Your twitter profile link" label="twitter">
                </v-text-field>
                <v-row>
                    <v-col cols="12" sm="6">
                        <v-btn type="submit" :disabled="!valid" color="info">
                            Setup Profile
                        </v-btn>
                    </v-col>
                </v-row>
            </v-form>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
 import { mapActions, mapGetters } from "vuex";
 export default {
     data() {
         return {
             valid: true,
             bioRules: [(v) => !!v || "bio is required"],
             bio: null,
             select: null,
             skills : null,
             courses : null,
             organizations: null,
             github: null,
             twitter: null,
             linkedin: null
         };
     },
     computed : {
         ...mapGetters(["getUser"]),
     },
     methods: {
         ...mapActions(["setupProfile"]),
         validate() {
             if (this.$refs.form.validate()) {
                 let bio = this.bio;
                 let skills = this.skills;
                 let courses = this.courses;
                 let organizations = this.organizations;
                 let github = this.github;
                 let twitter = this.twitter;
                 let linkedin = this.linkedin;
                 let id = this.getUser.id;
                 this.setupProfile({bio, skills, courses, organizations,
                                    github, twitter, linkedin, id});
                 
             }
         },
         goToLogin() {
             this.$router.push("/login");
         },
     },
 };
</script>

<style>
</style>
