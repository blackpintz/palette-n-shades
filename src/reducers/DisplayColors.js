const colorDefault = []

const DisplayReducers = (state = colorDefault, action) => {
    switch(action.type) {
        case 'ADD_DISPLAY_COLOR':
            return (
                state.length <=20 ? [...state, action.color] : []
            )
            case 'REMOVE_DISPLAY_COLOR':
                return state.filter(color => color._id !== action.id)
                case 'EMPTY_DISPLAY_COLOR':
                    return state = []
        default:
            return state
    }
}

export default DisplayReducers