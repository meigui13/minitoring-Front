<template>
 <div class="personalPageWhole">
  <el-card style="float: left; width:80%; margin-left: 10%;height:80px">
  <el-steps :active="active" finish-status="success" align-center>
      <el-step title="基本信息录入"></el-step>
      <el-step title="人脸信息录入"></el-step>
      <el-step title="完成"></el-step>
 </el-steps>
  </el-card>
<el-container>
  <div>
        <iframe src id="mobsf" scrolling="no" frameborder="0" style="position:absolute;top:150px;left: 300px;right:0px;bottom:0px;"></iframe>
  </div>
  <el-button type="primary" :loading="loading" style="margin-top: 200px;" @click="resetForm('addInfo')">完成</el-button>
</el-container>
    </div>
</template>

<script>
import manage from "@/api/manage";
export default {
    data(){
        return{
            active:1,
            id:''
        }
    },
    created() {
      this.id = window.sessionStorage.getItem('id')
      console.log("获取到的id:" + this.id)
      // this.returnid()
      // // this.changeMobsfIframe()
    },

  mounted(){
      this.changeMobsfIframe()
            /**
            * iframe-宽高自适应显示
            */
            function changeMobsfIframe(){
              console.log("调用changeMobsIframe函数")
                const mobsf = document.getElementById('mobsf');
                const deviceWidth = document.body.clientWidth;
                const deviceHeight = document.body.clientHeight;
                mobsf.style.width = (Number(deviceWidth)-500) + 'px'; //数字是页面布局宽度差值
                mobsf.style.height = (Number(deviceHeight)) + 'px'; //数字是页面布局高度差
                document.getElementById("mobsf").src = "http://localhost:7070/manage/getFaceCollectionStream/" + "?id=" + this.id
            }
            changeMobsfIframe()

            window.onresize = function(){
                changeMobsfIframe()
            }
    },
  // methods:{
  //     returnid(){
  //       console.log("调用returnid函数，返回id" + this.id)
  //       manage.returnid(this.id).then(res=>{
  //         // if(res.code == 200 ){
  //           // this.mounted()
  //           console.log("成功")
  //        // }
  //       })
  //     },
  // }
}
</script>

<style scoped>

</style>
