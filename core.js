export default function html([ first, ...strings ], ...values){ /*values: bien noi suy */
    return values.reduce(
        (acc, cur) => acc.concat(cur, strings.shift()), /*Noi acc voi 1 lan value, 1 lan strings*/
        [first] /*gia tri khoi tao cua acc la first*/
    )
    // Lọc các (value là truthy và value khác true) hoặc (value bằng 0)
    .filter(value => value && value !== true || value === 0)
    .join('')
}

export function createStore(reducer){
    let state = reducer(); /* state là dữ liệu trong store */
    const roots = new Map();

    function render(){
        for(const [root, component] of roots){
            const output = component()
            root.innerHTML = output
        }
    }
    return {
        attach(component, root){
            roots.set(root, component)
            render()
        },
        connect(selector = state => state){
            return component => 
                    (props, ...args) => 
                        component(Object.assign({}, props, selector(state), ...args))
        },
        dispatch(action, ...args){
            state = reducer(state, action, args)
            render()
        }
    }
}