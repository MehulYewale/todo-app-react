import React from 'react'
import AddTodo from '../container/AddTodo'
import FilterView from './FilterView'
import VisibleTodoList from '../container/VisibleTodoList'


function App() {
  return <div>
    <AddTodo /> <br/>
    <FilterView />
    <VisibleTodoList />
  </div>
}

export default App;