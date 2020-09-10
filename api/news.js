import baseUrl from '../config'
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

export {
  httpNewsTypes,
  httpNewsList
}