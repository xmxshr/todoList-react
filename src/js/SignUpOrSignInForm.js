import React, { Component } from 'react'
import SignUpForm from './SignUpForm.js'
import SignInForm from './SignInForm.js'
import '../css/SignUpOrSignInForm.css'

export default class SignUpOrSignInForm extends Component {
  constructor(props){
    super(props)
    this.state = {
      selected: 'signUp'
    }
  }
  switch(e) {
    this.setState({
      selected: e.target.value
    })
  }
  render() {

    return (
      <div className="signUpOrSignInForm">
        <nav>
          <div className="signUpOrSignIn">
            <input type="radio" value="signUp" id="signUp"
              checked={this.state.selected === 'signUp'}
              onChange={this.switch.bind(this)}/>
            <label htmlFor="signUp"> 注册</label>
          </div>
          <div className="signUpOrSignIn">
            <input type="radio" value="signIn" id="signIn"
                checked={this.state.selected === 'signIn'}
                onChange={this.switch.bind(this)}/>
            <label htmlFor="signIn" >登录</label>
          </div>
        </nav>
        <div className="prompt" ></div>
        <div className="panel">
          {this.state.selected === 'signUp' ?
            <SignUpForm formData={this.props.formData}
              onSubmit={this.props.onSignUp}
              onChange={this.props.onChange} />
            : null}
          {this.state.selected === 'signIn' ?
            <SignInForm formData={this.props.formData}
              onSubmit={this.props.onSignIn}
              onChange={this.props.onChange}
              onForgotPassword={this.props.onForgotPassword} />
            : null}
        </div>
      </div>
    )
  }
}