import router from "./router";
router.beforeEach((to,form,next) =>{
    let isLogin = sessionStorage.getItem("token");
    if(isLogin){
        next();
    }else{
        if(isLogin){
            next();
        }else{
            if(to.path === '/login'){
                next();
            }else{
                next('/login');
            }
        }
    }
})