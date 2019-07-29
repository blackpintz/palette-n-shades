import React, {Component} from 'react'
import {connect} from 'react-redux'
import Colors from './PalleteColors'
import ColorForm from './PaletteForm'
import {emptyColorDisplay, addcolordisplay} from './actions/DisplayColors'
import {Grid, Button, Modal, Icon} from 'semantic-ui-react'


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
        console.log("I have mounted.")
        this.props.foundPalette.myArray.map(c => this.props.dispatch(addcolordisplay(c)))
    }

    componentWillMount () {
        console.log("I have re-mounted.")
        this.props.dispatch(emptyColorDisplay())
    }

    render () {
        console.log(this.props)
        return (
            <Grid>
            <Grid.Row textAlign='right' columns={1}>
            <Grid.Column>
            <Modal
            trigger={<Button disabled = {this.props.colorArray.length === 0} onClick = {this.show('inverted')}>Edit the palette</Button>}
            open = {this.state.modalOpen}
            dimmer = {this.state.dimmer}
            size = 'small'>
            <Modal.Content>
            <h3>Are you sure you want to edit your palette?</h3>
            </Modal.Content>
            <Modal.Actions>
            <Button basic color='red' onClick = {this.handleClose} inverted>
              <Icon name='remove' /> No
            </Button>
            <Button onClick = {this.handleUpdate} color='green' inverted>
              <Icon name='checkmark' /> Yes
            </Button>
          </Modal.Actions>
            </Modal>
            <Button onClick = {this.handleGoBack}>Go Back</Button>
            </Grid.Column>
            </Grid.Row>
            <Grid.Row>
            <Grid.Column width = {3}>
            <ColorForm addColor = {this.props.addColor} colorslength = {this.props.colorArray.length} />
            </Grid.Column>
            <Grid.Column width={12}>
            <Colors colorArray = {this.props.colorArray}/>
            </Grid.Column>
            </Grid.Row>
            </Grid>
        )
    }
}

const UpdatedPalette = connect()(Palette)
export default UpdatedPalette