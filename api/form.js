import baseUrl from '../config'

// 获取（辖区、代表等）公共信息
const httpPublic = () => {
  return new Promise((resolve, reject) => {
    let token = wx.getStorageSync('token-wechat')
    wx.request({
      method: "POST",
      url: `${baseUrl}/user/public`,
      header: {
        "Authorization": `Bearer ${token}`
      },
      success(res) {
        let {
          code,
          data
        } = res.data
        if (code === 0) {
          resolve(data.Modules)
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

const httpIssue = ({name,idcard,address,phone,mid,username,catid,content}) => {
  let token = wx.getStorageSync('token-wechat')
  return new Promise((resolve,reject) => {
    wx.request({
      url: `${baseUrl}/user/issue`,
      method:"POST",
      header: {
        "Authorization": `Bearer ${token}`
      },
      data:{name,idcard,address,phone,mid,username,catid,content},
      success(res) {
        let {code,data} = res.data
        resolve(res.data)
      },
      fail() {
        reject()
      }
    })
  })  
}

export {
  httpPublic,
  httpIssue
}