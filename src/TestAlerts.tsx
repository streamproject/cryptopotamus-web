import { MDCRipple } from '@material/ripple'
import * as React from 'react'
import { Link } from 'react-router-dom'
import { buttonStyle, buttonTextStyle, h2, h4, label, nextButton, wrapper } from './components/styles/common'
import { users } from './utils/ApiUtils'

class TestAlerts extends React.Component<any, any> {
  constructor(props) {
    super(props)
    this.state = { user: {}, loading: true }
  }

  public async componentWillMount() {
    const user = await users.me()
    this.setState({ user: user.data, loading: false })
  }

  public componentDidMount() {
    MDCRipple.attachTo(document.querySelector('button'))
  }

  public async testAlert() {
    await users.testAlert('TestUser', 'Message bla bla bla', '1')
  }
  // TO DO FIX BS ASS BUTTON ALIGN
  public render() {
    return (
      <div style={{ ...wrapper, display: this.state.loading ? 'none' : 'block' }}>
        <h2 style={h2}>Test your alerts</h2>
        <div>
          <label style={label}> Connected to StreamLabs as… </label>
          <br />
          <br />
          <div style={{ display: 'inline-table', verticalAlign: 'middle' }}>
            <img src={this.state.user.logo}
              width="50px" height="50px"
              style={{ display: 'inline-block' }} />
            <span style={{ ...h4, display: 'table-cell', verticalAlign: 'middle', paddingLeft: '30px' }}>
              {this.state.user.display_name}
            </span>
          </div>
          <div style={{ display: 'inline-block', paddingLeft: '100px', verticalAlign: 'middle' }}>
            <button className="mdc-button"
              style={{
                ...buttonStyle,
                background: 'none',
                border: '1px solid #6572fd',
                width: '160px',
                height: '50px',
              }}>
              <span
                style={{ ...buttonTextStyle, color: '#6572fd', lineHeight: '50px' }}
                onClick={this.testAlert}>
                TEST ALERT
              </span>
            </button>
          </div>
          <div style={{ marginTop: '50px' }}>
            <Link to={`/donate/${this.state.user._id}`}>
              <button className="mdc-button" style={nextButton}>DONE</button>
            </Link>
          </div>
        </div>
      </div>
    )
  }
}

export default TestAlerts
