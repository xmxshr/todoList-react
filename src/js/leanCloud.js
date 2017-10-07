import AV from 'leancloud-storage'

var APP_ID = 'J4FN8wiW9i7xq84fwcvDoIFo-gzGzoHsz'
var APP_KEY = 'ctQ0oEGRBNaNBavhYOgIMOlX'

AV.init({
  appId: APP_ID,
  appKey: APP_KEY
})


export function signUp(email, username, password, successFn, errorFn) {
  // 新建 AVUser 对象实例
  var user = new AV.User()
  // 设置用户名
  user.setUsername(username)
  // 设置密码
  user.setPassword(password)
  // 设置邮箱
  user.setEmail(email)

  user.signUp().then(function (loginedUser) {
    console.log(loginedUser)
    successFn.call(null, user)
  }, function (error) {
    errorFn.call(null, error)
  })
}

export function signIn(username, password, successFn, errorFn) {
  AV.User.logIn(username, password).then(function (loginedUser) {
    let user = getUserFromAVUser(loginedUser)
    successFn.call(null, user)
  }, function (error) {
    errorFn.call(null, error)
  })
}

export function signOut() {
  AV.User.logOut()
  return undefined
}

export function resetPassword(email, successFn, errorFn) {
  AV.User.requestPasswordReset(email).then(function (success) {
    successFn.call(null)
  }, function (error) {
    errorFn.call(null, error)
  })
}

function getUserFromAVUser(AVUser) {
  return {
    id: AVUser.id,
    ...AVUser.attributes
  }
}

export function getCurrentUser() {
  let user = AV.User.current()
  if (user) {
    return getUserFromAVUser(user)
  } else {
    return null
  }
}

export const TodoModel = {

  getByUser(user, successFn, errorFn) {
    let query = new AV.Query('Todo')
    query.find().then((response) => {
      let array = response.map((t) => {
        return { id: t.id, ...t.attributes }
      })
      successFn.call(null, array)
    }, (error) => {
      errorFn && errorFn.call(null, error)
    })
  },

  create({ title, status, deleted }, successFn, errorFn) {
    let Todo = AV.Object.extend('Todo')
    let todo = new Todo()
    todo.set('title', title)
    todo.set('status', status)
    todo.set('deleted', deleted)

    // 新建一个 ACL 实例
    let acl = new AV.ACL()
    acl.setPublicReadAccess(false)
    acl.setWriteAccess(AV.User.current(), true)
    acl.setReadAccess(AV.User.current(), true)
    todo.setACL(acl)

    todo.save().then(function (response) {
      successFn.call(null, response.id)
    }, function (error) {
      errorFn.call(null, error)
    })
  },

  update({id, title, status, deleted}, successFn, errorFn) {
    let todo = AV.Object.createWithoutData('Todo', id)
    // 修改属性
    title !== undefined && todo.set('title', title)
    status !== undefined && todo.set('status', status)
    deleted !== undefined && todo.set('deleted', deleted)
    // 保存到云端
    todo.save().then( (response) =>{
      successFn && successFn.call(null)
    }, (error)=>{
      errorFn && errorFn.call(null, error)
    })
  },

  destroy(todoId, successFn, errorFn) {
    let todo = AV.Object.createWithoutData('Todo', todoId)
    todo.destroy().then(function (success) {
      successFn.call(null)
    }, function (error) {
      errorFn.call(null, error)
    })
  }


}