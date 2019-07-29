import React, {Component} from 'react'
import {Button, Card, Image, Grid, Form, Icon, Label, Popup} from 'semantic-ui-react'
import { connect } from 'react-redux'
import {removeFromDB, updateDB} from './actions/PaletteCard'
import {Link} from 'react-router-dom'
import './IndividualCard.css'




class OneCard extends Component {
    constructor (props) {
        super(props);
        this.state = {
            isEditing: false,
            EditedNameExists: false,
            Name: this.props.palette.Name
        }
    }
    handleDelete = () => {
        this.props.dispatch(removeFromDB({id: this.props.palette.id}))
    }

    toggleEdit = () => {
        this.setState (() => ({isEditing: !this.state.isEditing, Name: this.props.palette.Name}))
    }

    handleSave = () => {
        if(!this.props.PaletteNames.map(p => p.Name.replace(/\s+/g, ' ').trim().toLowerCase()).includes(this.state.Name.replace(/\s+/g, ' ').trim().toLowerCase())) {
        this.setState (() => ({isEditing: !this.state.isEditing, EditedNameExists: false}))
        this.props.dispatch(updateDB(this.props.palette.id, {Name: this.state.Name}))
        }
        
        this.setState(() => ({EditedNameExists: this.props.PaletteNames.map(p => p.Name.replace(/\s+/g, ' ').trim().toLowerCase()).includes(this.state.Name.replace(/\s+/g, ' ').trim().toLowerCase())}))
    }

    handleChange = (e) => {
        let val = e.target.value,
            p_name = e.target.name
        
        this.setState(() => ({
            [p_name]: val
        }))
    }

    render () {
        let cardName = this.props.palette.Name.replace(/\s+/g, '-').toLowerCase()
        let cardId  = this.props.palette.id
        return (
            <Card>
            <Image src = 'https://images.pexels.com/photos/1212406/pexels-photo-1212406.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500' wrapped ui={false}/>
            <Card.Content>
            <Grid>
            <Grid.Column floated = 'left' width = {10}>
            {this.state.isEditing ? (
                <Form onSubmit = {this.handleSave}>
                <input type = 'text' name = 'Name' value = {this.state.Name} onChange = {this.handleChange} />
                {this.state.EditedNameExists? <Label basic color = 'red' pointing>There is a palette with that name.</Label>: ""}
                <Button size = 'mini'>Save</Button>
                <Button size = 'mini' icon = 'delete' onClick = {this.toggleEdit}/>
                </Form>
            ): (
                <div>
                <Card.Header as = {Link} to = {`/palette/${cardName}`}>{this.props.palette.Name}</Card.Header>
                {!this.state.isEditing ? <Label size = 'tiny' as = 'a' onClick = {this.toggleEdit}>Edit palette name</Label> : "" }
                </div>
            )}
            </Grid.Column>
            <Grid.Column floated = 'right' width={5}>
            <Button.Group id = "ButtonIcon" color = 'grey' icon>
            <Popup 
            trigger = {<Button id = "PencilIcon" as = {Link} to =  {`/palette/${cardName}/edit/${cardId}`}>
            <Icon  color = 'black' name = 'pencil' />
            </Button>}
            content = "Edit the color palette"
            position = 'top center'
            size = 'tiny'/>
            
            <Button onClick = {this.handleDelete} id = "DeleteIcon">
            <Icon color = 'black'  link name = 'delete' />
            </Button>
            </Button.Group>
            </Grid.Column>
            </Grid>
            </Card.Content>
            </Card>
            
           
        )
    }
}
const mapStateToProps = (state, ownProps) => {
    return {
        Display: state.Display,
        PaletteNames: state.Palette.filter(palette => palette._id !== ownProps.palette._id)
    }
    
}
const SoloCard = connect(mapStateToProps)(OneCard)
export default SoloCard