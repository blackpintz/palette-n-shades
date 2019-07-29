

// Actions

// ADD_DISPLAY_COLOR
const addcolordisplay = (color) => ({
    type: 'ADD_DISPLAY_COLOR',
    color
})
// EDIT_DISPLAY_COLOR
// REMOVE_DISPLAY_COLOR
const removeColorDisplay = ({id = ''} = {}) => ({
    type: 'REMOVE_DISPLAY_COLOR',
    id
})

// EMPTY_DISPLAY_COLOR
const emptyColorDisplay = () => ({
    type: 'EMPTY_DISPLAY_COLOR'
})

export {addcolordisplay, removeColorDisplay, emptyColorDisplay}