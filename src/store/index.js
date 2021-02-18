import Vue from 'vue'
import Vuex from 'vuex'
import router from '../router'
import { axios } from '../plugins/axios'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        user: null,
        contactInfo: null,
        searchResults: null,
        searchCategory: null,
        searchKeywords: null,
        selectedProfile: null,
    },
    getters: {
        getUser: state => state.user,
        getContactInfo: state => state.contactInfo,
        getSearchResults: state => state.searchResults,
        getSearchCategory: state => state.searchCategory,
        getSearchKeywords: state => state.searchKeywords,
        getSelectedProfile: state => state.selectedProfile,
    },
    actions: {
        signUp: async ({ commit }, payload) => {
            try {
                const res = await axios.post("auth/signup", {
                    firstName: payload.firstName,
                    lastName: payload.lastName,
                    email: payload.email,
                    username: payload.username,
                    password: payload.password,
                });
                localStorage.setItem("token", res.data.accessToken);
                commit('setUser', res.data.user);
                commit('setContactInfo', res.data.contactInfo);
          
                router.push("/setupProfile");
 
            } catch (err) {
                console.log(err)
            }
        },
        setupProfile: async ({ commit }
                             ,payload) => {
            try {
                await axios.post("auth/setupProfile", {
                    bio : payload.bio,
                    skills : payload.skills,
                    courses : payload.courses,
                    organizations : payload.organizations,
                    github : payload.github,
                    twitter : payload.twitter,
                    linkedin : payload.linkedin,
                    id : payload.id
                });
                router.push("search");
                commit(); 
                
            } catch (err) {
                console.log(err)
            }
        },
        signIn: async ({ commit }, payload) => {
            try {
                const res = await axios.post("auth/signin", {
                    username: payload.username,
                    password: payload.password
                });
                localStorage.setItem("token", res.data.accessToken);
                commit('setUser', res.data.user);
                commit('setContactInfo', res.data.contactInfo);

                router.push("search");
             
            } catch (err) {
                console.log(err)
            }
        },
        setUser: async ({ commit }, user) => {
            commit('setUser', user)
        },
        setContactInfo: async ({ commit }, contactInfo) => {
            commit('setContactInfo', contactInfo)
        },
        setSearchResults: async({ commit }, searchResults) => {
            commit('setSearchResults', searchResults)
        },
        setSearchCategory: async({ commit }, searchCategory) => {
            commit('setSearchCategory', searchCategory)
        },
        setSearchKeywords: async({ commit }, searchKeywords) => {
            commit('setSearchKeywords', searchKeywords)
        },
        setSelectedProfile: async({ commit }, selectedProfile) => {
            commit('setSelectedProfile', selectedProfile)
        },
    },
    mutations: {
        setUser: (state, user) => {
            state.user = user
        },
        setContactInfo: (state, contactInfo) => {
            state.contactInfo = contactInfo
        },
        setSearchResults: (state, searchResults) => {
            state.searchResults = searchResults
        },
        setSearchKeywords: (state, searchKeywords) => {
            state.searchKeywords = searchKeywords
        },
        setSearchCategory: (state, searchCategory) => {
            state.searchCategory = searchCategory
        },
        setSelectedProfile: (state, selectedProfile) => {
            state.selectedProfile = selectedProfile
        },
        
    },
    plugins: [createPersistedState()]
})
