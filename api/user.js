import baseUrl from '../config'

//获取提议列表
const httpIssueList = () => {
  return new Promise((resolve, reject) => {
    let token = wx.getStorageSync('token-wechat')
    wx.request({
      url: `${baseUrl}/user/list`,
      method: "GET",
      header: {
        "Authorization": `Bearer ${token}`
      },
      success(res) {
        let {
          code,
          data
        } = res.data
        if (code === 0) {
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
// 获取详情
const httpIssueDetail = (mid, itemid) => {
  return new Promise((resolve, reject) => {
    let token = wx.getStorageSync('token-wechat')
    wx.request({
      url: `${baseUrl}/user/detail`,
      method: 'POST',
      header: {
        "Authorization": `Bearer ${token}`
      },
      data: {
        mid,
        itemid
      },
      success(res) {
        let {
          code,
          data
        } = res.data
        if (code === 0) {
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
// 判断是否管理员
const httpAdmin = () => {
  return new Promise((resolve, reject) => {
    let token = wx.getStorageSync('token-wechat')
    wx.request({
      url: `${baseUrl}/user/my`,
      method: 'POST',
      header: {
        "Authorization": `Bearer ${token}`
      },
      success(res) {
        let {
          code,
          data
        } = res.data
        if (code === 0) {
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

// 管理员列表
const httpAdminList = () => {
  return new Promise((resolve, reject) => {
    let token = wx.getStorageSync('token-wechat')
    wx.request({
      url: `${baseUrl}/user/issue-list`,
      method: 'POST',
      header: {
        "Authorization": `Bearer ${token}`
      },
      success(res) {
        let {
          code,
          data
        } = res.data
        if (code === 0) {
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
//处理提议
const httpIssueDeal = ({mid,itemid,status}) => {
  return new Promise((resolve,reject)=>{
    let token = wx.getStorageSync('token-wechat')
    wx.request({
      url: `${baseUrl}/user/deal`,
      method: 'POST',
      header: {
        "Authorization": `Bearer ${token}`
      },
      data:{
        mid,
        itemid,
        status
      },
      success(res) {
        let {
          code,
          data
        } = res.data
        if (code === 0) {
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



export {
  httpIssueList,
  httpIssueDetail,
  httpAdmin,
  httpAdminList,
  httpIssueDeal
}