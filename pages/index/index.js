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
    userInfo: {},
    hasUserInfo: false,
    redirectPath:""
  },
  
  onLoad: function (options) {
    console.log(options)
    this.setData({
      redirectPath:options.path
    })
  },

  onShow() {
    // this.autoLogin()
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
      let url = `/${this.data.redirectPath}` || "/views/index/index"
      wx.showToast({
        title: '登录成功',
        icon: 'loading',
        success() {
          setTimeout(() => {
            if(url.indexOf("center")>0){
              wx.switchTab({
                url: url,
              })
            }else {
              wx.navigateTo({
                url
              })
            }
           
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