// pages/posts/index.js
const store = require("../../utils/store.js")

Page({

  /**
   * 页面的初始数据
   */
  data: {
    posts:{},
    selection: [],
    batchMode:false
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
          console.log(posts)

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
    this.setData({ posts: store.fetchResource('post') } )
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