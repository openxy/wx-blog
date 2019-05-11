

function mustLogin(app,route,isTab=false){
  if(!app.globalData.userInfo){
    
    app.globalData.lastPage = [route,isTab]    
    wx.redirectTo({
      url: '/pages/home/me',
    })
  }
}

module.exports = {
  mustLogin: mustLogin
}