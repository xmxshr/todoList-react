import React, { Component } from 'react'
import '../css/TodoItem.css'


class TodoItem extends Component {
  render() {
    return (
      <div className="TodoItem">
        <div className="checkbox">
          <input type="checkbox"
            checked={this.props.todo.status === 'completed'}
            onChange={this.toggle.bind(this)} />
            {/* id="checkboxInput" */}
          {/* <label className="iconfont" htmlFor="checkboxInput">&#xe633;</label> */}
        </div>
        <div className="title-wrap" >
          {/* 判断是否完成 */}
          {this.props.todo.status === 'completed' 
          ? <div className=" title completed">
              {this.props.todo.title}
            </div>
          : <div className="title">
             {this.props.todo.title}
            </div>
          }    
          
        </div>
        <button className="icon" onClick={this.delete.bind(this)}><i className="iconfont">&#xe605;</i></button>
      </div>
    )
  }

  delete(e) {
    this.props.onDelete(e, this.props.todo)
  }

  toggle(e) {
    this.props.onToggle(e, this.props.todo)
  }

}


export default TodoItem