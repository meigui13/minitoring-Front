import request from '@/requestAndSecurity/request'

export default {
  /**
   * 1.登录
   * @param {*} param
   * @returns
   */
  login (param) {
    return request({
      url: '/user/login/',
      method: 'post',
      data: param
    })
  },


   /**
   * 2.首页信息获取
   * @param {*} param
   * @returns
   */
   userHomePage() {
    return request({
      url: '/user/userHomePage/',
      method: 'get'
    })
  },

}
