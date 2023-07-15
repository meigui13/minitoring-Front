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
   * 1.获取情绪报表信息
   * @returns 
   */
  getEmotionList(){
    return request({
      url: '/care/getEmotionList/',
      method: 'get',
    })
  },
  /**
   * 1.获取情绪报表信息
   * @returns 
   */
  getFallList(){
    return request({
      url: '/care/getFallList/',
      method: 'get',
    })
  },
  /**
   * 1.获取情绪报表信息
   * @returns 
   */
  getIntrusionList(){
    return request({
      url: '/care/getIntrusionList/',
      method: 'get',
    })
  },
  /**
   * 1.获取情绪报表信息
   * @returns 
   */
  getInteractList(){
    return request({
      url: '/care/getInteractList/',
      method: 'get',
    })
  },
  /**
   * 1.获取情绪报表信息
   * @returns 
   */
  getFireList(){
    return request({
      url: '/care/getFireList/',
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