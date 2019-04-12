function savePost(post) {
  if (post.id) {
    wx.setStorageSync(String(post.id), post)
  } else {    
    let keys = wx.getStorageInfoSync().keys     
    if (keys.length == 0 ){
      keys = [0]
    }        
    post.id = parseInt(Math.max.apply(Math,keys)) + 1
    wx.setStorageSync(String(post.id), post)   }
}

function fetchPosts(id) {
  if (id) {
    return wx.getStorageSync(id)
  } else {        
    return wx.getStorageInfoSync().keys.map(function (key) {
      return  wx.getStorageSync(key)       
    })
  }
}

function deletePost(id) {
  wx.removeStorageSync(id)
}



module.exports = {
  fetchPosts: fetchPosts,
  savePost: savePost,
  deletePost: deletePost
}
