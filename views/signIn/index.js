// views/signIn/index.js
import {httpSignInList} from "../../api/sign"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    pageNo:0,
    listData:[]
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
    this.getDataList()
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
  onPullDownRefresh() {
    this.setData({
      pageNo:0
    },() => {
      this.getDataList(0)
    })
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom () {
    let {pageNo} = this.data
    this.setData({
      pageNo:pageNo++
    },() => {
      this.getDataList()
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  getDataList(type=1) {
    wx.showLoading({
      title: '努力加载...',
    })
    // type 0:下拉  1：上拉
    let {listData,pageNo} = this.data
    if(type === 0) {
      listData = []
    }
    httpSignInList(pageNo).then(res => {

      wx.hideLoading({
        success: (res) => {},
      })
      if(type ===0){
        wx.stopPullDownRefresh({
          success: (res) => {},
        })
      }
      let {code,data} = res
      if(code === 0) {
        this.setData({
          listData:listData.concat(data.Meet)
        })
      }
    })
  },

  goToDetail(e) {
    let {info} = e.currentTarget.dataset
    wx.navigateTo({
      url: '/views/signDetail/index',
      success: function(res) {
        // 通过eventChannel向被打开页面传送数据
        res.eventChannel.emit('signInInfo', info)
      }
    })
  }
})