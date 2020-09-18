// pages/editTel/index.js
import {httpGetPhoneCode,httpIsCode} from "../../api/form"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isSend:false,
    timeAgo:'',
    originMobile:wx.getStorageSync('mobile'),
    newMobile:'',
    code:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  backHandler() {
    wx.navigateBack({
      delta: 1,
    })
  },
  codeSendHandler() {
    let {newMobile} = this.data
    if(!newMobile) {
      wx.showToast({
        title: '请输入正确手机号',
        icon:"none"
      })
      return 
    }
    httpGetPhoneCode(newMobile).then(res => {
      if(res.code === 0) {
        wx.showToast({
          title: '发送成功',
          icon:"none"
        })
        this.timeAgoHandler()
      }else{
        wx.showToast({
          title: res.message,
          icon:"none"
        })
      }
    })
    // wx.showModal({
    //   cancelColor: 'cancelColor',
    // })
  },
  timeAgoHandler() {
    this.setData({
      isSend:true
    })
    let time = 60
    let timer = setInterval(() => {
      if(time === 0) {
        clearInterval(timer)
        this.setData({
          timeAgo:'',
          isSend:false
        })
      }      
      this.setData({
        timeAgo:`${time} s`
      })
      time--;        
    },1000)
  },
  phoneIptHandler(e){
    this.setData({
      newMobile:e.detail.value
    })
  },
  codeIptHandler(e) {
    this.setData({
      code:e.detail.value
    })
  },
  yesHandler() {
    let {code } = this.data
    httpIsCode(code).then(res => {
      let {code,data} = res
      if(code === 0) {
        if(data.same) {
          wx.setStorageSync('newMobile', this.data.newMobile)
          wx.setStorage({
            data: code,
            key: 'code',
          })
        }else {
          wx.showToast({
            title: '验证码错误',
            icon:"none"
          })
        }
      }else {
        wx.showToast({
          title: '参数错误',
          icon:"none"
        })
      }
    })
  }
})