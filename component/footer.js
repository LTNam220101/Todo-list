import html from '../core.js';
import { connect } from '../Store.js'

function footer({ todos, filter, filters }) {
    return html`
        <footer class="footer">
            <!-- This should be '0 items left' by default -->
            <span class="todo-count">
                <strong>${todos.filter(filters.active).length}</strong>
                item left
            </span>
            <!-- Remove this if you don't implement routing -->
            <ul class="filters">
                ${Object.keys(filters).map(type => html`
                    <li onclick="dispatch('switchFilter', '${type}')">
                        <a class="${filter === type && 'selected'}" href="#/${type[0].toUpperCase() + type.slice(1)}">
                        ${type[0].toUpperCase() + type.slice(1)}
                        </a>
                    </li>
                `)}
            </ul>
            <!-- Hidden if no completed items are left ↓ -->
            ${todos.filter(filters.completed).length > 0 && html`
            <button 
                class="clear-completed" 
                onclick="dispatch('deleteCompleted')"
            >
            Clear completed
            </button>`}
        </footer>
    `
}

export default connect()(footer);