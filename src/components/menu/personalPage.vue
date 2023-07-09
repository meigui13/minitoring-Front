<template>
    <div class="personalPageWhole">
        <div :inline="true">
            <el-avatar :src="userJPG" :size="120" class="jpg"></el-avatar>
            <span class="welcome">Hi~ {{ userName }}</span>
        </div>
        <div>
        <el-form  class="personalInfo" >
            <el-form-item  >
                <el-card class="box-card">
                    <el-descriptions class="margin-top" title="个人信息" :column="3" :size="size">
                        <template slot="extra">
                        <el-button type="text" @click="changePasswordDialog = true">修改密码</el-button>
                        <el-button type="primary" plain circle @click="addVisible = true">新增管理员</el-button>
                        <el-button type="primary" icon="el-icon-edit" circle @click="dialogFormVisible = true"></el-button>
                        </template>
                        <el-descriptions-item  label="用户名">{{ this.userName }}</el-descriptions-item>
                        <el-descriptions-item label="姓名" class="test">{{ this.userReal }}</el-descriptions-item>   
                        <el-descriptions-item label="手机号" class="test">{{ this.phone }}</el-descriptions-item>
                        <el-descriptions-item label="性别" class="test">{{ this.usersex }}</el-descriptions-item>
                        <el-descriptions-item label="邮箱" class="test">{{ this.userEmail }}</el-descriptions-item>
                        <el-descriptions-item label="身份" class="test">{{ this.description }}</el-descriptions-item>
                        
                    </el-descriptions>
                </el-card>
            </el-form-item>
        </el-form>
    </div>
        <el-dialog width="450px" title="修改个人信息" :visible.sync="dialogFormVisible" append-to-body>
            <el-form :model="changeInfo" ref="changeInfo" :rules="rules">
                <el-form-item label="用户名:" label-width="100px" prop="username">
                   <el-input v-model="changeInfo.username" placeholder="新用户名"></el-input>
                </el-form-item>
                <el-form-item label="电话号码:" label-width="100px" prop="phone">
                   <el-input v-model="changeInfo.phone" placeholder="11位数手机号"></el-input>
                </el-form-item>
                <el-form-item label="电子邮箱:" label-width="100px" prop="email">
                    <el-input v-model="changeInfo.email" ></el-input>
                </el-form-item>
                <el-form-item label="描述" label-width="100px" prop="description">
                   <el-input v-model="changeInfo.description" ></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="resetForm('changeInfo')">重 置</el-button>
                <el-button type="primary" :loading="loading" @click="modify('changeInfo')">确 定</el-button>
            </div>
            </el-dialog>

            <el-dialog width="450px" title="新增管理员" :visible.sync="addVisible" append-to-body>
            <el-form :model="addInfo" ref="addInfo" :rules="rules">
                <el-form-item label="用户名:" label-width="100px" prop="userame">
                    <el-input v-model="addInfo.username" ></el-input>
                </el-form-item>
                <el-form-item label="真实姓名:" label-width="100px" prop="realname">
                    <el-input v-model="addInfo.realname" ></el-input>
                </el-form-item>
                <el-form-item label="性别:" label-width="100px" prop="sex">
                    <el-input v-model="addInfo.sex" ></el-input>
                </el-form-item>
                <el-form-item label="登录密码:" label-width="100px" prop="password">
                   <el-input prefix-icon="el-icon-lock" placeholder="长度3-16个字符,包含数字、大小写字母" type="password" maxlength="18" v-model="addInfo.password" show-password></el-input>
                </el-form-item>
                <el-form-item label="电话号码:" label-width="100px" prop="phone">
                   <el-input v-model="addInfo.phone" placeholder="11位数手机号"></el-input>
                </el-form-item>
                <el-form-item label="电子邮箱:" label-width="100px" prop="email">
                    <el-input v-model="addInfo.email" ></el-input>
                </el-form-item>
                <el-form-item label="身份:" label-width="100px" prop="description">
                    <el-input v-model="addInfo.description" ></el-input>
                </el-form-item>
                
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="resetForm('addInfo')">重 置</el-button>
                <el-button type="primary" :loading="loading" @click="add('addInfo')">确 定</el-button>
            </div>
            </el-dialog>

            <el-dialog width="450px" title="修改密码" :visible.sync="changePasswordDialog" append-to-body>
            <el-form :model="changePassword" ref="changePassword" :rules="rules">
                <el-form-item label="旧密码:" label-width="100px" prop="pre_password">
                   <el-input prefix-icon="el-icon-lock" placeholder="长度3-16个字符,包含数字、大小写字母" type="password" maxlength="18" v-model="changePassword.passwordOld" show-password></el-input>
                </el-form-item>
                <el-form-item label="新密码:" label-width="100px" prop="new_password">
                    <el-input prefix-icon="el-icon-lock" placeholder="长度3-16个字符,包含数字、大小写字母" type="password" maxlength="18" v-model="changePassword.password" show-password></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="resetForm('changePassword')">重 置</el-button>
                <el-button type="primary" :loading="loading" @click="change('changePassword')">确 定</el-button>
            </div>
            </el-dialog>
    </div>
</template>

<script>
import jpg from '@/assets//image/R.jpg'
import center from '@/api/center.js'
export default{
    data(){
        var phone = (rule, value, callback) => {
            if (!value && this.changeInfo.addr== '') {
                return callback(new Error('二者不能同时为空'))
                } else {
                    if (!/^[1][3,4,5,6,7,8,9][0-9]{9}$/.test(value)) {
                    return callback(new Error('手机号格式不正确'))
                }else {
                    callback()
                }
                }
      }
      var phone_ = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('请输入电话号码'))
        }
          else if (!/^[1][3,4,5,6,7,8,9][0-9]{9}$/.test(value)) {
                    return callback(new Error('手机号格式不正确'))
            }else {
                    callback()
                }
      }
       var pre_password = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('请输入旧密码'))
        } else if (!/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{3,16}$/.test(value)) {
          return callback(new Error('密码长度在3-16个字符,只能包含数字、大小写字母'))
        } else {
          callback()
        }  
      }
      var password = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('请输入密码'))
        } else if (!/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{3,16}$/.test(value)) {
          return callback(new Error('密码长度在3-16个字符,只能包含数字、大小写字母'))
        } else {
          callback()
        }  
      }
      var new_password = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('请输入新密码'))
        } else if (!/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{3,16}$/.test(value)) {
          return callback(new Error('密码长度在3-16个字符,只能包含数字、大小写字母'))
        } else if (value == this.changePassword.pre_password) {
          return callback(new Error('两次输入的密码必须不一致！'))
        } else {
          return callback()
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
            loading: false,
            userJPG: jpg,
            userName: "lyb",
            phone: "142578343",
            userEmail:"123@qq.com",
            usersex:"F",
            userReal:"李韵冰",
            description:"测试人员",
            dialogFormVisible: false,
            changePasswordDialog: false,
            addVisible:false,
            changePassword: {
                username:this.userName,
                passwordOld:'',
                password:'',
            },
            changeInfo: {
                username:'',
                email:'',
                phone:'',
                description:''
            },
            addInfo:{
                username:'',
                realname:'',
                phone:'',
                email:'',
                sex:'',
                description:'',
                password:''

            },
            rules:{
                phone: [{ validator: phone, trigger: 'blur' }],
                pre_password: [{ required: true,validator: pre_password, trigger: 'blur'}],
                new_password: [{ required: true,validator: new_password, trigger: 'blur'}],
                password:[{ required: true,validator: password, trigger: 'blur'}],
                username:[{required: true,validator: one, trigger: 'blur' }],
                realname:[{required: true,validator: one, trigger: 'blur' }],
                sex:[{required: true,validator: one, trigger: 'blur' }],
                email:[{required: true,validator: one, trigger: 'blur' }],
            }
        }
    },
    created() {
        // this.token = JSON.parse(window.localStorage.getItem('Token')).token
        // this.changeInfo.token = this.token
        // this.changePassword.token = this.token
        this.userName = window.sessionStorage.getItem('username')
        this.getPersonalInfo()
    },
    methods:{
        //重置表单(被重置的表单元素必须有prop规则引用)
        resetForm(formName) {
           this.$refs[formName].resetFields();
        },
        //修改个人信息
        modify(formName){
            this.$refs[formName].validate(valid=> {
                if (valid) {
                    this.loading = true
                    console.log(this.changeInfo)
                    center.modifyUserInformation(this.changeInfo).then(res=> {
                        if (res.code == '200'){
                            //重新获取用户信息
                            this.getPersonalInfo()
                            this.$message({
                            message: '修改信息成功',
                            type: 'success'
                            }) 
                        }
                    }).finally(res=>{
                        this.loading = false
                        this.dialogFormVisible = false
                    })  
                }
            })
        },
        //获取用户信息
        getPersonalInfo(){
            center.personInformation(this.userName).then(res=> {
                    console.log(res)
                    //this.userName = res.data.username
                    this.phone = res.phone
                    this.userEmail = res.email
                    this.userReal = res.realname
                    this.usersex = res.sex
                    this.description = res.description
                
            }).finally(res=>{
                
            })
        },
        //新增管理员
        add(formname){
            console.log(this.$refs[formName])
            this.$refs[formName].validate(valid=>{
                if (valid) {
                    this.loading = true
                    center.addManage(this.addInfo).then(res=> {
                        if (res.code=='200') {
                            this.$message({
                                message: res.msg,
                                type:'success'
                            })
                        }
                    }).finally(res=> {
                        this.loading = false
                        this.addVisible = false
                    })
                }
            })
        },

        //修改密码
        change(formName){
            console.log(this.$refs[formName])
            this.$refs[formName].validate(valid=>{
                if (valid) {
                    this.loading = true
                    center.modifyPassword(this.changePassword).then(res=> {
                        if (res.code=='200') {
                            this.$message({
                                message:res.msg,
                                type:'success'
                            })
                        }
                    }).finally(res=> {
                        this.loading = false
                        this.changePasswordDialog = false
                    })
                }
            })
        }
    }

}
</script>

<style lang="less" scoped>
.box-card {
    background-color: #f6f9fb;
    color: #2675aa;
    width: 700px;
}
.jpg {
    margin-top: 2%; 
}
.margin-top {
    background-color: #f6f9fb;
}
.personalInfo {
    margin-top: 2%;
}


.welcome {
    font-family:'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    font-size: 50px;
    margin-top: auto;
    margin-left: 50px;
    color: #5379a7;
}

</style>