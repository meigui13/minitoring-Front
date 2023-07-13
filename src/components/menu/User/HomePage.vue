<template>
    <div>
      <!-- 老人年龄分布直方图 -->
      <el-card style="width: 50%;height:40%">
        <div>
          <div id="main" style="width: 100%;height: 260px;margin-top: 10px"></div>
        </div>
      </el-card>
    </div>
</template>
<script >
import manage from "@/api/manage";

export default {
  data() {

    return {
      chartForm:[],
    }
  },
  created() {
    // 获取chartFrom数据+生成图
    this.getChartForm()
  },
  methods: {
    getChartForm(){
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
          data: this.$data.chartForm
        }]
      };
      myChart.setOption(option);
    }
  },

}
</script>
<style lang="less" scoped>

</style>
