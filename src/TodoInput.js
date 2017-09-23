import React, { Component } from 'react';
import './TodoInput.css'

class TodoInput extends Component {
  render(){
    return <input type="text" value={this.props.content}
    className="TodoInput"
    onChange={this.changeTitle.bind(this)}
     onKeyPress={this.submit.bind(this)} />
  }
  submit(e){
    if(e.target.value===''){
      alert('不能不输入喔~')
      return
    }else{
      if(e.key === 'Enter'){
        this.props.onSubmit(e)
      }
    }
  }
  changeTitle(e){
    this.props.onChange(e)
  }
}

export default TodoInput 