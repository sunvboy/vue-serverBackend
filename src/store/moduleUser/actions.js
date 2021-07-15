import axiosInstance from "../../plugins/axios";
import { parseJwt } from "../../helper";
import { CONFIG_ACCESS_TOKEN } from '../../constants'
export default{
    async getUserById({commit},id){
        try{
            var result = await axiosInstance.get('/member/member.php?userid='+id+'');

            if(result.data.status === 200){
                commit('SET_USER_INFO',result.data.user)
                return {
                    ok : true,
                    data: result.data.user
                }
            }else{
                return {
                    ok : false,
                    error: result.message
                }
            }
        }catch(error){
            return {
                ok : false,
                error: error.message
            }
        }
    },
    async login({commit,dispatch},{email = '',password = ''}){
        commit('SHOWLOADING',true, {root: true})

        try{
            let data = {
                email: email,
                password: password
            }
            var result = await axiosInstance.post('/member/login.php',data);
            commit('SHOWLOADING',false, {root: true})
            if(result.data.status === 200){
                commit('SET_USER_INFO',result.data.user);
                commit('SET_TOKEN_LOGIN',result.data);
                var promisePost = await dispatch('moduleUser/getListPostsByUserId', result.data.user.USERID, {root:true});
                commit('SHOWLOADING',false, {root: true})

                return {
                    ok : true,
                    error: null,
                    data: result.data
                }
            }else{
                return {
                    ok : false,
                    error: result.data.error
                }
            }   
        }catch(error){
            commit('SHOWLOADING',false, {root: true})
            return {
                ok : false,
                error: error.message
            }
        }
    },
    async checklogin({commit,dispatch}){
        commit('SHOWLOADING',true, {root: true})

        try{
            let token = localStorage.getItem(CONFIG_ACCESS_TOKEN);
            let userObj = parseJwt(token);
           
            if(userObj){
                //dang goi 2 API
                //var promiseUser = await dispatch('moduleUser/getUserById', userObj.id, {root:true});
                //var promisePost = await dispatch('moduleUser/getListPostsByUserId', userObj.id, {root:true});

                var promiseUser = dispatch('moduleUser/getUserById', userObj.id, {root:true});
                var promisePost = dispatch('moduleUser/getListPostsByUserId', userObj.id, {root:true});
                let [resultUser,resultPost] = await Promise.all([promiseUser,promisePost]);


                //Dong 68 chay 3s dong 69 chay 10s => tong 13s
                //Trong truong hop nay 2 API chay doc lap
                //neu 2 api chay dong thoi tong time cho 
                if(resultUser.ok && resultPost.ok){
                    let data = {
                        token: token,
                        user: resultUser.data
                    }
                    commit('SET_TOKEN_LOGIN',data)
                    commit('SHOWLOADING',false, {root: true})

                    return {
                        ok: true,
                        error: null
                    }

                }
            }
            return {
                ok: false
            }
        }catch(error){
            return {
                ok : false,
                error: error.message
            }
        }
    },
    async getListPostsByUserId({commit},userid){
        commit('SHOWLOADING',true, {root: true})

        try{
            let config = {
                params: {userid : userid},
                headers: {
                    'accept': 'application/json',
                    'Authorization': 'Bearer '+ localStorage.getItem(CONFIG_ACCESS_TOKEN)   
                }
            }
            
            var result = await axiosInstance.get('/post/getListPostUserID.php', config);
            commit('SHOWLOADING',false, {root: true})

            if(result.data.status === 200){
                let objData = {
                    posts: result.data.posts,
                    userid: userid
                }
                commit('SET_USER_POSTS',objData)
                return  {
                    ok : true,
                    posts: result.data.posts,
                    error: null
                }
            }else{
                return  {
                    ok : false,
                    error: null
                }
            }

        }catch(error){
            return {
                ok : false,
                error: error.message
            }
        }
    },
    async register({commit,dispatch},data){
        commit('SHOWLOADING',true, {root: true})

        try{
            var result = await axiosInstance.post('/member/register.php',data);
            commit('SHOWLOADING',false, {root: true})
            if(result.data.status === 200){
                let objLogin = {
                    user: result.data.user,
                    token: result.data.token,
                }
                commit('SET_USER_INFO',result.data.user);
                commit('SET_TOKEN_LOGIN',objLogin);
            
                var promisePost = await dispatch('moduleUser/getListPostsByUserId', result.data.user.USERID, {root:true});
                commit('SHOWLOADING',false, {root: true})

                return {
                    ok : true,
                    error: null,
                    data: result.data
                }
            }else{
                return {
                    ok : false,
                    error: result.data.error
                }
            }
        }catch(error){
            commit('SHOWLOADING',false, {root: true})
            return {
                ok : false,
                error: error.message
            }
        }
    },
    async handleProfile({commit},data){
        commit('SHOWLOADING',true, {root: true})
        try{
            //form data post axios
            let formData = new FormData();
            formData.append('fullname', data.fullname);
            formData.append('gender', data.gender);
            formData.append('description', data.description);
            if(data.objFile){
                formData.append('avatar', data.objFile);

            }

            //config
            let config = {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': 'Bearer ' + localStorage.getItem(CONFIG_ACCESS_TOKEN)
                }
            }

            var result = await axiosInstance.post('/member/update.php',formData,config);
            commit('SHOWLOADING',false, {root: true})
            if(result.data.status === 200){
                commit('SET_CURRENT_USER', result.data.user);
                return {
                    ok : true,
                    error: null,
                    data: result.data.user
                }
            }else{
                return {
                    ok : false,
                    error: result.data.error
                }
            }
        }catch(error){
            commit('SHOWLOADING',false, {root: true})
            return {
                ok : false,
                error: error.message
            }
        }
    },
    async ChangePassword({commit},data){
        commit('SHOWLOADING',true, {root: true})
        try{
           
            let config = {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem(CONFIG_ACCESS_TOKEN)
                }
            }

            var result = await axiosInstance.post('member/password.php',data,config);
            commit('SHOWLOADING',false, {root: true})
            if(result.data.status === 200){
                commit('SET_CURRENT_USER', result.data.user);
                return {
                    ok : true,
                    message: result.data.message

                }
            }else{

                return {
                    ok : false,
                    message: result.error
                }
            }
        }catch(error){
            commit('SHOWLOADING',false, {root: true})
            return {
                ok : false,
                message: error.message
            }
        }
    },
    logout({commit}){
        commit('SET_LOGOUT')
    }
}


