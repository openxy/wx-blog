function getRealKey(type,id) {
  return type + '_' + String(id)
}

function getId(key) {
  let [theType, theId] = key.split('_')
  return parseInt(theId)
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
  return wx.getStorageSync(getRealKey(type,id))  
}

function fetchCollection(type) {
    return getKeys(type).map(function (key) {
      return wx.getStorageSync(key)
    })
}

function deleteResource(type,id) {
  wx.removeStorageSync(getRealKey(type,id))
}

function getKeys(type) {
  return wx.getStorageInfoSync().keys.filter(function (value, key) {
    let [theType, theId] = value.split('_')
    return theType == type
  })
}


// 循环给出结果
const maxId = 99999
function getNextId(type, id, isPre = false) {
  let keys = getKeys(type)
  let firstId = getId(keys[0])
  let lastId = getId(keys[keys.length - 1])
  
  if (isPre) {
    if (id <= firstId || id > lastId) {
      return lastId
    }
  } else {
    if (id < firstId || id >= lastId) {
      return firstId
    }
  }

  let maxDistance = isPre ? maxId * -1 : maxId 
  let distance = maxDistance 
  
  keys.forEach(function (value, key) {    
    let theId = getId(value) 
    let tmp = (theId - id)
    if(  (!isPre && tmp > 0 && tmp < distance) || (isPre && tmp < 0 && tmp > distance)  ) {
      distance = tmp
    }
  });

  return distance == maxDistance ? id : (id + distance)
}

function fetchPage(type, pageNo = 0, size = 5) {
  let keys = getKeys(type).reverse()
  let maxNo = Math.ceil(keys.length / 3) - 1
  if (pageNo > maxNo){
    return []
  }else if(pageNo<0){
    pageNo = 0
  }

  let offset = pageNo * size  

  let collection = keys.slice(offset, offset + size).map(function (key) {
    return wx.getStorageSync(key)
  })

  return collection
}

module.exports = {
  fetchResource: fetchResource,
  fetchCollection: fetchCollection,
  saveResource: saveResource,
  deleteResource: deleteResource,
  fetchPage: fetchPage,
  getNextId: getNextId
}
