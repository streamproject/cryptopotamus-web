import axios from 'axios'
import * as React from 'react'
import { Link, Redirect } from 'react-router-dom'
import * as Web3 from 'web3'
import { TextError } from './components/Errors'

const character = '<'

class Setup extends React.Component<any, any> {
  constructor(props) {
    super(props)
    this.state = { channel: '', channelId: '', ethAddress: '', channelError: '', ethAddressError: '', redirect: false }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  // fix for styling placeholder text
  public componentWillMount() {
    const css = document.createElement('style')
    document.body.appendChild(css)
    css.innerHTML = `::-webkit-input-placeholder
{color: #b0bec5; font-family: Work Sans; font-size:24px; line-height: 2.08; letter-spacing: -0.8px;}`
  }
  public handleChange(event) {
    const name = event.target.name
    this.setState({ [name]: event.target.value })
  }

  public async handleSubmit(event) {
    event.preventDefault()

    let ethAddressError = false
    let channelError = false

    if (!(Web3 as any).utils.isAddress(this.state.ethAddress)) {
      ethAddressError = true
    }

    await axios.get(`https://api.twitch.tv/kraken/users/${this.state.channel}?client_id=y8n21fwws8pnf1jhlhdv6hplclr7sl`)
      .then(async (res) => {
        if (!ethAddressError) {
          this.setState({ redirect: true, channelId: res.data._id })
        }
      }).catch(async (err) => {
        channelError = true
      })

    if (channelError || ethAddressError) {
      this.setState({ channelError, ethAddressError })
    }
  }

  public loginTwitch() {
    // console.log(auth.loginTwitch())
  }

  public render() {
    if (this.state.redirect) {
      return <Redirect
        to={{
          pathname: '/activate',
          state: this.state,
        }}/>
    }

    return (
      <div className="wrapper">
        <Link className="link" to={'/'}> {character} Back </Link>
        <div>
          <h2 className="h2"> Set up your donation page</h2>
          <form onSubmit={this.handleSubmit}>
            <div>
              <label className="label"> Twitch username </label>
              <input
                type="text"
                className="input"
                name="channel"
                value={this.state.channel}
                onChange={this.handleChange}
                placeholder="Enter your Twitch Username"
              />
              {this.state.channelError}
              {this.state.channelError && <TextError error="Not a valid Twitch username. Please try again." />}
            </div>

            <div style={{ marginTop: '50px' }}>
              <label className="label"> Ethereum address </label>
              <input
                type="text"
                className="input"
                name="ethAddress"
                value={this.state.ethAddress}
                onChange={this.handleChange}
                placeholder="Enter your ETH address (eg. 0x...)"
              />
              {this.state.ethAddressError && <TextError error="Not a valid Ethereum address. Please try again." />}
            </div>

            <input type="submit" value="Create your donation page" className="nextButton" />
            <button onClick={this.loginTwitch} className="nextButton">Log in with twitch </button>
          </form>
        </div>
      </div>
    )
  }
}

export default Setup
