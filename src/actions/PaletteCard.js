import database from '../Firebase/Firebase'
// Actions
// ADD_PALETTE
const addPalette = (palette) => ({
    type: 'ADD_PALETTE',
    palette
});

const addToDB = (paletteData) => (
    (dispatch) => {
       return database.ref("Palettes").push(paletteData).then((ref) => {
            dispatch(addPalette({
                DBId: ref.key,
                ...paletteData
            }))
        })
    }
)
// REMOVE_PALETTE
const removePalette = ({id = ''} = {}) => ({
    type: 'REMOVE_PALETTE',
    id
})

const removeFromDB = ({id = ''}= {}) => (
    (dispatch) => {
        return database.ref(`Palettes/${id}`).remove().then(() => {
            dispatch(removePalette({id}));
        })
    }
)
// EDIT_PALETTE

const editPalette = (id, updates) => ({
    type: 'EDIT_PALETTE',
    id,
    updates
})

const updateDB = (id, updates) => (
    (dispatch) => {
        return database.ref(`Palettes/${id}`).update(updates).then(() => {
            dispatch(editPalette(id, updates))
        })
    }
)

// Fetch palette from the firebase
const setPalette = (palette) => ({
    type: 'SET_PALETTE',
    palette
})

const getFromDB = () => (
    (dispatch) => {
       return database.ref('Palettes').once('value').then((snapshot) => {
            const Palettes = []
            snapshot.forEach((childSnapshot) => {
                Palettes.push({
                    id: childSnapshot.key,
                    ...childSnapshot.val()
                })
            })
            dispatch(setPalette(Palettes))
        })
    }
)

export {addPalette, removePalette, editPalette, addToDB, setPalette, getFromDB, removeFromDB, updateDB}
