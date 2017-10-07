import React, { Component } from 'react'
import '../css/UserDialog.css'
import '../css/PromptDialog.css'
import { signUp, signIn, resetPassword } from './leanCloud.js'
import SignUpOrSignInForm from './SignUpOrSignInForm.js'
import ForgotPassword from './ForgotPassword.js'


export default class UserDialog extends Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedTab: 'signUpOrSignInForm',
      formData: {
        username: '',
        email: '',
        password: ''
      }
    }
  }

 

  signUp(e) {
    e.preventDefault()
    let { email, username, password } = this.state.formData
    let success = (user) => {
      this.props.onSignUp.call(null, user)
    }
    let error = (error) => {
      switch (error.code) {
        case 202:   
          // alert('用户名已被占用')
          promptDialog('用户名已被占用')
          break
        case 203:  
          // alert('电子邮箱地址已经被占用')
          promptDialog('电子邮箱地址已经被占用')
          break
        default:
          // alert(error)
          promptDialog(error)
          break
      }
    }
    if(!username || username.length<=3){
      // alert('用户名必须大于三个字符')
      promptDialog('用户名必须大于三个字符')
    }else if(!email || email.indexOf('@') == '-1'){
      // alert('请输入合法的email')
      promptDialog('请输入合法的email')
    }else if(!password || password.length<=6){
      // alert('密码必须不小于六个字符')
      promptDialog('密码必须不小于六个字符')
    }else{
      signUp(email, username, password, success, error)      
    }
  }
  signIn(e) {
    e.preventDefault()
    let { username, password } = this.state.formData
    let success = (user) => {
      this.props.onSignIn.call(null, user)
    }
    let error = (error) => {
      switch (error.code) {
        case 200:
          // alert('没有提供用户名，或者用户名为空')        
          promptDialog('没有提供用户名，或者用户名为空')
          break
        case 201: 
          // alert('没有提供密码，或者密码为空')
          promptDialog('没有提供密码，或者密码为空')
          break
        case 210:  
          // alert('用户名与密码不匹配') 
          promptDialog('用户名与密码不匹配')
          break
        case 211:
          // alert('找不到用户')
          promptDialog('找不到用户')
          break
        default: 
          // alert(error)
          promptDialog(error)
          break
      }
    }
    signIn(username, password, success, error)
  }

  changeForm(key, e) {
    let stateCopy = JSON.parse(JSON.stringify(this.state))
    stateCopy.formData[key] = e.target.value
    this.setState(stateCopy)
  }

  render() {



    return (
      <div className="UserDialog-wrapper">
        <div className="UserDialog">
          {this.state.selectedTab === 'signUpOrSignInForm' ? 
            <SignUpOrSignInForm 
              formData={this.state.formData}
              onChange={this.changeForm.bind(this)}
              onSignUp={this.signUp.bind(this)}
              onSignIn={this.signIn.bind(this)}
              onForgotPassword={this.isShowForgotPassword.bind(this)}
             /> : 
            <ForgotPassword
              formData={this.state.formData}
              onSubmit={this.resetPassword.bind(this)}
              onChange={this.changeForm.bind(this, 'email')} 
              onClick={this.isShowForgotPassword.bind(this)}
               /> }
        </div>
      </div>
    )
  }

  


  isShowForgotPassword() {
    let stateCopy = JSON.parse(JSON.stringify(this.state))
    stateCopy.selectedTab = stateCopy.selectedTab === 'signUpOrSignInForm' ? 'forgotPassword' : 'signUpOrSignInForm'
    this.setState(stateCopy)
  }

  resetPassword(e) {
    e.preventDefault()
    let email = this.state.formData.email
    let successFn = () => {
      promptDialog('发送成功')
    }
    let errorFn = (error) => {
      promptDialog(error)
    }
    resetPassword(email, successFn, errorFn)
  }
}

function  promptDialog(text){
  let html =  '<div class="promptDialog">'
      html += ' <h4>提示</h4>'
      html += '<div class="dialog-content">' + text + ' <div class="dialog-button">'
      html += '<button>确认</button>'
      html += '</div></div></div>'
      
  let prompt = document.createElement('div')
  prompt.classList.add('promptDialog-wrapper')
  prompt.innerHTML = html

  document.querySelector('#root').appendChild(prompt)

  let btn = document.querySelector('.promptDialog-wrapper .dialog-button button')

  btn.addEventListener('click', function(){
    document.querySelector('#root').removeChild(prompt)
  })

}
