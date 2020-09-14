import baseUrl from '../config'

//会议签到列表
const httpSignInList = () => {
  return new Promise((resolve,reject) => {
    wx.request({
      url: `${baseUrl}/public/meet`,
      method:"POST",
      success(res) {
        resolve(res.data)
      },
      fail() {
        reject()
      }
    })
  })
}

export {
  httpSignInList
}