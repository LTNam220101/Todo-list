import html from '../core.js';
import { connect } from '../Store.js'
import todoitem from './todoitem.js'

function main({ todos, filters, filter }) {
    return html`
    <section class="main">
        <input 
            id="toggle-all" 
            class="toggle-all" 
            type="checkbox"
            onchange = "dispatch('toggleAll', this.checked)"
            ${todos.every(filters.completed) && 'checked'}    
        >
        <label for="toggle-all">Mark all as complete</label>
        <ul class="todo-list">
            <!-- These are here just to show the structure of the list items -->
            <!-- List items should get the class 'editing' when editing and 'completed' when marked as completed -->
            ${todos.filter(filters[filter]).map((todo, index) => todoitem({ todo, index }))}
        </ul>
    </section>
    `
}

export default connect()(main);