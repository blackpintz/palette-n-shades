import React, {Component} from 'react'
import {ChromePicker} from 'react-color'
import { Form, Button, Message, Divider} from 'semantic-ui-react'
import { connect } from 'react-redux'



class FormColor extends Component {
    constructor(props) {
        super(props)
        this.state = {
            ColorExistsMessage: false,
            PaletteFull: false,
            NameOfColor: ''
        }
    }

    handleChangeComplete = (color) => {
        this.props.changeColor({Hex: color.hex})
      };

    handleChangeName = (e) => {
        const val = e.target.value
        this.setState (() => {
            return {
                NameOfColor: val, 
            }
        })
    }  
    
    handleSubmit = (e) => {
        e.preventDefault()
        let HexArr = this.props.Display.map(color => color.Hex)
        let colorValue = Object.assign({}, this.props.color, {colorName: this.state.NameOfColor})
        if(!HexArr.includes(this.props.color.Hex)){
            this.props.addColor(colorValue)
            this.props.changeColor()
            this.setState(() => ({NameOfColor: ''}))
        } 
        
        this.setState((st) => ({
            ColorExistsMessage: this.props.Display.map(color => color.Hex).includes(this.props.color.Hex)
        }))
        
    }

    handleClearing = () => {
        this.props.clearPalette()
        this.setState(() => ({
            ColorExistsMessage: false,
            NameOfColor: ''
        }))
    }

    NegativeMessage = () => (
        <Message negative size = 'small'>
        <h4>That color already exists!</h4>
        </Message>
    )

    FullMessage = () => (
        <Message>
        <p>You palette is full go ahead and click save</p>
        </Message>
    )
        
    

    render() {
        return (
            <div>
            <Button color = 'red' onClick = {this.handleClearing}>Clear Palette</Button>
            <Divider hidden></Divider>
            <Form onSubmit = {this.handleSubmit}>
            <Form.Field>
            <ChromePicker color = {this.props.color.Hex}
            onChangeComplete = {this.handleChangeComplete} />
            </Form.Field>
            <Form.Field inline>
            <label>Color Name:</label>
            <input type = 'text' placeholder = 'color name' name = 'NameOfColor' value = {this.state.NameOfColor} onChange = {this.handleChangeName} />
            </Form.Field>
            {this.state.ColorExistsMessage? this.NegativeMessage(): ""}
            {this.props.Display.length === 20 ? (
                <Button color = 'teal' disabled ={true}>PALETTE FULL</Button>
            ) : (
                <Button color = 'green'>ADD COLOR</Button>
            )}
            
            </Form>  
            </div>
        )
    }
}


const mapStateToProps = (state) => ({
    color: state.RandomColor,
    Display: state.Display
})

const mapDispatchToProps = (dispatch) => ({
    changeColor: (color) => {dispatch({type: 'CHANGE_COLOR', color: color ? color : {Hex:'#000000'}})},
    clearPalette: () => {dispatch({type: 'EMPTY_DISPLAY_COLOR'})}
})

const ColorForm = connect(mapStateToProps, mapDispatchToProps)(FormColor)

export default ColorForm