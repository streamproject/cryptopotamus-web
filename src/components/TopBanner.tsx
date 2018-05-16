import * as React from 'react'

const text = {
    height: '25px',
    fontFamily: 'Work Sans',
    fontSize: '16px',
    fontWeight: 600,
    lineHeight: '50px',
    textAlign: 'center',
    letterSpacing: '-0.5px',
    color: '#ffffff',
} as React.CSSProperties

export class TopBanner extends React.Component<any, any> {

    constructor(props) {
        super(props)
        this.state = { color: props.color, message: props.message, linkMessage: props.linkMessage }
    }

    public render() {
        return (
            <div style={{ width: '100%', height: '50px', backgroundColor: this.state.color, marginTop: '-16px' }}>
                <p style={text}>{this.state.message}
                    <a href="" style={{ marginLeft: '25px', color: '#ffffff' }}>{this.state.linkMessage}</a>
                </p>
            </div>
        )
    }
}
