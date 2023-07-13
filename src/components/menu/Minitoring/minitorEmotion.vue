<template>
    <div class="personalPageWhole">
    <!--视频显示框 -->
    <el-card style="float: left; height: 560px; width:55%; margin-left: 1%;margin-top: 5px">
    <div>
      <iframe src = "http://localhost:7070/care/getFacialExpressionStream/" id="mobsf" scrolling="no" frameborder="0"
              style="float: left; height: 500px; width:98%; margin-left: 1%;top: 2px">
      </iframe>
    </div>
   </el-card>
   <!--事件报表-->
   <el-card style="float: right; height: 560px; width:40%; margin-right: 2%;margin-top: 5px">
    <div slot="header" class="clearfix">
      <span slot="label" style="color: #403b3b">特殊事件报表</span>
      </div>
      <el-table :data="tableData.slice((currentPage-1)*pageSize,currentPage*pageSize)" style="width: 100%;margin-top: 0px"
                :header-row-style="{height:'30px'}"
                :header-cell-style="{background:'#f5f7fa',padding:'0px',textAlign: 'center'}"
                :row-style="{height:'40px'}" :cell-style="{padding:'0px', textAlign: 'center' }"
                size='small'
                :default-sort = "{prop: 'ID', order: 'descending'}"
      >
        <!-- 表头相关 -->
        <!--        <el-table-column type="selection"></el-table-column>-->
        <el-table-column fixed prop="ID" label="事件ID"  width="70"></el-table-column>
        <el-table-column prop="event_type" label="事件类型"></el-table-column>
        <el-table-column prop="event_date" label="事件发生时间" width="95"></el-table-column>
        <el-table-column prop="oldperson_id" label="老人ID" width="70"></el-table-column>
        <el-table-column prop="event_desc" label="事件描述"></el-table-column>
      </el-table>
       <!-- 分页转跳按钮相关  -->
       <el-pagination align='center'
                     @size-change="handleSizeChange"
                     @current-change="handleCurrentChange"
                     :current-page="currentPage"
                     :page-sizes="[8,5]"
                     :page-size="pageSize"
                     layout="total, sizes, prev, pager, next, jumper"
                     :total="tableData.length"
                     style="margin-top: 7px;">
      </el-pagination>
      <!-- <el-button type="primary" icon="el-icon-user-solid" round:loading="loading" style="float:right;margin-right:43%;margin-top: 5px;" @click="resetForm('addInfo')">人脸录入完成</el-button> -->
   </el-card>
    </div>
</template>
<script >
import minitor from "@/api/minitor";
export default {
  data(){
      return{
      currentPage: 1, // 当前页码
      total: 20, // 总条数
      pageSize: 8, // 每页的数据条数
      isManager:false,// 权限控制
      tableData:[
        {
          ID:'2',
          event_type:'摔倒',
          event_date:'2023-07-12',
          oldperson_id:'1',
          event_desc:'1号老人摔倒昏迷不醒'
        },
        {
          ID:'1',
          event_type:'笑',
          event_date:'2023-06-12',
          oldperson_id:'2',
          event_desc:'2号老人很高兴'
        },
        {
          ID:'2',
          event_type:'摔倒',
          event_date:'2023-07-12',
          oldperson_id:'1',
          event_desc:'1号老人摔倒昏迷不醒'
        },
        {
          ID:'1',
          event_type:'笑',
          event_date:'2023-06-12',
          oldperson_id:'2',
          event_desc:'2号老人很高兴'
        },
        {
          ID:'2',
          event_type:'摔倒',
          event_date:'2023-07-12',
          oldperson_id:'1',
          event_desc:'1号老人摔倒昏迷不醒'
        },
        {
          ID:'1',
          event_type:'笑',
          event_date:'2023-06-12',
          oldperson_id:'2',
          event_desc:'2号老人很高兴'
        },
        {
          ID:'2',
          event_type:'摔倒',
          event_date:'2023-07-12',
          oldperson_id:'1',
          event_desc:'1号老人摔倒昏迷不醒'
        },
        {
          ID:'1',
          event_type:'笑',
          event_date:'2023-06-12',
          oldperson_id:'2',
          event_desc:'2号老人很高兴'
        },
        {
          ID:'2',
          event_type:'摔倒',
          event_date:'2023-07-12',
          oldperson_id:'1',
          event_desc:'1号老人摔倒昏迷不醒'
        },
        {
          ID:'1',
          event_type:'笑',
          event_date:'2023-06-12',
          oldperson_id:'2',
          event_desc:'2号老人很高兴'
        },
        {
          ID:'2',
          event_type:'摔倒',
          event_date:'2023-07-12',
          oldperson_id:'1',
          event_desc:'1号老人摔倒昏迷不醒'
        },
        {
          ID:'1',
          event_type:'笑',
          event_date:'2023-06-12',
          oldperson_id:'2',
          event_desc:'2号老人很高兴'
        },
        {
          ID:'2',
          event_type:'摔倒',
          event_date:'2023-07-12',
          oldperson_id:'1',
          event_desc:'1号老人摔倒昏迷不醒'
        },
        {
          ID:'1',
          event_type:'笑',
          event_date:'2023-06-12',
          oldperson_id:'2',
          event_desc:'2号老人很高兴'
        },
       


      ]
          
      }
    },
    created() {
      this.timer = setInterval(() => {
        setTimeout(this.fetchNewTable(), 0)
        }, 12000)
      //this.fetchNewTable()
    
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
                mobsf.style.width = (Number(deviceWidth)) + 'px'; //数字是页面布局宽度差值
                mobsf.style.height = (Number(deviceHeight)) + 'px'; //数字是页面布局高度差
              console.log("changeMobsIframe函数执行完毕")
            }
            changeMobsfIframe()

            window.onresize = function(){
                changeMobsfIframe()
            }
    },
    destroyed(){
      clearInterval(this.timer);
      //this.stop()
    },
    methods: {
    // 该方法用于刷新表格
    fetchNewTable() {
      minitor.getEventList().then(res => {
        console.log("刷新表格")
        if (res.code == 200 ) {
          this.tableData = res.eventList
        }
      })
    },
      // 该方法在每页条数改变时触发 选择一页显示多少行
      handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.currentPage = 1;
      this.pageSize = val;
    },
    // 该方法在当前页改变时触发 跳转其他页
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.currentPage = val;
    }
  }
}

</script>
<style lang="less" scoped>
</style>
