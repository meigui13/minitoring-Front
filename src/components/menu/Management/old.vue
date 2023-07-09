<template>
  <div>
    <!-- 查询条件区 -->
    <el-card class="input-card">
      <!-- 查询条件 -->
      <el-form :inline="true" :model="checkForm" ref="checkForm" :rules="rules" label-width="120px" class="input-form">
        <el-form-item prop="id" label-position="left" class="input-el-form-item">
          <span slot="label"  style="color: #403b3b">老人id:</span>
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
        <el-table-column fixed prop="ID" label="老人id" ></el-table-column>
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
                <el-tag type="info" effect="plain" size="medium">{{ scope.row.oldname }}</el-tag>
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
<!--              <p>出院日期: {{ scope.row.checkoutdate }}</p>-->
              <div slot="reference" class="name-wrapper">
                <el-tag type="info" effect="plain" size="medium">{{ scope.row.healthstate }}</el-tag>
              </div>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column prop="checkoutdate" label="老人出院日期"></el-table-column>
        <el-table-column label="第一监护人信息">
          <template slot-scope="scope">
            <el-popover trigger="hover" placement="top">
              <p>姓名: {{ scope.row.firstguardianname }}</p>
              <p>与老人关系: {{ scope.row.firstguardianrela }}</p>
              <p>电话: {{ scope.row.firstguardianphone }}</p>
              <p>微信: {{ scope.row.firstguardianwechat }}</p>
              <div slot="reference" class="name-wrapper">
                <el-tag type="info" effect="plain" size="medium">{{ scope.row.firstguardianname }}</el-tag>
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
                <el-tag type="info" effect="plain" size="medium">{{ scope.row.firstguardianname }}</el-tag>
              </div>
            </el-popover>
          </template>
        </el-table-column>
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
            <!-- 更新老人信息相关  -->
            <el-button @click="updateButton(scope.row)" type="text" style="flex: auto" size="small" >更新信息</el-button>
            <el-dialog title="更新老人信息" :visible.sync="dialogVisible" width="50%" :before-close="handleClose">
              <el-form :inline="true" :model="updateForm" ref="updateForm" :rules="rulesUpdate" label-width="120px" class="input-form">
                <el-divider><p>老人基本信息</p></el-divider>
<!--                <el-form-item prop="roomnum" label-position="left" class="input-el-form-item">-->
<!--                  <span slot="label"  style="color: #403b3b">原房间号:{{scope.row.roomnum }}</span>-->
<!--                </el-form-item>-->
                <el-form-item prop="roomnum" label-position="left" class="input-el-form-item">
                  <span slot="label"  style="color: #403b3b">老人房间号:</span>
                  <el-input v-model="updateForm.roomnum" placeholder="新房间号"  size="small" clearable style="width: 165px;"></el-input>
                </el-form-item>
                <el-form-item prop="phone" label-position="left" class="input-el-form-item">
                  <span slot="label"  style="color: #403b3b">老人电话号:</span>
                  <el-input v-model="updateForm.phone" placeholder="新电话号"  size="small" clearable style="width: 165px;"></el-input>
                </el-form-item>
                <el-form-item prop="healthstate" label-position="left" class="input-el-form-item">
                  <span slot="label"  style="color: #403b3b">老人健康状况:</span>
                  <el-input v-model="updateForm.healthstate" placeholder="健康状况"  size="small" clearable style="width: 165px;"></el-input>
                </el-form-item>
                <el-form-item prop="description" label-position="left" class="input-el-form-item">
                  <span slot="label"  style="color: #403b3b">描述:</span>
                  <el-input v-model="updateForm.description" placeholder="描述"  size="small" clearable style="width: 165px;"></el-input>
                </el-form-item>

                <el-divider><p>第一监护人信息</p></el-divider>
                <el-form-item prop="firstguardianname" label-position="left" class="input-el-form-item">
                  <span slot="label"  style="color: #403b3b">姓名:</span>
<!--                  <el-tooltip content="sasa" placement="top">-->
                    <el-input v-model="updateForm.firstguardianname" placeholder="新姓名"  size="small" clearable style="width: 165px;"></el-input>
<!--                  </el-tooltip>-->
                </el-form-item>
                <el-form-item prop="firstguardianrela" label-position="left" class="input-el-form-item">
                  <span slot="label"  style="color: #403b3b">与老人关系:</span>
                  <el-input v-model="updateForm.firstguardianrela" placeholder="新关系"  size="small" clearable style="width: 165px;"></el-input>
                </el-form-item>
                <el-form-item prop="firstguardianphone" label-position="left" class="input-el-form-item">
                  <span slot="label"  style="color: #403b3b">电话:</span>
                  <el-input v-model="updateForm.firstguardianphone" placeholder="新电话"  size="small" clearable style="width: 165px;"></el-input>
                </el-form-item>
                <el-form-item prop="firstguardianwechat" label-position="left" class="input-el-form-item">
                  <span slot="label"  style="color: #403b3b">微信:</span>
                  <el-input v-model="updateForm.firstguardianwechat" placeholder="新微信"  size="small" clearable style="width: 165px;"></el-input>
                </el-form-item>

                <el-divider><p>第二监护人信息</p></el-divider>
                <el-form-item prop="secondguardianname" label-position="left" class="input-el-form-item">
                  <span slot="label"  style="color: #403b3b">姓名:</span>
                  <el-input v-model="updateForm.secondguardianname" placeholder="新姓名"  size="small" clearable style="width: 165px;"></el-input>
                </el-form-item>
                <el-form-item prop="secondguardianrela" label-position="left" class="input-el-form-item">
                  <span slot="label"  style="color: #403b3b">与老人关系:</span>
                  <el-input v-model="updateForm.secondguardianrela" placeholder="新关系"  size="small" clearable style="width: 165px;"></el-input>
                </el-form-item>
                <el-form-item prop="secondguardianphone" label-position="left" class="input-el-form-item">
                  <span slot="label"  style="color: #403b3b">电话:</span>
                  <el-input v-model="updateForm.secondguardianphone" placeholder="新电话"  size="small" clearable style="width: 165px;"></el-input>
                </el-form-item>
                <el-form-item prop="secondguardianwechat" label-position="left" class="input-el-form-item">
                  <span slot="label"  style="color: #403b3b">微信:</span>
                  <el-input v-model="updateForm.secondguardianwechat" placeholder="新微信"  size="small" clearable style="width: 165px;"></el-input>
                </el-form-item>
              </el-form>
              <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false" >取 消</el-button>
                <el-button type="primary" @click="update('updateForm')">确 定</el-button>
              </span>
            </el-dialog>
            <!-- 办理老人出院相关 -->
            <br>
            <el-button @click="outButton(scope.row)" type="text" style="flex: auto" size="small" >办理出院</el-button>
            <el-dialog title="出院" :visible.sync="dialogVisible_out" width="30%">
              <el-form :inline="true" :model="outForm" ref="outForm" :rules="rulesOut" label-width="120px" class="input-form">
                <el-form-item>
                  <span style=" flex: auto; padding:6px; color: #403b3b">确认为老人{{scope.row.oldname}}办理出院手续吗？</span>
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
      // 老人id
      checkForm:{
        id:''
      },
      // id: '',
      dialogVisible: false, // 对话框是否可见，用在更新
      // 更新老人信息
      updateForm:{
        id:'',
        roomnum:'',
        phone:'',
        firstguardianname:'',
        firstguardianrela:'',
        firstguardianphone:'',
        firstguardianwechat:'',
        secondguardianname:'',
        secondguardianrela:'',
        secondguardianphone:'',
        secondguardianwechat:'',
        healthstate:'',
        description:'',
        username:''
      },
      dialogVisible_out: false, // 对话框是否可见，用在出院
      outForm: {
        id:'',
        description:'',
        username:''
      },
      tableData: [
        {
          ID:'1',
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
          createby:'zzz',
          updated:'2023-07-08',
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
        roomnum:[],
        phone:[{validator:phone, trigger: 'blur'}],
        firstguardianname:[],
        firstguardianrela:[],
        firstguardianphone:[{validator:phone, trigger: 'blur'}],
        firstguardianwechat:[],
        secondguardianname:[],
        secondguardianrela:[],
        secondguardianphone:[{validator:phone, trigger: 'blur'}],
        secondguardianwechat:[],
        healthstate:[],
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
      manage.getOldList().then(res => {
        console.log("刷新表格")
        console.log(res)
        if (res.code == 200 ) {
          this.tableData = res.oldList
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
          console.log(this.checkForm.id)
          // this.checkForm.id =
          manage.checkOldById(this.checkForm.id).then(res => {
            if (res.code == 200) {
              console.log(res)
              this.tableData = res.oldList
              console.log(this.tableData)
              console.log("check,断点1")
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
          })
          this.Loading = false

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
    updateButton(row){
      // 获取相关信息
      this.dialogVisible = true
      this.updateForm.id = row.ID
      this.updateForm.username = window.sessionStorage.getItem('username')

      this.updateForm.roomnum = row.roomnum
      this.updateForm.phone = row.phone
      this.updateForm.firstguardianname = row.firstguardianname
      this.updateForm.firstguardianrela = row.firstguardianrela
      this.updateForm.firstguardianphone = row.firstguardianphone
      this.updateForm.firstguardianwechat = row.firstguardianwechat
      this.updateForm.secondguardianname = row.secondguardianname
      this.updateForm.secondguardianrela = row.secondguardianrela
      this.updateForm.secondguardianphone = row.secondguardianphone
      this.updateForm.secondguardianwechat = row.secondguardianwechat
      this.updateForm.healthstate = row.healthstate
      this.updateForm.description = row.description
    },
    update(formName) {
      console.log("更新老人信息触发")
      // this.updateForm.id =
      // this.updateForm.username =
      console.log("id: " + this.updateForm.id)
      console.log("username: " + this.updateForm.username)
      this.$refs[formName].validate((valid) => {
        console.log("通过表单验证")
        console.log(this.updateForm)
        if(valid){
          this.Loading = true
          manage.updateOld(this.updateForm).then(res => {
            if (res.code == 200) {
              this.fetchNewTable()
              this.$message({
                message: "更新成功",
                type: "success"
              })
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
    // 老人出院
    outButton(row){
      // 获取相关信息
      this.dialogVisible_out = true
      this.outForm.id = row.ID
      this.outForm.username = window.sessionStorage.getItem('username')
      this.outForm.description = row.description
    },
    out(){
      console.log("老人出院触发")
      this.dialogVisible_out = false
      // this.outForm.id =
      // this.outForm.description =
      // this.outForm.username =
      console.log("id: " + this.outForm.id)
      console.log("username: " + this.outForm.username)
      this.Loading = true
      manage.checkoutOld(this.outForm).then(res => {
        if (res.code == 200) {
          this.fetchNewTable()
          this.$message({
            message: "出院成功",
            type: "success"
          })
        } else {
          this.$message({
            message: "出院异常",
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
