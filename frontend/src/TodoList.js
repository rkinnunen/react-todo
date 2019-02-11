import React, { Component } from 'react';
import Todo from './Todo';
import TodoForm from './TodoForm';
const APIURL = '/api/todos/';

class TodoList extends Component {
    constructor(props) {
    super(props);
    this.state = {
      todos: []
    }
    this.addTodo = this.addTodo.bind(this);
  }

  componentWillMount() {
    this.fetchTodos();
  }

  fetchTodos() {
    fetch(APIURL)
    .then(res => {
      if(!res.ok) {
        if(res.status >= 400 && res.status < 500) {
          return res.json().then(data => {
            let err = {errorMessage: data.message};
            throw err;
          })
        } else {
          let err = {errorMessage: 'Server is not responding'};
          throw err;
        }
      }
      return res.json()
    })
    .then(todos => this.setState({todos}));
  }

  addTodo(val) {
    fetch(APIURL, {
      method: 'post',
      headers: new Headers({
        'Content-Type': 'application/json'
      }),
      body: JSON.stringify({name: val})
    })
    .then(res => {
      if(!res.ok) {
        if(res.status >= 400 && res.status < 500) {
          return res.json().then(data => {
            let err = {errorMessage: data.message};
            throw err;
          })
        } else {
          let err = {errorMessage: 'Server is not responding'};
          throw err;
        }
      }
      return res.json()
    })
    .then(newTodo => {this.setState({todos: [...this.state.todos, newTodo]})});
  }

  deleteTodo(id) {
    const deleteURL = APIURL + id;
    fetch(deleteURL, {
      method: 'delete'
    })
    .then(res => {
      if(!res.ok) {
        if(res.status >= 400 && res.status < 500) {
          return res.json().then(data => {
            let err = {errorMessage: data.message};
            throw err;
          })
        } else {
          let err = {errorMessage: 'Server is not responding'};
          throw err;
        }
      }
      return res.json()
    })
    .then(() => {
      const todos = this.state.todos.filter(todo => todo._id !== id);
      this.setState({todos: todos})
    });
  }

  render() {
    const todos = this.state.todos.map((t) => (
      <Todo
        key={t._id}
        {...t}
        onDelete={this.deleteTodo.bind(this, t._id)}
      />
    ));
    return (
      <div>
        <h1>Todo List</h1>
        <TodoForm 
          addTodo={this.addTodo}
        />
        <ul>
          {todos}
        </ul>
      </div>
    );
  }
}

export default TodoList;