// pages/form/index.js
import {
  httpPublic,httpIssue
} from '../../api/form'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    name: '',
    idcard: '',
    address: '',
    phone:'',
    areaArr: [],
    userArr: [],
    eventArr: [],
    areaIdx: -1,
    userIdx: -1,
    eventIdx: -1,
    content:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    wx.getStorage({
      key: 'token-wechat',      
    }).then(res => {
      console.log(res)
    }).catch(() => {
      console.log('no token')
      wx.showModal({        
        content:"请先登录",
        complete() {
          // let len = getCurrentPages().length
          // let current = getCurrentPages()[len-1].is
          wx.redirectTo({
            url: `/pages/index/index?path=form`,
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
    this.setData({
      phone:wx.getStorageSync('newMobile') || wx.getStorageSync('mobile')
    })
    this.getPublicData()
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
  bindPickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index: e.detail.value
    })
  },
  editPhone() {
    wx.navigateTo({
      url: '/pages/editTel/index',
    })
  },

  getPublicData() {
    httpPublic().then(res => {
      console.log(res)
      this.setData({
        areaArr: res
      })
    })
  },
  areaPickChange(e) {
    let idx = e.detail.value
    this.linkAreaPick(idx)
    this.setData({
      areaIdx: idx
    })
  },
  linkAreaPick(idx) {
    let areaArr = this.data.areaArr
    this.setData({
      userArr: areaArr[idx].admins,
      eventArr: areaArr[idx].categories
    })
  },
  userPickChange(e) {
    let idx = e.detail.value
    this.setData({
      userIdx: idx
    })
  },
  eventPickChange(e) {

    let idx = e.detail.value
    this.setData({
      eventIdx: idx
    })
  },
  isSelectHandler() {
    if (this.data.areaIdx == -1) {
      wx.showToast({
        title: '请先选择所在辖区',
        icon: 'none',
      })
    }
    return false
  },

  nameIptHandler(e){    
    this.setData({
      name:e.detail.value
    })
  },
  idcardIptHandler(e){    
    this.setData({
      idcard:e.detail.value
    })
  },
  addressIptHandler(e){    
    this.setData({
      address:e.detail.value
    })
  },
  phoneIptHandler(e){    
    this.setData({
      phone:e.detail.value
    })
  },

  contentIptHandler(e){    
    this.setData({
      content:e.detail.value
    })
  },

  submitHandler() {    
    let {name,idcard,address,phone,areaIdx,userIdx,eventIdx,content,areaArr,userArr,eventArr} = this.data
    if(!name||!idcard||!address||!phone||!areaIdx||!userIdx||!eventIdx||!content) {
      wx.showToast({
        title: '请填写必填信息',
        icon:'none'
      })
      return 
    }
    let mid = areaArr[areaIdx]&&areaArr[areaIdx].id
    let username = userIdx === -1 ? '' : userArr[userIdx].username 
    let catid = eventArr[eventIdx]&& eventArr[eventIdx].catid
    console.log(mid)

    let code = wx.getStorageSync('code') || ''
    httpIssue({name,idcard,address,phone,mid,username,catid,content,code}).then((res) => {
      wx.removeStorage({
        key: 'newMobile',
      })
      wx.removeStorage({
        key: 'code',
      })
      if(res.data === 0) {
        wx.showModal({
          title:'提示',
          content:res.message
        })
        return 
      }
      
      wx.showToast({
        title: '提交成功',
        icon:'none',
        success() {
          
          wx.navigateTo({
            url: '/pages/myList/index',
          })
         
        }
      })
    })
  }
})