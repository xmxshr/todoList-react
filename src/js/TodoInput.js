import React, { Component } from 'react';
import '../css/TodoInput.css'

class TodoInput extends Component {
  render() {
    return (
      <div className="input-wrapper">
        <input type="text" value={this.props.content}
          className="TodoInput"
          onChange={this.changeTitle.bind(this)}
          onKeyPress={this.submit.bind(this)} placeholder="输入你的待办，回车创建~" />
        <i className="iconfont back">&#xe61f;</i>
      </div>
    )

  }
  submit(e) {
    if (e.target.value === '' && e.key === 'Enter') {
      alert('不能不输入喔~')
      return
    } else {
      if (e.key === 'Enter') {
        this.props.onSubmit(e)
      }
    }
  }
  changeTitle(e) {
    this.props.onChange(e)
  }
}

export default TodoInput 