// views/sch/index.js

import {
  httpNewsSch
} from "../../api/news"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    kw: "",
    page:0,
    listData:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    let {
      kw
    } = options

    if(kw){
      this.setData({
        kw
      },() => {
        this.getData()
      })
    }    
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
    let {page} = this.data
    this.setData({
      page:page++
    },() => {
      this.getData()
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  schIptHandler(e) {
    this.setData({
      kw: e.detail.value
    })
  },
  schHandler() {
    this.getData()
  },
  getData() {
    let {kw,page} = this.data
    httpNewsSch(kw,page).then(res => {
      let {code,data} = res
      if(code ===0) {
        if(data.Search&&data.Search.length===0) {
          wx.showToast({
            title: '没有结果',
            icon:"none"
          })
          return 
        }
        this.setData({
          listData:data.Search
        })
      }
    })
  },
  goToDetail(e) {
    let {
      itemid
    } = e.currentTarget.dataset

    wx.navigateTo({
      url: `/views/detail/index?itemid=${itemid}`,
    })

  }
})