//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    inputValue : '',
    todoList : [
      {
        tagName:'默认',
        list: []
      }
    ]
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  changeText: function(e){
    this.setData({
      motto : "Hello SimpleTodo"
    })
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  submitNew : function(e){
    console.log( e.detail.value );
  },
  addTodo: function(e){
    var inputValue = this.data.inputValue;
    var tag;
    var currentList;
    if( inputValue.indexOf('#') > 0 ){
      tag = inputValue.substring(inputValue.indexOf('#')+1, inputValue.length);
      inputValue = inputValue.substring(0, inputValue.indexOf('#'));
    }
    if( !tag ){
      currentList = this.data.todoList[0].list;
    }else{
      this.data.todoList.forEach((item) => {
        if ( item.tagName == tag ){
          currentList = item.list;
        }
      })
      if( !currentList ){
        currentList = [];
        this.data.todoList.push({
          tagName : tag,
          list : currentList
        });
        
      }
    }
    
    currentList.push({ content: inputValue});
    this.setData({
      todoList : this.data.todoList
    })
  },
  onInput : function(e){
    this.setData({
      inputValue : e.detail.value
    })
  }
})

