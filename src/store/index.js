import Vue from 'vue'
import Vuex from 'vuex'
import modulePost from './modulePost'
import moduleUser from './moduleUser'
import moduleExample from './moduleExample'

Vue.use(Vuex)

const store = new Vuex.Store({
    strict: process.env.NODE_ENV !== 'production',
    state:{
        isLoading : false,
    },
    actions:{
        showLoading({commit},isLoading = false){
            commit('SHOWLOADING',isLoading);
        }
    },
    mutations:{
        SHOWLOADING(state,isLoading){
            state.isLoading = isLoading;
        }
    },
    modules: {
        modulePost,
        moduleUser,
        moduleExample
    }
})
export default store