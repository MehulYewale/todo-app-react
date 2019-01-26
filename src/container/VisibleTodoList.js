import { connect } from 'react-redux'
import TodoList from '../components/TodoList'
import {COMPLETE} from '../actions/todo-actions'

const getVisibleTodos = (todos, filter) => {
  switch (filter) {
    case 'ALL':
      return todos
    case 'ACTIVE':
      return todos.filter(t => !t.completed)
    case 'COMPLETED':
      return todos.filter(t => t.completed)
    default:
      throw new Error('Unknown filter: ' + filter);
  }
}

const mapStateToProps = state => {
    console.log(state);
    return {
        listItems: getVisibleTodos(state.todos, state.filter),
        filterValue: state.filter
    }
};

const mapDispatchToProps = dispatch => ({
  onComplete: id => dispatch(COMPLETE(id))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TodoList)
