import baseUrl from '../config'

//资讯导航
const httpNewsTypes = () => {
  return new Promise((resolve,reject) => {
    wx.request({
      url: `${baseUrl}/public/category`,
      method:"GET",
      success(res) {
        resolve(res.data)
      },
      fail(){
        reject()
      }
    })
  })
}

// 资讯列表
const httpNewsList= (catid,page) => {
  return new Promise((resolve,reject) => {
    wx.request({
      url: `${baseUrl}/public/list`,
      method:"POST",
      data:{
        catid,
        page
      },
      success:(res) => {
        resolve(res.data)
      },
      fail() {
        reject()
      }
    })
  })
}
//获取正文
const httpNewsData = (itemid) => {
  return new Promise((resolve,reject) => {
    wx.request({
      url: `${baseUrl}/public/detail`,
      method:"POST",
      data:{
        itemid
      },
      success(res){
        resolve(res.data)
      },
      fail() {
        reject()
      }
    })
  })
}

export {
  httpNewsTypes,
  httpNewsList,
  httpNewsData
}