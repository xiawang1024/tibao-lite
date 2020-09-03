// pages/myList/index.js
import {
  httpIssueList
} from '../../api/user'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    listData:[
      
    ]
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
    this.getListData()
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
  goDetail(e) {
    let {mid,itemid} = e.target.dataset
    wx.navigateTo({
      url: `/pages/detail/index?mid=${mid}&itemid=${itemid}`,
    })
  },
  getListData() {
    httpIssueList().then(res => {
      this.setData({
        listData:res.Lists
      })
    })
  }
})