import * as React from 'react'

export class Input extends React.Component<any, any> {
    constructor(props) {
        const inputStyle = {
            fontFamily: 'Work Sans',
            fontSize: '24px',
            fontWeight: '300',
            lineHeight: '2',
            letterSpacing: '-0.8px',
            color: '#263238',
            border: 'none',
            backgroundColor: '#f6f9fb',
            textDecoration: 'none',
            marginTop: '25px',
            paddingLeft: '16px',
            paddingRight: '16px',
            height: '',
            width: '',
        }
        super(props)

        inputStyle.height = props.height || '50px'
        inputStyle.width = props.width || '480px'
        this.state = { props, inputStyle, name: '' }

        this.handleChange = this.handleChange.bind(this)
    }

    public handleChange(event) {
        const name = event.target.name
        this.setState({ [name]: event.target.value })
    }
    public render() {
        const { value, placeholder, disabled, alt, name } = this.state.props
        return (
            <input
                style={this.state.inputStyle}
                value={value}  name={name}
                placeholder={placeholder}
                disabled={disabled}
                alt={alt}
                onChange={this.handleChange}/>
        )
    }
}
