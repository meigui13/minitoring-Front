import request from '@/requestAndSecurity/request'
// 个人中心
export default {
/**
   * 1.获取个人主页信息
   * @param {*} data 
   * @returns 
   */
    personInformation(param) {
    return request({
      url: '/user/getuser/',
      method: 'get',
      params: {
      username:param
      }
    })
  },
  /**
   * 2.修改个人中心
   * @param {*} data 
   * @returns 
   */
  modifyUserInformation(data) {
    return request({
      url: '/user/changeInfo/',
      method: 'put',
      data:data
    })
  },
/**
   * 3.修改密码
   * @param {*} data 
   * @returns 
   */
    modifyPassword(data) {
    return request({
      url: '/user/changePW/',
      method: 'put',
      data:data
    })
  },
  /**
   * 4.新增管理员
   * @param {*} data 
   * @returns 
   */
   addManage(data) {
    return request({
      url: '/user/addNewUser/',
      method: 'post',
      data:data
    })
  },
}