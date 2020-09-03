// components/nav/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    tabIdx:'0'
  },

  /**
   * 组件的方法列表
   */
  methods: {
    routerHandler(e) {
      
      let { type } = e.target.dataset
     
      let url = ''
      if(type === '0'){
        url = '/pages/form/index'
      }else {
        url = '/pages/center/index'
      }
     
      wx.redirectTo({
        url
      })
    }
  },
  lifetimes: {
    attached() {
      console.log('comming')           
      let len = getCurrentPages().length 
      let {route} = getCurrentPages()[len-1]
      
      if(route === 'pages/form/index') {
        this.setData({
          tabIdx:'0'
        })
      }else {
        this.setData({
          tabIdx:'1'
        })
      }
      // 在组件实例进入页面节点树时执行
    },
    detached: function() {
      // 在组件实例被从页面节点树移除时执行
    },
  },
})
