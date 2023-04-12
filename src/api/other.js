import request from '@/request'

export default {
  /**
   * 1.入库请求
   * @returns
   */
  enterStock (parcelList,token) {
    return request({
      url: '/other/enter',
      method: 'post',
      data: {
        parcelList,
        token
      }
    })
  },

  /**
   * 2.出库请求
   */
  outStock (parcelList, token) {
    return request({
      url: '/other/out',
      method: 'post',
      data: {
        parcelList,
        token
      }
    })
  },

  /**
   * 3.根据id查询包裹请求
   */
  checkParcel (parcel) {
    return request({
      url: '/other/checkParcel',
      method: 'post',
      data: parcel
    })
  },
  /**
   * 4.获取入库记录表格
   */
  getInTable (token) {
    return request({
      url: '/other/DBrecordIn',
      method: 'get',
      params: token
    })
  },
  /**
   * 5.获取出库记录表格
   */
  getOutTable (token) {
    return request({
      url: '/other/DBrecordOut',
      method: 'get',
      params: token
    })
  },
}
