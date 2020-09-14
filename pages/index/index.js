//index.js
//获取应用实例
const app = getApp()
import {
  httpLogin,
  httpGetPhone
} from '../../api/login'
// import {httpPublic} from '../../api/form'
Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
   
  },

  onShow() {
    this.autoLogin()
  },

  autoLogin() {
    let token = wx.getStorageSync('token-wechat')
    if(!token) {
      return false
    }
    // httpPublic().then(res => {      
    //   wx.setStorage({
    //     data: res,
    //     key: 'areaArr',
    //   })   
    //   wx.showLoading({
    //     title: '自动登录中...',
    //     icon:'loading',
    //     success() {
    //       wx.navigateTo({
    //         url: '/pages/form/index',
    //       }) 
    //     }
    //   }) 
      
    // }).catch(() => {
    //   wx.showModal({
    //     title:'提示',
    //     content:'登录已过期，请重新登录'
    //   })
    // })    
  },

  // 登录 get token
  loginHandler() {
    return new Promise((resolve,reject) => {
      wx.login({
        success(res) {
          if (res.code) {
            httpLogin(res.code).then((res) => {
              resolve(res)
            })
          } else {
            console.log('登录失败')
            reject()
          }
        }
      })
    })
    
  },

  //获取手机号
  async getPhoneNumber(e) {
    
    let {errMsg,encryptedData,iv} = e.detail
    if(errMsg === "getPhoneNumber:ok") {
      let loginInfo = await this.loginHandler()
      if(!loginInfo.mobile) {
        await httpGetPhone(encryptedData,iv)
      }
      wx.showToast({
        title: '登录成功',
        icon: 'loading',
        success() {
          setTimeout(() => {
            wx.redirectTo({
              url: '/pages/form/index',
            })
          }, 300)
        }
      })
    }else {
      wx.showModal({
        title:'提示',
        content:'请点击允许获取手机号进行授权登录'
      })
      
    }
  }

})