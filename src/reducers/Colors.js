const colorDefault = [{
    Hex: '#410646'
}]

const colorReducers = (state = colorDefault, action) => {
    switch(action.type) {
        case 'ADD_COLOR':
            return [...state, action.color]
            case 'REMOVE_COLOR':
                return state.filter(color => color._id !== action.id)
        default:
            return state
    }
}

export default colorReducers