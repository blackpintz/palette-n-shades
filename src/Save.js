import React, {Component} from 'react'
import {Modal, Button, Form, Icon, Message} from 'semantic-ui-react'
import {emptyColorDisplay} from './actions/DisplayColors'
import { connect } from 'react-redux'

class SavePalette extends Component {
    constructor(props) {
        super(props);
        this.state = {
            Name: '',
            modalOpen: false,
            NameExistMessage: false
        }
    }

    handleChange = (e) => {
        const val = e.target.value,
              s_name = e.target.name
        this.setState (() => {
            return {
                [s_name]: val, 
            }
        })
    }


    handleSave = (e) => {
        e.preventDefault();
        if(!this.props.Palettes.map(palette => palette.Name.toLowerCase()).includes(this.state.Name.toLowerCase().replace(/\s+/g, ' ').trim())) {
        let paletteName = {Name: this.state.Name}
        let joinedState = Object.assign({}, paletteName)
        this.props.createPalette(joinedState)
        this.props.dispatch(emptyColorDisplay())
        this.props.history.push('/')
        this.setState(() => {
            return {
                Name: '',
                NameExistMessage: !this.props.Palettes.map(palette => palette.Name.toLowerCase()).includes(this.state.Name.toLowerCase().replace(/\s+/g, ' ').trim()),
                modalOpen: false

            }
        })
        }
        this.setState(() => {
            return {
                NameExistMessage: this.props.Palettes.map(palette => palette.Name.toLowerCase()).includes(this.state.Name.toLowerCase().replace(/\s+/g, ' ').trim()), 
            }
        })
        
    }
    show = dimmer => () => this.setState({ dimmer, modalOpen: true })
    handleOpen = () => this.setState({modalOpen: true})
    handleClose = () => this.setState({modalOpen: false, NameExistMessage: false})

    NegativeMessage = () => (
        <Message negative size = 'small'>
        <h4>The name already exists!</h4>
        </Message>
    )

    render() {
        return (
            <Modal
            trigger={<Button color = 'blue' disabled = {this.props.colorslength === 0} onClick = {this.show('inverted')}>Save</Button>}
            open = {this.state.modalOpen}
            dimmer = {this.state.dimmer}
            size = 'small'>
            <Modal.Content>
            <Icon name = 'delete' onClick = {this.handleClose}/>
            <h3>Please provide a name for your pallete</h3>
            <Modal.Actions>
            <Form onSubmit = {this.handleSave}>
            <Form.Field inline>
            <label>Name of the pallete</label>
            <input type = "text" placeholder = 'Name of the pallete' name ="Name"  value = {this.state.Name} onChange= {this.handleChange} />
            <Button disabled = {this.state.Name.length === 0}>Submit</Button>
            </Form.Field>
            </Form>
            {this.state.NameExistMessage? this.NegativeMessage() : ''}
            </Modal.Actions>
            </Modal.Content>
            </Modal>
        )
    }
}
const mapStateToProp = (state) => ({
    Palettes: state.Palette
})
const Save = connect(mapStateToProp)(SavePalette)

export default Save