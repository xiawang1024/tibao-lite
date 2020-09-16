//index.js
//获取应用实例
import {
  httpLogin,
  httpGetPhone
} from '../../api/login'
import {httpAdmin} from "../../api/user"
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

              httpAdmin().then(res => {
                wx.setStorage({
                  data: res,
                  key: 'admin',
                })
              })
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
      // let url = `/${this.data.redirectPath}` || "/views/index/index"
      let url = ""

      let {redirectPath} = this.data
      if(redirectPath === "center") {
        url = "/pages/center/index"
      }else if(redirectPath === "sign"){
        url = "/views/signIn/index"
      }else if(redirectPath === "form"){
        url = "/pages/form/index"
      }else {
        url = "/views/index/index"
      }
      wx.showToast({
        title: '登录成功',
        icon: 'loading',
        success() {
          setTimeout(() => {
            if(redirectPath==="center" || redirectPath === "sign"){
              wx.switchTab({
                url: url,
              })
            }else if(redirectPath === "form") {
              wx.navigateTo({
                url
              })
            }else {
              wx.switchTab({
                url: '/views/index/index',
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