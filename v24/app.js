//app.js
const filter = require("utils/filter.js")

App({
  onLaunch: function () {
  },

  filter: filter,

  globalData: {
    userInfo: null,
    lastPost: null,
    lastPage : null
  }
})