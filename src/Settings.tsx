import * as React from 'react'
import 'react-select/dist/react-select.css'
import { boxStyle, h2, h4, input, label, wrapper } from './components/styles/common'
import { users } from './utils/ApiUtils'

/* tslint:disable */
class Settings extends React.Component<any, any> {
  constructor(props) {
    super(props)
    this.state = {
      user: {},
      loading: true,
      ethAddress: '',
      ethDisabled: true,
      boxStyle
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)

    this.onEditClick = this.onEditClick.bind(this)
  }

  public handleChange(event) {
    const name = event.target.name
    this.setState({ [name]: event.target.value })
  }

  public deleteAccount() {
    users.deleteUser()
  }

  public onEditClick() {
    if (this.state.ethDisabled == true) {
      const newBoxStyle = { ...boxStyle, color: 'white', backgroundColor: '#6572fd' }
      this.setState({ ethDisabled: false, boxStyle: newBoxStyle })
    } else {
      users.updateUser({ ethAddress: this.state.ethAddress })
      const newBoxStyle = { ...boxStyle, color: '#6572fd', backgroundColor: '#ffffff' }
      this.setState({ ethDisabled: true, boxStyle: newBoxStyle })
    }
  }

  public testAlert() {
    users.testAlert('TestUser', 'Message bla bla bla', '1')
  }

  public async componentWillMount() {
    const user = await users.me()
    try{
    const dbUser = await users.findUser()
    this.setState({ user: user.data, ethAddress: dbUser.data.eth_address, loading: false })
    }
    catch(err) {}
  }

  public handleSubmit(event) {
    event.preventDefault()
  }

  // figure out dat img- h2 align
  public render() {
    return (
      <div style={{ ...wrapper, display: this.state.loading ? 'none' : 'block' }}>
        <h2 style={h2}> Account settings </h2>
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
            <label style={label}>
              Your donation page URL
            </label>
            <br />
            <input
              type="text"
              style={{ ...input, width: '608px' }}
              value={`https://cryptopotam.us/${this.state.user.id}`}
              onChange={this.handleChange}
              disabled
            />
          </div>

          <div style={{ marginTop: '50px' }}>
            <label style={{
              ...label,
              color: this.state.ethAddressError ? 'red' : '#6572fd',
            }}>
              Ethereum address
              </label>
            <br />
            <div style={{ display: 'inline-block', verticalAlign: 'middle' }}>
              <input
                type="text"
                style={{
                  ...input,
                  width: '608px',
                  border: this.state.ethAddressError ? '1px solid #ff1744' : 'none',
                  display: 'inline-block'
                }}
                name="ethAddress"
                value={this.state.ethAddress}
                disabled={this.state.ethDisabled}
                onChange={this.handleChange}
                placeholder="Enter your ETH address (eg. 0x...)"
              />
            </div>
            <div style={{ display: 'inline-block', verticalAlign: 'middle', paddingLeft: '45px' }}>
              <button onClick={this.onEditClick} style={this.state.boxStyle}>
                {this.state.ethDisabled ? 'EDIT' : 'SAVE '}
              </button>
            </div>
          </div>

          <div style={{ marginTop: '50px' }}>
            <label style={label}>
              Manage Streamlabs alerts
              </label>
            <br />
            <div style={{ display: 'inline-table', width: '640px', height: '50px', backgroundColor: '#f6f9fb', verticalAlign: 'middle' }}>
              <img src={this.state.user.logo}
                width="50px" height="50px"
                style={{ display: 'inline-block' }} />
              <span style={{ ...h4, display: 'table-cell', verticalAlign: 'middle' }}>
                {this.state.user.display_name}
              </span>
            </div>
            <div style={{ display: 'inline-block', verticalAlign: 'middle', paddingLeft: '45px' }}>
              <button onClick={this.testAlert} style={this.state.boxStyle}>
                {'TEST ALERT'}
              </button>
            </div>
          </div>

          <div style={{ marginTop: '50px' }}>
            <label style={label}> Get your Cryptopotamus Twitch panel  </label>
            <br />
            <img src="http://cultofthepartyparrot.com/parrots/hd/birthdaypartyparrot.gif" />
          </div>
        </form>
        <div style={{ marginTop: '150px', textAlign: 'center' }}>
          <hr />
          <br />
          <p style={{ fontSize: '12px', color: '#6572fd', fontFamily: 'Work Sans', cursor: 'pointer' }} onClick={this.deleteAccount}> Permanently delete my Cryptopotamus account </p>
        </div>
      </div >
    )
  }
}

export default Settings
