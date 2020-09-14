//app.js
import {httpAdmin} from "./api/user"
App({
  onLaunch () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    httpAdmin().then(() => {
      console.log('success')
    }).catch(() => {
      console.log('fail')
      wx.removeStorage({
        key: 'token-wechat',
      })
    })
  },
  globalData: {
    userInfo: null
  }
})