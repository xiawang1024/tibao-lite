// pages/detail/index.js
import {httpIssueDetail,httpIssueDeal} from '../../api/user'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    mid:'',
    itemid:'',
    status:'',
    issueData:{},
    items: [
      {value: '2', name: '处理中'},
      {value: '3', name: '已完成'},
      {value: '1', name: '其它'},      
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let {mid,itemid} = options
    this.getDetail(mid,itemid)
    this.setData({
      mid,itemid
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
  backList() {
    wx.navigateBack({
      delta: 0,
    })    
  },
  getDetail(mid,itemid) {
    httpIssueDetail(mid,itemid).then(res => {
      this.setData({
        issueData:res
      })
    })
  },
  radioChange(e){
    this.setData({
      status:e.detail.value
    })
  },
  submitHandler() {
    let {mid,itemid,status} = this.data
    wx.showLoading({
      title: '提交中...',
    })
    httpIssueDeal({mid,itemid,status}).then( () => {
      wx.hideLoading({
        success: (res) => {
          wx.showToast({
            title: '提交成功',
          })
        },
      })
    })
  }
})