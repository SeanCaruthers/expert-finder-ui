<template>
  <div class="addSkill">
    <h1>hello add</h1>
    <add-skill/>
    <add-course/>
    <add-organization/>
  </div>
</template>

<script>
// @ is an alias to /src
import addSkill from '../components/addSkill.vue'
import AddCourse from '../components/addCourse.vue'
import addOrganization from '../components/addOrganization.vue'

export default {
  components: {
    addSkill,
    AddCourse,
    addOrganization
  },
  data(){
    return{

    }
  },
  computed: {

  },
  methods: {

  }
}
</script>
