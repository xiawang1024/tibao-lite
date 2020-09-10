// views/index/index.js

import {
  httpNewsTypes,
  httpNewsList
} from '../../api/news'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    schKey: '',
    pageNo:2,
    tabs_1:[],
    tabs_2:[],
    tabs_3:[],
    activeTab_1: 0,
    activeTab_2: 0,
    activeTab_3: 0,
    listData: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
   
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady () {
    this.getNewsTypes().then(() => {
      this.getNewsData()
    })    
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
  onPullDownRefresh () {
    let pageNo = this.data.pageNo
    this.setData({
      pageNo:1
    },() => {
      this.getNewsData(0)
    })
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {
    let pageNo = this.data.pageNo
    this.setData({
      pageNo:pageNo++
    },() => {
      this.getNewsData()
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  schIptHandler(e) {
    console.log(e)
    this.setData({
      schKey: e.detail.value
    })
  },
  schHandler() {
    wx.showToast({
      icon: "none",
      title: this.data.schKey,
    })
  },
  onTabClick_1(e) {
    let idx = e.detail.index
    let {tabs_1,activeTab_2} = this.data
    let tabs_2 = []
    let tabs_3 = []
    if(tabs_1[idx].subcate && tabs_1[idx].subcate.length>0){
      tabs_2 = tabs_1[idx].subcate

      if(tabs_2[activeTab_2].subcate && tabs_2[activeTab_2].subcate.length > 0) {
        tabs_3 = tabs_2[activeTab_2].subcate
      }
    }

    
    this.setData({
      activeTab_1: idx,
      tabs_2,
      tabs_3
    },() => {
      this.getNewsData()
    })
  },
  onTabClick_2(e) {
    let idx = e.detail.index
    let tabs_2 = this.data.tabs_2
    let tabs_3 = []
    if(tabs_2[idx].subcate && tabs_2[idx].subcate.length>0){
      tabs_3 = tabs_2[idx].subcate
    }
    this.setData({
      activeTab_2: idx,
      tabs_3
    },() => {
      this.getNewsData()
    })    
  },
  onTabClick_3(e) {
    let idx = e.detail.index
    this.setData({
      activeTab_3: idx
    },() => {
      this.getNewsData()
    })
  },

  getNewsTypes(){
    return new Promise((resolve,reject) => {
      httpNewsTypes().then(res => {
        let {code,data} = res
        if(code === 0) {
          this.setData({
            tabs_1:data.categories
          })
          
          this.flatTabTypes(data.categories[0])
          resolve()
        }else {
          reject()
        }
      })
    })
    
  },

  flatTabTypes(tabs_1) {
    let tabs_2 = []
    let tabs_3 = []
    if(tabs_1.subcate && tabs_1.subcate.length>0) {
      tabs_2 = tabs_1.subcate

      if(tabs_2.subcate && tabs_2.subcate.length>0){
        tabs_3 = tabs_2.subcate
      }
    }

    this.setData({
      tabs_2,
      tabs_3
    })
  },

  getNewsData(type=1) {
    //type 0:下拉   1：上拉
    let {tabs_1,tabs_2,tabs_3,activeTab_1,activeTab_2,activeTab_3,pageNo} = this.data
    let catid = ''
    console.log(tabs_3.length,activeTab_3)
    if(tabs_3.length>0){
      catid = tabs_3[activeTab_3].catid
    }else if(tabs_2.length>0) {
      catid = tabs_2[activeTab_2].catid
    }else {
      catid = tabs_1[activeTab_1].catid
    }

    console.log(catid)
    wx.showLoading({
      title: '努力加载中...',
    })
    wx.showNavigationBarLoading({
      success: (res) => {},
    })
    let originListData = this.data.listData
    if(type === 0) {
      originListData = []
    }
    httpNewsList(catid,pageNo).then(res => {
      wx.hideLoading()
      wx.hideNavigationBarLoading({
        success: (res) => {},
      })
      if(type ===0){
        wx.stopPullDownRefresh({
          success: (res) => {},
        })
      }
      this.setData({
        listData: originListData.concat(res.data.list)
      })
    })
  },

  goToDetail(e){
    wx.navigateTo({
      url: '/views/detail/index',
    })

  }
})