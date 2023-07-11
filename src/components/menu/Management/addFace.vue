<template>
 <div class="personalPageWhole">
   <!-- 上方流程条 -->
  <el-card style="float: left; width:90%; margin-left: 5%;">
    <el-steps :active="active" finish-status="success" align-center>
      <el-step title="基本信息录入"></el-step>
      <el-step title="人脸信息录入"></el-step>
      <el-step title="完成"></el-step>
    </el-steps>
  </el-card>
   <!-- 人脸录入框 -->
  <el-card style="float: left; height: 460px; width:90%; margin-left: 5%;margin-top: 10px">
    <div>
      <iframe :src = "addurl" id="mobsf" scrolling="no" frameborder="0"
              style="float: left; height: 440px; width:80%; margin-left: 10%;margin-top: 10px">
      </iframe>
    </div>
  </el-card>
   <el-card style="float: left; width:90%; margin-left: 5%;margin-top: 10px">
    <el-button type="primary" :loading="loading" style="float: right;margin-right:2px;margin-top: 0px;margin-bottom: 12px" @click="resetForm('addInfo')">完成</el-button>
  </el-card>

 </div>
</template>

<script>
import manage from "@/api/manage";
export default {
    data(){
        return{
          active:1,
          id:'',
          addurl:''
        }
    },
    created() {
      this.id = window.sessionStorage.getItem('id')
      console.log("获取到的id:" + this.id)
      this.addurl = "http://localhost:7070/manage/getFaceCollectionStream/" + "?id=" + this.id
      console.log("生成的url："+ this.addurl)
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
                // document.getElementById("mobsf").src = "http://localhost:7070/manage/getFaceCollectionStream/" + "?id=" + this.id
              console.log("changeMobsIframe函数执行完毕，发送的地址是" + this.url)
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
