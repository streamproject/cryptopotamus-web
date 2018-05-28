import { MDCRipple } from '@material/ripple'
import * as React from 'react'
import * as ReactModal from 'react-modal'
import {
  boxStyle,
  h1,
  h2,
  nextButton,
  purpleButtonText,
  text,
  whiteButton,
} from './components/styles/common'
import { auth, users } from './utils/ApiUtils'

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
    boxShadow: '32px 32px 16px 0 rgba(0, 0, 0, 0.1)',
  },
}

type HomeProps = { routerProps: any }
type HomeState = {
  modalIsOpen: boolean,
  user: any,
  loading: boolean,
}

class Home extends React.Component<HomeProps, HomeState> {
  constructor(props) {
    super(props)
    this.state = {
      modalIsOpen: false,
      user: null,
      loading: true,
    }

    this.openModal = this.openModal.bind(this)
    this.closeModal = this.closeModal.bind(this)
  }

  public componentDidMount() {
    const buttons = Array.from(document.querySelectorAll('button'))
    buttons.forEach((button) => {
      MDCRipple.attachTo(button)
    })
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

  public closeModal() {
    this.setState({ modalIsOpen: false })
  }

  public render() {

    return (
      <div style={{ display: !this.state.loading ? 'block' : 'none' }}>
        <div>
          <div style={{ textAlign: 'right', paddingRight: '80px', marginTop: '50px' }}>
            <a href={auth.twitchLogin}>
              <button className="mdc-button mdc-button--unelevated" style={{ ...boxStyle, width: '160px' }}>
                LOGIN
              </button>
            </a>
          </div>
          <div style={{ paddingLeft: '10%' }}>
            <p style={{ ...text, fontWeight: 600 }}>
              The Cryptopotamus Project<br /> by the
              <a href="https://streamtoken.net/"
                style={{ textDecoration: 'none' }}>
                <span style={{ color: '#6572fd' }}> Stream Team </span>
              </a>
            </p>
          </div>
        </div>
        <div style={{ marginTop: '200px' }}>
          <div style={{ width: '80%', textAlign: 'left', marginLeft: 'auto', marginRight: 'auto' }}>
            <h1 style={h1}> Accept Ethereum on your Twitch stream - with alerts </h1>
            <div>
              <button className="mdc-button mdc-button--raised" onClick={this.openModal} style={nextButton}>
                GET STARTED
              </button>
            </div>
          </div >

          <ReactModal
            isOpen={this.state.modalIsOpen}
            onRequestClose={this.closeModal}
            style={customStyles}
            appElement={document.getElementById('root')}
            contentLabel="Get Started">
            <div style={{ textAlign: 'center', marginLeft: '80px', marginRight: '80px', marginTop: '80px' }}>
              <h2 style={{ ...h2, color: '#ffffff', lineHeight: '1.56' }}> To get started, login with Twitch </h2>
              <a href={auth.twitchLogin} style={{ textDecoration: 'none' }}>
                <button style={{ ...whiteButton, marginTop: '100px' }} className="mdc-button mdc-button--unelevated">
                  <span style={purpleButtonText}>LOGIN WITH TWITCH</span>
                </button>
              </a>
            </div>

          </ReactModal>
        </div>
      </div>
    )
  }
}

export default Home
