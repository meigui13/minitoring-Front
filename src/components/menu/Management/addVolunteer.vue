<template>
<div class="personalPageWhole">
  <el-card style="float: left; width:90%; margin-left: 5%;">
    <el-steps :active="active" finish-status="success" align-center>
      <el-step title="基本信息录入"></el-step>
      <el-step title="人脸信息录入"></el-step>
      <el-step title="完成"></el-step>
 </el-steps>
 <div>
 <el-button type="primary" :loading="loading" style="margin-top: 12px;margin-left: 83%;" @click="resetForm('addInfo')">重 置</el-button>
 <el-button type="primary" :loading="loading"  @click="add('addInfo')">下一步</el-button>
 </div>
  </el-card>
    <el-card style="float: left; width:90%; margin-left: 5%;margin-top: 10px">
      <div slot="header" class="clearfix">
      <span slot="label" style="color: #403b3b">新增义工信息</span>
      </div>
      <el-form :inline=true ref="addInfo" :model="addInfo"  :rules="rules" label-width="220px" class="form">
                 <el-form-item prop="volunteername"  >
                    <span slot="label"  style="color: #403b3b">义工姓名:       </span>
                    <el-input v-model="addInfo.volunteername" style="width: 200px;"></el-input>
                </el-form-item>
                <el-form-item prop="sex"  >
                    <span slot="label"  style="color: #403b3b">义工性别:       </span>
                    <el-input v-model="addInfo.sex" style="width: 200px;"></el-input>
                </el-form-item>
                <el-form-item prop="phone"  >
                    <span slot="label"  style="color: #403b3b">义工电话号码:       </span>
                    <el-input v-model="addInfo.phone" style="width: 200px;"></el-input>
                </el-form-item>
                <el-form-item prop="idcard"  >
                    <span slot="label"  style="color: #403b3b">义工身份证:       </span>
                    <el-input v-model="addInfo.idcard" style="width: 200px;"></el-input>
                </el-form-item>
                <el-form-item prop="birthday"  >
                    <span slot="label"  style="color: #403b3b">义工出生日期:       </span>
                    <el-input v-model="addInfo.birthday" style="width: 200px;"></el-input>
                </el-form-item>
                <el-form-item prop="description"  >
                    <span slot="label"  style="color: #403b3b">义工描述:       </span>
                    <el-input v-model="addInfo.description" style="width: 200px;"></el-input>
                </el-form-item>
      </el-form>
    </el-card>
</div>
</template>

<script>
import manage from '@/api/manage'
export default {
 data(){
  var phone = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('请输入电话号码'))
        }
          else if (!/^[1][3,4,5,6,7,8,9][0-9]{9}$/.test(value)) {
                    return callback(new Error('手机号格式不正确'))
            }else {
                    callback()
                }
      }
      var name_ =(rule,value,callback) => {
        if (!value) {
          return callback(new Error('请输入义工真实姓名'))
        }else if(! /^[\u4E00-\u9FA5]{2,6}$/.test(value)){
          return callback(new Error('姓名格式不正确'))
        }
         else{
          callback()
         }
        }
        
        var idcard =(rule,value,callback) => {
        if (!value) {
          return callback(new Error('请输入身份证号'))
          }else if(! /^[1-9][0-9]{5}([1][9][0-9]{2}|[2][0][0|1][0-9])([0][1-9]|[1][0|1|2])([0][1-9]|[1|2][0-9]|[3][0|1])[0-9]{3}([0-9]|[X])$/.test(value)){
              return callback(new Error('身份证号格式不正确'))
           }
             else{
               callback()
         }
        }
       var one =(rule,value,callback) => {
        if(!value){
          return callback(new Error('该项不可为空'))
        }else{
          callback()
        }
  }
  return{
    active:0,
    loading: false,
    addInfo:{
        volunteername:'',
        sex:'',
        phone:'',
        idcard:'',
        birthday:'',
        description:'',
        username:'',
      
    },
    rules:{
      volunteername: [{required: true,validator: name_, trigger: 'blur' }],
      phone: [{required: true,validator: phone, trigger: 'blur' }],
      sex:[{required: true,validator: one, trigger: 'blur' }],
      idcard:[{required: true,validator: idcard, trigger: 'blur' }],
      birthday:[{required: true,validator: one, trigger: 'blur' }],
      description:[{required: true,validator: one, trigger: 'blur' }],
    }
  }
 },
 created() {
        this.addInfo.username = window.sessionStorage.getItem('username')
  },
  methods:{
        //重置表单(被重置的表单元素必须有prop规则引用)
        resetForm(formName) {
          console.log(this.formName);
           this.$refs[formName].resetFields();
        },
        //新增管理员
        add(formName){
            console.log(this.addInfo)
            this.$refs[formName].validate(valid=>{
                if (valid) {
                  console.log("通过表单验证")
                  this.$router.push({ path: '/addFace' })
                    this.loading = true
                    manage.addVolunteer(this.addInfo).then(res=> {
                        if (res.data.status_code==true) {
                            this.$message({
                                message: res.data.msg,
                                type:'success'
                            })
                            this.$router.push({ path: '/addFace' })
                        }
                        else{
                          this.$message({
                                message: '所有项均不可为空',
                            })
                        }
                    }).finally(res=> {
                        this.loading = false
                        this.addVisible = false
                    })
                }
            })
        },
    
     }
}
</script>

<style scoped>

</style>
