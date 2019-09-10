import React, {Component} from 'react'
import SoloCard from './IndividualCard'
import {Container, Grid, Card, Header, Loader, Dimmer} from 'semantic-ui-react'
import { Link} from 'react-router-dom'
import logo from './images/logo.svg'
import './ColorCard.css'


class ColorCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            load: false
        }
    }

    componentDidMount () {
        console.log("Mounted")
        setTimeout(() => (
            this.setState({load: true})
        ), 2000)
    }
    render () {
        return (
            <Container>
            {this.state.load ? (
                <Grid>
                <Grid.Row columns = {3} id = "Top-Row" only = 'computer'>
                <Grid.Column width = {3}>
                </Grid.Column>
                <Grid.Column width = {10}>
                <Grid>
                <Grid.Column floated = 'left' width = {5}>
                <img alt = 'logo' src = {logo}/>
                </Grid.Column>
                <Grid.Column floated = 'right' textAlign = 'right' width = {5}>
                <Header as = {Link} to = '/createpalette' size = 'tiny' color = 'blue' className = "PaletteLink">Create a Palette</Header>
                </Grid.Column>
                </Grid>
                </Grid.Column>
                <Grid.Column width = {3}>
                </Grid.Column>
                </Grid.Row>
                <Grid.Row only = 'computer'>
                <Grid.Column width = {3}></Grid.Column>
                <Grid.Column width = {10}>
                <Card.Group  itemsPerRow = {3}>
               {this.props.palleteNames.map((palette) => {
                   return (
                        <SoloCard key = {palette.id} palette = {palette}/>  
                   )
               })}
               </Card.Group>
               </Grid.Column>
               <Grid.Column width = {3}></Grid.Column>
               </Grid.Row>
               <Grid.Row only = 'tablet mobile'>
               <Grid.Column  id = 'MobileColumn'>
               <img alt = 'logo' src = {logo}/>
               <Header as = {Link} to = '/createpalette' size = 'tiny' color = 'blue' className = "PaletteLink">Create a Palette</Header>
               </Grid.Column>
               </Grid.Row>
               <Grid.Row only = 'tablet'>
               <Grid.Column  id = "CardColumn">
               <Card.Group itemsPerRow = {2}>
               {this.props.palleteNames.map((palette) => {
                return (
                     <SoloCard key = {palette.id} palette = {palette}/>   
                    )
                })}
                </Card.Group>
               </Grid.Column>
               </Grid.Row>
               <Grid.Row only = 'mobile'>
               <Grid.Column id = "CardColumn">
               {this.props.palleteNames.map((palette) => {
                return (
                     <SoloCard key = {palette.id} palette = {palette}/>   
                    )
                })}
               </Grid.Column>
               </Grid.Row>
               </Grid>
            ) : (
                <div id = 'LoadStatus'>
                <Dimmer active>
                <Loader size = 'medium'>Loading Palettes</Loader>
                </Dimmer>
                </div>
            )}
           
           </Container>
        )
           
    }
}



export default ColorCard