// pages/posts/index.js
const store = require("../../utils/store.js")

Page({

  /**
   * 页面的初始数据
   */
  data: {
    posts:{},
    selection: []
  },
  
  doSelected:function(event){    
    let id = event.currentTarget.dataset.id

    let selection = this.data['selection']
    selection[id] = selection[id] ? null : 'line-through'  

    this.setData({ selection })
    //this.setData({ style: { [id]: 'line-through' }  })
    //console.log(this.data)    
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