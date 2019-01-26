function todos(state = [], action) {
    switch(action.type) {
        case 'ADD' : return [...state, action.item];
        case 'COMPLETE' : return state.map(todo => (todo.id === action.item.id) ? {...todo, completed:true} : todo);
        default : return state;
    }
}

export default todos;