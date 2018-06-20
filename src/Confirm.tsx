import { MDCRipple } from '@material/ripple'
import { AccountSettings } from 'components/AccountSettings'
import * as React from 'react'
import * as ReactModal from 'react-modal'
import { Redirect } from 'react-router'
import { Back } from './components/Back'
import { h2, h4, modal, nextButton, text, wrapper } from './components/styles/common'

type ConfirmProps = { routerProps: any }
type ConfirmState = {
  redirectPending: boolean,
  modalIsOpen: boolean,
  ethAddress: string,
  channelName: string,
  valueUSD: string,
  valueETH: string,
  message: string,
}

class Confirm extends React.Component<ConfirmProps, ConfirmState> {
  constructor(props) {
    super(props)
    this.state = {
      ...props.routerProps.location.state,
      redirectPending: false,
      modalIsOpen: false,
    }

    this.handleSubmit = this.handleSubmit.bind(this)
    this.openModal = this.openModal.bind(this)
    this.closeModal = this.closeModal.bind(this)
  }

  public componentDidMount() {
    MDCRipple.attachTo(document.querySelector('button'))
  }

  public openModal() {
    this.setState({ modalIsOpen: true })
  }

  public closeModal() {
    this.setState({ modalIsOpen: false })
  }

  public handleSubmit(event) {
    const web3 = (window as any).web3
    if (!web3) {
      this.openModal()
    } else {
      web3.eth.getAccounts((err, accounts) => {
        if (!accounts[0]) {
          this.openModal()
        } else {
          this.setState({ redirectPending: true })
        }
      })
    }
    event.preventDefault()
  }

  public render() {
    if (this.state.redirectPending) {
      return <Redirect to={{
        pathname: '/pending',
        state: this.state,
      }} />
    }

    return (
      <div style={wrapper}>
        <ReactModal
          isOpen={this.state.modalIsOpen}
          onRequestClose={this.closeModal}
          style={{ content: { ...modal.content, backgroundColor: '#ff1744' } }}
          contentLabel="Example Modal">

          <div style={{ textAlign: 'center', marginLeft: '80px', marginRight: '80px', marginTop: '80px' }}>
            <h2 style={{ ...h2, color: '#ffffff', lineHeight: '1.56' }}>Metamask error</h2>
            <p style={{ ...h4, color: 'white' }}>
              In order to complete this transaction,
              you must have Metamask installed and be logged in. If you don’t have Metamask yet, download it here.
            </p>
            <button className="mdc-button"
              style={{ ...nextButton, backgroundColor: 'white', color: '#ff1744', marginTop: '120px' }}
              onClick={this.closeModal}>
              CLOSE
            </button>
          </div>
        </ReactModal>
        <div style={{ marginTop: '-50px', marginRight: '-300px' }}>
          <Back history={this.props.routerProps.history} />
          <AccountSettings routerProps={this.props.routerProps} />
        </div>
        <h2 style={h2}>
          You're about to send&nbsp;
          <span style={{ color: '#6572fd' }}>{this.state.channelName} </span> {this.state.valueETH} ETH
        <span style={{ color: '#b0bec5' }}> ( about $ {Number(this.state.valueUSD).toFixed(2)} ) </span>
        </h2>
        <h4 style={{ ...h4, display: this.state.message ? 'block' : 'none' }}>
          "{this.state.message}"
        </h4>
        <div style={{ width: '480px' }}>
          <button className="mdc-button mdc-button--raised"
            style={nextButton} onClick={this.handleSubmit}>
            CONFIRM AND SEND WITH METAMASK
          </button>
          <p style={{ ...text, textAlign: 'center', fontWeight: 600, marginTop: '25px' }}>
            Don’t have Metamask? Download it&nbsp;
            <a href="https://metamask.io" style={{ color: '#6572fd', textDecoration: 'none' }}>here.</a>
          </p>
          <hr style={{ marginTop: '50px' }} />
          <p style={{ ...text, fontSize: '12px', textAlign: 'center' }}>
            Or, send funds directly to {this.state.channelName} ETH address: <br />
            <span style={{ color: '#6572fd', lineHeight: '3' }}>
              {this.state.ethAddress}
            </span>
          </p>
        </div>
      </div>
    )
  }
}

export default Confirm
