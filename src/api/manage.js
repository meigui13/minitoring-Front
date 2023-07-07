import request from '@/requestAndSecurity/request'

export default {
    /**
     * 1.增加老人信息
     * @param {*} param
     * @returns
     */
    addOld (param) {
        return request({
            url: '/manage/addOld/',
            method: 'post',
            data: param
        })
    },

    /**
     * 2.更新老人信息
     * @param {*} data
     * @returns
     */
    updateOld(data) {
        return request({
            url: '/manage/updateOld/',
            method: 'put',
            data: data
        })
    },

    /**
     * 3.老人出院办理
     * @param {*} data
     * @returns
     */
    checkoutOld(data) {
        return request({
            url: '/manage/checkoutOld/',
            method: 'put',
            data: data
        })
    },

    /**
     * 4.根据id查询老人信息
     * @param {*} param
     * @returns
     */
    checkOldById(data) {
        return request({
            url: '/manage/checkOldById/',
            method: 'get'
        })
    },

    /**
     * 5.获取所有老人信息
     * @param {*} param
     * @returns
     */
    getOldList(data) {
        return request({
            url: '/manage/getOldList/',
            method: 'get'
        })
    },
}
