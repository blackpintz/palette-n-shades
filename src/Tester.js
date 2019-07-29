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
    this.state = {
        colorArray: [
         {
             Hex: '#ff3300'
         },
         {
             Hex: "#b32d2d"
         },
         {
             
             Hex: "#7bb32d"
         },
         {
             Hex: "#4f751b"
         },
         {
             Hex: "#1b7566"
         },
         {
             Hex: "#1b1f75"
         },
         {
             Hex: "#060946"
         },
         {
             Hex: "#410646"
         },
         {
             Hex: '#c20fd2'
         },
         {
             Hex: "#797779"
         },
         {
            Hex: '#9C2E2E'
        },
        {
            Hex: '#5465BF'
        }
        ],
        palleteNames: [
            {
                Name: 'Material UI',
                myArray: [{Hex: "#bd30c3"}]
            }
        ],
        displayArray: [],
        
    }
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
