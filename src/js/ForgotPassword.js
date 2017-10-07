import React, { Component } from 'react'

export default class ForgotPassword extends Component {
  render(){
    return (
      

      <div className="forgotPassword">
        <h3>重置密码</h3>
        <form className="forgotPassword" onSubmit={this.props.onSubmit} >
          <input type="email" value={this.props.formData.email}
            onChange={this.props.onChange.bind(this, 'email')} placeholder="邮箱" />
          <input type="submit" value="发送重置邮件" />
          <a href="#" onClick={this.props.onClick}>返回登录</a>
        </form>
      </div>
    
    )
  }

}