import React, {Component} from 'react'
import {ChromePicker} from 'react-color'
import { Form, Button, Message} from 'semantic-ui-react'
import { connect } from 'react-redux'



class FormColor extends Component {
    constructor(props) {
        super(props)
        this.state = {
            ColorExistsMessage: false,
            PaletteFull: false
        }
    }

    handleChangeComplete = (color) => {
        this.props.changeColor({Hex: color.hex})
      };

    
    handleSubmit = (e) => {
        e.preventDefault()
        let HexArr = this.props.Display.map(color => color.Hex)
        if(!HexArr.includes(this.props.color.Hex)){
            this.props.addColor(this.props.color)
            this.props.changeColor()
        } 
        
        this.setState((st) => ({
            ColorExistsMessage: this.props.Display.map(color => color.Hex).includes(this.props.color.Hex)
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
            <Form onSubmit = {this.handleSubmit}>
            <Form.Field>
            <ChromePicker color = {this.props.color.Hex}
            onChangeComplete = {this.handleChangeComplete} />
            </Form.Field>
            <Button disabled = {this.props.Display.length === 5}>Submit</Button>
            {this.state.ColorExistsMessage? this.NegativeMessage(): ""}
            {this.props.Display.length === 5 ? this.FullMessage(): ""}
            </Form>  
        )
    }
}


const mapStateToProps = (state) => ({
    color: state.RandomColor,
    Display: state.Display
})

const mapDispatchToProps = (dispatch) => ({
    changeColor: (color) => {dispatch({type: 'CHANGE_COLOR', color: color ? color : {Hex:'#000000'}})}
})

const ColorForm = connect(mapStateToProps, mapDispatchToProps)(FormColor)

export default ColorForm