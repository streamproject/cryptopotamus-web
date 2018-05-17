import * as React from 'react'
import { Redirect } from 'react-router-dom'
import * as Web3 from 'web3'
import { Back } from './components/Back'
import { TextError } from './components/Errors'
import { h2, h4, input, label, nextButton, wrapper } from './components/styles/common'
import { users } from './utils/ApiUtils'

class Setup extends React.Component<any, any> {
  constructor(props) {
    super(props)
    this.state = {
      ethAddress: '',
      ethAddressError: '',
      redirect: false,
      user: {},
      loading: true,
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)

    window.localStorage.setItem('token', this.props.routerProps.match.params.token)
  }

  public async componentWillMount() {
    const css = document.createElement('style')
    document.body.appendChild(css)
    css.innerHTML = `::-webkit-input-placeholder
{color: #b0bec5; font-family: Work Sans; font-size:24px; line-height: 50px; height: 50px; letter-spacing: -0.8px;}`
    window.localStorage.setItem('token', this.props.routerProps.match.params.token)
    const user = await users.me()
    this.setState({ user: user.data, loading: false })
  }

  public handleChange(event) {
    const name = event.target.name
    this.setState({ [name]: event.target.value })
  }

  public async handleSubmit(event) {
    event.preventDefault()

    if (!(Web3 as any).utils.isAddress(this.state.ethAddress)) {
      this.setState({ ethAddressError: true })
    } else {
      await users.updateUser({ ethAddress: this.state.ethAddress })
      this.setState({ redirect: true })
    }

  }

  public render() {
    if (this.state.redirect) {
      return <Redirect
        to={{
          pathname: '/activate',
          state: this.state,
        }} />
    }

    return (
      <div style={{ ...wrapper, display: this.state.loading ? 'none' : 'block' }}>
        <Back history={this.props.routerProps.history} />
        <div>
          <h2 style={h2}>Setup your Ethereum donation page</h2>
          <form onSubmit={this.handleSubmit}>
            <div>
              <label style={label}> Your twitch ID </label>
              <br />
              <div style={{ display: 'table' }}>
                <img src={this.state.user.logo}
                  width="50px" height="50px"
                  style={{ display: 'inline-block' }} />
                <span style={{ ...h4, display: 'table-cell', verticalAlign: 'middle', paddingLeft: '30px' }}>
                  {this.state.user.display_name}
                </span>
              </div>
            </div>

            <div style={{ marginTop: '50px' }}>
              <label style={{
                ...label,
                color: this.state.ethAddressError ? 'red' : '#6572fd',
              }}>
                Enter your Ethereum address
              </label>
              <br />
              <input
                type="text"
                style={{
                  ...input,
                  width: '550px',
                  border: this.state.ethAddressError ? '1px solid #ff1744' : 'none',
                }}
                name="ethAddress"
                value={this.state.ethAddress}
                onChange={this.handleChange}
                placeholder="Enter your ETH address (eg. 0x...)"
              />
              {this.state.ethAddressError && <TextError error="Not a valid Ethereum address. Please try again." />}
            </div>

            <input type="submit" value="Create your donation page" style={nextButton} />
          </form>
        </div>
      </div>
    )
  }
}

export default Setup
