import axios from 'axios'
import * as React from 'react'
import * as Web3 from 'web3'
import { h2, input, label, nextButton, textArea, wrapper } from './components/styles/common'
import { TopBanner } from './components/TopBanner'

type DonateProps = { routerProps: any }
type DonateState = {
  channelId: string,
  ethAddress: string,
  name: string,
  message: string,
  value: string,
  channelName: string,
  logo: string,
  verified: boolean,
  valueETH: string,
  valueUSD: string,
}

class Donate extends React.Component<DonateProps, DonateState> {
  constructor(props: DonateProps) {
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
    const name = event.target.name
    this.setState({ [name]: event.target.value })
  }

  public async checkIfChannelLegit() {
    // TO DO figure out a way to do this without two calls - maybe scrapper
    try {
      const channelInfo = await axios.get(
        `https://api.twitch.tv/kraken/channels/${this.state.channelId}?client_id=y8n21fwws8pnf1jhlhdv6hplclr7sl`,
        { headers: { Accept: 'application/vnd.twitchtv.v5+' } })
      this.setState({ channelName: channelInfo.data.display_name, logo: channelInfo.data.logo })

      const panelInfo = await axios.get(
        `https://api.twitch.tv/api/channels/${channelInfo.data.display_name}/
  panels?client_id=y8n21fwws8pnf1jhlhdv6hplclr7sl`)
      const panels = panelInfo.data

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
    } catch (err) {
      throw err
    }
  }

  public handleSubmit(event) {
    if ((window as any).web3) {
      const web3 = new Web3((window as any).web3)
      web3.eth.getAccounts((err, accounts) => {
        web3.eth.sendTransaction(
          { from: accounts[0], to: this.state.ethAddress, value: Number(this.state.value) },
          (err2, res) => {
            // TO DO ERROR HANDLING
            if (err2) {
              alert('Error occured - try again later' + err2)
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
              <input
                type="text"
                style={input}
                name="name"
                value={this.state.name}
                onChange={this.handleChange}
                placeholder="Your nickname"
              />
            </div>
            <div style={{ marginTop: '60px' }}>
              <label style={label}> Amount: </label>
              <input
                type="text"
                style={input}
                name="valueUSD"
                value={this.state.valueUSD}
                onChange={this.handleChange}
                placeholder="0.00  USD"
              />
              </div>
            <div style={{ marginTop: '60px' }}>
              <label style={label}> Note: </label>
              <textarea
                name="message"
                value={this.state.message}
                style={textArea}
                rows={3}
                onChange={this.handleChange}
                placeholder="Write an optional message"
              />
            </div>
            <input
              style={this.state.verified ? nextButton : {}}
              type="submit" disabled={!this.state.verified} value="Donate"
            />
          </form>
        </div>
      </div>
    )
  }
}

export default Donate
