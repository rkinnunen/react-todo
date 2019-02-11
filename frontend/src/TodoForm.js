import React, { Component } from 'react';

class TodoForm extends Component {
  constructor(props) {
    super(props);
    this.state = {inputValue: ''}
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    this.setState({inputValue: e.target.value})
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.addTodo(this.state.inputValue);
    this.setState({inputValue: ''});
  }

  render() {
    return(
      <div>
        <form onSubmit={this.handleSubmit}>
          <input
            type='text'
            value={this.state.inputValue}
            onChange={this.handleChange}
          />
          <button
            type='submit'>Add Todo
          </button>
        </form>
      </div>
    );
  }
}

export default TodoForm;