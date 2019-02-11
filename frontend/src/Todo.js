import React from 'react';

const Todo = ({name, completed, onDelete, onToggle}) => {
  return(
    <li>
      <span
        style={{textDecoration: completed ? 'line-through' : 'none'}}
        onClick={onToggle}
      >
       {name}
      </span>
      <span
        onClick={onDelete}> X </span>
    </li>
  );
}

export default Todo;