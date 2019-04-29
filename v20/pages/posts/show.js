// pages/posts/show.js
const store = require("../../utils/store.js")


let touchBeginX = 0  //触摸的起点
let time = 0   //触摸持续时间
let current_id = 0  //当前博文id

Page({

  /**
   * 页面的初始数据
   */
  data: {
    post:{}
  },

  // 触摸开始事件
  touchStart: function (e) {    
    touchBeginX = e.touches[0].clientX; // 获取触摸时的起点
    time = e.timeStamp    
  },

  // 触摸结束事件
  touchEnd: function (e) {        
    var touchEndX = e.changedTouches[0].clientX;
    time = e.timeStamp - time    
    // 向右滑动
    if (touchEndX - touchBeginX <= -40 && time < 1000 ) {      
      console.log("下一页");      
      wx.navigateTo({
        url: './show?id=' + (current_id + 1)
      })
    }
    
    // 向左滑动   
    if (touchEndX - touchBeginX >= 40 && time < 1000 ) {            
      console.log("上一页");
      wx.navigateTo({
        url: './show?id='  + (current_id - 1)
      })
    }
    
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {   

    current_id = parseInt(options['id'] )
    let post = store.fetchResource('post', current_id) 
     
    this.setData({
      post: post
    })

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {    
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})