import { parseJwt } from "../../helper";
import { CONFIG_ACCESS_TOKEN } from '../../constants'

export default{
    isLogin: state => {
        let token = state[CONFIG_ACCESS_TOKEN];
        let userObj = parseJwt(token);
        if(userObj){
            return true
        }else{
            return false

        }
    },
    currentUser: state => {
        return state.currentUser

    },
    getListPostsByUserId: state =>{
       if(state.currentUser){
        let userid = state.currentUser.USERID;
        return state.posts[userid]
       }else{
           return null
       }
    }
}