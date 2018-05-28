
import BigNumber from 'bignumber.js'
import * as React from 'react'
import { Redirect } from 'react-router-dom'
import * as Web3 from 'web3'
import { h2 } from './components/styles/common'
import { users } from './utils/ApiUtils'

let css

type PendingProps = { routerProps: any }
type PendingState = {
  txHash: string,
  slicedTxHash: string,
  modalIsOpen: boolean,
  valueETH: string,
  valueUSD: string,
  ethAddress: string,
  message: string,
  name: string,
}

class Pending extends React.Component<PendingProps, PendingState> {
  constructor(props) {
    super(props)
    this.state = { ...props.routerProps.location.state, modalIsOpen: false }

    css = document.createElement('style')
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
                await users.sendTx(txHash, this.state.message, this.state.name, value, this.state.valueUSD)
              } catch (err) {
                //
              }
              this.setState({ slicedTxHash: txHash.slice(0, 7), txHash, modalIsOpen: true })
            }
          })
      } catch (err) {
        alert(err)
      }
    })
  }

  public componentWillUnmount() {
    css.innerHTML = ''
  }
  public openModal() {
    this.setState({ modalIsOpen: true })
  }

  public closeModal() {
    this.setState({ modalIsOpen: false })
  }

  public render() {
    if (this.state.modalIsOpen) {
      return <Redirect
        to={{ pathname: '/donate', state: { txHash: this.state.txHash, slicedTxHash: this.state.slicedTxHash } }} />
    }
    return (
      <div>
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
