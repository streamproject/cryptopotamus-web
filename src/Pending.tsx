
import BigNumber from 'bignumber.js'
import * as React from 'react'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import * as ReactModal from 'react-modal'
import * as Web3 from 'web3'
import { box, h2, h4, nextButton, text } from './components/styles/common'
import { users } from './utils/ApiUtils'

/*tslint:disable*/
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
    txHash: ''
  },
}

class Pending extends React.Component<any, any> {
  constructor(props) {
    super(props)
    this.state = { ...props.routerProps.location.state, modalIsOpen: false }
    console.log(this.state)
    const css = document.createElement('style')
    document.body.appendChild(css)
    css.innerHTML = `body {background: #6572fd;}`

    this.openModal = this.openModal.bind(this)
    this.closeModal = this.closeModal.bind(this)
  }

  public componentDidMount() {

    const web3 = new Web3((window as any).web3)
    web3.eth.getAccounts((err, accounts) => {
      let value = new BigNumber(this.state.valueETH)
      value = value.times(1000000000000000000).integerValue()
      try {
        web3.eth.sendTransaction(
          { from: accounts[0], to: this.state.ethAddress, value },
          async (err2, txHash) => {
            if (err2) {
              alert('Error occured - try again later' + err2)
            } else {
              try {
                users.sendTx(txHash, this.state.message, this.state.name, value)
              } catch (err) {
                alert(err)
              }
              this.setState({ slicedTxHash: txHash.slice(0, 7), txHash, modalIsOpen: true })
            }
          })
      } catch (err) {
        alert(err)
      }
    })
  }

  public openModal() {
    this.setState({ modalIsOpen: true })
  }

  public closeModal() {
    this.setState({ modalIsOpen: false })
  }

  public render() {
    return (
      <div>
        <ReactModal
          isOpen={this.state.modalIsOpen}
          onRequestClose={this.closeModal}
          style={customStyles}
          contentLabel="Example Modal">

          <div style={{ textAlign: 'center', marginLeft: '80px', marginRight: '80px', marginTop: '80px' }}>
            <h2 style={{ ...h2, color: '#ffffff', lineHeight: '1.56' }}>Yasssssssss!</h2>
            <p style={{ ...h4, color: 'white' }}>
              Your tip has been processed.
  Ethereum transactions may take several minutes to be written to the blockchain —
  You can check the transaction status here:
            </p>
            <div style={{ ...box, height: '50px', padding: 'none', width: '400px' }}>
              <p style={{ ...text, color: 'white', lineHeight: '50px', padding: '0px', margin: '0px', display: 'inline-block' }}>
                https://etherscan.io/tx/{this.state.slicedTxHash}...
              </p>
              <CopyToClipboard text={`https://etherscan.io/tx/${this.state.txHash}`}
                onCopy={() => this.setState({ copied: true })}>
                <img src="https://cdn.pbrd.co/images/HlD5LLL.png" height='22px' width='22px' style={{ lineHeight: '50px', display: 'inline-block', cursor: 'pointer', marginLeft: '40px' }}></img>
              </CopyToClipboard>
            </div>
            <button style={{ ...nextButton, backgroundColor: 'white', color: '#6572fd', marginTop: '120px' }}
              onClick={this.closeModal}>
              GOT IT
            </button>
          </div>
        </ReactModal>
        <div style={{ float: 'right', marginRight: '80px', marginTop: '200px', width: '800px' }}>
          <h2 style={{ ...h2, color: 'white' }}>
            Complete your transaction using the Metamask extension
        </h2>
        </div>
      </div>
    )
  }
}

export default Pending
