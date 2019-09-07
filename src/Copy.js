import React, {Component} from 'react'
import {CopyToClipboard} from 'react-copy-to-clipboard'
import {Message, Button} from 'semantic-ui-react'

export default class CopiedColor extends Component {
    constructor(props) {
        super(props)
        this.state = {
            copied: false
        }
    }

    handleCopy = () => {
        this.setState(() => ({
            copied: true
        }))

        setTimeout(() => {
            this.setState(() => ({copied: false}))
        }, 2000)
    }
    render () {
        return (
            <div>
            <CopyToClipboard text = {this.props.hexColor}
            onCopy = {this.handleCopy}>
            <Button id = 'Copy-button'>COPY</Button>
            </CopyToClipboard>
            {this.state.copied? (<Message id = 'CopyMessage' compact>Copied to clipboard</Message>): null}
            </div>
        )
    }
}

