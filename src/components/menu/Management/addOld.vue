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
      <span slot="label" style="color: #403b3b">新增老人信息</span>
      </div>
      <el-form :inline=true ref="addInfo" :model="addInfo"  :rules="rules" label-width="220px" class="form">
                 <el-form-item prop="oldname"  >
                    <span slot="label"  style="color: #403b3b">老人姓名:       </span>
                    <el-input v-model="addInfo.oldname" style="width: 200px;"></el-input>
                </el-form-item>
                <el-form-item prop="sex"  class="textInput2">
                    <span slot="label"  style="color: #403b3b">老人性别:</span>
                    <el-input v-model="addInfo.sex" style="width: 200px;"></el-input>
                </el-form-item>
                <el-form-item prop="phone"  class="input-el-form-item">
                    <span slot="label"  style="color: #403b3b">老人电话:</span>
                    <el-input v-model="addInfo.phone" style="width: 200px;" ></el-input>
                </el-form-item>
                <el-form-item prop="idcard"  class="input-el-form-item">
                    <span slot="label"  style="color: #403b3b">老人身份证号:</span>
                   <el-input   maxlength="18" v-model="addInfo.idcard" style="width: 200px;" ></el-input>
                </el-form-item>
                <el-form-item prop="birthday"  class="input-el-form-item">
                    <span slot="label"  style="color: #403b3b">老人出生日期:</span>
                    <el-input v-model="addInfo.birthday" style="width: 200px;" ></el-input>
                </el-form-item>
                <el-form-item prop="roomnum"  class="input-el-form-item">
                    <span slot="label"  style="color: #403b3b">老人房间号:</span>
                    <el-input v-model="addInfo.roomnum" style="width: 200px;" ></el-input>
                </el-form-item>
                <el-form-item prop="healthstate"  class="input-el-form-item">
                    <span slot="label"  style="color: #403b3b">老人健康状态:</span>
                    <el-input v-model="addInfo.healthstate" style="width: 200px;" ></el-input>
                </el-form-item>
                <el-form-item prop="description"  class="input-el-form-item">
                    <span slot="label"  style="color: #403b3b">描述:</span>
                    <el-input v-model="addInfo.description" style="width: 200px;" ></el-input>
                </el-form-item>
                 <el-form-item prop="firstguardianname"  >
                    <span slot="label"  style="color: #403b3b">第一监护人姓名:       </span>
                    <el-input v-model="addInfo.firstguardianname" style="width: 200px;"></el-input>
                </el-form-item>
                <el-form-item prop="firstguardianrela"  class="textInput2">
                    <span slot="label"  style="color: #403b3b">第一监护人与老人关系: </span>
                    <el-input v-model="addInfo.firstguardianrela" style="width: 200px;"></el-input>
                </el-form-item>
                <el-form-item prop="firstguardianphone"  class="input-el-form-item">
                    <span slot="label"  style="color: #403b3b">第一监护人电话:</span>
                    <el-input maxlength="18" v-model="addInfo.firstguardianphone" style="width: 200px;" ></el-input>
                </el-form-item>
                <el-form-item prop="firstguardianwechat"  class="input-el-form-item">
                    <span slot="label"  style="color: #403b3b">第一监护人微信号:</span>
                   <el-input   v-model="addInfo.firstguardianwechat" style="width: 200px;" ></el-input>
                </el-form-item>
                 <el-form-item prop="secondguardianname"  >
                    <span slot="label"  style="color: #403b3b">第二监护人姓名:       </span>
                    <el-input v-model="addInfo.secondguardianname" style="width: 200px;"></el-input>
                </el-form-item>
                <el-form-item prop="secondguardianrela"  class="textInput2">
                    <span slot="label"  style="color: #403b3b">第二监护人与老人关系:</span>
                    <el-input v-model="addInfo.secondguardianrela" style="width: 200px;"></el-input>
                </el-form-item>
                <el-form-item prop="secondguardianphone"  class="input-el-form-item">
                    <span slot="label"  style="color: #403b3b">第二监护人电话:</span>
                    <el-input v-model="addInfo.secondguardianphone" style="width: 200px;" ></el-input>
                </el-form-item>
                <el-form-item prop="secondguardianwechat"  class="input-el-form-item">
                    <span slot="label"  style="color: #403b3b">第二监护人微信号:</span>
                   <el-input   maxlength="18" v-model="addInfo.secondguardianwechat" style="width:200px;" ></el-input>
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
          return callback(new Error('请输入老人真实姓名'))
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
        labelPosition: 'right',
        loading: false,
        addInfo:{
          oldname:'',
          sex:'',
          phone:'',
          idcard:'',
          birthday:'',
          roomnum:'',
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
          username:'',
        },
        rules:{
          oldname:[{required: true,validator:name_,  trigger: 'blur'}],
          phone: [{required: true,validator: phone, trigger: 'blur' }],
          description:[{required: true,validator: one,  trigger: 'blur' }],
          birthday:[{required: true,validator: one,  trigger: 'blur' }],
          idcard:[{required: true,validator: idcard,  trigger: 'blur' }],
          roomnum:[{required: true,validator:one,  trigger: 'blur'}],
          healthstate:[{required: true,validator: one,  trigger: 'blur'}],
          username:[{required: true,validator: one,  trigger: 'blur'}],
          firstguardianname:[{required: true,validator: name_,  trigger: 'blur'}],
          firstguardianrela:[{required: true,validator: one,  trigger: 'blur'}],
          firstguardianphone:[{required: true,validator: phone,  trigger: 'blur'}],
          firstguardianwechat:[{required: true,validator: one,  trigger: 'blur'}],
          secondguardianname:[{required: true,validator: name_,  trigger: 'blur'}],
          secondguardianrela:[{required: true,validator: one,  trigger: 'blur'}],
          secondguardianphone:[{required: true,validator: phone,  trigger: 'blur'}],
          secondguardianwechat:[{required: true,validator: one,  trigger: 'blur'}]
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
        //新增老人
        add(formName){
            console.log(this.addInfo)
            this.$refs[formName].validate(valid=>{
                if (valid) {
                  console.log("通过表单验证")
                  this.$router.push({ path: '/addFace' })
                    this.loading = true
                    manage.addOld(this.addInfo).then(res=> {
                        if (res.code=='200') {
                            this.$message({
                                message: res.msg,
                                type:'success'
                            })
                            window.sessionStorage.setItem('id',res.id)
                            this.$router.push({ path: '/addFace' })
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
  .input-card{

    width: 375px;
  }


  </style>
