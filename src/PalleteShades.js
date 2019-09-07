import React, {Component} from 'react'
import chroma from 'chroma-js'
import {DivideArray} from './PalleteColors'
import {Grid, Button} from 'semantic-ui-react'
import uuid from 'uuid/v1'
import './PalleteShades.css'


class PalleteShades extends Component {
    render() {
        let scale = chroma.scale(['f4f4f4',this.props.color, '282828'])
       let myColors = scale.colors(20);
       let results = DivideArray(myColors, 5)
        return (
           <Grid padded id="shadeGrid">
           <Grid.Row>
           <Grid.Column id = 'padded'>
           <Button color = 'blue'  onClick = {this.props.history.goBack}>Go Back</Button>
           </Grid.Column>
           </Grid.Row>
           {results.map((arr) => (
            arr.map((shade) => {
                return (
                    <Grid.Column
                    mobile = {16} tablet = {8} computer = {4}
                     textAlign = 'right' 
                     className = "ShadeColumn"
                     key = {uuid()} 
                     style={{backgroundColor: shade}}>{chroma(shade).name()}</Grid.Column>
                )
            })
           )
               
           )}
           </Grid>  
        )
    }
}

export default PalleteShades

// return (
//     <Grid.Row columns = {5} key = {uuid()} className = "ShadeRow">
//     {arr.map((shade) => {
//         return (
//             <Grid.Column
//              textAlign = 'right' 
//              key = {uuid()} 
//              className='ShadeColumn' style={{backgroundColor: shade}}>{chroma(shade).name()}</Grid.Column>
//         )
//     })}
//     </Grid.Row>
// )