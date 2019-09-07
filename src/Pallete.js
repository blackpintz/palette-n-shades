import React, {Component} from 'react'
import {Grid, Button, Icon, Divider, Header} from 'semantic-ui-react'
import './Pallete.css'
import ColorForm from './PaletteForm'
import Save from './Save'
import Colors from './PalleteColors'
import {emptyColorDisplay, removeColorDisplay} from './actions/DisplayColors'
import {connect} from 'react-redux'
import uuid from 'uuid/v1'

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
            <Grid padded>
            <Grid.Row textAlign='right' columns={1} only = 'computer'>
            <Grid.Column id = 'topColumn'>
            <Save createPalette = {this.props.createPalette} history = {this.props.history} colorslength = {this.props.colorArray.length}/>
            <Button color = 'violet' onClick = {this.handleGoBack}>Go Back</Button>
            </Grid.Column>
            </Grid.Row>
            <Grid.Row only = 'computer'>
            <Grid.Column width = {1}></Grid.Column>
            <Grid.Column width = {3}>
            <Divider hidden></Divider>
            <Divider hidden></Divider>
            <ColorForm addColor = {this.props.addColor} colorslength = {this.props.colorArray.length} />
            </Grid.Column>
            <Grid.Column width ={1} id = 'DividingGrid'></Grid.Column>
            <Grid.Column width = {11}>
            <Colors colorArray = {this.props.colorArray} />
            </Grid.Column>
            </Grid.Row>
            <Grid.Row textAlign='left' id = 'UpdateMobile' columns={1} only = 'tablet mobile'>
            <Grid.Column id = 'topColumn'>
            <Save createPalette = {this.props.createPalette} history = {this.props.history} colorslength = {this.props.colorArray.length}/>
            <Button color = 'violet' onClick = {this.handleGoBack}>Go Back</Button>
            </Grid.Column>
            </Grid.Row>
            <Grid.Row id = 'UpdateMobile' only = 'tablet mobile'>
            <Grid.Column width = {4}>
            <ColorForm addColor = {this.props.addColor} colorslength = {this.props.colorArray.length} />
            </Grid.Column>
            </Grid.Row>
            <Grid.Row  only = 'tablet'>
            <Grid columns = {2}>
            {this.props.colorArray.length !== 0 ? this.props.colorArray.map(color =>(
                <Grid.Column textAlign = 'center' className="Column" key = {uuid()} style={{backgroundColor: color.Hex}}>
                <Header as = 'h4' id = 'Color-Header'>{color.colorName.toUpperCase()}</Header>
                <Icon onClick = {() => this.props.dispatch(removeColorDisplay({id: color._id}))} name = 'trash' inverted color = 'red'/>
                </Grid.Column>
            )) : <Header as = 'h2' color = 'blue' id = 'EmptyHeader'>Create a new Palette..</Header> }
            
            </Grid>
            </Grid.Row>
            <Grid.Row  only = 'mobile'>
            <Grid columns = {1}>
            {this.props.colorArray.length !== 0 ? this.props.colorArray.map(color =>(
                <Grid.Column textAlign = 'center' className="Column" key = {uuid()} style={{backgroundColor: color.Hex}}>
                <Header as = 'h4' id = 'Color-Header'>{color.colorName.toUpperCase()}</Header>
                <Icon onClick = {() => this.props.dispatch(removeColorDisplay({id: color._id}))} name = 'trash' inverted color = 'red'/>
                </Grid.Column>
            )) : <Header as = 'h2' color = 'blue' id = 'EmptyHeader'>Create a new Palette..</Header> }
            </Grid>
            </Grid.Row>
            </Grid>
        )
    }
}

const Pallete = connect()(ThePallete)

export default Pallete 