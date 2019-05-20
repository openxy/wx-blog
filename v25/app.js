//app.js
const filter = require("utils/filter.js")
wx.cloud.init({
  traceUser: true
  //env: 'test-ygi5q'
})


App({
  onLaunch: function () {

  },
  db: wx.cloud.database(),
  filter: filter,
  globalData: {
    userInfo: null,
    lastPost: null,
    lastPage : null
  }
})