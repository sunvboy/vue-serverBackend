import axiosInstance from "../../plugins/axios";
import {PAGE_SIZE ,CURRENT_PAGE,CONFIG_ACCESS_TOKEN} from "../../constants"
export default{
    async getListPostHashPaging({commit},{pagesize = PAGE_SIZE,currPage = CURRENT_PAGE,tagIndex = null}){
        commit('SHOWLOADING',true, {root: true})
        try{
            if(tagIndex){
                var result = await axiosInstance.get('/post/getListByCategory.php?pagesize='+pagesize+'&currPage='+currPage+'&tagIndex='+tagIndex+'');
            }else{
                var result = await axiosInstance.get('/post/getListPagination.php?pagesize='+pagesize+'&currPage='+currPage+'');
            }
            commit('SHOWLOADING',false, {root: true});
            if(result.data.status === 200){
                if(currPage === 1){
                    commit('SET_LIST_POST',result.data.posts)

                }else if(currPage > 1){
                    commit('PUSH_LIST_POST',result.data.posts)

                }

            }
        }catch(error){
            commit('SHOWLOADING',false, {root: true});
        }
    },
    async getListPostDetailBYId({commit,dispatch},postID){
        commit('SHOWLOADING',true, {root: true})
        try{
            var result = await axiosInstance.get('post/post.php?postid='+postID+'');
            if(result.data.status === 200){
                //API láy thông tin USER
                var promiseUser =  dispatch('moduleUser/getUserById', result.data.data.post.USERID, {root:true});
                var promiseComments  = dispatch('modulePost/getListComments', postID, {root:true});

                let [resultUser, resultComments] = await Promise.all([ promiseUser, promiseComments ]);
                
                let dataPostDetail = {
                    ...result.data.data,
                    comments: []
                }

                if(resultComments.ok) {
                    dataPostDetail.comments = resultComments.comments
                }

                commit('SHOWLOADING',false, {root: true});
                commit('SET_POST_DETAIL',dataPostDetail)

                return {
                    ok : true,
                    data: result.data.data
                }
            
            }else{
                return {
                    ok : false,
                    error: result.message
                }
            }
        }catch(error){
            commit('SHOWLOADING',false, {root: true});
            return {
                ok : false,
                error: error.message
            }
            
        }
    },  
    async getPostsSearch({commit},strSearch) {
        commit('SHOWLOADING',true, {root: true})
        try{
            var result = await axiosInstance.get('post/search.php?query='+strSearch+'');

            commit('SHOWLOADING',false, {root: true});
            if(result.data.status === 200){
                return {
                    ok: true,
                    posts: result.data.posts
                }
            }else{
                return {
                    ok: false,
                    posts: []
                }
            }
        }catch(error){
            commit('SHOWLOADING',false, {root: true});
            return {
                ok: false,
                message: error.message,
                posts: []
            }
        }
    },  
    async createNewPost({commit},{ post_content = '', category = '', url_image = '', obj_image = null }) {
        commit('SHOWLOADING',true, {root: true})
        try{
            //form data post axios
            let formData = new FormData();
            formData.append('post_content', post_content);
            formData.append('category', category);
            formData.append('url_image', url_image);
            if(obj_image){
                formData.append('obj_image', obj_image);
            }
            let config = {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': 'Bearer ' + localStorage.getItem(CONFIG_ACCESS_TOKEN)
                }
            }
            var result = await axiosInstance.post('/post/addNew.php',formData,config);
            commit('SHOWLOADING',false, {root: true});
            if(result.data.status === 200){
                return {
                    ok: true,
                    posts: result.data.posts
                }
            }else{
                return {
                    ok: false,
                    posts: []
                }
            }
        }catch(error){
            commit('SHOWLOADING',false, {root: true});
            return {
                ok: false,
                message: error.message,
                posts: []
            }
        }
    },  
    async getListComments({commit},postid) {
        try{
            
            var result = await axiosInstance.get('/comment/comments.php?postid=' + postid);
            if(result.data.status === 200){
                return {
                    ok: true,
                    comments: result.data.comments
                }
            }else{
                return {
                    ok: false,
                    error: result.data.error
                }
            }
        }catch(error){
            commit('SHOWLOADING',false, {root: true});
            return {
                ok: false,
                message: error.message,
            }
        }
    },
    async addNewComment({ commit, rootState }, { comment = '', postid = null }) {
        try {
            commit('SHOWLOADING',true, {root: true});
            let data = {
                comment,
                postid
            }
            let config = {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem(CONFIG_ACCESS_TOKEN)
                }
            }
            var result = await axiosInstance.post('/comment/add_new.php', data, config);
            commit('SHOWLOADING',false, {root: true});
            
            if(result.data.status === 200) {
                console.log(rootState.moduleUser.currentUser);
                let comment = {
                    ...result.data.body,
                    fullname: rootState.moduleUser.currentUser.fullname,
                    profilepicture: rootState.moduleUser.currentUser.profilepicture,
                }
                console.log("result comment = ", result.data.body);
                console.log("comment = ", comment);
                commit('PUST_LIST_COMMENTS', comment);
                return {
                    ok: true,
                    comment: comment
                }
            } else {
                return {
                    ok: false,
                    error: result.data.error
                }
            }
        } catch(error) {
            commit('SHOWLOADING',true, {root: true});
            return {
                ok: false,
                error: error.message
            }
        }
    }


}


