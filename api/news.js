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


const httpNewsList= () => {
  return new Promise((resolve,reject) => {
    wx.request({
      url: 'https://www.fastmock.site/mock/51560081c48b3d7a64bceb48ad4d2ab9/api/api/list',
      method:"GET",
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