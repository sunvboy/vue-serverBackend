import Vue from 'vue';
import { CONFIG_ACCESS_TOKEN } from '../../constants'

export default {
    SET_USER_INFO(state,data){
        Vue.set(state.user,data.USERID,data)
    },
    SET_USER_POSTS(state,{posts,userid}){
        Vue.set(state.posts,userid,posts)
    },
    SET_TOKEN_LOGIN(state,data){
        localStorage.setItem(CONFIG_ACCESS_TOKEN,data.token)
        state[CONFIG_ACCESS_TOKEN] = data.token;
        state.currentUser = data.user
    },
    SET_LOGOUT(state){
        state[CONFIG_ACCESS_TOKEN] = '';
        state.currentUser = null
        localStorage.removeItem(CONFIG_ACCESS_TOKEN)
    },
    SET_CURRENT_USER(state,user){
        state.currentUser = user

    }
}   