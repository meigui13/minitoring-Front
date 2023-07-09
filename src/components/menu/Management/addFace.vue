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
        <iframe src="http://127.0.0.1:5001" id="mobsf" scrolling="no" frameborder="0" style="position:absolute;top:150px;left: 500px;right:0px;bottom:0px;"></iframe>
  </div>
  <el-button type="primary" :loading="loading" style="margin-top: 200px;" @click="resetForm('addInfo')">完成</el-button>
</el-container>
    </div>
</template>

<script>
export default {
    data(){
        return{
            active:1
        }
    },
    mounted(){ 
            /**
            * iframe-宽高自适应显示   
            */
            function changeMobsfIframe(){
                const mobsf = document.getElementById('mobsf');
                const deviceWidth = document.body.clientWidth;
                const deviceHeight = document.body.clientHeight;
                mobsf.style.width = (Number(deviceWidth)-800) + 'px'; //数字是页面布局宽度差值
                mobsf.style.height = (Number(deviceHeight)) + 'px'; //数字是页面布局高度差
               
            }

            changeMobsfIframe()

            window.onresize = function(){
                changeMobsfIframe()
            }
    }
 
}
</script>

<style scoped>

</style>
