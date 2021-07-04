import Storage from "./Storage.js"

const init = {
    todos: Storage.get(),
    filter: 'all',
    filters: {
        all: () => true,
        active: todo => !todo.completed,
        completed: todo => todo.completed
    },
    editIndex: null
} 

const actions = {
    add({ todos }, title){
        if(title){
            todos.push({title, completed: false, editing: false})
            Storage.set(todos)
        }
    },
    delete({ todos }, index){
        todos.splice(index, 1)
        Storage.set(todos)
    },
    toggle({ todos }, index){
        const todo = todos[index]
        todo.completed = !todo.completed
        Storage.set(todos)
    },
    toggleAll({ todos }, isAllCompleted){
        todos.forEach(todo => todo.completed = isAllCompleted)
        Storage.set(todos)
    },
    deleteCompleted(state){
        state.todos = state.todos.filter(state.filters.active)
        Storage.set(state.todos)
    },
    switchFilter(state, filter){
        state.filter = filter
    },
    editing(state, index){
        state.editIndex = index
    },
    stopEditing(state, newTitle){
        if(state.editIndex !== null){
            if(newTitle){
                state.todos[state.editIndex].title = newTitle
                state.editIndex = null
                Storage.set(state.todos)
            }else{
                this.delete(state, state.editIndex)
            }
        }
    },
    notEditing(state){
        state.editIndex = null
    }
    
}

export default function reducer(state = init, action, args){
    actions[action] && actions[action](state, ...args)
    return state
}