import { AccountSettings } from 'components/AccountSettings'
import * as React from 'react'
import * as ReactModal from 'react-modal'
import { Redirect } from 'react-router'
import { Back } from './components/Back'
import { h2, h4, nextButton, wrapper } from './components/styles/common'

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
    backgroundColor: '#ff1744',
    padding: '0px',
  },
}

/* tslint:disable */
class Confirm extends React.Component<any, any> {
  constructor(props) {
    super(props)
    this.state = { ...props.routerProps.location.state, redirectPending: false }

    this.handleSubmit = this.handleSubmit.bind(this)
    this.openModal = this.openModal.bind(this)
    this.closeModal = this.closeModal.bind(this)
  }

  public openModal() {
    this.setState({ modalIsOpen: true })
  }


  public closeModal() {
    this.setState({ modalIsOpen: false })
  }

  public handleSubmit(event) {
    if ((window as any).web3) {
      this.setState({ redirectPending: true })
    } else {
      this.openModal()
    }
    event.preventDefault()
  }

  public render() {
    if (this.state.redirectPending) {
      return <Redirect to={{
        pathname: '/pending',
        state: this.state
      }} />
    }
    return (
      <div style={wrapper}>
        <ReactModal
          isOpen={this.state.modalIsOpen}
          onRequestClose={this.closeModal}
          style={customStyles}
          contentLabel="Example Modal">

          <div style={{ textAlign: 'center', marginLeft: '80px', marginRight: '80px', marginTop: '80px' }}>
            <h2 style={{ ...h2, color: '#ffffff', lineHeight: '1.56' }}>Metamask error</h2>
            <p style={{ ...h4, color: 'white' }}>
              In order to complete this transaction,
  you must have Metamask installed and enabled. If you don’t have Metamask, you can download it here.
            </p>
            <button style={{ ...nextButton, backgroundColor: 'white', color: '#ff1744', marginTop: '120px' }} onClick={this.closeModal}>CLOSE</button>
          </div>
        </ReactModal>
        <div style={{ marginTop: '-50px', marginRight: '-300px' }}>
          <Back history={this.props.routerProps.history} />
          <AccountSettings />
        </div>
        <h2 style={h2}>
          You're about to send <span style={{ color: '#6572fd' }}>{this.state.channelName}</span> {this.state.valueETH} ETH
        <span style={{ color: '#b0bec5' }}> ( about $ {this.state.valueUSD} ) </span>
        </h2>
        <h4 style={h4}>
          "{this.state.message}"
        </h4>
        <button style={nextButton} onClick={this.handleSubmit}>
          CONFIRM AND SEND WITH METAMASK
        </button>
      </div>
    )
  }
}

export default Confirm
