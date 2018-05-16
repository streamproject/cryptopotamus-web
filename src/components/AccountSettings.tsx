import * as React from 'react'
import Select from 'react-select'
import 'react-select/dist/react-select.css'
import { users } from '../utils/ApiUtils'
import { label, settingsMenu } from './styles/common'
/* tslint:disable*/
export class AccountSettings extends React.Component<any, any> {

  constructor(props) {
    super(props)
    this.state = { error: props.error, loading: true }
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
        })
      }
    } catch (err) {
      //
    }
  }

  public render() {
    return (
      <div style={{ ...settingsMenu, display: this.state.loading ? 'none' : 'inline-block' }}>
        <div style={{ display: 'inline-block', verticalAlign: 'middle' }}>
          <img src={this.state.logo} height="25px" width="25px" style={{ display: 'inline-block' }} />
        </div>
        <div style={{ display: 'inline-block', verticalAlign: 'middle' }}>
          <Select
            name="form-field-name"
            value={this.state.selectedOption}
            onChange={this.props.onSelect}
            style={{
              border: 'none',
              minWidth: '160px',
              ...label,
              marginLeft: '15px',
              marginTop: '-15px',
              background: 'none',
            }}
            placeholder={this.state.channelName}
            width="100px"
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
