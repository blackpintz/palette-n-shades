import React from 'react';
import './App.css';
import Pallete from './Pallete'
import PalleteShades from './PalleteShades'
import {Route, Switch, Link} from 'react-router-dom'
import './Firebase/Firebase'
import {addcolordisplay} from './actions/DisplayColors'
import {addColor} from './actions/Colors'
import {addToDB, updateDB} from './actions/PaletteCard'
import uuid from 'uuid/v1'
import { connect } from 'react-redux'
import ColorCard from './ColorCard'
import UpdatedPalette from './UpdateColorPalette';
import ColorPalette from './ColorPalette'
import {TransitionGroup, CSSTransition} from 'react-transition-group'
import Page from './Page'
import {Header} from 'semantic-ui-react'


class MainApp extends React.Component {
addColor = (color) => {
    let id = {_id: uuid()}
    let joinedProps = Object.assign({},color,id)
     this.props.dispatch(addcolordisplay(joinedProps))
     this.props.dispatch(addColor(joinedProps))
}

createPalette = (name) => {
    let myArray = {myArray: [...this.props.displayArray]}
    let newArray = Object.assign({}, name, myArray)
    this.props.dispatch(addToDB(newArray))
}

updatePalette = (id, updates) => {
  this.props.dispatch(updateDB(id, updates))
}

  render () {
    return (
      <div className="App">
      <Route render = {({location}) => (
        <TransitionGroup>
        <CSSTransition key = {location.key} classNames = 'page' timeout = {500}>
        <Switch location = {location}>
        <Route exact path='/' render ={() => (
          <Page>
          <ColorCard palleteNames = {this.props.palleteNames} />
          </Page>
        )} />
        <Route exact path='/createpalette' render={(routeProps) => (
          <Page>
          <Pallete addColor={this.addColor} colorArray={this.props.displayArray} createPalette = {this.createPalette} {...routeProps} />
          </Page>
        )} />
        <Route exact path = '/palette/:name' render = {(routeProps) => (
          <Page>
          <ColorPalette  {...routeProps} />
          </Page>
        ) } />
        <Route exact path = '/palette/shade_of/:color' render = {(routeProps) => (
          <Page>
          <PalleteShades color = {routeProps.match.params.color} {...routeProps} />
          </Page>
        )} />
        <Route exact path = '/palette/:name/edit/:id' render = {(routeProps) => (
          <Page>
          <UpdatedPalette addColor = {this.addColor} 
            updatePalette = {this.updatePalette} 
            foundPalette={this.props.palleteNames.find(name => name.Name.replace(/\s+/g, '-').toLowerCase() === routeProps.match.params.name)} 
            colorArray = {this.props.displayArray} 
            {...routeProps} />
          </Page>
        )} />
        <Route render = {() => (
          <div id = 'NotFound'>
          <Header as = 'h1' >Sorry! Page not found.</Header>
          <Header as = {Link} to = '/' size = 'medium' color = 'teal'>Go to homepage</Header>
          </div>
        )} />
        </Switch> 
        </CSSTransition>
        </TransitionGroup>
      )}/>
      
      
      </div>
    )
  }
  
}

const mapStateToProps = (state) => ({
    color: state.RandomColor,
    displayArray: state.Display,
    palleteNames: state.Palette
})
const App = connect(mapStateToProps)(MainApp)

export default App;
