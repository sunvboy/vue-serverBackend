import store from '../store'
const ifNotAuthenticated = (to, from,next) => {
    let isLogin = store.getters['moduleUser/isLogin'];
    if(isLogin === false){
        next();

    }else{
        next({
            name: 'home-page'
        });
    }
  
}
const ifAuthenticated = (to, from,next) => {
    let isLogin = store.getters['moduleUser/isLogin'];

    if(isLogin === true){
        next();

    }else{
        next({
            name: 'login'
        });
    }
   
}
export {
    ifNotAuthenticated,ifAuthenticated
}