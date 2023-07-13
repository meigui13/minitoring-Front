<template>
    <div>
        <el-card style="margin-bottom: 10px;" >
            <div class="whole">
            <div style="float: left;display: flex;" >
                <div class="personal-img">
                <img src="@/assets//image/R.jpg" />
            </div>
            <div class="personal-text" >
                <div >
                    <h3 style="">Hello~{{ userName }}</h3>
                   <div style="margin-bottom: 10px;display: flex;padding: auto;">
                    <div style="margin-right: 10px;">
                    </div>
                   </div> 
                   <div>
                    <span style="">{{ time }}</span>
                   </div>
                </div>
            </div>
            </div>
            </div>
        </el-card>
        <el-card style="float: left; width: 42%; " >
            <div class="left-container">
                <div class="one-icon-container">
                <div >
                    <i class="iconfont icon old">&#x100e8;</i>
                    <el-statistic group-separator="," :precision="2" decimal-separator="." :value="shelfNum" title="老人数量">
                        <template slot="prefix">
                        <i class="el-icon-s-flag" style="color: red"></i>
                        </template>
                        <template slot="suffix">
                        <i class="el-icon-s-flag" style="color: blue"></i>
                        </template>
                    </el-statistic>
                </div>
            </div>
        
            <div class="one-icon-container">
                <div >
                    <i class="iconfont icon user">&#xe630;</i>
                    <el-statistic group-separator="," :precision="2" decimal-separator="." :value="companyNum" title="用户数量">
                        <template slot="prefix">
                        <i class="el-icon-s-flag" style="color: red"></i>
                        </template>
                        <template slot="suffix">
                        <i class="el-icon-s-flag" style="color: blue"></i>
                        </template>
                    </el-statistic>
                </div>
            </div>

            <div class="one-icon-container">
                <div >
                    <i class="iconfont icon volunteer">&#xe6ad;</i>
                    <el-statistic group-separator="," :precision="2" decimal-separator="." :value="inPeopleNum" title="义工数量">
                        <template slot="prefix">
                        <i class="el-icon-s-flag" style="color: red"></i>
                        </template>
                        <template slot="suffix">
                        <i class="el-icon-s-flag" style="color: blue"></i>
                        </template>
                    </el-statistic>
                </div>
            </div>

            <div class="one-icon-container">
                <div >
                    <i class="iconfont icon employee">&#xe608;</i>
                    <el-statistic group-separator="," :precision="2" decimal-separator="." :value="outPeopleNum" title="工作人员数量">
                        <template slot="prefix">
                        <i class="el-icon-s-flag" style="color: red"></i>
                        </template>
                        <template slot="suffix">
                        <i class="el-icon-s-flag" style="color: blue"></i>
                        </template>
                    </el-statistic>
                </div>
            </div>

   
            </div>
            
        </el-card>
      <el-card style="float: right;width: 53%;height: 460px;margin-right:1%;">
        <div>
          <div id="main" style="width: 100%;height: 260px;margin-top: 10px"></div>
        </div>
      </el-card>
        <!-- <el-card style="float: right;width: 49%;">

        </el-card> -->
    </div>
</template>
<script >
import user from '@/api/user.js'
import manage from "@/api/manage";

function nowTime(){
            var current = new Date();//实例化Date对象
            var nowYear = current.getFullYear();//获取当前的年份
            var nowMonth = current.getMonth() + 1;//默认显示的是0-11月，比我们正常的月份少一个月，所以要+1
            var nowdates = current.getDate();//获取日期
            var arr = ['星期日','星期一','星期二','星期三','星期四','星期五','星期六'];
            var day = current.getDay();//因为西方人的习惯是周日第一，周一第二这样的排列
            //而且getDate（）返回的是 1 、 2这样的数字，我们想要获取星期几的话，可以自己先写好数组存放
            //然后通过数组的索引来获取星期几
            var time = '今天是' + nowYear + '年' + nowMonth + '月' + nowdates + '日' + arr[day]
            //接着就是组装成我们想要的格式了
            return  time
}
export default{
    data(){
        return{
            time:'',
            icon:'',
            userName:'HYT',
            //共同
            shelfNum: 0,
            companyNum: 0,
            inPeopleNum: 0,
            outPeopleNum: 0,
            chartForm:[6,28,13,5],

        }
    },
    created(){
        this.time=nowTime(),
        this.userName = window.sessionStorage.getItem('username')
         // 获取chartFrom数据+生成图
        // this.getChartForm()
    },
    mounted(){
        this.getChartForm()
    },
    methods:{
        managerToDeal(){
            this.$router.push('/managerCheck')
        },
        //普通用户直接跳到出入库界面
        userToDealIn(){
            this.$router.push('/inStock')
        },
        userToDealOut(){
            this.$router.push('/outStock')
        },
        getChartForm(){
        //     console.log("this.chartForm:" + this.chartForm)
        //   // 生成
        //   this.myEcharts()
      manage.getOldAgeNum().then(res =>{
        console.log("获取echarts表格数据")
        if(res.code == "200"){
          console.log(res)
          this.chartForm = res.array
          console.log("this.chartForm:" + this.chartForm)
          // 生成
          this.myEcharts()
        }
      })
    },
    myEcharts(){
      console.log("myEcharts函数开始调用")
      var myChart = this.$echarts.init(document.getElementById('main'));
      //配置图表
      var option = {
        title: {
          text: '老人年龄分布直方图',
        },
        legend: {
          data: ['人数'],
          textStyle: {
            fontSize: 13
          },
        },
        xAxis: {
          data: ['-50','50-70','70-90','90-']
        },
        yAxis: {},
        series: [{
          name: '人数',
          type: 'bar',
        //   data: this.$data.chartForm
          data: [13,5,6,7]
        }]
      };
      myChart.setOption(option);
      console.log("调用结束");
    }
  },


 }
     



</script>
<style lang="less" scoped>
/**-----------------------------右下--------------------------------------- */
.img-background{
    background-size: cover;
}
/**------------------------------顶层---------------------------------- */
.personal-img{
    float: left;
    margin:auto;
    width: 108px;
    height: 108px;
    background-color:#5995fd;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 18px;
}
.personal-img img {
    border-radius: 50%;
    width: 100px;
    height: 100px;
}
.personal-text {
   left: 20px;//距离
   position: relative;
  //display:flex;
}
/**--------------------------------左下-------------------------------------- */
.left-container{
    border-radius: 7px; 
    width: 100%;
    padding: 0px 0px 0px 0px;
}

.one-icon-container{
    display: flex;
    display: inline-block;
    justify-content: center;
    align-items: center;
    margin: 10px;
    padding: 0px 30px 0px 15px;
}
.icon {
    font-size: 150px;
}
.icon1{
    font-size: 160px;
}
.old{
color: rgb(114, 146, 123);
}
.user{
    color: rgb(224, 179, 83);
}
.volunteer{
    color: rgb(231, 102, 85);
}
.employee{
    color: rgb(95, 103, 189);
}

</style>

</style>
