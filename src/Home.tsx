import axios from 'axios'
import * as React from 'react'
import * as ReactModal from 'react-modal'
import { buttonStyle, buttonTextStyle, h1, h2, purpleButtonText, whiteButton } from './components/styles/common'

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    height: '500px',
    width: '640px',
    border: 'none',
    backgroundColor: '#6572fd',
    padding: '0px',
  },
}

class Home extends React.Component<any, any> {
  constructor(props) {
    super(props)
    this.state = {
      modalIsOpen: false,
    }

    this.openModal = this.openModal.bind(this)
    this.afterOpenModal = this.afterOpenModal.bind(this)
    this.closeModal = this.closeModal.bind(this)
  }

  public openModal() {
    this.setState({ modalIsOpen: true })
  }

  public afterOpenModal() {
    // references are now sync'd and can be accessed.
  }

  public closeModal() {
    this.setState({ modalIsOpen: false })
  }

  public twitchLogin() {
    axios.get('http://0.0.0.0:8000/api/v1/auth/twitch').then(((res) => {
      // console.log(res.data)
    }))
  }

  public render() {
    return (
      <div style={{ marginTop: '200px' }}>
        <div style={{ width: '80%', textAlign: 'left', marginLeft: 'auto', marginRight: 'auto' }}>
          <h1 style={h1}> Accept Ethereum on your Twitch stream - with alerts </h1>
          <div>
            <button style={buttonStyle} onClick={this.openModal}>
              <span style={buttonTextStyle}>GET STARTED</span>
            </button>
          </div>
        </div >

        <ReactModal
          isOpen={this.state.modalIsOpen}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeModal}
          style={customStyles}
          contentLabel="Example Modal">

          <div style={{ textAlign: 'center', marginLeft: '80px', marginRight: '80px', marginTop: '80px' }}>
            <h2 style={{ ...h2,  color: '#ffffff', lineHeight: '1.56' }}>To get started,<br /> login with Twitch.</h2>
            <a
              href="http://0.0.0.0:8000/api/v1/auth/twitch"
              onClick={this.twitchLogin}
              style={{ textDecoration: 'none' }}
            >
              <div style={{ ...whiteButton, marginTop: '100px' }}>
              <span style={purpleButtonText}>LOGIN WITH TWITCH</span>
              </div>
            </a>
          </div>

        </ReactModal>
      </div >
    )
  }
}

export default Home
