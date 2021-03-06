// pages/center/index.js

import {httpAdmin} from '../../api/user'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isAdmin:false,
    num:'',
    name:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.getStorage({
      key: 'token-wechat',      
    }).then(res => {
      httpAdmin().then(res => {
        if(res.admin) {
          this.setData({
            isAdmin:true,
            num:res.num,
            name:res.name
          })
        }
      })
    }).catch(() => {
      console.log('no token')
      wx.showModal({        
        content:"请先登录",
        complete() {
          
          // let len = getCurrentPages().length
          // let current = getCurrentPages()[len-1].is
          // console.log(getCurrentPages())
          wx.redirectTo({
            url: `/pages/index/index?path=center`,
          })
        }
      })
    })
    
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
  goList() {
    wx.navigateTo({
      url: '/pages/myList/index',
    })
  },
  goIssuList() {
    wx.navigateTo({
      url: '/pages/adminList/index',
    })
  },
  goOutHandler() {
    wx.clearStorageSync()
    wx.redirectTo({
      url: '/pages/index/index',
    })
  },
  goCollect(){
    wx.navigateTo({
      url: '/views/like/index',
    })
  },
  goAbout() {
    wx.navigateTo({
      url: '/views/about/index',
    })
  }
})