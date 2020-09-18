// views/detail/index.js
import {httpNewsData} from "../../api/news"
import {httpCollect,httpCollectQuery} from "../../api/user"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    htmlString:'',
    editor:"",
    datetime:"",
    isCollect:false,
    itemid:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    let {itemid} = options
    this.setData({
      itemid
    })
    this.getData(itemid||1)

    httpCollectQuery(itemid).then(res => {
      let {code,data} = res
      if(code === 0) {
        this.setData({
          isCollect:data.saved
        })
      }
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
  getData(itemid){
    httpNewsData(itemid).then(res =>{
      let {code,data} = res
      if(code === 0) {
        let {title,content,datetime,editor} = data.Detail
        wx.setNavigationBarTitle({
          title
        })
        this.setData({
          htmlString:content,
          datetime,
          editor
        })
      }
    })
  },
  collectHandler(){
    let itemid = this.data.itemid
    httpCollect(itemid).then(res => {
      let {code ,data} =res
      if(code ===0){
        this.setData({
          isCollect:data.saved
        })
        if(data.saved) {
          wx.showToast({
            title: '收藏成功',
            icon:"none"
          })
        }else {
          wx.showToast({
            title: '取消收藏',
            icon:"none"
          })
        }
      }else {
        wx.showToast({
          title: res.message,
          icon:"none"
        })
      }
    })
  }
})