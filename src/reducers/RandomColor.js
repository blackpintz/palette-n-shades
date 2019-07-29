const colorDefault = {
    Hex: '#525252'
}

const RandomReducers = (state = colorDefault, action) => {
    switch(action.type) {
        case 'CHANGE_COLOR':
            return {...state, ...action.color}
        default:
            return state
    }

}

export default RandomReducers