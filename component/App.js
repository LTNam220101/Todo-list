import html from '../core.js';

import { connect } from '../Store.js'

import header from './header.js'
import main from './main.js'
import footer from './footer.js'


function App({ todos }) {
    return html`
    <section class="todoapp">
        ${header()}
        ${todos.length > 0 && main()}
        ${todos.length > 0 && footer()}
    </section>
    `
}

export default connect()(App);