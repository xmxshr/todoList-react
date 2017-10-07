import React from 'react'

export default function (props) {
  return (

    <form name="signIn" onSubmit={props.onSubmit}> {/* 登录*/}
      <input type="text" value={props.formData.username}
        onChange={props.onChange.bind(null, 'username')} placeholder="用户名" />
      <input type="password" value={props.formData.password}
        onChange={props.onChange.bind(null, 'password')} placeholder="密码" />
      <input id="submit" type="submit" value="登录" />
      <a href="#" onClick={props.onForgotPassword}>忘记密码了？</a>
    </form>

  )
}