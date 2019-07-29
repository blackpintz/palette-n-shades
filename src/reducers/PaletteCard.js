import uuid from 'uuid/v1'
const paletteDefault = [{
    Name: "Material UI",
    myArray: [
        {
            Hex: "#bd30c3",
            _id: uuid()
        },
        {
          Hex: '#9c2e2e',
          _id: uuid()
      }
    ],
    _id: uuid()
    
}, {
    Name: "Splash UI",
    myArray: [
        {
            Hex: '#c20fd2',
            _id: uuid()
        },
        {
          Hex: '#9c2e2e',
          _id: uuid()
      },
      {
        Hex: "#797779",
        _id: uuid()
    }

    ],
    _id: uuid()
}]

const PaletteReducers = (state = paletteDefault, action) => {
    switch(action.type) {
        case 'ADD_PALETTE':
            return [...state, action.palette]
            case 'REMOVE_PALETTE':
                return state.filter(x => x.id !== action.id)
                case 'EDIT_PALETTE':
                    return state.map((palette) => {
                        if(palette.id === action.id) {
                            return {
                                ...palette,
                                ...action.updates
                            }  
                        }
                        return palette
                    })
                    case 'SET_PALETTE':
                        return action.palette
        default:
            return state
    }
}

export default PaletteReducers