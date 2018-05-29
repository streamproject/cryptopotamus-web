import { MDCRipple } from '@material/ripple'
import * as React from 'react'
import * as ReactModal from 'react-modal'
import { Link } from 'react-router-dom'
import {
  BigColumn,
  boxStyle,
  h1,
  h2,
  label,
  nextButton,
  purpleButtonText,
  SmallColumn,
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

const HowStep = (props: {
  number: number,
  description: string,
  details: string,
}) => (
    <div style={{
      marginBottom: '100px',
      display: 'flex',
    }}>
      <div style={{
        width: '100px',
        height: '100px',
        backgroundColor: '#f6f9fb',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: '60px',
      }}>
        <div style={{
          fontSize: '48px',
          fontWeight: 600,
          color: '#b0bec5',
        }}>
          {props.number}
        </div>
      </div>
      <div>
        <div style={{
          fontSize: '24px',
          fontWeight: 500,
          lineHeight: 2.08,
          letterSpacing: '-0.8px',
          color: '#6572fd',
        }}>
          {props.description}
        </div>
        <div style={{
          fontSize: '16px',
          lineHeight: 1.56,
          letterSpacing: '-0.5px',
        }}>
          {props.details}
        </div>
      </div>
    </div>
  )

const QuestionAnswer = (props: { question: string, answer: React.ReactNode }) => (
  <div style={{ marginTop: '150px' }}>
    <h2 style={h2}>{props.question}</h2>
    <p style={{ ...text, fontSize: '24px', lineHeight: '50px', letterSpacing: '-0.8px' }}>
      {props.answer}
    </p>
  </div>
)

const questionAnswerContent = [
  {
    question: 'What is Ethereum?',
    answer: (
      <span>
        It is a <a href="https://www.youtube.com/watch?v=ptLfwp6JYgk" target="_blank">cryptocurrency</a>.
      </span>
    ),
  },
  {
    question: 'What is a cryptocurrency?',
    answer: (
      <span>
        We'll let <a href="https://www.youtube.com/watch?v=IJWGuGRbxec"
          target="_blank">these guys</a> explain it.
      </span>
    ),
  },
  {
    question: 'Do I have to pay anything?',
    answer: (
      <span>
        No. Unlike other Twitch integrations, we use <a
          href="https://metamask.io/" target="_blank">Metamask</a> to accept
        payments, meaning the only costs involved are the <a
          href="https://ethereum.stackexchange.com/questions/3/what-is-meant-by-the-term-gas"
          target="_blank">miniscule gas costs</a> supporters pay as
        part of accessing the Ethereum blockchain. This avoids
        the 2-4% transactions fees involved in using centralized
        services like Paypal and Coinbase.
      </span>
    ),
  },
  {
    question: 'Why is it free?',
    answer: (
      <span>
        There’s a strong ethos of making things freely available in crypto and this
        has partially motivated the creation of Cryptopotamus. There is a small gas
        cost associated with using the Ethereum network when viewers send donations
        but Cryptopotamus itself is free - because we wanted to give back to the
        community and help content creators earn a living with cryptocurrency.
      </span>
    ),
  },
  {
    question: 'What will happen to Cryptopotamus in the future?',
    answer: (
      <span>
        Cryptopotamus was created by the team from the <a
          href="https://www.streamtoken.net" target="_blank">Stream</a> project, which
        shut down in May 2018. However, it’s open source so you can help improve it
        on <a href="https://github.com/streamproject" target="_blank">Github</a> if you want to!
      </span>
    ),
  },
  {
    question: 'But — I want to contact the creators!',
    answer: (
      <a href="mailto:streamtokenproject@gmail.com" target="_blank">Ok fine then.</a>
    ),
  },
]

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
        <div style={{ ...BigColumn, marginTop: '200px' }}>
          <h1 style={h1}> Accept Ethereum on your Twitch stream - with alerts </h1>
          <div>
            <button className="mdc-button mdc-button--raised" onClick={this.openModal} style={nextButton}>
              GET STARTED
            </button>
          </div>
          <div style={{ ...SmallColumn, marginTop: '250px' }}>
            <h2 style={h2}>How does it work?</h2>
            <p style={{ marginTop: '100px', ...text, fontSize: '24px', lineHeight: '50px', letterSpacing: '-0.8px' }}>
              We help you set up a crypto-donation page in 3 easy steps.
              When someone wants to send you Ethereum, they can go to your
              unique donation page to pay you directly using <a
                href="https://metamask.io/" target="_blank">Metamask</a>, a
              browser plugin that connects to the Ethereum blockchain. If
              you set up StreamLabs alerts, you’ll also get real-time
              in-stream alerts so you can thank your supporters for their
              contributions.
              <br />
              <br />
              Oh, and because this is open-source, Cryptopotamus takes no
              fees. Ever.
            </p>

            <h2 style={{ ...h2, marginTop: '200px', marginBottom: '100px' }}>
              How do I set it up?
            </h2>
            <div>
              <HowStep
                number={1}
                description="Create your Ethereum donation page"
                details="Paste your URL link anywhere your fans are."
              />
              <HowStep
                number={2}
                description="Add a panel to your Twitch channel"
                details="Use our Cryptopotamus template or create your own."
              />
              <HowStep
                number={3}
                description="Connect StreamLabs for real-time alerts"
                details="Get in-stream alerts whenever a payment is made to your donation page."
              />
            </div>
            <button className="mdc-button mdc-button--raised" onClick={this.openModal} style={nextButton}>
              GET STARTED
            </button>
          </div>
        </div >

        <div style={{ backgroundColor: '#f6f9fb', width: '100%' }}>
          <div style={{ ...BigColumn, marginTop: '200px', paddingTop: '200px', paddingBottom: '250px' }}>
            <h2 style={h1}>Frequently <br /> Asked <br /> Questions</h2>
            <div style={SmallColumn}>
              {questionAnswerContent.map(({ question, answer }, i) => (
                <QuestionAnswer question={question} answer={answer} key={i} />
              ))}
            </div>
          </div>
        </div>

        <div style={{ backgroundColor: '#6572fd', width: '100%' }}>
          <div style={{ ...BigColumn, paddingTop: '100px', paddingBottom: '100px', position: 'relative' }}>
            <p style={{ ...label, color: 'white', marginBottom: '50px' }}>
              The Cryptopotamus Project <br /> by the Stream Team
            </p>
            <p style={{ textAlign: 'right', position: 'absolute', top: '100px', right: '10%' }}>
              <Link to="/privacy" style={{ color: 'white', textDecoration: 'none' }}> Privacy Policy <br /> </Link>
              <Link to ="/terms" style={{ color: 'white', textDecoration: 'none' }}> Terms & Conditions </Link>
            </p>
            <button
              className="mdc-button mdc-button--raised" onClick={this.openModal}
              style={{
                ...nextButton,
                backgroundColor: 'white',
                color: '#6572fd',
              }}
            >
              GET STARTED
            </button>
          </div>
        </div>

        <ReactModal
          isOpen={this.state.modalIsOpen}
          onRequestClose={this.closeModal}
          style={customStyles}
          appElement={document.getElementById('root')}
          contentLabel="Get Started"
        >
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
    )
  }
}

export default Home
