import React, {Component} from 'react'
import SoloCard from './IndividualCard'
import {Menu, Container, Card} from 'semantic-ui-react'
import {Link} from 'react-router-dom'




class ColorCard extends Component {
    render () {
       return (
           <div>
           <Menu inverted>
            <Menu.Item header>Home</Menu.Item>
            <Menu.Item as = {Link} to = '/createpalette'>Create a Palette</Menu.Item>
            </Menu>
            <Container>
            <Card.Group itemsPerRow={4}>
           {this.props.palleteNames.map((palette) => {
               return (
                <SoloCard key = {palette.id} palette = {palette}/>
               )
           })}
           </Card.Group>
           </Container>
           </div>
       )
    }
}



export default ColorCard