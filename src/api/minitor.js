import request from '@/requestAndSecurity/request'
// 个人中心
export default {
/**
   * 1.获取事件报表信息
   * @returns 
   */
    getEventList(){
    return request({
      url: '/care/getEventList/',
      method: 'get',
    })
  },
  /**
   * 1.获取事件报表信息
   * @returns 
   */
  stop(){
    return request({
      url: '/care/stop/',
      method: 'post',
    })
  },
}