let db
function getDB(){
  return db = db || wx.cloud.database()
}

// then(function(data){}, store.onError(reason, data))

function onError(reason, data){
  wx.showModal({
    title:'Error!',
    content: reason.errMsg,
  })
}
function fetchResource(type, id) {
  return getDB().collection(type).doc(id).get()
}

function fetchCollection(type) {
  return getDB().collection(type).get()
}

function createResource(type, resource) {      
  return getDB().collection(type).add({
    data: resource
  })
}

function updateResource(type, resource) {
  let _id = resource._id
  delete resource._id
  return new Promise(function (resolve, reject) {
    getDB().collection(type).doc(_id).update({
      data: resource
    }).then(res=>{
      resource._id = _id      
      resolve(res)
    })
  })
}


function saveResource(type, resource) {  
  if (resource._id) {
    return updateResource(type, resource)
  } else {
    return createResource(type, resource)
  }  
}

function deleteResource(type, id) {
  return getDB().collection(type).doc(id).remove()
}


function fetchPage(type, pageNo = 0, size = 5) {
  return getDB().collection(type).skip(pageNo*size).limit(size).get()
}

function getNextId(type, id, isPre = false) {
  return new Promise(function(resolve,reject){
    getDB().collection(type).field({_id:true}).get()
    .then(res=>{
      let idx = res.data.findIndex(function(ele){
        return ele._id == id
      })
      let nextIdx =  (idx >= 0) ? circleNext(idx, res.data.length, isPre)  : 0         
      resolve(res.data[nextIdx]._id)
    })
  })
}

function circleNext(idx,size,isPre = false){   
  if (isPre) {
    if (idx <= 0 || idx > size) {
      return size - 1
    }else{
      return idx - 1
    }
  } else {
    if (idx < 0 || idx >= size-1) {
      return 0
    } else {
      return idx  + 1
    }
  }

}

module.exports = {
  onError:onError,
  fetchResource: fetchResource,
  fetchCollection: fetchCollection,
  saveResource: saveResource,
  createResource:createResource,
  updateResource:updateResource,
  deleteResource: deleteResource,
  fetchPage: fetchPage,
  getNextId: getNextId
}
