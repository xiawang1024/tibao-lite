// views/signDetail/index.js
// const dayjs = require("../../miniprogram_npm/dayjs/index")
import dayjs from "../../utils/dayjs"
import {httpSignInList} from "../../api/sign"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    info:{},
    currentTime:"",
    timeAgo:"00:00:00"
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const eventChannel = this.getOpenerEventChannel()
    if(Object.keys(eventChannel).length) {
      eventChannel.on("signInInfo",(data) => {      
        this.setData({
          info:data
        })
      })
    }    
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.getDataList()
    
    this.timer = setInterval(() => {
      
      this.timeInit()
    },1000)
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

  getDataList() {
    httpSignInList().then(res => {
      let {code,data} = res
      if(code === 0) {
        this.setData({
          listData:data.Meet
        })
      }
    })
  },
  timeInit() {
    let time = '2020-09-14 19:00:00'
    let currentTime = dayjs().format('YYYY-MM-DD HH:mm:ss') 
    let diff = dayjs(time).diff(dayjs())/1000 | 0
    this.setData({
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