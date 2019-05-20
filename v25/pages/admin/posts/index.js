// pages/posts/index.js
const store = require("../../../utils/cloud.js")
const app = getApp();

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
      
 
      // here change
      let page = this
      
      if (pageNo >= 10 ) {
        wx.showToast({ //
          title: '最多显示10页，查找历史文章请使用搜索功能',
          icon: 'success',
          duration: 1000
        });
        return false;
      } else {
        wx.showLoading({
          title: '加载中',
          icon: 'loading',
        });
        setTimeout(() => {
          store.fetchPage('post', pageNo).then(
            res => {
              page.setData({ posts: (this.data.posts).concat(res.data) })
            }
          )   
          wx.hideLoading();
        }, 1000)
      }  
      
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
            store.deleteResource('post', posts[key]._id)
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
            return value._id != id
          })
          
          page.setData({ posts: posts})

        } else if (res.cancel) {
          console.log(page.route)
          //console.log('用户点击取消')
          
        }
      }
    })

  },

  
  doRefresh: function(post){
    if(!post){return }
    let posts = this.data.posts
    if (post._id) {
      let pos = posts.findIndex((element) => (element._id == post._id))
      if(pos>=0){
        posts[pos] = post
        this.setData({ posts: posts })
      }      
    } else {
      posts = [post].concat(posts)
      this.setData({ posts: posts })
    }     
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {    
    console.log(pageNo, options,"load...")    
    app.filter.mustLogin(app, this.route, true)
    pageNo = 0

    const page = this
    store.fetchPage('post', pageNo).then(
      res => {
        page.setData({ posts: res.data })
      }
    )    
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    console.log(pageNo, 'ready...')        
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {        
    let post = app.globalData.lastPost
    console.log(pageNo,  'show...')    
    this.doRefresh(post)    
    post = null
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