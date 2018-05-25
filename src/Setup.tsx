import { AccountSettings } from 'components/AccountSettings'
import { TopBanner } from 'components/TopBanner'
import * as React from 'react'
import { Tooltip } from 'react-tippy'
import * as Web3 from 'web3'
import { TextError } from './components/Errors'
import { h2, h4, input, label, nextButton, wrapper } from './components/styles/common'
import { localStorage, users } from './utils/ApiUtils'

/*tslint:disable*/
class Setup extends React.Component<any, any> {
  constructor(props) {
    super(props)
    this.state = {
      ethAddress: '',
      ethAddressError: '',
      redirect: false,
      user: {},
      dbUser: {},
      loading: true,
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)

    localStorage.setItem('token', this.props.routerProps.match.params.token)
  }

  public async componentWillMount() {
    const css = document.createElement('style')
    document.body.appendChild(css)
    css.innerHTML = `::-webkit-input-placeholder
{color: #b0bec5; font-family: Work Sans; font-size:24px; line-height: 50px; height: 50px; letter-spacing: -0.8px;}`

    const user = await users.me()
    const dbUser = await users.findUser()

    this.setState({ user: user.data, dbUser: dbUser.data, loading: false })
  }

  public handleChange(event) {
    const name = event.target.name
    if (event.target.value.length >= 40 && (!(Web3 as any).utils.isAddress(event.target.value) || event.target.value === '0x0000000000000000000000000000000000000000') ) {
      this.setState({ ethAddressError: true, [name]: event.target.value })
    } else {
      this.setState({ [name]: event.target.value, ethAddressError: false })
    }
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
      this.props.routerProps.history.push({ pathname: '/activate', state: this.state })
    }

    if(this.state.dbUser.eth_address) {
      this.props.routerProps.history.push({ pathname: '/settings' })
    }

    return (
      <div>
        {this.state.ethAddressError &&
          <TopBanner color="#eb2b4f"
            message="Not a valid Ethereum address! Please try again." />}
        <div style={{ display: 'block', width: '100%', position: 'absolute', top: '45px', right: '-60px' }}>
          <AccountSettings routerProps={this.props.routerProps} />
        </div>
        <br />
        <div style={{ ...wrapper, display: this.state.loading ? 'none' : 'block', clear: 'both' }} >
          <div>
            <h2 style={h2}>Set up your Ethereum donation page</h2>
            <form onSubmit={this.handleSubmit}>
              <div>
                <label style={label}> Your Twitch ID </label>
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
                  position: 'relative'
                }}>
                  Enter your Ethereum address
                  <Tooltip title="This is the long number starting with 0x that uniquely identifies your Ethereum wallet. You can find it in your Ethereum wallet software (like MyEtherWallet, MetaMask, or Ledger)." position="top" trigger="mouseenter" interactive="true" style={{ position: 'absolute', top: '0px', marginLeft: '10px' }}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24">
                      <path fill="none" d="M0 0h24v24H0z" />
                      <path d="M11 18h2v-2h-2v2zm1-16C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm0-14c-2.21 0-4 1.79-4 4h2c0-1.1.9-2 2-2s2 .9 2 2c0 2-3 1.75-3 5h2c0-2.25 3-2.5 3-5 0-2.21-1.79-4-4-4z" />
                    </svg>
                  </Tooltip>
              </label>
                <br />
                <input
                  type="text"
                  style={{
                    ...input,
                    width: '550px',
                    border: this.state.ethAddressError ? '1px solid #ff1744' : 'none',
                  }}
                  spellCheck={false}
                  name="ethAddress"
                  value={this.state.ethAddress}
                  onChange={this.handleChange}
                  placeholder="Enter your ETH address (eg. 0x...)"
                />
                {this.state.ethAddressError && <TextError error="Not a valid Ethereum address! Please try again." />}
              </div>

              <input type="submit" value="NEXT" style={nextButton} />
            </form>
          </div>
        </div>
      </div>
    )
  }
}

export default Setup
