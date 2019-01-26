import todos from '../reducers/todos'
import filter from '../reducers/filters'

import { combineReducers } from 'redux';

export default combineReducers({ todos, filter });

