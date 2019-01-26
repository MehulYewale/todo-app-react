import React from 'react';

function TodoItem(props) {
    return <li onClick={props.completed} 
        style={{textDecoration: props.item.completed? 'line-through': 'none'}}> { props.item.name } </li>
}

export default TodoItem;