import React from 'react'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import App from './components/App'
import reducers from './reducers'

const store = createStore(reducers);
 
function TodoApp() {
    return (
    <Provider store={store}>
        <App />
    </Provider>
    )
}

export default TodoApp;
