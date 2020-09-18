// views/like/index.js
import {
  httpCollectData
} from "../../api/user"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    page: 0,
    listData: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getData()
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
  onReachBottom() {
    let page = this.data.page
    this.setData({
      page: page++
    }, () => {
      this.getData()
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  getData() {
    wx.showLoading({
      title: '加载中...',
    })
    let {
      page,listData
    } = this.data
    httpCollectData(page).then((res) => {
      wx.hideLoading({
        success: (res) => {},
      })
      let {
        code,
        data
      } = res
      if (code === 0) {
        if (!data.Favlist) {
          wx.showToast({
            title: '还没有收藏',
            icon: "none"
          })
          return
        }
        this.setData({
          listData: listData.concat(data.Favlist)
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