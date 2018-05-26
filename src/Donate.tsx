import { MDCRipple } from '@material/ripple'
import axios from 'axios'
import * as React from 'react'
import * as ReactModal from 'react-modal'
import * as OpenInNew from './assets/openInNew.png'
import { AccountSettings } from './components/AccountSettings'
import {
  box,
  disabledNextButton, h2, h4, input, label, nextButton, rightPlaceholder, text, textArea, wrapper,
} from './components/styles/common'
import { TopBanner } from './components/TopBanner'
import { users } from './utils/ApiUtils'

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
  course: number,
  modalSetupIsOpen: boolean,
  modalConfirmedIsOpen: boolean,
  txHash: string,
  slicedTxHash: string,
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
    boxShadow: '32px 32px 16px 0 rgba(0, 0, 0, 0.1)',
  },
}

let css

class Donate extends React.Component<DonateProps, DonateState> {
  constructor(props: DonateProps) {
    super(props)

    let justCreated = false
    let txConfirmed = false
    if (this.props.routerProps.location.state) {
      if (props.routerProps.location.state.justCreated) {
        justCreated = true
      }
      if (props.routerProps.location.state.txHash) {
        txConfirmed = true
      }
    }
    const { channelId } = props.routerProps.match.params

    this.state = {
      channelId,
      ethAddress: '',
      name: '',
      message: '',
      value: '',
      channelName: '',
      logo: '',
      verified: channelId ? false : true,
      valueETH: '',
      valueUSD: '',
      loading: channelId ? true : false,
      selectedOption: '',
      redirectSettings: false,
      redirectLogout: false,
      redirectConfirm: false,
      modalSetupIsOpen: justCreated,
      modalConfirmedIsOpen: txConfirmed,
      course: null,
      txHash: txConfirmed ? props.routerProps.location.state.txHash : '',
      slicedTxHash: txConfirmed ? props.routerProps.location.state.slicedTxHash : '',
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.openModal = this.openModal.bind(this)
    this.closeModal = this.closeModal.bind(this)
  }

  public componentDidMount() {
    MDCRipple.attachTo(document.querySelector('button'))
  }

  public openModal(name) {
    if (name === 'setup') {
      this.setState({ modalSetupIsOpen: true })
    } else {
      this.setState({ modalConfirmedIsOpen: true })
    }
  }

  public closeModal(name) {
    if (name === 'setup') {
      this.setState({ modalSetupIsOpen: false })
    } else {
      this.setState({ modalConfirmedIsOpen: false })
    }
  }

  public decimalPlaces(num) {
    const match = num.match(/(?:\.(\d+))?(?:[eE]([+-]?\d+))?$/)
    if (!match) { return 0 }
    return Math.max(
      0,
      // Number of digits right of decimal point.
      (match[1] ? match[1].length : 0)
      // Adjust for scientific notation.
      - (match[2] ? +match[2] : 0))
  }

  public async componentWillMount() {
    css = document.createElement('style')
    document.body.appendChild(css)
    css.innerHTML = `.Select-placeholder
{color: #6572fd; font-family: Work Sans; font-size:16px; line-height: 50px; letter-spacing: -0.8px;}
body{ background-color: 'white'}`
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
    axios.get('https://api.infura.io/v1/ticker/ethusd').then((res) => {
      this.setState({ course: res.data.bid })
    })

  }

  public componentWillUnmount() {
    css.innerHTML = ''
  }
  /*tslint:disable*/
  public checkInvalidCharacters(value) {
    const regex = /^[a-zA-Z0-9_]+$/
    return !regex.test(value)
  }

  public handleChange(event) {
    const name = event.target.name
    if (name !== 'valueUSD' && name !== 'valueETH' && name !=='name') {
      this.setState({ [name]: event.target.value })
    } else {
      if (name === 'valueUSD') {
        const val = Number(event.target.value)
        const eth = val / this.state.course

        if (!isNaN(val) && this.decimalPlaces(event.target.value) <= 2) {
          this.setState({ [name]: event.target.value, valueETH: eth.toString() })
        }
      } else if (name === 'valueETH') {
        const val = Number(event.target.value)
        const usd = val * this.state.course

        this.setState({ [name]: event.target.value, valueUSD: usd.toString() })
      } else if (name === 'name') {
        const value = event.target.value
        if (value.length <= 25 && !this.checkInvalidCharacters(value)) {
          this.setState({ [name]: event.target.value })
        }
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
          isOpen={this.state.modalSetupIsOpen}
          onRequestClose={() => this.closeModal('setup')}
          style={customStyles}
          contentLabel="Example Modal">

          <div style={{ textAlign: 'center', marginLeft: '80px', marginRight: '80px', marginTop: '80px' }}>
            <h2 style={{ ...h2, color: '#ffffff', lineHeight: '1.56' }}>Congruntulations.</h2>
            <p style={{ ...h4, color: 'white' }}>
              You now have an Ethereum donation page!
              This is the unique URL to your tip page where viewers can send you donations:
            </p>
            <div style={{ ...box, height: '50px', padding: 'none', width: '400px' }}>
              <p style={{ ...text, color: 'white', lineHeight: '50px', padding: '0px', margin: '0px' }}>{url}</p>
            </div>
            <button className="mdc-button"
              style={{ ...nextButton, backgroundColor: 'white', color: '#6572fd', marginTop: '120px' }}
              onClick={() => this.closeModal('setup')}>
              GOT IT
            </button>
          </div>
        </ReactModal>
        <ReactModal
          isOpen={this.state.modalConfirmedIsOpen}
          onRequestClose={() => this.closeModal('confirmed')}
          style={customStyles}
          contentLabel="Payment completed">

          <div style={{ textAlign: 'center', marginLeft: '80px', marginRight: '80px', marginTop: '80px' }}>
            <h2 style={{ ...h2, color: '#ffffff', lineHeight: '1.56' }}>Yasssssssss!</h2>
            <p style={{ ...h4, color: 'white' }}>
              Your tip has been processed.
  Ethereum transactions may take several minutes to be written to the blockchain —
  You can check the transaction status here:
            </p>
            <div style={{ ...box, height: '50px', padding: 'none', width: '400px' }}>
              <p
                style={{
                  ...text,
                  color: 'white',
                  lineHeight: '50px',
                  padding: '0px',
                  margin: '0px',
                  display: 'inline-block',
                }}>
                https://etherscan.io/tx/{this.state.slicedTxHash}...
              </p>
              <a href={`https://etherscan.io/tx/${this.state.txHash}`}
                style={{ lineHeight: '50px', verticalAlign: 'middle' }} target="_blank">
                <img src={OpenInNew}
                  height="22px"
                  width="22px"
                  style={{ display: 'inline-block', cursor: 'pointer', marginLeft: '30px' }}></img>
              </a>
            </div>
            <button className="mdc-button"
              style={{ ...nextButton, backgroundColor: 'white', color: '#6572fd', marginTop: '120px' }}
              onClick={this.closeModal}>
              GOT IT
            </button>
          </div>
        </ReactModal>
        {!this.state.verified &&
          <TopBanner color="#eb2b4f"
            message="This broadcaster has not yet activated their donation page." />}
        {this.state.verified && <TopBanner color="#6572fd" message={message} />}
        <AccountSettings routerProps={this.props.routerProps} />
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
            <div style={{ marginTop: '60px', textAlign: 'justify' }}>
              <label style={{ ...label, color: this.state.verified ? '#6572fd' : '#f3a4b7' }}> Amount: </label>
              <br />
              <div style={{
                display: 'inline-block',
                position: 'relative',
                width: '40%',
                maxWidth: '480px',
                marginRight: '32px',
              }}>
                <input
                  type="text"
                  style={{ ...input, width: '100%' }}
                  name="valueUSD"
                  value={this.state.valueUSD}
                  onChange={this.handleChange}
                  placeholder="0.00"
                />
                <span style={rightPlaceholder}> USD </span>
              </div>
              <div style={{ display: 'inline-block', textAlign: 'center', width: '50px', position: 'relative' }}>
                <img src="https://i.snag.gy/LE3ATD.jpg" />
              </div>
              <div style={{ display: 'inline-block', position: 'relative', width: '40%', maxWidth: '480px' }}>
                <input
                  type="text"
                  style={{ ...input, width: '100%' }}
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
            <button className="mdc-button mdc-button--raised"
              type="submit"
              style={this.state.verified ? nextButton : disabledNextButton}
              disabled={!this.state.verified}>
              DONATE
            </button>
          </form>
        </div>
      </div >
    )
  }
}

export default Donate
