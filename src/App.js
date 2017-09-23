import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
import 'normalize.css'
import './reset.css'
import TodoInput from './TodoInput.js'
import TodoItem from './TodoItem.js'

class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      newTodo: '',
      todoList: [
        // {id:'1', title:'第一个list'}
      ]
    }
  }

  render(){
    let todos = this.state.todoList
        .filter((item)=>!item.deleted)
        .map((item,index)=>{
          return (
            <li key={index}>
              <TodoItem todo={item} onToggle={this.toggle.bind(this)} 
                onDelete={this.delete.bind(this)}/>
            </li>
          )
        })

    return (
      <div className="App">
        <h1>我的待办</h1>
        <TodoInput content={this.state.newTodo} 
          onChange={this.changeTitle.bind(this)}
          onSubmit={this.addTodo.bind(this)} />
        <ol className="todoList">
          {todos}
        </ol>
      </div>
    )
  }

  delete(e, todo){
    todo.deleted = true
    this.setState(this.state)
  }

  toggle(e, todo){
    todo.status = todo.status === 'completed' ? '' : 'completed'
    this.setState(this.state)
    console.log(this.state)
  }

  changeTitle(e){
    
      this.setState({
        newTodo: e.target.value,
        todoList: this.state.todoList
      })
    
  }

  addTodo(e){
    this.state.todoList.push({
      id: idMaker(),
      title: e.target.value,
      status: null,
      deleted: false
    })
    this.setState({
      newTodo: '',
      todoList: this.state.todoList
    })
  }
}

export default App;

let id=0
function idMaker(){
  id+=1
  return id
}