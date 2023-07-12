<template>
  <div>
    <!-- 查询条件区 -->
    <el-card class="input-card">
      <!-- 查询条件 -->
      <el-form :inline="true" :model="checkForm" ref="checkForm" :rules="rules" label-width="120px" class="input-form">
        <el-form-item prop="id" label-position="left" class="input-el-form-item">
          <span slot="label"  style="color: #403b3b">工作人员id:</span>
          <el-input v-model="checkForm.id" placeholder="请输入id" size="small" clearable style="width: 220px;"></el-input>
        </el-form-item>
      </el-form>
      <!-- 查询 button 区域 -->
      <div style="display: flex;float: right;margin-bottom:10px;">
        <el-button type="primary" :loading="Loading" @click="check('checkForm')" icon="el-icon-search"  round size="small">搜索</el-button>
        <el-button type="info" plain icon="el-icon-refresh-right" round size="small" @click="clearFilter('checkForm')">重置</el-button>
      </div>
    </el-card>
    <!-- 查询结果区 -->
    <el-card style="margin-top: 10px;">
      <el-button type="primary" icon="el-icon-plus" size="small" style="float:left;padding: 6px;margin-bottom: 10px;" @click="addNew">增加工作人员</el-button>
      <!-- 表相关 -->
      <el-table :data="tableData.slice((currentPage-1)*pageSize,currentPage*pageSize)" style="width: 100%"
                :header-row-style="{height:'30px'}"
                :header-cell-style="{background:'#f5f7fa',padding:'0px',textAlign: 'center'}"
                :row-style="{height:'40px'}" :cell-style="{padding:'0px', textAlign: 'center' }"
                size='small'
                :default-sort = "{prop: 'ID', order: 'increasing'}"
      >
        <!-- 表头相关 -->
        <!--        <el-table-column type="selection"></el-table-column>-->
        <el-table-column fixed prop="ID" label="工作人员id" ></el-table-column>
        <el-table-column label="工作人员基本信息">
          <template slot-scope="scope">
            <el-popover trigger="hover" placement="top">
              <p>姓名: {{ scope.row.employeename }}</p>
              <p>性别: {{ scope.row.sex }}</p>
              <p>电话: {{ scope.row.phone }}</p>
              <p>身份证号: {{ scope.row.idcard }}</p>
              <p>出生日期: {{ scope.row.birthday }}</p>
              <div slot="reference" class="name-wrapper">
                <el-tag type="info" effect="plain" size="medium">{{ scope.row.employeename }}</el-tag>
              </div>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column prop="hiredate" label="入职日期"></el-table-column>
        <el-table-column prop="resigndate" label="离职日期"></el-table-column>
        <el-table-column prop="description" label="描述"></el-table-column>
        <el-table-column label="查看相关记录">
          <template slot-scope="scope">
            <el-popover trigger="hover" placement="top">
              <p>记录创建时间: {{ scope.row.created }}</p>
              <p>记录创建管理员: {{ scope.row.createby }}</p>
              <p>记录更新时间: {{ scope.row.updated }}</p>
              <p>记录更新管理员: {{ scope.row.updateby }}</p>
              <div slot="reference" class="name-wrapper">
                <el-tag type="success" effect="plain" size="medium">查看</el-tag>
              </div>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <!-- 更新工作人员信息相关  -->
            <el-button @click="updateButton(scope.row)" type="text" style="flex: auto" size="small" >更新信息</el-button>
            <el-dialog title="更新工作人员信息" :visible.sync="dialogVisible" width="50%" :before-close="handleClose">
              <el-form :inline="true" :model="updateForm" ref="updateForm" :rules="rulesUpdate" label-width="120px" class="input-form">
                <el-form-item prop="phone" label-position="left" class="input-el-form-item">
                  <span slot="label"  style="color: #403b3b">电话号:</span>
                  <el-input v-model="updateForm.phone" placeholder="新电话号"  size="small" clearable style="width: 165px;"></el-input>
                </el-form-item>
                <el-form-item prop="description" label-position="left" class="input-el-form-item">
                  <span slot="label"  style="color: #403b3b">描述:</span>
                  <el-input v-model="updateForm.description" placeholder="描述"  size="small" clearable style="width: 165px;"></el-input>
                </el-form-item>
              </el-form>
              <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false" >取 消</el-button>
                <el-button type="primary" @click="update('updateForm')">确 定</el-button>
              </span>
            </el-dialog>
            <!-- 办理工作人员出院相关 -->
            <br>
            <el-button @click="outButton(scope.row)" type="text" style="flex: auto" size="small" >办理离职手续</el-button>
            <el-dialog title="离职" :visible.sync="dialogVisible_out" width="30%">
              <el-form :inline="true" :model="outForm" ref="outForm" :rules="rulesOut" label-width="120px" class="input-form">
                <el-form-item>
                  <span style=" flex: auto; padding:6px; color: #403b3b">确认为工作人员{{scope.row.employeename}}办理签出手续吗？</span>
                </el-form-item>
                <el-form-item prop="description" label-position="left" class="input-el-form-item">
                  <span slot="label"  style="color: #403b3b">相关描述？</span>
                  <el-input v-model="outForm.description" placeholder="若无描则不填写"  size="small" clearable style="width: 165px;"></el-input>
                </el-form-item>
              </el-form>
              <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible_out = false" >取 消</el-button>
                <el-button type="primary" @click="out">确 定</el-button>
              </span>
            </el-dialog>
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
      var req = /^[0-9]*$/
      if (!value) {
        return callback()
      } else if (!req.test(value)) {
        return callback(new Error('仅由数字构成'))
      }else {
        return callback()
      }
    }
    var phone = (rule, value, callback) => {
      const reg = /^(13[0-9]|14[5|7]|15[0|1|2|3|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$/
      if (!value) {
        return callback()
      } else if (!reg.test(value)) {
        return callback(new Error('请输入正确的手机号码'))
      } else {
        return callback()
      }
    }
    return {
      Loading: false, // 加载中动画
      // 工作人员id
      checkForm:{
        id: ''
      },
      dialogVisible: false, // 对话框是否可见，用在更新
      // 更新工作人员信息
      updateForm:{
        id:'',
        phone:'',
        description:'',
        username:''
      },
      dialogVisible_out: false, // 对话框是否可见，用在出院
      // 工作人员离职
      outForm: {
        id:'',
        description:'',
        username:''
      },
      tableData: [
        {
          ID:'1',
          employeename:'yyz',
          sex:'F',
          phone:'15302938376',
          idcard:'440698200206264546',
          birthday:'2002-06-26',
          hiredate:'2023-07-08',
          resigndate:'',
          description:'准备出院',
          created:'2023-07-07',
          createby:'test01',
          updated:'2023-07-07',
          updateby:'zzz'
        },
      ],
      // 查询规则
      rules: {
        id: [{validator: id, trigger: 'blur'}]
      },
      // 更新规则
      rulesUpdate:{
        id:[{validator: id, trigger: 'blur'}],
        phone:[{validator:phone, trigger: 'blur'}],
        description:[],
        username:[]
      },
      // 签出规则
      rulesOut:{
        id:[{validator: id, trigger: 'blur'}],
        description:[],
        username:[]
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
      manage.getEmployeeList().then(res => {
        console.log("刷新表格")
        if (res.code == 200 ) {
          this.tableData = res.employeeList
        }
      })
    },
    // 根据id查工作人员
    check(formName) {
      console.log("开始查找")
      this.$refs[formName].validate((valid) => {
        console.log("通过表单验证")
        if(valid){
          this.Loading = true
          manage.checkEmployeeById(this.checkForm.id).then(res => {
            if (res.code == 200) {
              this.tableData = res.employeeList
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
    // 增加新的工作人员
    addNew() {
      this.$router.push({ path: '/addEmployee' })
    },
    // 更新工作人员信息
    updateButton(row) {
      // 获取相关信息
      this.dialogVisible = true
      this.updateForm.id = row.ID
      this.updateForm.username = window.sessionStorage.getItem('username')
      this.updateForm.description = row.description
      this.updateForm.username = row.description
      // console.log("id: " + id)
      // console.log("username: " + username)
    },
    update(formName) {
      console.log("更新工作人员信息触发")
      // 获取相关信息
      console.log("id: " + this.updateForm.id)
      console.log("username: " + this.updateForm.username)
      this.$refs[formName].validate((valid) => {
        console.log("通过表单验证")
        if(valid){
          this.Loading = true
          manage.updateEmployee(this.updateForm).then(res => {
            if (res.code == 200) {
              this.fetchNewTable()
              this.$message({
                message: "更新成功",
                type: "success"
              })
              // 刷新表格
              this.fetchNewTable()
            } else {
              this.$message({
                message: "更新异常",
                type: "error"
              })
            }
          }).finally(res => {
            this.Loading = false
            this.dialogVisible = false
          })
        } else {
          console.log("没有通过表单验证")
        }
      })
    },
    // 工作人员出院
    outButton(row){
      // 获取相关信息
      this.dialogVisible_out = true
      this.outForm.id = row.ID
      this.outForm.username = window.sessionStorage.getItem('username')
      this.outForm.description = row.description
      // console.log("id: " + id)
      // console.log("username: " + username)
    },
    out(){
      console.log("工作人员出院触发")
      this.dialogVisible_out = false
      // 获取相关信息
      console.log("id: " + this.outForm.id)
      console.log("username: " + this.outForm.username)
      this.Loading = true
      manage.resignEmployee(this.outForm).then(res => {
        if (res.code == 200) {
          this.fetchNewTable()
          this.$message({
            message: "离职成功",
            type: "success"
          })
        } else {
          this.$message({
            message: "离职异常",
            type: "error"
          })
        }
      }).finally(res => {
        this.Loading = false
        this.dialogVisible_out = false
      })
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
    }
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
