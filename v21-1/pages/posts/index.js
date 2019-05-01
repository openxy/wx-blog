// pages/posts/index.js
const store = require("../../utils/store.js")

let touchBeginY = 0  //触摸的起点
let time = 0   //触摸持续时间
let pageNo = 0  //当前页号

Page({

  /**
   * 页面的初始数据
   */
  data: {
    posts:{},
    selection: [],
    batchMode:false
  },
  
  // 触摸开始事件
  touchStart: function (e) {
    touchBeginY = e.touches[0].clientY; // 获取触摸时的起点
    time = e.timeStamp
  },

  // 触摸结束事件
  touchEnd: function (e) {
    var touchEndY = e.changedTouches[0].clientY;
    time = e.timeStamp - time
    // 向下滑动
    if (touchEndY - touchBeginY <= -40 && time < 1000) {
      console.log("下一页", pageNo);      
      pageNo += 1
      let posts = (this.data.posts).concat(store.fetchPage('post',pageNo))      
      this.setData({ posts  })
      
    }
  },


  doSelected:function(event){    
    let id = event.currentTarget.dataset.id

    let selection = this.data['selection']
    selection[id] = selection[id] ? null : 'line-through'  

    let batchMode =  false
    for (let i = 0; i < selection.length; i++) {      
      if (selection[i]) {
        batchMode = true
        break
      }
    }    
    
    this.setData({ selection,batchMode })    
    //console.log(selection)
  },

  doBatch: function (event) {
    let selection = this.data['selection']
    let posts = this.data.posts
    let page = this
  
    wx.showModal({
      title: '警告',
      content: '删除后将无法恢复？请确认是否继续',
      success(res) {
        if (res.confirm) {
          selection.forEach(function (value, key) {
            store.deleteResource('post', posts[key].id)
          })           

          posts = posts.filter(function (value, key) {
            return !selection[key]
          })          

          page.setData({ posts: posts, selection: [], batchMode: false })          

        } else if (res.cancel) {
          console.log(page.route)
        }
      }
    })

  },

  doCancel: function (event) {
    this.setData({ selection:[], batchMode:false })    
  },

  doAction: function (event) {
    const actions = [this.editPost,this.deletePost]    
  
    let id = event.currentTarget.dataset.id
    wx.showActionSheet({
      itemList: ['编辑', '删除'],
      success: function (res) {
        if (!res.cancel) {
          actions[res.tapIndex](id)
        }
      }
    });
  },

  editPost(id) {    
    wx.navigateTo({
      url: 'edit?id=' + id 
    })
  },

  deletePost(id) {    
    let page = this
    wx.showModal({
      title: '警告',
      content: '删除后将无法恢复？请确认是否继续',
      success(res) {
        if (res.confirm) {
          store.deleteResource('post', id)          
          
          let posts = page.data.posts.filter(function(value,key){
            return value.id != id
          })
          
          page.setData({ posts: posts})

        } else if (res.cancel) {
          console.log(page.route)
          //console.log('用户点击取消')
          
        }
      }
    })

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(pageNo)
    pageNo = 0
    this.setData({ posts: store.fetchPage('post',pageNo) } )
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