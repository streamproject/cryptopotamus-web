import * as React from 'react'
import { Link, Redirect } from 'react-router-dom'
import { Input } from './components/Input'
import { box, h2, label, link, nextButton, wrapper } from './components/styles/common'

const character = '<'

const marginTopSmall = {
  marginTop: '50px',
}

class Activate extends React.Component<any, any> {
  constructor(props) {
    super(props)
    if (props.routerProps.location) {
      const setupState = props.routerProps.location.state

      this.state = {
        user: setupState.user,
        redirect: false,
      }
    } else {
      this.state = { redirect: true }
    }
  }

  public render() {
    if (this.state.redirect) {
      return <Redirect to="/setup" />
    }

    const twitchLink = `https://twitch.tv/${this.state.user.display_name}`
    const donateLink = `http://cryptopotam.us/${this.state.user._id}`

    return (
      <div style={wrapper}>
        <Link style={link} to={'/setup'}> {character} Back </Link>
        <div>
          <h2 style={h2}>Create a new Twitch panel </h2>
        </div>
        <div>
          <label style={label}> Step 1 - Go to your Twitch channel(open a new tab) </label>
          <Input disabled="true" value={twitchLink} />
        </div>
        <div style={marginTopSmall}>
          <label style={label}> Step 2 - Create a new Panel </label>
          <br />
          <span style={box}> Channel </span> <span style={{ marginLeft: '16px', marginRight: '16px' }}>  >  </span>
          <span style={box}> Edit Panels </span><span style={{ marginLeft: '16px', marginRight: '16px' }}>  >  </span>
          <span style={box}> + </span> <span style={{ marginLeft: '16px', marginRight: '16px' }}>  >  </span>
          <span style={box}> Add Text or Image Panel </span>
        </div>
        <div style={marginTopSmall}>
          <label style={label}> Step 3 - Add this image to the Panel  </label>
          <img src="http://cultofthepartyparrot.com/parrots/hd/birthdaypartyparrot.gif" />
        </div>
        <div style={marginTopSmall}>
          <label style={label}>
            Step 4 - Copy and paste your donation page URL into the “Image Links to…” section
          </label>
          <Input disabled="true" value={donateLink} alt="prop image" />
        </div>
        <div style={marginTopSmall}>
          <label style={label}>
            Step 5 - Click ‘Submit’ to finish creating the Panel - then come back to this page
          </label>
          <br/>
          <span style={box}> Submit </span>
        </div>
        <div style={marginTopSmall}>
          <Link to={`/connect`}>
            <button style={nextButton}>
                NEXT
            </button>
          </Link>
        </div>
      </div>
    )
  }
}

export default Activate
