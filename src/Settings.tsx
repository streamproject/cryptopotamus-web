import { MDCRipple } from '@material/ripple'
import { AccountSettings } from 'components/AccountSettings'
import { Back } from 'components/Back'
import * as React from 'react'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import { Redirect } from 'react-router'
import 'react-select/dist/react-select.css'
import * as Web3 from 'web3'
import * as twitchPanelBlack from './assets/twitchPanelBlack.png'
import * as twitchPanelWhite from './assets/twitchPanelWhite.png'
import { TextError } from './components/Errors'
import { box, boxStyle, h2, h4, input, label, text, wrapper } from './components/styles/common'
import { localStorage } from './utils/ApiUtils'
import { auth, users } from './utils/ApiUtils'
/*tslint:disable:max-line-length*/
class Settings extends React.Component<any, any> {
  constructor(props) {
    super(props)
    this.state = {
      user: {},
      loading: true,
      ethAddress: '',
      ethDisabled: true,
      boxStyle,
      redirect: false,
      ethAddressError: '',
      streamlabsToken: null,
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)

    this.deleteAccount = this.deleteAccount.bind(this)
    this.onEditClick = this.onEditClick.bind(this)
  }

  public componentDidMount() {
    MDCRipple.attachTo(document.querySelector('button'))
  }

  public handleChange(event) {
    const name = event.target.name
    this.setState({ [name]: event.target.value })
    if (event.target.value.length >= 40
      && (!(Web3 as any).utils.isAddress(event.target.value)
        || event.target.value === '0x0000000000000000000000000000000000000000')) {
      this.setState({ ethAddressError: true, [name]: event.target.value })
    } else {
      this.setState({ [name]: event.target.value, ethAddressError: false })
    }
  }

  public async deleteAccount() {
    await users.deleteUser()
    localStorage.setItem('token', '')
    this.setState({ redirect: true })
  }

  public onEditClick() {
    if (this.state.ethDisabled === true) {
      const newBoxStyle = { ...boxStyle, color: 'white', backgroundColor: '#6572fd' }
      this.setState({ ethDisabled: false, boxStyle: newBoxStyle })
    } else {
      users.updateUser({ ethAddress: this.state.ethAddress })
      const newBoxStyle = { ...boxStyle, color: '#6572fd', backgroundColor: '#ffffff' }
      this.setState({ ethDisabled: true, boxStyle: newBoxStyle })
    }
  }

  public testAlert() {
    users.testAlert('TestUser', 'This is where the message goes', '1')
  }

  public async componentWillMount() {
    const user = await users.me()
    try {
      const dbUser = await users.findUser()
      this.setState({
        user: user.data,
        ethAddress: dbUser.data.eth_address,
        streamlabsToken: dbUser.data.streamlabs_token,
        loading: false,
      })
    } catch (err) {
      //
    }
  }

  public handleSubmit(event) {
    event.preventDefault()
  }

  public render() {
    const link = 'https://twitch.tv/' + this.state.user.display_name
    if (this.state.redirect) {
      return <Redirect to="/" />
    }
    return (
      <div>
        <div style={{ marginLeft: '15%', marginTop: '50px' }}>
          <Back history={this.props.routerProps.history} />
          <AccountSettings routerProps={this.props.routerProps} />
        </div>
        <div style={{ ...wrapper, display: this.state.loading ? 'none' : 'block' }}>
          <h2 style={h2}> Account settings </h2>
          <form onSubmit={this.handleSubmit}>
            <div>
              <label style={label}> Your Twitch ID </label>
              <br />
              <div style={{ display: 'table' }}>
                <img src={this.state.user.logo}
                  width="50px" height="50px"
                  style={{ display: 'inline-block' }} />
                <a style={{
                  ...h4,
                  display: 'table-cell',
                  verticalAlign: 'middle',
                  paddingLeft: '30px',
                  textDecoration: 'none',
                }}
                  href={link}
                  target="_blank">
                  {this.state.user.display_name}
                </a>
              </div>
            </div>

            <div style={{ marginTop: '50px' }}>
              <label style={label}>
                Your donation page URL
            </label>
              <div style={{ ...box, width: '480px', marginTop: '30px', position: 'relative' }}>
                <span> {`https://cryptopotam.us/${this.state.user._id}`} </span>
                <div style={{ float: 'right', position: 'absolute', top: '5px', right: '15px' }}>
                  <CopyToClipboard text={`https://cryptopotam.us/${this.state.user._id}`}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="19" height="22" viewBox="0 0 19 22">
                      <g fill="none" fill-rule="evenodd">
                        <path d="M-2-1h24v24H-2z" />
                        <path fill="#B0BEC5" fill-rule="nonzero" d="M14 0H2C.9 0 0 .9 0 2v14h2V2h12V0zm3 4H6c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H6V6h11v14z" />
                      </g>
                    </svg>
                  </CopyToClipboard>
                </div>
              </div>
            </div>

            <div style={{ marginTop: '50px' }}>
              <label style={{
                ...label,
                color: this.state.ethAddressError ? 'red' : '#6572fd',
              }}>
                Ethereum address
              </label>
              <br />
              <div style={{ display: 'inline-block', verticalAlign: 'middle', paddingRight: '45px', position: 'relative' }}>
                <input
                  type="text"
                  style={{
                    ...input,
                    background: 'none',
                    width: '608px',
                    border: this.state.ethAddressError ? '1px solid #ff1744' : '1px solid #b0bec5',
                    display: 'inline-block',
                  }}
                  name="ethAddress"
                  value={this.state.ethAddress}
                  disabled={this.state.ethDisabled}
                  onChange={this.handleChange}
                  placeholder="Enter your ETH address (eg. 0x...)"
                />
                <span style={{ position: 'absolute', left: '0', top: '60px' }}>
                  {this.state.ethAddressError && <TextError error="Not a valid Ethereum address! Please try again." />}
                </span>
              </div>
              <div style={{ display: 'inline-block', verticalAlign: 'middle' }}>
                <button className="mdc-button mdc-button--outline"
                  onClick={this.onEditClick}
                  style={this.state.boxStyle}
                  disabled={!(!this.state.ethAddressError || this.state.ethDisabled)}>
                  {this.state.ethDisabled ? 'EDIT' : 'SAVE '}
                </button>
              </div>
            </div>

            <div style={{ marginTop: '50px' }}>
              <label style={label}>
                Manage Streamlabs alerts
              </label>
              <br />
              <div style={{ display: this.state.streamlabsToken ? 'inline-block' : 'none', verticalAlign: 'middle' }}>
                <button className="mdc-button mdc-button--outlined" onClick={this.testAlert} style={boxStyle}>
                  TEST ALERT
                </button>
                <a style={{
                  ...text,
                  color: '#b0bec5',
                  textDecoration: 'none',
                  letterSpacing: '1px',
                  lineHeight: '50px',
                  paddingLeft: '35px',
                }}
                  target="_blank"
                  href="https://streamlabs.com/dashboard#/apisettings">
                  DISCONNECT
                </a>
              </div>
              <div style={{ display: this.state.streamlabsToken ? 'none' : 'inline-block' }}>
                <a href={auth.streamlabsConnect} target="_blank">
                  <button className="mdc-button" style={{ ...boxStyle, width: '300px', color: 'white', backgroundColor: '#6572fd' }}>
                    CONNECT TO STREAMLABS
                  </button>
                </a>
              </div>
            </div>

            <div style={{ marginTop: '50px' }}>
              <label style={label}> Get your Cryptopotamus Twitch panel  </label>
              <br />
              <div style={{ marginTop: '30px' }}>
                <img src={twitchPanelBlack} style={{ marginRight: '60px' }} />
                <img src={twitchPanelWhite} />
              </div>
            </div>
          </form>
          <div style={{ marginTop: '150px', textAlign: 'center' }}>
            <hr />
            <br />
            <p style={{ fontSize: '12px', color: '#6572fd', fontFamily: 'Work Sans', cursor: 'pointer' }}
              onClick={this.deleteAccount}>
              Permanently delete my Cryptopotamus account
          </p>
          </div>
        </div >
      </div >
    )
  }
}

export default Settings
