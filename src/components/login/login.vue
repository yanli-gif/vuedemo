
<template>
    <div class="login_cont">
        <div class="login_box">
            <!-- 头像区域 -->
            <div class="avatar_box">
                <img src="../../assets/logo.png">
            </div>
            <!-- 登录表单区域 -->
            <el-form ref="loginFormRef" class="login_form"  :model="loginForm" :rules="rules" label-width="0px">
                <!-- 用户名 -->
                    <el-form-item prop="username" >
                        <el-input v-model="loginForm.username" prefix-icon="iconfont icon-user"></el-input>
                    </el-form-item>
                    <!-- 密码 -->
                    <el-form-item prop="password">
                        <el-input v-model="loginForm.password" prefix-icon="iconfont icon-3702mima" type="password"></el-input>
                    </el-form-item>
                    <!-- 按钮 -->
                    <el-form-item class="btns">
                         <el-button type="primary" @click="login">登录</el-button>
                          <el-button type="info" @click="resetLogin">重置</el-button>
                    </el-form-item> 
                </el-form>
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return{
            loginForm:{
                username:'admin',
                password:'123456'
            },
            rules:{
                // 验证用户名
                username:[
                    { required:true,message:"请输入用户名",trigger:"blur"},
                    { min: 3, max: 15, message: '长度在 3 到 15 个字符', trigger: 'blur' }
                    ],
                // 验证密码
                password:[ { required:true,message:"请输入密码",trigger:"blur"},
                    { min: 3, max: 15, message: '长度在 3 到 15 个字符', trigger: 'blur' }
                    ]
            }
        }
    
   
   },

    methods:{
        // 表单数据重置，恢复到默认状态
        resetLogin(){
            this.$refs.loginFormRef.resetFields();
        },
        // 登录按钮，对表单数据进行验证
        login(){
            // post方法返回的是promise，为了简化promise，
            // 加上一个await,await需要async修饰，所以函数加上异步操作async
            this.$refs.loginFormRef.validate( async valid=>{
                    if(valid==true){
                     const {data:res}= await  this.$http.post('login',this.loginForm);
                     if(res.meta.status!=200){
                         return this.$Message.error("登录失败");
                     }else{
                         this.$Message.success("登录成功");
                         //将登录成功之后的token保存到客户端的sessionStorage中，
                         //token只在当前打开网站期间生效
                         window.sessionStorage.setItem('token',res.data.token);
                         //通过编程式导航跳转到后台主页，地址是/home
                         this.$router.push('/');
                     }

                    }
                    else{
                        return;
                    }
                }
            );

        }
    },
    
}
</script>
<style lang="less" scoped>
.login_cont{
    background-color: #2b4b6b;
    height: 100%;
}
.login_box{
    width: 450px;
    height: 300px;
    background-color: #fff;
    border-radius: 3px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%);
}
.avatar_box{
    height: 130px; 
    width: 130px;
    border:1px solid #eee;
    border-radius: 50%;
    padding: 10px;
    box-shadow: 0 0 10px #ddd;
    position: absolute;
    left: 50%;
    transform: translate(-50%,-50%);
    background-color: #fff;
    img{
        border-radius: 50%;
        width: 100%;
        height:100%;
        background-color: #eee;
    }
}
.btns{
    display: flex;
    justify-content: flex-end;
}
.login_form{
    width: 100%;
    position: absolute;
    bottom: 0;
    padding: 0 20px;
    box-sizing: border-box;
}
</style>
