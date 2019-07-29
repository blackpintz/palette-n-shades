import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Grid, Button} from 'semantic-ui-react'
import uuid from 'uuid/v1'
import {Link} from 'react-router-dom'

class ConnectingPalette extends Component {
    render () {
        return (
            <Grid columns={4} padded>
            {this.props.Palette.map((palette) => {
                return (
                    <Grid.Row key = {uuid()}>
                    {palette.myArray.map((c) => {
                        return (
                            <Grid.Column textAlign = 'center' className="Column" key = {uuid()} style={{backgroundColor: c.Hex}}>
                            <Button as = {Link}  to = {`/palette/shade_of/${c.Hex.substring(1)}`}>More</Button>
                            </Grid.Column>
                        )
                    })}
                    </Grid.Row>
                )
            })}
            
            </Grid>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    let matchedName = ownProps.match.params.name
    return {
        Palette: state.Palette.filter(palette => palette.Name.replace(/\s+/g, '-').toLowerCase() === matchedName)
    }
}

// const mapDispatchToProps = (dispatch) => {
//     return {
//         deleteColor: (id) => {dispatch({type: 'REMOVE_DISPLAY_COLOR', id: id})}
//     }

// }

const ColorPalette = connect(mapStateToProps)(ConnectingPalette)

export default ColorPalette