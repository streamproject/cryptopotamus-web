import axios from 'axios'
import * as React from 'react'
import Web3 from 'web3'
import { h2, input, label, nextButton, textArea, wrapper } from './components/styles/common'
import { TopBanner } from './components/TopBanner'

class Donate extends React.Component<any, any> {
  constructor(props) {
    super(props)
    this.state = {
      channelId: props.routerProps.match.params.channelId,
      ethAddress: props.routerProps.match.params.ethAddress,
      name: '',
      message: '',
      value: '',
      channelName: '',
      logo: '',
      verified: false,
      valueETH: '',
      valueUSD: '',
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)

    // move this to component will mount
    this.checkIfChannelLegit()
  }

  public handleChange(event) {
    console.log('changiiing')
    const name = event.target.name
    this.setState({ [name]: event.target.value })
  }

  public checkIfChannelLegit() {
    // TO DO figure out a way to do this without two calls - maybe scrapper
    axios.get(`https://api.twitch.tv/kraken/channels/${this.state.channelId}?client_id=y8n21fwws8pnf1jhlhdv6hplclr7sl`, { headers: { Accept: 'application/vnd.twitchtv.v5+' } })
      .then((res) => {
        this.setState({ channelName: res.data.display_name, logo: res.data.logo })
        axios.get(`https://api.twitch.tv/api/channels/${res.data.display_name}/panels?client_id=y8n21fwws8pnf1jhlhdv6hplclr7sl`)
          .then((res) => {
            const panels = res.data

            let foundPanel = false
            panels.forEach((panel) => {
              // to do replace w/ window.location for shorter code when not testing on locahost
              if (panel.data.link === `https://site/donate/${this.state.channelId}/${this.state.ethAddress}`) {
                foundPanel = true
              }
            })

            if (foundPanel !== false) {
              this.setState({ verified: true })
            }
          }).catch((err) => {
            // TO DO handle error message based on twitch error
          })
      }).catch((err) => {
      })
  }

  public handleSubmit(event) {
    console.log(this.state)
    if ((window as any).web3) {
      const web3 = new Web3((window as any).web3)
      web3.eth.getAccounts((err, accounts) => {
        web3.eth.sendTransaction({ from: accounts[0], to: this.state.ethAddress, value: Number(this.state.value) }, (err, res) => {
          // TO DO ERROR HANDLING
          if (err) {
            alert('Error occured - try again later' + err)
          } else {
            alert(`transaction confirmed / pending! Check status at https://etherscan.io/address/${accounts[0]}`)
          }
        })
      })
    } else {
      alert(`Download metamask or send eth manually to ${this.state.ethAddress}`)
    }

    event.preventDefault()
  }

  // figure out dat img- h2 align
  public render() {
    const message = `Donate Ethereum to ${this.state.channelName} with this URL.  ${window.location.href}`
    return (
      <div>
        {!this.state.verified &&
        <TopBanner color="#eb2b4f"
              message="This broadcaster has not yet activated their donation page."
              linkMessage="If this is your donation page, click here to activate!" />}
        {this.state.verified && <TopBanner color="#6572fd" message={message} />}
        <div style={wrapper}>
          <div>
            <img src={this.state.logo} height="50px" width="50px" style={{ display: 'inline-block' }} />
            <div style={{ display: 'inline-block', marginLeft: '100px', height: '50px' }}>
              <h2 style={h2}>{this.state.channelName}</h2>
            </div>
          </div>
          <form onSubmit={this.handleSubmit}>
            <div style={{ marginTop: '60px' }}>
              <label style={label}> Sender name: </label>
              <input type="text" style={input} name="name" value={this.state.name} onChange={this.handleChange} placeholder="Your nickname"/>
            </div>
            <div style={{ marginTop: '60px' }}>
              <label style={label}> Amount: </label>
              <input type="text" style={input} name="valueUSD" value={this.state.valueUSD} onChange={this.handleChange} placeholder="0.00  USD"/>
              </div>
            <div style={{ marginTop: '60px' }}>
              <label style={label}> Note: </label>
              <textarea name="message" value={this.state.message} style={textArea} rows={3} onChange={this.handleChange} placeholder="Write an optional message"/>
            </div>
            <input style={this.state.verified ? nextButton : {}} type="submit" disabled={!this.state.verified} value="Donate" />
          </form>
        </div>
      </div>
    )
  }
}

export default Donate
