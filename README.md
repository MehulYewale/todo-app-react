### We have build todoApp by three ways.
1. App.js -- simple state object using react.
2. AppStore.js -- redux way within single file to access single store object.
3. TodoApp.js -- with redux provider to access single store from multiple file.

You can change the index.js to render ReactDOM root eelement to see difference.

-- Redux is a predictable state container for JavaScript apps.
-- Redux maintains the state of an entire application in a single immutable state tree (object), which can’t be changed directly. When something changes, a new object is created (using actions and reducers).
-- The main difference is that Flux has multiple stores that change the state of the application, and it broadcasts these changes as events. Components can subscribe to these events to sync with the current state. Redux doesn’t have a dispatcher, which in Flux is used to broadcast payloads to registered callbacks. 
-- State is read-only: The only way to change the state is to emit an action, an object describing what happened.
-- To specify how the state tree is transformed by actions, you write pure reducers.
-- Redux reducer always return the new state of your application. Never Mutate State Within the Reducers
-- A REDUCER is just a function. A function that takes in two parameters. The first is the STATE of the app, and the other is an ACTION.
-- Action Creators are simply functions that return action objects.
-- To subscribe to store updates, use the store.subscribe() method.
-----------------------------------------------------------------------------------
function createStore(reducer) {
    var state;
    var listeners = []

    function getState() {
        return state
    }
    
    function subscribe(listener) {
        listeners.push(listener)
        return unsubscribe() {
            var index = listeners.indexOf(listener)
            listeners.splice(index, 1)
	    // listeners = listeners.filter(= => l !== listener)
        }
    }
    
    function dispatch(action) {
        state = reducer(state, action)
        listeners.forEach(listener => listener())
    }

    dispatch({})

    return { dispatch, subscribe, getState }
}

function combineReducers(reducers){
   return (state ={}, action) => {
	return Object.keys(reducers).reduce(
		(nextstate,key) => {
			nextstate[key]= reducers[key](state[key],action);
			return nextstate;
		}, {});
	
	}
}

class Provider extend Component {
	getChildContext() { return {store:this.props.store}};
	render() { return this.props.children; } ;
}
Provider.childContextTypes = {
	store: React.PropTypes.object
}
AddTodo.contextType = {
	store: React.PropTypes.object
}

But -- react provides inbuild Provider from react-redux

<Provider store={createStore(todoApp)}> <TodoApp/> </Provider>
---------------------------------------------------------------------------------------
actions: these are objects that should have two properties, one describing the type of action, and one describing what should be changed in the app state.
reducers: these are pure functions that implement the behavior of the actions. They change the state of the app, based on the action description and the state change description. Reducer can call other reducers with array or objects
store: it brings the actions and reducers together, holding and changing the state for the whole app — there is only one store.
Provider: makes the Redux store available to any nested components that have been wrapped in the connect function
mapStateToProps: this is used to retrieve the store state
mapDispatchToProps: this is used to retrieve the actions and dispatch them to the store
