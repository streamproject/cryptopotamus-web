import { AccountSettings } from 'components/AccountSettings'
import { Back } from 'components/Back'
import * as React from 'react'
import { Redirect } from 'react-router-dom'
import { h2, label, nextButton, text, wrapper } from './components/styles/common'
import { users } from './utils/ApiUtils'

/* tslint:disable */
export default class Connect extends React.Component<any, any> {
  constructor(props) {
    super(props)
    this.state = {
      redirectSkip: false,
      user: {},
    }

    this.handleSkipClick = this.handleSkipClick.bind(this)
  }

  public async componentWillMount() {
    try {
      const user = await users.findUser()
      this.setState({ user: user.data })
    } catch{ }
  }

  public async handleSkipClick() {
    try {
      this.setState({ redirectSkip: true })
    } catch (err) { }
  }

  public render() {
    if (this.state.redirectSkip) {
      return (<Redirect to={{
        pathname: 'donate/' + this.state.user.twitch_id,
        state: { created: true }
      }} />)
    }
    return (
      <div>
        <div style={{ marginLeft: '15%', marginTop: '100px' }}>
          <Back history={this.props.routerProps.history} />
          <AccountSettings />
        </div>
        <div style={wrapper}>
          <h2 style={h2}>Connect to Streamlabs Alert Box</h2>
          <img style={{ marginTop: '50px' }} src="https://media.giphy.com/media/l3q2zVr6cu95nF6O4/giphy.gif" />
          <br />
          <a href="http://0.0.0.0:8000/api/v1/auth/streamlabs">
            <button style={nextButton}>CONNECT TO STREAMLABS</button>
          </a>
          <br />
          <div style={{ textAlign: 'center', height: '50px', width: '480px' }}>
            <p style={{ ...label, lineHeight: '50px', cursor: 'pointer' }} onClick={this.handleSkipClick}>
              Skip this step
            </p>
            <hr />
            <p style={{...text, fontSize: '12px', textAlign: 'center', marginTop: '24px'}}>
            Connecting to StreamLabs will authorize Cryptopotamus to trigger your Streamlabs OBS alerts whenever your Ethereum address receives ETH through your donation page.
            </p>
          </div>
        </div>
      </div>
    )
  }
}
