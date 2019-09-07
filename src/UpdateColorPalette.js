import React, {Component} from 'react'
import {connect} from 'react-redux'
import Colors from './PalleteColors'
import ColorForm from './PaletteForm'
import {emptyColorDisplay, addcolordisplay, removeColorDisplay} from './actions/DisplayColors'
import {Grid, Button, Modal, Icon, Header} from 'semantic-ui-react'
import uuid from 'uuid/v1'
import './UpdatePalette.css'



class Palette extends Component {
    constructor(props) {
        super(props);
        this.state = {
            Name: '',
            modalOpen: false
        }
    }

    show = dimmer => () => this.setState({ dimmer, modalOpen: true })
    handleOpen = () => this.setState({modalOpen: true})
    handleClose = () => this.setState({modalOpen: false})
    
    handleUpdate = () => {
        this.props.updatePalette(this.props.foundPalette.id, {myArray: [...this.props.colorArray]})
        this.setState({
            modalOpen: false
        })
    }

    handleGoBack = () => {
        this.props.dispatch(emptyColorDisplay())
        this.props.history.push('/')
    }

    componentDidMount () {
        this.props.foundPalette.myArray.map(c => this.props.dispatch(addcolordisplay(c)))
    }

    componentWillMount () {
        this.props.dispatch(emptyColorDisplay())
    }

    render () {
        return (
            <Grid>
            <Grid.Row  textAlign='right' columns={1} only = 'computer'>
            <Grid.Column id = 'topColumn'>
            <Modal
            trigger={<Button color = 'blue' disabled = {this.props.colorArray.length === 0} onClick = {this.show('inverted')}>Save changes</Button>}
            open = {this.state.modalOpen}
            dimmer = {this.state.dimmer}
            size = 'small'>
            <Modal.Content>
            <h3>Are you sure you want to edit your palette?</h3>
            </Modal.Content>
            <Modal.Actions>
            <Button color = 'red' onClick = {this.handleClose} inverted>
              <Icon name='remove' /> No
            </Button>
            <Button onClick = {this.handleUpdate} color='green' inverted>
              <Icon name='checkmark' /> Yes
            </Button>
          </Modal.Actions>
            </Modal>
            <Button color = 'violet' onClick = {this.handleGoBack}>Go Back</Button>
            </Grid.Column>
            </Grid.Row>
            <Grid.Row only = 'computer'>
            <Grid.Column width = {1}></Grid.Column>
            <Grid.Column width = {3}>
            <ColorForm addColor = {this.props.addColor} colorslength = {this.props.colorArray.length} />
            </Grid.Column>
            <Grid.Column width ={1} id = 'DividingGrid'></Grid.Column>
            <Grid.Column width={11}>
            <Colors colorArray = {this.props.colorArray}/>
            </Grid.Column>
            </Grid.Row>
            <Grid.Row id = 'UpdateMobile'  textAlign='left' columns={1} only = 'tablet mobile'>
            <Grid.Column id = 'topColumn'>
            <Modal
            trigger={<Button color = 'blue' disabled = {this.props.colorArray.length === 0} onClick = {this.show('inverted')}>Save the changes</Button>}
            open = {this.state.modalOpen}
            dimmer = {this.state.dimmer}
            size = 'small'>
            <Modal.Content>
            <h3>Are you sure you want to edit your palette?</h3>
            </Modal.Content>
            <Modal.Actions>
            <Button  color='red' onClick = {this.handleClose} inverted>
              <Icon name='remove' /> No
            </Button>
            <Button onClick = {this.handleUpdate} color='green' inverted>
              <Icon name='checkmark' /> Yes
            </Button>
          </Modal.Actions>
            </Modal>
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
            {this.props.colorArray.map(color =>(
                <Grid.Column textAlign = 'center' className="Column" key = {uuid()} style={{backgroundColor: color.Hex}}>
                <Header as = 'h4' id = 'Color-Header'>{color.colorName.toUpperCase()}</Header>
                <Icon onClick = {() => this.props.dispatch(removeColorDisplay({id: color._id}))} name = 'trash'/>
                </Grid.Column>
            ))}
            </Grid>
            </Grid.Row>
            <Grid.Row  only = 'mobile'>
            <Grid columns = {1}>
            {this.props.colorArray.map(color =>(
                <Grid.Column textAlign = 'center' className="Column" key = {uuid()} style={{backgroundColor: color.Hex}}>
                <Header as = 'h4' id = 'Color-Header'>{color.colorName.toUpperCase()}</Header>
                <Icon onClick = {() => this.props.dispatch(removeColorDisplay({id: color._id}))} name = 'trash'/>
                </Grid.Column>
            ))}
            </Grid>
            </Grid.Row>
            </Grid>
        )
    }
}



const UpdatedPalette = connect()(Palette)
export default UpdatedPalette