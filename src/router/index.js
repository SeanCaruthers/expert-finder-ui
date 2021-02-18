import Vue from 'vue'
import VueRouter from 'vue-router'

import Login from '../views/Login.vue'


Vue.use(VueRouter)

const routes = [
 
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/add',
    name: 'Add',
    component: () => import(/* webpackChunkName: "about" */ '../views/Add.vue')
  }
  
]
//-----------------------------------  ------------------------------------------
// import Vues
import Signup from '../views/signup/Signup.vue'
import SetupProfile from  '../views/signup/SetupProfile.vue'


// create results routes
const SignupRoutes =  [
    {
        path: '/signup',
        name: 'Signup',
        component: Signup
    },
    {
        path: '/setupProfile',
        name: 'setupProfile',
        component: SetupProfile
    },
]
// add results routes to group routes array
SignupRoutes.forEach(route => { routes.push(route); });
//---------------------------------- End Profile ---------------------------------------
//----------------------------------- Search ------------------------------------------
// import search Vues
import Search from  '../views/search/Search.vue'
import SearchHelp from  '../views/search/Help.vue'
import SearchAbout from  '../views/search/About.vue'

// create search routes
const searchRoutes =  [
    {
        path: '/search',
        name: 'Search',
        component: Search
    },
    {
        path: '/search/help',
        name : 'Help',
        component: SearchHelp
    },
     {
        path: '/search/about',
        name : 'About',
        component: SearchAbout
    }
]

// add search routes to group routes array
searchRoutes.forEach(route => {
   routes.push(route);
});
//----------------------------------- End Search ---------------------------------------


//----------------------------------- Results ------------------------------------------
// import Vues
import Results from  '../views/results/results.vue'


// create results routes
const resultsRoutes =  [
  {
      path: '/results',
      name: 'Results',
      component: Results
  },
]
// add results routes to group routes array
resultsRoutes.forEach(route => {
  routes.push(route);
});
//---------------------------------- End Results ---------------------------------------

//----------------------------------- Profile ------------------------------------------
// import Vues
import Profile from  '../views/profile/Profile.vue'
import GithubProfile from '../views/GithubProfile.vue'


// create results routes
const profileRoutes =  [
  {
      path: '/profile',
      name: 'Profile',
      component: Profile
  },
  {
      path: '/profile/github',
      name: 'GithubProfile',
      component: GithubProfile
  },
]
// add results routes to group routes array
profileRoutes.forEach(route => {
  routes.push(route);
});
//---------------------------------- End Profiile ---------------------------------------

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
