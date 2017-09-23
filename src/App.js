import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
import TodoInput from './TodoInput.js'
import TodoItem from './TodoItem.js'

class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      newTodo: 'test',
      todoList: [
        {id:'1', title:'第一个list'}
      ]
    }
  }

  render(){
    let todos = this.state.todoList.map((item,index)=>{
      return (
        <li>
          <TodoItem todo={item} />
        </li>
      )
    })

    return (
      <div className="App">
        <h1>我的待办</h1>
        <TodoInput content={this.state.newTodo} />
        <ol>
          {todos}
        </ol>
      </div>
    )
  }
}

export default App;
