// Actions

// ADD_COLOR
const addColor = (color) => ({
    type: 'ADD_COLOR',
    color
});
// EDIT_COLOR
// REMOVE_COLOR

const removeColor = ({id = ''} = {}) => ({
    type: 'REMOVE_COLOR',
    id
})


export {addColor, removeColor}
