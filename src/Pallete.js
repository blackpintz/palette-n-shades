import React, {Component} from 'react'
import {Grid, Button} from 'semantic-ui-react'
import './Pallete.css'
import ColorForm from './PaletteForm'
import Save from './Save'
import Colors from './PalleteColors'
import {emptyColorDisplay} from './actions/DisplayColors'
import {connect} from 'react-redux'





class ThePallete extends Component {
    handleGoBack = () => {
        this.props.dispatch(emptyColorDisplay())
        this.props.history.push('/')
    }
    componentWillMount () {
        console.log("I have unmounted.")
        this.props.dispatch(emptyColorDisplay())
    }
    render() {
        return (
            <Grid>
            <Grid.Row textAlign='right' columns={1}>
            <Grid.Column>
            <Save createPalette = {this.props.createPalette} history = {this.props.history} colorslength = {this.props.colorArray.length}/>
            <Button onClick = {this.handleGoBack}>Go Back</Button>
            </Grid.Column>
            </Grid.Row>
            <Grid.Row>
            <Grid.Column width = {3}>
            <ColorForm addColor = {this.props.addColor} colorslength = {this.props.colorArray.length} />
            </Grid.Column>
            <Grid.Column width = {13}>
            <Colors colorArray = {this.props.colorArray} />
            </Grid.Column>
            </Grid.Row>
            </Grid>
        )
    }
}

const Pallete = connect()(ThePallete)

export default Pallete 