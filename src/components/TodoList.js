import React from 'react';
import TodoItem from '../components/TodoItem';

function TodoList(props) {
    return <div> <br/>
        <div> Number of {props.filterValue } items : {props.listItems.length}</div>
        <ul className="todo-list">
        { props.listItems && props.listItems.map((item) => <TodoItem key={item.id} item={item} completed={()=> props.onComplete(item)}/> )}
    </ul></div>;
}

export default TodoList;