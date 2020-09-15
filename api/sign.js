import baseUrl from '../config'

//会议签到列表
const httpSignInList = (page) => {
  return new Promise((resolve,reject) => {
    wx.request({
      url: `${baseUrl}/public/meet`,
      method:"POST",
      data:{
        page
      },
      success(res) {
        resolve(res.data)
      },
      fail() {
        reject()
      }
    })
  })
}

// 签到
const httpSignIn = (meetid,lat,lng) => {
  return new Promise((resolve,reject) => {
    wx.request({
      url: `${baseUrl}/public/sign`,
      method:"POST",
      data:{
        meetid,
        lat,
        lng
      },
      success(res) {
        resolve(res.data)
      },
      fail(){
        reject()
      }
    })
  })
}
export {
  httpSignInList,
  httpSignIn
}