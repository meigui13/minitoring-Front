<template>
  <div class="personalPageWhole">
    <el-card class="input-card">
      <span slot="label" style="color: #403b3b">新增老人信息</span>
          <el-form :inline="true" :model="addInfo" ref="addInfo" :rules="rules" class="form">
                 <el-form-item prop="oldname"  class="input-el-form-item">
                    <span slot="label"  style="color: #403b3b">老人姓名:       </span>
                    <el-input v-model="addInfo.oldname" style="width: 250px;"></el-input>
                </el-form-item>
                <el-form-item prop="sex"  class="testInput2">
                    <span slot="label"  style="color: #403b3b">老人性别:</span>
                    <el-input v-model="addInfo.sex" style="width: 250px;"></el-input>
                </el-form-item>
                <el-form-item prop="phone"  class="input-el-form-item">
                    <span slot="label"  style="color: #403b3b">老人电话:</span>
                    <el-input v-model="addInfo.phone" style="width: 250px;" ></el-input>
                </el-form-item>
                <el-form-item prop="idcard"  class="input-el-form-item">
                    <span slot="label"  style="color: #403b3b">老人身份证号:</span>
                   <el-input   maxlength="18" v-model="addInfo.idcard" style="width: 250px;" ></el-input>
                </el-form-item>
            </el-form>
            <div style="display: flex;float: right;margin-bottom:10px;">
                <el-button @click="resetForm('addInfo')">重 置</el-button>
                <el-button type="primary" :loading="loading" @click="add('addInfo')">确 定</el-button>
            </div>
      </el-card>
  </div>
  </template>
  
  <script>
  export default {
    data(){
      var phone = (rule, value, callback) => {
            if (!/^[1][3,4,5,6,7,8,9][0-9]{9}$/.test(value)) {
                    return callback(new Error('手机号格式不正确'))
            }else {
                    callback()
                }
      }
      return{
        loading: false,
        addVisible:true,
        addInfo:{
          oldname:'',
          sex:'',
          phone:'',
          idcard:''


        },
        rules:{
                phone: [{ validator: phone, trigger: 'blur' }]
            }
      }
     
    },
    methods:{
       //重置表单(被重置的表单元素必须有prop规则引用)
       resetForm(formName) {
           this.$refs[formName].resetFields();
        },
      //新增管理员
        add(formname){

        }
    
  }
  }
  </script>
  
  <style scoped>
  .input-card{
    position: relative;
  }
  .form {
    margin-left: 0%;
    top:0px;
    height: auto;
}
.textInput2 {
    width: 303px;
    align-items: center;
}

  </style>
