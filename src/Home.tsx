import axios from 'axios'
import * as React from 'react'
import * as ReactModal from 'react-modal'
import {
  boxStyle,
  buttonStyle,
  buttonTextStyle,
  h1,
  h2,
  purpleButtonText,
  text,
  whiteButton,
} from './components/styles/common'
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
    height: '500px',
    width: '640px',
    border: 'none',
    backgroundColor: '#6572fd',
    padding: '0px',
    boxShadow: '32px 32px 16px 0 rgba(0, 0, 0, 0.1)'
  },
}

class Home extends React.Component<any, any> {
  constructor(props) {
    super(props)
    this.state = {
      modalIsOpen: false,
      user: null,
      loading: true,
    }

    this.openModal = this.openModal.bind(this)
    this.afterOpenModal = this.afterOpenModal.bind(this)
    this.closeModal = this.closeModal.bind(this)
  }

  public async componentWillMount() {
    const user = await users.me()

    if (user) {
      this.setState({ user: user.data, loading: false })
    } else {
      this.setState({ loading: false })
    }
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
      <div style={{ display: !this.state.loading ? 'block' : 'none' }}>
        <div>
          <div style={{ textAlign: 'right', paddingRight: '80px', marginTop: '50px' }}>
            <a href="http://0.0.0.0:8000/api/v1/auth/twitch">
              <button style={{ ...boxStyle, background: 'none', width: '160px' }}>
                LOGIN
              </button>
            </a>
          </div>
          <div style={{ paddingLeft: '10%' }}>
            <p style={{ ...text, fontWeight: 600 }}>
              The Cryptopotamus Project<br />
              by the <span style={{ color: '#6572fd' }}> Stream Team </span>
            </p>
          </div>
        </div>
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
            appElement={document.getElementById('root')}
            contentLabel="Get Started">
            <div style={{ textAlign: 'center', marginLeft: '80px', marginRight: '80px', marginTop: '80px' }}>
              <h2 style={{ ...h2, color: '#ffffff', lineHeight: '1.56' }}> Create an account </h2>
              <a
                href="http://0.0.0.0:8000/api/v1/auth/twitch"
                onClick={this.twitchLogin}
                style={{ textDecoration: 'none' }}
              >
                <div style={{ ...whiteButton, marginTop: '200px' }}>
                  <span style={purpleButtonText}>LOGIN WITH TWITCH</span>
                </div>
              </a>
            </div>

          </ReactModal>
        </div>
      </div>
    )
  }
}

export default Home
