import * as React from 'react'
import { label } from './styles/common'
/* tslint:disable */
export class Back extends React.Component<any, any> {

    constructor(props) {
        super(props)
        this.state = { error: props.error }
        
        this.goBack = this.goBack.bind(this)
    }
    
    public goBack() {
        return this.props.history.goBack()
    }
    public render() {
        const text = ' < Back '
        return (
            <div style={{ display: 'inline-block' }} >
                <p style={{ ...label, cursor: 'pointer' }} onClick={this.goBack}> {text} </p>
            </div >
        )
    }
}
