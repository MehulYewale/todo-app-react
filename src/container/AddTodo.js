import React from 'react';
import { ADD } from "../actions/todo-actions";
import { connect } from 'react-redux';

const mapStateToProps = (state) => ({
    nextId: state.todos.length + 1
})

function AddTodo({dispatch, nextId}) {
    let input;
    return <div className="add-todo">
        <input type="text" name="item" ref={target => input = target}/> &nbsp; 
        <button onClick={()=> {dispatch(ADD({
            id: nextId,
            name: input.value,
            completed: false }
            )); 
            input.value=""}}>Add Item</button> <br/>
      </div>;
}

export default connect(mapStateToProps)(AddTodo)