import baseUrl from '../config'

// code 换取 token
const httpLogin = (code) => {
  return new Promise((resolve, reject) => {
    wx.request({
      url: `${baseUrl}/user/login`,
      method: "POST",
      data: {
        code
      },
      success(res) {
        let {
          code,
          data
        } = res.data
        if (code === 0) {
          wx.setStorageSync('token-wechat', data.token)
          if(data.mobile) {
            wx.setStorageSync('mobile', data.mobile)
          }
          resolve(data)
        } else {
          reject()
        }
      },
      fail() {
        reject()
      }
    })
  })
}

// 获取微信绑定手机号
const httpGetPhone = (ed, iv) => {

  let token = wx.getStorageSync('token-wechat')
  console.log(token)
  return new Promise((resolve, reject) => {
    wx.request({
      url: `${baseUrl}/user/mobile`,
      method: "POST",
      header: {
        "Authorization": `Bearer ${token}`
      },
      data: {
        ed,
        iv
      },
      success(res) {
        console.log(res)
        
        let {
          code,
          data
        } = res.data
        if (code === 0) {
          wx.setStorageSync('mobile', data.mobile)
         
          resolve()
        }else{
          reject()
        }

      },
      fail() {
        reject()
      }
    })
  })
}

export {
  httpLogin,
  httpGetPhone
}