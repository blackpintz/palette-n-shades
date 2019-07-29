import React, {Component} from 'react'
import chroma from 'chroma-js'
import {DivideArray} from './PalleteColors'
import {Grid} from 'semantic-ui-react'
import uuid from 'uuid/v1'
import './PalleteShades.css'


class PalleteShades extends Component {
    render() {
        let scale = chroma.scale(['f4f4f4',this.props.color, '282828'])
       let myColors = scale.colors(20);
       let results = DivideArray(myColors, 5)
        return (
           <Grid columns={5} padded id="shadeGrid">
           {results.map((arr) => {
               return (
                   <Grid.Row key = {uuid()} className = "ShadeRow">
                   {arr.map((shade) => {
                       return (
                           <Grid.Column key = {uuid()} className='ShadeColumn' style={{backgroundColor: shade}}>{chroma(shade).name()}</Grid.Column>
                       )
                   })}
                   </Grid.Row>
               )
           })}
           </Grid>  
        )
    }
}

export default PalleteShades

