<template>
    <el-container class="home-con">
        <!-- 头部 -->
        <el-header>
            <div>
                <img src="../assets/2.jpg">
                <span>后台管理系统</span>
            </div>
            <el-button type="info" @click="logout">退出</el-button></el-header>
        <!-- 主体 -->
        <el-container>
            <!-- 左侧 -->
            <el-aside :width="isCollapse?'60px':'200px'">
                <div class="toggle-button" @click="toggleCollapse">|||</div>
                <el-menu
                background-color="#333744"
                text-color="#fff"
                active-text-color="#409EFF" unique-opened
                 :collapse="isCollapse" :collapse-transition="false">
                <el-submenu :index="item.id+' '" v-for="item in menuList" :key="item.id">
                    <template slot="title">
                    <i :class="iconsObj[item.id]"></i>
                    <span>{{item.authName}}</span>
                    </template>
                   <el-menu-item :index="subItem.id+' '" v-for="subItem in item.children" :key="subItem.id">
                       <template slot="title">
                        <i class="el-icon-menu"></i>
                        <span>{{subItem.authName}}</span>
                        </template>
                   </el-menu-item>
                </el-submenu>             
                </el-menu>
            </el-aside>
            <!-- 右侧 -->
            <el-main>Main</el-main>
        </el-container>
    </el-container>
</template>
<script>
export default {
    data(){
        return{
            menuList:[],
            iconsObj:{
                '125':'iconfont icon-user',
                '103':'iconfont icon-tijikongjian',
                '101':'iconfont icon-shangpin',
                '102':'iconfont icon-danju',
                '145':'iconfont icon-baobiao'
            },
            isCollapse:false
            
        }
    },
    created(){
        this.getMenuList()
    },
    methods:{
        logout(){
            window.sessionStorage.clear();
            this.$router.push('/login')
        },
        async getMenuList(){
         const {data:res}=await this.$http.get("menus")
         console.log(res)
         if(res.meta.status!==200)
            return this.$Message.error(res.meta.msg);
         this.menuList=res.data
         
        },
        toggleCollapse(){
            this.isCollapse=!this.isCollapse
        }
    }
}
</script>
<style lang="less" scoped>
.home-con{
    height: 100%;
}
.el-header{
    background-color: #373d41;
    display: flex;
    justify-content: space-between;
    padding-left: 10px;
    align-items: center;
    color: #fff;
    font-size: 20px;
    >div{
        display: flex;
        align-items: center;
        span{
            margin-left: 15px;
        }
    }
    img{
        height:55px;
        width: 55px;
        border-radius: 50%;
    }
}
.el-aside{
    background-color: #333447;
    .el-menu{
        border-right: 0;
    }
}
.el-main{
    background-color: #eaedf1;
}
.iconsfont{
    margin-right: 10px;
}
.toggle-button{
    background-color: #4a5064;
    color: #fff;
    text-align: center;
    font-size: 10px;
    line-height: 24px;
    cursor: pointer;
    letter-spacing: 0.2em;
}
</style>