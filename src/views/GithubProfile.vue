<template>
  <div class="mt-15">
    <h1>{{ this.getUser }}'s GitHub Repositories</h1>
    <div v-for="repo in repos" :key="repo.id">
      <h2><a :href="repo.html_url">{{ repo.name }}</a></h2>
    </div>
  </div>
</template><script>
import axios from "axios";
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      repos: [],
    };
  },
  async mounted() {
    console.log("USER: ", this.getUser);
    let userRepoStr = "https://api.github.com/users/" + this.getUser + "/repos"
    console.log("Query Str: ", userRepoStr)
    const res = await axios.get(
    userRepoStr
    );
    this.repos = res.data;
    console.log("res: ", res);
  },
  computed: {
    ...mapGetters(["getUser"]),
  },
};
</script>
