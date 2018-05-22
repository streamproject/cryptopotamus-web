import * as React from 'react'
import { Redirect } from 'react-router-dom'
import Select from 'react-select'
import 'react-select/dist/react-select.css'
import { localStorage } from '../utils/ApiUtils'
import { users } from '../utils/ApiUtils'
import { settingsMenu } from './styles/common'
/* tslint:disable*/
export class AccountSettings extends React.Component<any, any> {

  constructor(props) {
    super(props)
    this.state = { error: props.error, loading: true }

    this.onSelect = this.onSelect.bind(this)
  }

  public async componentWillMount() {
    const css = document.createElement('style')
    document.body.appendChild(css)
    css.innerHTML = `.Select-placeholder
{color: #6572fd; font-family: Work Sans; font-size:16px; line-height: 50px; letter-spacing: -0.8px;}`
    try {
      const user = await users.findUser()
      if (user) {
        const twitchData = await users.me()
        this.setState({
          loading: false,
          channelId: twitchData.data.id,
          channelName: twitchData.data.display_name,
          logo: twitchData.data.logo,
          ethAddress: user.data.eth_address,
          redirectSettings: false,
          redirectLogout: false,
        })
      }
    } catch (err) {
      //
    }
  }

  private onSelect = async(selectedOption) => {
    if (selectedOption.value === 'settings') {
      this.setState({ redirectSettings: true })
    } else {
      localStorage.setItem('token', '')
      console.log(localStorage.getItem('token'))
      this.setState({ redirectLogout: true })
    }
  }

  private arrowRenderer() {
    return (
      <span style={{paddingTop:'10px', display: 'inline-block', float: 'left'}}>
        <i className='large material-icons'>arrow_drop_down</i>
      </span>
    )
  }
  public render() {
    if (this.state.redirectSettings) {
      return <Redirect to='/settings' />
    }

    if (this.state.redirectLogout) {
      return <Redirect to='/' />
    }
    return (
      <div style={{ ...settingsMenu, display: this.state.loading ? 'none' : 'inline-block' }}>
        <div style={{ display: 'inline-block', verticalAlign: 'middle' }}>
          <img src={this.state.logo} height="25px" width="25px" style={{ display: 'inline-block' }} />
        </div>
        <div style={{ display: 'inline-block', verticalAlign: 'middle', paddingLeft: '15px', width: '160px' }}>
          <Select
            name="form-field-name"
            value={this.state.selectedOption}
            onChange={this.onSelect}
            style={{
              border: 'none',
              marginTop: '-15px',
              background: 'none',
              color: '#6572fd',
              fontWeight: 'bold'
            }}
            autoFocus={false}
            className="settingsSelect"
            autoSize={true}
            width='auto'
            placeholder={this.state.channelName}
            menuContainerStyle={{
              width: '160px',
              border: 'none',
              height: '30px',
              lineHeight: '30px',
              textDecoration: 'none',
              fontSize: '12px',
              fontFamily: 'Work Sans',
              margin: 'none',
              padding: 'none',
            }}
            arrowRenderer={this.arrowRenderer}
            menuStyle={{ width: '160px', margin: 'none', padding: 'none' }}
            searchable={false}
            options={[
              { value: 'settings', label: 'Account Settings' },
              { value: 'logout', label: 'Logout' },
            ]}
          />
        </div>
      </div>
    )
  }
}
