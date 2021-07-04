import html from '../core.js';
import { connect } from '../Store.js'

function todoitem({ todo, index, editIndex }) {
    return html`
        <li class="${todo.completed && 'completed'} ${editIndex === index && 'editing'}">
            <div class="view">
                <input 
                    class="toggle" 
                    type= "checkbox"
                    ${todo.completed && 'checked'}
                    onchange="dispatch('toggle', ${index})"
                >
                <label ondblclick="dispatch('editing', ${index})">${todo.title}</label>
                <button
                    class="destroy"
                    onclick="dispatch('delete', ${index})" ></button>
            </div>
            <input 
                class="edit" 
                value="${todo.title}"
                onkeydown="event.keyCode === 13 && dispatch('stopEditing', this.value.trim())
                            || event.keyCode === 27 && dispatch('notEditing', ${index})"
                onblur = "dispatch('stopEditing', this.value.trim())"
            >
        </li>
        `
}

export default connect()(todoitem);