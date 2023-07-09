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
    checkOldById(param) {
        return request({
            url: '/manage/checkOldById/',
            method: 'get',
            params: {
               id:param
            }
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
    /**-----------------------------------------------------------------**/
    /**
     * 1.增加工作人员信息
     * @param {*} param
     * @returns
     */
    addEmployee (param) {
        return request({
            url: '/manage/addEmployee/',
            method: 'post',
            data: param
        })
    },

    /**
     * 2.更新工作人员信息
     * @param {*} data
     * @returns
     */
    updateEmployee(data) {
        return request({
            url: '/manage/updateEmployee/',
            method: 'put',
            data: data
        })
    },

    /**
     * 3.工作人员离职办理
     * @param {*} data
     * @returns
     */
    resignEmployee(data) {
        return request({
            url: '/manage/resignEmployee/',
            method: 'put',
            data: data
        })
    },

    /**
     * 4.根据id查询工作人员信息
     * @param {*} param
     * @returns
     */
    checkEmployeeById(param) {
        return request({
            url: '/manage/checkEmployeeById/',
            method: 'get',
            params: {
                id:param
            }
        })
    },

    /**
     * 5.获取所有工作人员信息
     * @param {*} param
     * @returns
     */
    getEmployeeList(data) {
        return request({
            url: '/manage/getEmployeeList/',
            method: 'get'
        })
    },
    /**-----------------------------------------------------------------**/
    /**
     * 1.增加义工信息
     * @param {*} param
     * @returns
     */
    addVolunteer (param) {
        return request({
            url: '/manage/addVolunteer/',
            method: 'post',
            data: param
        })
    },

    /**
     * 2.更新义工信息
     * @param {*} data
     * @returns
     */
    updateVolunteer(data) {
        return request({
            url: '/manage/updateVolunteer/',
            method: 'put',
            data: data
        })
    },

    /**
     * 3.办理义工签出
     * @param {*} data
     * @returns
     */
    checkoutVolunteer(data) {
        return request({
            url: '/manage/checkoutVolunteer/',
            method: 'put',
            data: data
        })
    },

    /**
     * 4.根据id查询义工信息
     * @param {*} param
     * @returns
     */
    checkVolunteerById(param) {
        return request({
            url: '/manage/checkVolunteerById/',
            method: 'get',
            params: {
                id:param
            }
        })
    },

    /**
     * 5.获取所有义工信息
     * @param {*} param
     * @returns
     */
    getVolunteerList(data) {
        return request({
            url: '/manage/getVolunteerList/',
            method: 'get'
        })
    },
}
