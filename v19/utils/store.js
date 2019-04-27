function getRealKey(type,id) {
  return type + '_' + String(id)
}

function getLastId(type,resource) {
  let keys = wx.getStorageInfoSync().keys

  let lastId = 0
  keys.forEach(function(value,key){
    let [theType,theId] = value.split('_')
    theId = parseInt(theId)
    if(theType == type && theId > lastId){
      lastId =  theId
    }
  });

  return lastId + 1
}

function saveResource(type,resource) {
  if (!resource.id) {
    resource.id = getLastId(type,resource)
  }
  wx.setStorageSync(getRealKey(type,resource.id), resource)
}

function fetchResource(type,id) {
  if (id) {
    return wx.getStorageSync(getRealKey(type,id))
  } else {
    return wx.getStorageInfoSync().keys.filter(function (value,key) {
      let [theType,theId] = value.split('_')
      return theType == type
    }).map(function(key){
      return  wx.getStorageSync(key)
    })
  }
}

function deleteResource(type,id) {
  wx.removeStorageSync(getRealKey(type,id))
}

module.exports = {
  fetchResource: fetchResource,
  saveResource: saveResource,
  deleteResource: deleteResource
}
