import React, { Component } from 'react';
const APIURL = '/api/todos';

class TodoList extends Component {
    constructor(props) {
    super(props);
    this.state = {
      todos: []
    }
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

  

  render() {
    return (
      <h1>Todo List</h1>
    );
  }
}

export default TodoList;