class ColorForm extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            colorHex: {
                Hex: '#fff'
            },
            palleteName : ''
        }
    }

    handleChangeComplete = (color) => {
        this.setState(() => {
            return {
                colorHex: {
                     Hex: color.hex 
                }
            }
        });
      };

    
    handleSubmit = (e) => {
        e.preventDefault()
        this.props.addColor(this.state.colorHex)
        this.setState(() => {
            return {
                colorHex : {
                    Hex: ''
                }
               
            }
        })

    }

    render() {

        return (
            <Form onSubmit = {this.handleSubmit}>
            <Form.Field>
            <ChromePicker color = {this.state.colorHex.Hex}
            onChangeComplete = {this.handleChangeComplete} />
            </Form.Field>
            <Button>Submit</Button>
            </Form>  
        )
    }
}

// App.js

const store = ConfigureStore()

class App extends React.Component {
  constructor(props) {
    super(props);
  }

addColor = (color) => {
    let id = {_id: uuid()}
    let joinedProps = Object.assign({},color,id)
    console.log(joinedProps)
     store.dispatch(addcolordisplay(joinedProps))
     store.dispatch(addColor(joinedProps))
    
    this.setState((st) => {
        return {
            colorArray: [...st.colorArray, color],
            displayArray: [...st.displayArray, color],
            
        }
    })
}

addName = (name) => {
    let myArray = {myArray: [...this.state.displayArray]}
    let id = {_id: uuid()}
    let newArray = Object.assign({}, name, myArray, id)
    store.dispatch(addPalette(newArray))
  this.setState ((st) => {
      return {
          palleteNames: [...st.palleteNames, newArray],
          displayArray: st.displayArray.length === 5 ? [] : [...this.state.displayArray],
          
      }
  })
}



  render () {
      
    console.log(store.getState())
    return (
      <div className="App">
      <Switch>
      <Route exact path='/' render ={(routeProps) => <AllPalletes  {...routeProps} />} />
      <Route exact path='/createpalette' render={(routeProps) => <Pallete addColor={this.addColor} colorArray={this.state.displayArray} addName = {this.addName} {...routeProps} />} />
      <Route exact path = '/palette/:name' render = {(routeProps) => <Middle 
        colorArray={this.state.palleteNames.filter(name => name.Name.replace(/\s+/g, '-').toLowerCase() === routeProps.match.params.name)} {...routeProps} />} />
      <Route exact path = '/palette/shade_of/:color' render = {(routeProps) => <PalleteShades color = {routeProps.match.params.color} />} />
      <Route exact path = '/testing' render = {() => <ConnectedTester />} />
   
      </Switch>
      
      </div>
    )
  }
  
}

export default App;

// AllPalletes
const connectingPalletes = (props) => (
    <div>
            <Menu inverted>
            <Menu.Item header>Home</Menu.Item>
            <Menu.Item as = {Link} to = '/createpalette'>Create a Palette</Menu.Item>
            </Menu>
            <Container>
            <Card.Group itemsPerRow={4}>
            {props.Palette.map((card) => {
                let cardName = card.Name.replace(/\s+/g, '-').toLowerCase()
                return (
                <Card key = {uuid()}>
                <Image src = 'https://images.pexels.com/photos/1212406/pexels-photo-1212406.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500' wrapped ui={false}/>
                <Card.Content>
                <Grid>
                <Grid.Column floated = 'left'>
                <Card.Header as = {Link} to = {`/palette/${cardName}`}>{card.Name}</Card.Header>
                </Grid.Column>
                <Grid.Column floated = 'right'>
                <Icon name = 'pencil' />
                <Icon name = 'trash' />
                </Grid.Column>
                </Grid>
                </Card.Content>
                </Card>
                )
            })}
            </Card.Group>
            <Divider></Divider>
            <Divider hidden></Divider>
            <Grid centered columns={1}>
            <Button as = {Link} to = '/testing'>Go Back</Button>
            </Grid>
            </Container>
            </div>
)

// paletteCard
const Palette = () => {
    return (
        <Card key = {this.props.Palette._id}>
        <Image src = 'https://images.pexels.com/photos/1212406/pexels-photo-1212406.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500' wrapped ui={false}/>
        <Card.Content>
        <Grid>
        <Grid.Column floated = 'left' width ={7}>
        {this.props.Palette.edit ? (
           <PaletteEditForm  {...this.props} EditName = {this.EditName}/>
        ) : (
            <Card.Header as = {Link} to = {`/palette/${cardName}`}>{this.props.Palette.Name}</Card.Header>
            
        )}
        
        </Grid.Column>
        <Grid.Column floated = 'right' width = {5}>
        <Icon name = 'pencil' />
        <Icon name = 'trash' onClick = {() => this.props.dispatch(removePalette({id: this.props.id}))}/>
        </Grid.Column>
        </Grid>
        </Card.Content>
        </Card>
    )
}

// PaletteEditForm


<PaletteEditForm Name = {this.props.palette.Name} id = {this.props.palette._id} updateData = {this.props.updateName}/>

// ColorCard.js

removeName = (id) => {
    this.setState (() => {
        return {
            palleteNames: this.state.palleteNames.filter(palette => palette._id !== id)
        }
    })
}

updateName = (id, updates) => {
    const updatedPaletteNames = this.state.palleteNames.map(palette => {
        if(palette._id === id) {
            return {...palette, Name: updates}
        }
        return palette
    })
    this.setState(() => ({
       palleteNames: updatedPaletteNames 
    }))
}

// onClick = {() =>this.props.dispatch(removeColorDisplay({id: c._id}))}
// <Route exact path = '/palette/:name' render = {(routeProps) => <Middle 
//     colorArray={this.props.palleteNames.filter(name => name.Name.replace(/\s+/g, '-').toLowerCase() === routeProps.match.params.name)} {...routeProps} />} />
// colorProps = {this.props.Palette.map(p => p.myArray)}
// {!this.state.isEditing ? <Icon name = 'pencil' onClick = {this.toggleEdit} />: "" }

// CAME FROM ColorPalette.js
// <Grid id = 'SmallGrid' verticalAlign = 'bottom'>
// <Grid.Column floated = 'left' width = {7} id = 'leftColumn'>
// <Header 
// as = 'h5' 
// textAlign = 'left'
// color = {this.state.darkNum< -1 ? 'brown' : 'teal'} 
// className = 'Color-Header'>{c.colorName.toUpperCase()}</Header>
// </Grid.Column>
// <Grid.Column floated = 'right' width = {5} id = 'rightColumn'>
// <Button 
// size = 'tiny' 
// floated = 'right' 
// id = "rightBtn" 
// as = {Link}  to = {`/palette/shade_of/${c.Hex.substring(1)}`}
// style = {{backgroundColor: c.Hex, border: `0.2px solid rgba(0,0,0,.1)`}}>MORE</Button>
// </Grid.Column>
// </Grid>

// CAME FROM PaletteColors.js
// <Grid>
// <Grid.Column floated ='right' width = {12}>
// <Header as = 'h4' className = 'Color-Header' color = 'teal'>{c.colorName.toUpperCase()}</Header>
// </Grid.Column>
// <Grid.Column floated = 'left' textAlign = 'center' width = {3}>
// <Icon 
// onClick = {() => this.props.deleteColor(c._id)} 
// link 
// name = 'trash' 
// inverted color = 'red'/>
// </Grid.Column>
// </Grid>

<Modal
trigger={<Button color = 'blue' disabled = {this.props.colorArray.length === 0} onClick = {this.show('inverted')}>Save changes</Button>}
open = {this.state.modalOpen}
dimmer = {this.state.dimmer}
size = 'small'>
<Modal.Content>
<h3>Are you sure you want to edit your palette?</h3>
</Modal.Content>
<Modal.Actions>
<Button color = 'green' onClick = {this.handleClose}>
    <Icon name='remove' /> No
</Button>
<Button onClick = {this.handleUpdate} color='green'>
    <Icon name='checkmark' /> Yes
</Button>
</Modal.Actions>
</Modal>