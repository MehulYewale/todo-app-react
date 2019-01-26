import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './App.css';
import { combineReducers, createStore } from 'redux';


const todos = (state = [], action) => {
    switch (action.type) {
      case 'ADD_ITEM' : return [...state, action.item];
      case 'COMPLETED' : return state.map(todo =>
        (todo.id === action.id)
          ? {...todo, completed: true}
          : todo )
      default: return state;
    }
}

const filter = (state='FILTER_ALL', action) => {
      switch (action.type) {
        case 'FILTER_ALL' : return action.filterBy;
        case 'FILTER_ACTIVE' : return action.filterBy;
        case 'FILTER_COMPLETED' : return  action.filterBy;
        default: return state;
    }
}

const store = createStore(combineReducers({todos,filter}));


const render = () => {
    ReactDOM.render(<AppStore />, document.getElementById('root'));
}

class AppStore extends Component {

  render() {
    return (
      <div className="app" store={store}>
        <h2>ToDo App</h2>
        <AddToDo onAddItem={this.addItem}></AddToDo>
        <ToDoList filterType={store.getState().filter} filterBy={this.filterData} completeCallback={this.completeItemChange}></ToDoList>
        <br/>
        <FilterSection filterType={store.getState().filter} onFilter={this.filterChange}></FilterSection>
      </div>
    );
  }

  filterChange(filterBy) {
    store.dispatch({ type: filterBy, filterBy: filterBy});
    console.log("filterType ----",store.getState());
  }

  addItem = (itemName) => {
    console.log("addItem----", itemName, store.getState());
    itemName && store.dispatch({type:'ADD_ITEM', 
        item: {name: itemName, completed: false, id: store.getState().todos.length + 1}});
  }

  filterData = () => {
    let filteredList = []; 
    const state = store.getState();
    switch (state.filter) {
      case 'FILTER_ALL' : filteredList = state.todos; break;
      case 'FILTER_ACTIVE' : filteredList = state.todos.filter(item => item.completed === false); break;
      case 'FILTER_COMPLETED' : filteredList =  state.todos.filter(item => item.completed === true); break;
      default: filteredList = state.todos;
    }
    return filteredList;
  }

  completeItemChange = (itemData) => {
    store.dispatch({type: 'COMPLETED', id: itemData.id});
    console.log("compltion" , store.getState().filter);
  }
}

store.subscribe(() => {
    render();   
});

export default AppStore;


function AddToDo(props) {
  let target = {};
  return <div className="add-todo">
      <input type="text" name="item" onChange={(e)=> {target = e.target}}/> &nbsp; <button onClick={()=> {props.onAddItem(target.value); target.value=''}}>Add Item</button>
    </div>;
}

function ToDoList(props) {
  const listItems = props.filterBy(props.filterType);
    console.log("ToDoList", listItems);
  return <div> <br/>
    <div> Number of {props.filterType} items : {listItems.length}</div>
    <ul className="todo-list">
    { listItems && listItems.map((item, index) => <TodoItem key={item.id} item={item} completeAction={props.completeCallback}/> )}
  </ul></div>;
}

function FilterSection(props) {
  return <div className="filter-list">
    Show : <button disabled={props.filterType === 'FILTER_ALL'} onClick={()=> props.onFilter('FILTER_ALL')}> All </button> &nbsp;
    <button disabled={props.filterType === 'FILTER_ACTIVE'} onClick={() => props.onFilter('FILTER_ACTIVE')}> Active </button> &nbsp;
    <button disabled={props.filterType === 'FILTER_COMPLETED'} onClick={() => props.onFilter('FILTER_COMPLETED')}> Completed </button>
  </div>;
}

function TodoItem(props) {
  return <li onClick={() => props.completeAction(props.item)} 
    style={{textDecoration: props.item.completed? 'line-through': 'none'}}> { props.item.name } </li>
}