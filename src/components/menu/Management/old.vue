<template>
  <div>
    <!-- 查询条件区 -->
    <el-card class="input-card">
      <!-- 查询条件 -->
      <el-form :inline="true" :model="id" ref="inputForm" :rules="rules" label-width="120px" class="input-form">
        <el-form-item prop="id" label-position="left" class="input-el-form-item">
          <span slot="label"  style="color: #403b3b">老人id:</span>
          <el-input v-model="id" placeholder="请输入id" size="small" clearable style="width: 220px;"></el-input>
        </el-form-item>
      </el-form>
      <!-- 查询 button 区域 -->
      <div style="display: flex;float: right;margin-bottom:10px;">
        <el-button type="primary" :loading="Loading" @click="check('id')" icon="el-icon-search"  round size="small">搜索</el-button>
        <el-button type="info" plain icon="el-icon-refresh-right" round size="small" @click="clearFilter('id')">重置</el-button>
      </div>
    </el-card>
    <!-- 查询结果区 -->
    <el-card style="margin-top: 10px;">
      <el-button type="primary" icon="el-icon-plus" size="small" style="float:left;padding: 6px;margin-bottom: 10px;" @click="addNew">增加老人</el-button>
      <!-- 表相关 -->
      <el-table :data="tableData.slice((currentPage-1)*pageSize,currentPage*pageSize)" style="width: 100%"
                :header-row-style="{height:'30px'}"
                :header-cell-style="{background:'#f5f7fa',padding:'0px',textAlign: 'center'}"
                :row-style="{height:'40px'}" :cell-style="{padding:'0px', textAlign: 'center' }"
                size='small'
                :default-sort = "{prop: 'id', order: 'increasing'}"
      >
        <!-- 表头相关 -->
        <!--        <el-table-column type="selection"></el-table-column>-->
        <el-table-column fixed prop="id" label="老人id" ></el-table-column>
        <el-table-column fixed prop="roomnum" label="老人房间号"></el-table-column>
        <el-table-column label="老人基本信息">
          <template slot-scope="scope">
            <el-popover trigger="hover" placement="top">
              <p>姓名: {{ scope.row.oldname }}</p>
              <p>性别: {{ scope.row.sex }}</p>
              <p>电话: {{ scope.row.phone }}</p>
              <p>身份证号: {{ scope.row.idcard }}</p>
              <p>出生日期: {{ scope.row.birthday }}</p>
              <div slot="reference" class="name-wrapper">
                <el-tag size="medium">{{ scope.row.oldname }}</el-tag>
              </div>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column label="老人健康状况">
          <template slot-scope="scope">
            <el-popover trigger="hover" placement="top">
              <p>健康状况: {{ scope.row.healthstate }}</p>
              <p>描述: {{ scope.row.description }}</p>
              <p>入院日期: {{ scope.row.checkindate }}</p>
              <p>出院日期: {{ scope.row.checkoutdate }}</p>
              <div slot="reference" class="name-wrapper">
                <el-tag size="medium">{{ scope.row.healthstate }}</el-tag>
              </div>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column label="第一监护人信息">
          <template slot-scope="scope">
            <el-popover trigger="hover" placement="top">
              <p>姓名: {{ scope.row.firstguardianname }}</p>
              <p>与老人关系: {{ scope.row.firstguardianrela }}</p>
              <p>电话: {{ scope.row.firstguardianphone }}</p>
              <p>微信: {{ scope.row.firstguardianwechat }}</p>
              <div slot="reference" class="name-wrapper">
                <el-tag size="medium">{{ scope.row.firstguardianname }}</el-tag>
              </div>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column label="第二监护人信息">
          <template slot-scope="scope">
            <el-popover trigger="hover" placement="top">
              <p>姓名: {{ scope.row.secondguardianname }}</p>
              <p>与老人关系: {{ scope.row.secondguardianrela }}</p>
              <p>电话: {{ scope.row.secondguardianphone }}</p>
              <p>微信: {{ scope.row.secondguardianwechat }}</p>
              <div slot="reference" class="name-wrapper">
                <el-tag size="medium">{{ scope.row.firstguardianname }}</el-tag>
              </div>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column label="查看相关记录">
          <template slot-scope="scope">
            <el-popover trigger="hover" placement="top">
              <p>记录创建时间: {{ scope.row.secondguardianname }}</p>
              <p>记录创建管理员: {{ scope.row.secondguardianrela }}</p>
              <p>记录更新时间: {{ scope.row.secondguardianphone }}</p>
              <p>记录更新管理员: {{ scope.row.secondguardianwechat }}</p>
              <div slot="reference" class="name-wrapper">
                <el-tag size="medium" >查看</el-tag>
              </div>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button @click="update(scope.row)" type="text" style="flex: auto" size="small" >更新信息</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页转跳按钮相关  -->
      <el-pagination align='center'
                     @size-change="handleSizeChange"
                     @current-change="handleCurrentChange"
                     :current-page="currentPage"
                     :page-sizes="[5,10,20]"
                     :page-size="pageSize"
                     layout="total, sizes, prev, pager, next, jumper"
                     :total="tableData.length"
                     style="margin-top: 7px;">
      </el-pagination>
    </el-card>

  </div>
</template>

<script>
import manage from "@/api/manage";

export default {
  data() {
    // 输入框逻辑判定
    var id = (rule, value, callback) => {
      var req = /^[A-Za-z0-9]*$/
      if (!value) {
        return callback()
      } else if (!req.test(value)) {
        return callback(new Error('仅由数字和字母构成'))
      }else {
        return callback()
      }
    }

    return {
      Loading: false, // 加载中动画
      // 查找条件
      id: '', // 老人id
      // inputForm: {
      //   id: '' // 老人id
      // },
      dialogVisible: false, // 对话框是否可见
      tableData: [
        {
          id:'1',
          oldname:'yyz',
          sex:'F',
          phone:'15302938376',
          idcard:'440698200206264546',
          birthday:'2002-06-26',
          roomnum:'204',
          firstguardianname:'test01',
          firstguardianrela:'test01',
          firstguardianphone:'15300992277',
          firstguardianwechat:'ss',
          secondguardianname:'test11',
          secondguardianrela:'test11',
          secondguardianphone:'15300997788',
          secondguardianwechat:'ssa',
          healthstate:'良好',
          description:'准备出院',
          checkindate:'2023-07-07',
          checkoutdate:'',
          created:'2023-07-07',
          createby:'zzz'
        },

      ],
      rules: {
        id: [{validator: id, trigger: 'blur'}]
      },
      currentPage: 1, // 当前页码
      total: 20, // 总条数
      pageSize: 5, // 每页的数据条数
      isManager:false// 权限控制
    }
  },
  created() {
    this.fetchNewTable()
    // 权限管理
    // if (window.sessionStorage.getItem('authority') == "manager"){
    //   this.isManager=true
    // }else{
    //   this.isManager=false
    // }
  },
  methods: {
    // 该方法用于刷新表格
    fetchNewTable() {
      manage.getOldList().then(res => {
        console.log("刷新表格")
        if (res.data.code == 200 ) {
          this.tableData = res.data.oldList
        }
      })
    },
    // 根据id查老人
    check(formName) {
      console.log("开始查找")
      this.$refs[formName].validate((valid) => {
        console.log("通过表单验证")
        if(valid){
          this.Loading = true
          manage.checkOldById(this.id).then(res => {
            if (res.data.code == 200) {
              this.tableData = res.data.oldList
              this.$message({
                message: "搜索成功",
                type: "success"
              })
            } else {
              this.$message({
                message: "搜索异常",
                type: "error"
              })
            }
          }).finally(res => {
            this.Loading = false
          })
        } else {
          console.log("没有通过表单验证")
        }
      })
    },
    // 增加新的老人
    addNew() {
      this.$router.push({ path: '/addOld' })
    },
    // 更新老人信息
    update() {

    },
    // 该方法用于清除填入的信息
    clearFilter(formName) {
      this.$refs[formName].resetFields();
    },
    //清除筛选器等
    resetDateFilter() {
      this.$refs['tableData'].clearFilter()
      // this.$refs['tableData'].clearSort()
      // this.$refs['tableData'].clearSelection();
    },
    // 关闭对话框
    handleClose(done) {
      this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {
          });
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
    },
    // 该方法用于删除信息
    // deleteOne(row){
    //   console.log("触发删除信息，id: " +row.inBoundPersonId)
    //   // var temp = []
    //   // console.log("temp: " + temp)
    //   // console.log("断点1")
    //   // temp.push(row.inBoundPersonId)
    //   console.log("断点2")
    //   // console.log("2temp:" + temp)
    //   peopleManger.delFetchInPeopleInformation(row.inBoundPersonId).then(res=>{
    //     console.log("断点3")
    //     if(res.data.status_code == true){
    //       this.fetchNewTable()
    //       this.getPeopleList()
    //       console.log("断点4")
    //       this.$message({
    //         message:"删除成功",
    //         type:"success"
    //       })
    //     }else{
    //       this.$message({
    //         message:"删除异常",
    //         type:"error"
    //       })
    //     }
    //   })
    // }
  }
}
</script>

<style lang="less" scoped>
// 输入区 卡片
.input-card{

}

// 输入区 表单
.input-form{

}

// 输入区 span
.input-span{
  font-size: 20px;
}

</style>
