import React, { Component } from 'react';
// import logo from './logo.svg';
import '../css/App.css';
import 'normalize.css'
import '../css/reset.css'
import TodoInput from './TodoInput.js'
import TodoItem from './TodoItem.js'
import UserDialog from './UserDialog.js'
import {getCurrentUser, signOut, TodoModel} from './leanCloud'
// import * as localStore from './localStore.js'



class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      user: getCurrentUser() || {},
      newTodo: '',
      todoList: [
        // {id:'1', title:'第一个list',status:'completed',deleted:'false'}
      ]
      // todoList: localStore.load('todoList') || []
    }
    let user = getCurrentUser()
    if(user){
      TodoModel.getByUser(user, (todos)=>{
        let stateCopy = JSON.parse(JSON.stringify(this.state))
        stateCopy.todoList = todos
        this.setState(stateCopy)
      })
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
        <h1>{this.state.user.username 
              ? this.state.user.username+'  欢迎回来~' 
              :'  我的待办'}
          {this.state.user.id ? <button className="icon" onClick={this.signOut.bind(this)}>
            <i className="iconfont signOut">&#xe656;</i>
            </button> : null} </h1>
        <TodoInput content={this.state.newTodo} 
          onChange={this.changeTitle.bind(this)}
          onSubmit={this.addTodo.bind(this)} />
        <ol className="todoList">
          {todos}
        </ol>
        {this.state.user.id ? 
          null : 
          <UserDialog 
            onSignUp={this.onSignUpOrSignIn.bind(this)}
            onSignIn={this.onSignUpOrSignIn.bind(this)} />}
      </div>
    )
  }

  // componentDidUpdate(){
  //   document.querySelectorAll('.title').forEach((e)=>{
  //     if (this.state.todoList.status === 'completed') {
  //      console.log('yes')
  //     }
  //   })

  // }

  signOut(){
    signOut()
    window.location.reload()
    let stateCopy = JSON.parse(JSON.stringify(this.state))
    stateCopy.user = {}
    this.setState(stateCopy)
  }

  onSignUpOrSignIn(user){
    window.location.reload()
    let stateCopy = JSON.parse(JSON.stringify(this.state))
    stateCopy.user = user
    this.setState(stateCopy)
  }
  // componentDidUpdate(){
  //   localStore.save('todoList', this.state.todoList)
  // }

  delete(e, todo){
    TodoModel.destroy(todo.id, ()=>{
      todo.deleted = true
      this.setState(this.state)
    }, (error)=>{
      console.log(error)
    })
    
  }

  toggle(e, todo){
    let oldStatus = todo.status
    todo.status = todo.status === 'completed' ? '' : 'completed'
    TodoModel.update(todo, ()=>{
      this.setState(this.state)
      todo.classList.add('completed')
    }, (error)=>{
      todo.status = oldStatus
      this.setState(this.state)
    })

    // document.querySelectorAll('.title').forEach((e)=>{
    //   if (todo.status === '') {
    //    console.log(e)
    //    console.log(todo.status)
    //   }
    // })

  }

  changeTitle(e){
    this.setState({
      newTodo: e.target.value,
      todoList: this.state.todoList
    })
  }

  addTodo(e){
    let newTodo = {
      title: e.target.value,
      status: '',
      deleted: false
    }
    TodoModel.create(newTodo, (id)=>{
      newTodo.id = id
      this.state.todoList.push(newTodo)
      this.setState({
        newTodo: '',
        todoList: this.state.todoList
      })
    }, (error) => {
      console.log(error)
    })
  }
}

export default App;