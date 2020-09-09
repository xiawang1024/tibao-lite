// views/index/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    schKey:'',
    tabs: [],
    activeTab_1: 0,
    activeTab_2: 1,
    activeTab_3: 0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const tabs = [
      {
        title: '技术开发',
      
      },
      {
        title: '产品解析',
       
      },
      {
        title: '运营规范',
        
      },
      {
        title: '营销经验',
       
      },
      {
        title: '高校大赛',
       
      },
      {
        title: '营销经验1',
       
      },
      {
        title: '高校大赛1',
       
      },
    ]
    this.setData({ tabs })
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
  schIptHandler(e){
    console.log(e)
    this.setData({
      schKey:e.detail.value
    })
  },
  schHandler() {
    wx.showToast({
      icon:"none",
      title: this.data.schKey,
    })
  },
  onTabClick_1(e){
    
    this.setData({
      activeTab_1:e.detail.index
    })
  },
  onTabClick_2(e){
    this.setData({
      activeTab_2:e.detail.index
    })
  },
  onTabClick_3(e){
    this.setData({
      activeTab_3:e.detail.index
    })
  },
  
})