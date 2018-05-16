import axios from 'axios'
import * as React from 'react'
import * as ReactModal from 'react-modal'
import { AccountSettings } from './components/AccountSettings'
import {
  box,
  disabledNextButton, h2, h4, input, label, nextButton, rightPlaceholder, text, textArea, wrapper,
} from './components/styles/common'
import { TopBanner } from './components/TopBanner'
import { users } from './utils/ApiUtils'
/* tslint:disable */
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
  loading: boolean,
  selectedOption: string,
  redirectSettings: boolean,
  redirectLogout: boolean,
  redirectConfirm: boolean,
  modalIsOpen: boolean,
}

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    height: '750px',
    width: '640px',
    border: 'none',
    backgroundColor: '#6572fd',
    padding: '0px',
  },
}

class Donate extends React.Component<DonateProps, DonateState> {
  constructor(props: DonateProps) {
    super(props)

    let justCreated = false
    if (props.routerProps.location.state)
      justCreated = true

    this.state = {
      channelId: props.routerProps.match.params.channelId,
      ethAddress: '',
      name: '',
      message: '',
      value: '',
      channelName: '',
      logo: '',
      verified: false,
      valueETH: '',
      valueUSD: '',
      loading: true,
      selectedOption: '',
      redirectSettings: false,
      redirectLogout: false,
      redirectConfirm: false,
      modalIsOpen: justCreated
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.onSelect = this.onSelect.bind(this)
    this.openModal = this.openModal.bind(this)
    this.closeModal = this.closeModal.bind(this)
  }

  public openModal() {
    this.setState({ modalIsOpen: true })
  }


  public closeModal() {
    this.setState({ modalIsOpen: false })
  }

  public async componentWillMount() {
    const css = document.createElement('style')
    document.body.appendChild(css)
    css.innerHTML = `.Select-placeholder
{color: #6572fd; font-family: Work Sans; font-size:16px; line-height: 50px; letter-spacing: -0.8px;}`
    try {
      const user = await users.findUserById(this.state.channelId)
      if (user) {
        const twitchData = await users.meById(this.state.channelId)
        this.setState({
          verified: true,
          loading: false,
          channelName: twitchData.data.display_name,
          logo: twitchData.data.logo,
          ethAddress: user.data.eth_address,
        })
      } else {
        this.setState({ loading: false })
      }
    } catch (err) {
      //
    }

  }

  public onSelect = (selectedOption) => {
    if (selectedOption.value === 'settings') {
      this.setState({ redirectSettings: true })
    } else {
      this.setState({ redirectLogout: true })
    }
  }

  public handleChange(event) {
    const name = event.target.name
    if (name !== 'valueUSD' && name !== 'valueETH') {
      this.setState({ [name]: event.target.value })
    } else {
      if (name === 'valueUSD') {
        const val = Number(event.target.value)
        axios.get('https://api.infura.io/v1/ticker/ethusd').then((res) => {
          const eth = val / res.data.bid
          this.setState({ [name]: val, valueETH: eth.toString() })
        })
      } else {
        const val = Number(event.target.value)
        axios.get('https://api.infura.io/v1/ticker/ethusd').then((res) => {
          const usd = val * res.data.bid
          this.setState({ [name]: val, valueUSD: usd.toString() })
        })
      }
    }
  }

  public handleSubmit(event) {
    if (this.state.verified) {
      this.setState({ redirectConfirm: true })
    }
    event.preventDefault()
  }

  public render() {
    const message = `Donate Ethereum to ${this.state.channelName} with this URL.  ${window.location.href}`
    const url = `https://cryptopotam.us/${this.state.channelId}`
    if (this.state.redirectSettings) {
      this.props.routerProps.history.push('/settings')
    }
    if (this.state.redirectConfirm) {
      this.props.routerProps.history.push({ pathname: '/confirm', state: this.state })
    }

    return (
      <div style={{ display: this.state.loading ? 'none' : 'block' }}>
        <ReactModal
          isOpen={this.state.modalIsOpen}
          onRequestClose={this.closeModal}
          style={customStyles}
          contentLabel="Example Modal">

          <div style={{ textAlign: 'center', marginLeft: '80px', marginRight: '80px', marginTop: '80px' }}>
            <h2 style={{ ...h2, color: '#ffffff', lineHeight: '1.56' }}>Congruntulations.</h2>
            <p style={{ ...h4, color: 'white' }}>
              You now have an Ethereum donation page! This is the unique URL to your tip page where viewers can send you donations:
            </p>
            <div style={{...box, height: '50px', padding: 'none', width: '400px'}}>
              <p style={{...text, color: 'white', lineHeight: '50px', padding: '0px', margin: '0px'}}>{url}</p>
            </div>
            <button style={{ ...nextButton, backgroundColor: 'white', color:'#6572fd', marginTop: '120px' }} onClick={this.closeModal}>GOT IT</button>
          </div>
        </ReactModal>
        {!this.state.verified &&
          <TopBanner color="#eb2b4f"
            message="This broadcaster has not yet activated their donation page." />}
        {this.state.verified && <TopBanner color="#6572fd" message={message} />}
        <AccountSettings onSelect={this.onSelect} />
        <div style={wrapper}>
          <div>
            <img src={this.state.logo} height="50px" width="50px" style={{ display: 'inline-block' }} />
            <div style={{ display: 'inline-block', marginLeft: '100px', height: '50px' }}>
              <h2 style={h2}>{this.state.channelName}</h2>
            </div>
          </div>
          <form onSubmit={this.handleSubmit}>
            <div style={{ marginTop: '60px' }}>
              <label style={{ ...label, color: this.state.verified ? '#6572fd' : '#f3a4b7' }}> Sender name: </label>
              <br />
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
              <label style={{ ...label, color: this.state.verified ? '#6572fd' : '#f3a4b7' }}> Amount: </label>
              <br />
              <div style={{ display: 'inline-block', position: 'relative' }}>
                <input
                  type="text"
                  style={{ ...input, display: 'inline-block' }}
                  name="valueUSD"
                  value={this.state.valueUSD}
                  onChange={this.handleChange}
                  placeholder="0.00"
                />
                <span style={rightPlaceholder}> USD </span>
              </div>
              <img src="https://i.snag.gy/LE3ATD.jpg"
                style={{ display: 'inline-block', marginLeft: '10px', marginRight: '10px' }} />
              <div style={{ display: 'inline-block', position: 'relative' }}>
                <input
                  type="text"
                  style={input}
                  name="valueETH"
                  value={this.state.valueETH}
                  onChange={this.handleChange}
                  placeholder="0.00"
                />
                <span style={rightPlaceholder}> ETH </span>
              </div>
            </div>
            <div style={{ marginTop: '60px' }}>
              <label style={{ ...label, color: this.state.verified ? '#6572fd' : '#f3a4b7' }}> Note: </label>
              <br />
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
              style={this.state.verified ? nextButton : disabledNextButton}
              type="submit" disabled={!this.state.verified} value="DONATE"
            />
          </form>
        </div>
      </div >
    )
  }
}

export default Donate
