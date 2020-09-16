// views/signDetail/index.js
// const dayjs = require("../../miniprogram_npm/dayjs/index")
import dayjs from "../../utils/dayjs"
import {httpSignInList,httpSignIn} from "../../api/sign"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    info:{},
    currentTime:"",
    timeAgo:"",
    isStart:false,
    isEnd:false,
    latitude:"",
    longitude:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad (options) {
    const eventChannel = this.getOpenerEventChannel()
    if(Object.keys(eventChannel).length) {
      eventChannel.on("signInInfo",(data) => {    
        this.endHandler(data.endtime).then(() => {          
          console.log('会议结束')
        }) 
        this.locationInit()    
        this.timer = setInterval(() => {      
          this.timeInit()
        },1000)   
        this.setData({
          info:data
        })
      })
    }    
  },

  endHandler(endTime) {
    let diff = dayjs(dayjs()).diff(dayjs(endTime))/1000 | 0
    return new Promise((resolve,reject) => {
      if(diff >0) {
        // 已经结束
        this.setData({
          isEnd:true
        })
        reject()
      }else {
        // 未结束才倒计时
        resolve()
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
    clearInterval(this.timer)
    wx.stopLocationUpdate({
      success: (res) => {},
    })
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
  signInHandler() {
    let {info,latitude,longitude} = this.data
    httpSignIn(info.itemid,latitude,longitude).then((res) => {
      console.log("签到结果")
      wx.showModal({
        title:res.message
      })
    })
  },
  locationInit() {
    wx.startLocationUpdate({
      success: (res) => {
        wx.onLocationChange((result) => {
          console.log(result)
          let {latitude,longitude} = result
          this.setData({
            latitude,
            longitude
          })
        })
      },
    })
  },
  timeInit() {
    let time = this.data.info.starttime
    // let time = "2020-09-14 18:00:00"
    let currentTime = dayjs().format('YYYY-MM-DD HH:mm:ss') 
    let diff = dayjs(time).diff(dayjs())/1000 | 0
    let isStart = false
    if(diff < 0) {
      isStart = true
    }
    this.setData({
      isStart,
      currentTime,
      timeAgo:this.formatSecond(diff)
    })

  },
  
  formatSecond(time) {
    const h = Math.floor((time/3600) % 24)
    const m = Math.floor((time/60) % 60)
    const s = Math.floor(time%60)
    
    if(h>0) {
      return `${this.padding0(h)}:${this.padding0(m)}:${this.padding0(s)}`
    }else if(m>0) {
      return `00:${this.padding0(m)}:${this.padding0(s)}`
    }else {
      return `00:00:${this.padding0(s)}`
    }
  },
  padding0(num,length=2){
    let len = num.toString().length
    while(len<length) {
      num = '0'+num
      len++
    }
    return num
  }
})