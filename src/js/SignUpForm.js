import React, { Component } from 'react'


export default class SignUpForm extends Component {
  render() {
    return (
      <form name="signUp" onSubmit={this.props.onSubmit.bind(this)}> {/* 注册*/}
        <input type="text" value={this.props.formData.username}
          onChange={this.props.onChange.bind(this, 'username')} placeholder="用户名" />
        <input type="text" value={this.props.formData.email}
          onChange={this.props.onChange.bind(this, 'email')} placeholder="邮箱" />
        <input type="password" value={this.props.formData.password}
          onChange={this.props.onChange.bind(this, 'password')} placeholder="密码" />
        <input id="submit" type="submit" value="注册" />
      </form>
    )
  }

}