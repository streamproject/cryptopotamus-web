import { MDCRipple } from '@material/ripple'
import { AccountSettings } from 'components/AccountSettings'
import { Back } from 'components/Back'
import * as React from 'react'
import { Redirect } from 'react-router-dom'
import { h2, label, nextButton, text, wrapper } from './components/styles/common'
import { auth, users } from './utils/ApiUtils'

type ConnectProps = { routerProps: any }
type ConnectState = {
  redirectSkip: boolean,
  user: any,
}

export default class Connect extends React.Component<ConnectProps, ConnectState> {
  constructor(props) {
    super(props)
    this.state = {
      redirectSkip: false,
      user: {},
    }

    this.handleSkipClick = this.handleSkipClick.bind(this)
  }

  public componentDidMount() {
    if (document.querySelector('button')) {
      MDCRipple.attachTo(document.querySelector('button'))
    }
  }

  public async componentWillMount() {
    try {
      const user = await users.findUser()
      this.setState({ user: user.data })
    } catch {
      //
    }
  }

  public async handleSkipClick() {
    try {
      this.setState({ redirectSkip: true })
    } catch (err) {
      //
    }
  }

  public render() {
    if (this.state.redirectSkip) {
      return (<Redirect to={{
        pathname: 'donate/' + this.state.user.twitch_id,
        state: { created: true },
      }} />)
    }
    return (
      <div>
        <div style={{ marginLeft: '15%', marginTop: '100px' }}>
          <Back history={this.props.routerProps.history} />
          <AccountSettings routerProps={this.props.routerProps} />
        </div>
        <div style={wrapper}>
          <h2 style={h2}>Connect to StreamLabs Alert Box</h2>
          <br />
          <a href={auth.streamlabsConnect}>
            <button className="mdc-button mdc-button--raised" style={nextButton}>CONNECT TO STREAMLABS</button>
          </a>
          <br />
          <div style={{ textAlign: 'center', height: '50px', width: '480px' }}>
            <p style={{ ...label, lineHeight: '50px', cursor: 'pointer' }} onClick={this.handleSkipClick}>
              Skip this step
            </p>
            <hr />
            <p style={{ ...text, fontSize: '12px', textAlign: 'center', marginTop: '24px' }}>
              Connecting to StreamLabs will authorize Cryptopotamus to trigger your Streamlabs OBS alerts
              whenever your Ethereum address receives ETH through your donation page.
            </p>
          </div>
        </div>
      </div>
    )
  }
}
