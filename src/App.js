import React, { Component } from 'react';
import './App.css';

class App extends Component {

  state = { list: [], filterType: 'ALL' };

  listChange(state) {
    this.setState(prevState => {
      return { list: [...prevState.list, state] };
    });
    this.filterBy(this.state.filterType);
    setTimeout(()=> console.log("list ----",this.state.list),100);
  }

  filterTypeChange(filterBy) {
    this.setState({ filterType: filterBy});
    console.log("filterType ----",this.state);
  }

  render() {
    return (
      <div className="app">
        <h2>ToDo App</h2>
        <AddToDo onAddItem={this.addItem}></AddToDo>
        {/* <div> Total Number of items : {this.state.list.length}</div> */}
        <ToDoList filterType={this.state.filterType} filterBy={this.filterData} completeCallback={this.completeItemChange}></ToDoList>
        <br/>
        <FilterSection filterType={this.state.filterType} onFilter={this.filterBy}></FilterSection>
      </div>
    );
  }

  addItem = (item) => {
    console.log("addItem----", item);
    item && this.listChange({name: item, completed: false, id: this.state.list.length + 1});
  }

  filterBy = (filterType) => {
     this.filterTypeChange(filterType);
     this.filterData();
  }

  filterData = () => {
    let filteredList = []; 
    switch (this.state.filterType) {
      case 'ALL' : filteredList = this.state.list; break;
      case 'ACTIVE' : filteredList = this.state.list.filter(item => item.completed === false); break;
      case 'COMPLETED' : filteredList =  this.state.list.filter(item => item.completed === true); break;
      default: filteredList = this.state.list;
    }
    return filteredList;
  }

  completeItemChange = (itemData) => {
    this.setState(prevState => {
      const list = prevState.list.map((item) => {
        if (item.id === itemData.id && !itemData.completed) {
          item.completed = true;
          return item;
        } 
        return item;
      });
      return {
        list,
      };
    });
    setTimeout(()=>this.filterBy(this.state.filterType),200);
    console.log("compltion" , this.state.list);
  }
}

export default App;


function AddToDo(props) {
  let target = {};
  return <div className="add-todo">
      <input type="text" name="item" onChange={(e)=> {target = e.target}}/> &nbsp; <button onClick={()=> {props.onAddItem(target.value); target.value=''}}>Add Item</button>
    </div>;
}

function ToDoList(props) {
  const listItems = props.filterBy(props.filterType);

  return <div> <br/>
    <div> Number of {props.filterType} items : {listItems.length}</div>
    <ul className="todo-list">
    {/* { listItems && listItems.map((item, index) => <li key={item.id} item={item} onClick={()=> props.completeCallback(item)}>{item.name}</li> )} */}
    { listItems && listItems.map((item, index) => <TodoItem key={item.id} item={item} completeAction={props.completeCallback}/> )}
  </ul></div>;
}

function FilterSection(props) {
  return <div className="filter-list">
    Show : <button disabled={props.filterType === 'ALL'} onClick={()=> props.onFilter('ALL')}> All </button> &nbsp;
    <button disabled={props.filterType === 'ACTIVE'} onClick={() => props.onFilter('ACTIVE')}> Active </button> &nbsp;
    <button disabled={props.filterType === 'COMPLETED'} onClick={() => props.onFilter('COMPLETED')}> Completed </button>
  </div>;
}

function TodoItem(props) {
  return <li onClick={() => props.completeAction(props.item)} 
    style={{textDecoration: props.item.completed? 'line-through': 'none'}}> { props.item.name } </li>
}