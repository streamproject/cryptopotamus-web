import * as React from 'react'
import { Link, Redirect } from 'react-router-dom'
import { Input } from './components/Input'
import { box, h2, label, link, nextButton, wrapper } from './components/styles/common'

const character = '<'

const marginTopSmall = {
  marginTop: '50px',
}
const marginTopBig = {
  marginTop: '150px',
}

class Activate extends React.Component<any, any> {
  constructor(props) {
    super(props)
    if (props.routerProps.location) {
      const setupState = props.routerProps.location.state

      this.state = { channel: setupState.channel, channelId: setupState.channelId, ethAddress: setupState.ethAddress, redirect: false }
    } else {
      this.state = { redirect: true }
    }
  }

  public render() {
    if (this.state.redirect) {
      return <Redirect to="/setup" />
    }

    const twitchLink = `https://twitch.tv/${this.state.channel}`
    const donateLink = `https://site/donate/${this.state.channelId}/${this.state.ethAddress}`

    return (
      <div style={wrapper}>
        <Link style={link} to={'/setup'}> {character} Back </Link>
        <div>
          <h2 style={h2}> Almost done, now activate your page</h2>
        </div>
        <div>
          <label style={label}> Step 1 : Go to your Twitch channel </label>
          <Input disabled="true" value={twitchLink} />
        </div>
        <div style={marginTopSmall}>
          <label style={label}> Step 2 : Create a new Panel </label>
          <br/>
          <span style={box}> Edit Panels </span><span style={{ marginLeft: '16px', marginRight: '16px' }}>  >  </span>
          <span style={box}> + </span> <span style={{ marginLeft: '16px', marginRight: '16px' }}>  >  </span>
          <span style={box}> Add Text or Image Panel </span>
        </div>
        <div style={marginTopSmall}>
          <label style={label}> Step 3 : Add this image to the Panel  </label>
          <img src="http://cultofthepartyparrot.com/parrots/hd/birthdaypartyparrot.gif" />
        </div>
        <div style={marginTopSmall}>
          <label style={label}> Step 4 : Copy and paste your donation page URL into the “Image Links to…” section </label>
          <Input disabled="true" value={donateLink} width="930px" alt="prop image" />
        </div>
        <div style={marginTopBig}>
          <Link style={nextButton} to={`/donate/${this.state.channelId}/${this.state.ethAddress}`}>GO TO YOUR NEW DONATION PAGE </Link>
        </div>
      </div>
    )
  }
}

export default Activate
