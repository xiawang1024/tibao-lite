// components/banner/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    bannerData:Array
  },

  /**
   * 组件的初始数据
   */
  data: {
    background: ['demo1', 'demo2', 'demo3','demo4'],
  },

  /**
   * 组件的方法列表
   */
  methods: {
    goToDetail(e){
      let {itemid} = e.currentTarget.dataset
      wx.navigateTo({
        url: `/views/detail/index?itemid=${itemid}`,
      })
    }
  }
})
