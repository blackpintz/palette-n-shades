import React, {Component} from 'react'
 import {Grid, Icon, Header} from 'semantic-ui-react'
 import uuid from 'uuid/v1'
 import {connect} from 'react-redux'
 


 const DivideArray = (arr, arrSize) => {
    let index = 0;
    let arrLength = arr.length;
    let tempArray = []
    
    for(index = 0; index< arrLength; index +=arrSize) {
        let arrChunk = arr.slice(index, index+arrSize)
        tempArray.push(arrChunk)
    }
    return tempArray
}



class MappedColor extends Component {
    render () {
       
        let result = DivideArray(this.props.colorArray, 4)
        return (
            <div>
            {this.props.colorArray.length === 0 ? (
                <Header as = 'h2' color = 'blue'>Create a new Palette..</Header>
            ): (
                <Grid columns={4} padded id="Pallete">
            {result.map((color) => {
                return (
                    <Grid.Row key={uuid()} className = 'Row'>
                    {color.map((c) => {
                        return(
                            <Grid.Column id = 'InfoGrid' className="ShowColumn" key = {uuid()} style={{backgroundColor: c.Hex}}>
                            <Header as = 'h4' id = 'Color-Header'>{c.colorName.toUpperCase()}</Header>
                            <Icon 
                                onClick = {() => this.props.deleteColor(c._id)}
                                id = 'IconGrid' 
                                link 
                                name = 'trash' 
                                inverted color = 'red'/>
                            </Grid.Column>
                        )
                    })}
                    </Grid.Row> 
                )  
            })}
            </Grid>
            )}
            </div>
            
        )
    }
}


const mapDispatchToProps = (dispatch) => {
    return {
        deleteColor: (id) => {dispatch({type: 'REMOVE_DISPLAY_COLOR', id: id})}
    }

}
const Colors = connect(null, mapDispatchToProps)(MappedColor)

export {DivideArray, Colors as default}

