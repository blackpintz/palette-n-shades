import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Grid, Button, Header, Icon, Form} from 'semantic-ui-react'
import uuid from 'uuid/v1'
import {Link} from 'react-router-dom'
import chroma from 'chroma-js'
import CopiedColor from './Copy'



class ConnectingPalette extends Component {
    constructor (props) {
        super(props);
        this.state = {
            darkNum: 0,
            copied: false
        }
    }

    handleChange = (e) => {
        const theName = e.target.name,
              val     = e.target.value

        this.setState (() => ({
            [theName]: val
        }))    
    }

    render () {
        return (
            <Grid padded >
            <Grid.Row columns = {2}>
            <Grid.Column id = 'IconGrid' width = {3} >
            <Icon name = 'arrow left' link size = 'large' onClick = {this.props.history.goBack}/>
            </Grid.Column>
            <Grid.Column as = {Form} width = {12}>
            <Form.Field inline>
            <label style = {{fontSize: '20px'}}>lightness/darkness level: {this.state.darkNum}</label>
            <input 
            min = {-3}
            max = {4}
            name = 'darkNum'
            onChange = {this.handleChange}
            step = {0.1}
            type = 'range'
            value = {this.state.darkNum}
            />
            </Form.Field>
            </Grid.Column>
            </Grid.Row>
            {this.props.Palette.map((palette) => {
                return (
                    <Grid.Row key = {uuid()}>
                    {palette.myArray.map((c) => {
                        let chromaColor = chroma(c.Hex).darken(this.state.darkNum)
                        return ( 
                            <Grid.Column 
                            id = 'InfoGrid' 
                            className="ShowColumn" 
                            key = {uuid()} 
                            style={{backgroundColor: chromaColor}}
                            mobile = {16} tablet = {8} computer = {4}>
                            <Header 
                            as = 'h5' 
                            color = {this.state.darkNum< -1 ? 'brown' : 'teal'} 
                            id = 'Color-Header'>{c.colorName.toUpperCase()}</Header>
                            <CopiedColor hexColor = {c.Hex}/>
                            <Button 
                            size = 'tiny' 
                            id = "rightBtn" 
                            as = {Link}  to = {`/palette/shade_of/${c.Hex.substring(1)}`}
                            style = {{backgroundColor: c.Hex, border: `0.2px solid rgba(0,0,0,.1)`}}>MORE</Button>
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


const ColorPalette = connect(mapStateToProps)(ConnectingPalette)

export default ColorPalette

 