import React from 'react';

const Todo = ({name, completed}) => {
  return(
    <li
      style={{
        textDecoration: completed ? 'line-through' : 'none'
      }}>
      {name}
    </li>
  );
}

export default Todo;