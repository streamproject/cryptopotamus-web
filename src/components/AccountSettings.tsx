import * as React from 'react'
import Select from 'react-select'
import 'react-select/dist/react-select.css'
import { users } from '../utils/ApiUtils'
import { settingsMenu } from './styles/common'

export class AccountSettings extends React.Component<any, any> {

  constructor(props) {
    super(props)
    this.state = { error: props.error, loading: true, routerProps: props.routerProps }

    this.onSelect = this.onSelect.bind(this)
  }

  public async componentWillMount() {

    try {
      const user = await users.findUser()

      if (user) {
        const twitchData = await users.me()

        this.setState({
          loading: false,
          channelId: twitchData.data._id,
          channelName: twitchData.data.display_name,
          logo: twitchData.data.logo,
          redirectSettings: false,
          redirectLogout: false,
          redirectDonation: false,
        })
      }
    } catch (err) {
      //
    }
  }

  public onSelect = async (selectedOption) => {
    switch (selectedOption.value) {
      case 'settings':
        this.setState({ redirectSettings: true })
        break
      case 'logout':
        window.localStorage.setItem('token', '')
        this.setState({ redirectLogout: true })
        break
      case 'donationPage':
        this.setState({ redirectDonation: true })
    }

  }

  public arrowRenderer() {
    return (
      <span style={{ paddingTop: '10px', display: 'inline-block', float: 'left' }}>
        <i className="large material-icons">arrow_drop_down</i>
      </span>
    )
  }

  public render() {
    if (this.state.redirectSettings && this.state.routerProps.location.pathname.toString() !== '/settings') {
      this.state.routerProps.history.push('/settings')
    }

    if (this.state.redirectLogout) {
      this.state.routerProps.history.push('/')
    }

    if (this.state.redirectDonation) {
      this.state.routerProps.history.push(`/donate/${this.state.channelId}`)
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
              fontWeight: 'bold',
            }}
            autoFocus={false}
            className="settingsSelect"
            autoSize={true}
            width="auto"
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
              { value: 'donationPage', label: 'My donation page' },
              { value: 'settings', label: 'Account Settings' },
              { value: 'logout', label: 'Logout' },
            ]}
          />
        </div>
      </div>
    )
  }
}
