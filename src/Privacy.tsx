import * as React from 'react'
import { boxStyle, h1, h2, text } from './components/styles/common'
import { auth } from './utils/ApiUtils'

/*tslint:disable:max-line-length*/

type PrivacyProps = { routerProps: any }

class Privacy extends React.Component<PrivacyProps, {}> {
  constructor(props) {
    super(props)
    this.state = {}

  }

  public render() {
    return (
      <div>
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
        <div style={{ marginLeft: '10%', marginRight: '10%', marginTop: '100px' }}>
          <h1 style={h1}>Privacy</h1>
          <p style={text}>
            Our Privacy Policy explains how Cryptopotam.us and its legal affiliates (“Cryptopotam.us” or the “Company”) and some of the companies we may work with collect, use, or disclose personal information and data we receive through use of our website (the “Website”) and the other services, features, content and applications we offer on our Website. The Website and any other services, features, content, activations, and applications offered by Cryptopotam.us, shall each be considered a “Service” and, collectively, the “Services.” The policy also gives you choices about the collection and use of your information.
            <br /><br />
            Use of Cryptopotam.us Services is subject to, and constitutes consent to, the Terms of Use and Privacy Policy. These terms and policies affect your legal rights and obligations, and if you do not agree to be bound by all of these terms and policies, you should discontinue use of Cryptopotam.us Services immediately.
            <br /><br />
            You understand that we may revise and update this Privacy Policy from time to time in our sole discretion. All changes are effective immediately upon posting. Your continued use of the Services following the posting of a revised Privacy Policy means that you accept and agree to those changes. It is your responsibility to check this page periodically so that you are aware of any changes, as they are binding on you.        </p>
          <h2 style={h2}>1. The Information We Collect</h2>
          <p style={text}>
            We collect the following types of information:
            <br /><br />
            Information you voluntarily provide:
            • Username and Password
            • Personal Information
            • Examples of Personal Information include your name, email address, address,
            and phone number.
            <br /><br />
            Payment Information:
            • If you use the Services to make or receive payments, we will also collect certain payment information, such as digital wallet, credit card, PayPal or other financial account information, and billing address.
            <br /><br />
            User Content
            • Information you provide to post to the Website (e.g., videos, photos, comments, and other materials) along with any information you provide about yourself and the content.
            • Information sent either one-to-one or within a limited group using our message, chat, post or similar functionality, where we are permitted by law to collect this information.
            <br /><br />
            Communications
            • Communications between you and Cryptopotam.us. For example, we may send you emails regarding Cryptopotam.us, donation confirmations, the Services, or technical and security notices. Note that you may not be able to opt out of certain Services-related e-mails.
            <br /><br />
            Information that is passively collected:
            Analytics information:
            • We may use third-party analytics tools to help us measure traffic, usage, and sales trends by your use of our Services. These tools collect information sent by your device or the Services, including the web pages you visit, add-ons, and other information that assists us in improving the Services. This analytical information is not covered by this policy because it does not identify any particular individual.
            <br /><br />
            Cookies and similar technologies:
            • When you visit the Website, we may use “cookies” which are small files stored as text on a computer hard drive.
            • These “cookies” and other similar technologies like pixels, web beacons (also known as “clear GIFs”, and local storage may be used to collect information about how you use the Website and provide features to you.
            • We may also ask advertisers or other partners to serve ads or services to your devices, which may use cookies or similar technologies placed by us or the third party.
            • If a visitor does not want information collected through the use of cookies, most browsers allow the visitor to reject cookies. We may share non-Personal Information obtained via cookies with our advertisers and affiliates.
            <br /><br />
            Mobile Device Unique Identifier
            • When you use a mobile device to connect to the Website via a service provider that uniquely identifies your mobile device, we may use this unique identifier to offer you extended services and/or functionality. Certain services may require the collection of your mobile phone number. We may associate that mobile phone number with the mobile device unique identifier.
            <br /><br />
            Physical location
            • When you use the Website, we may use and store information relating to your device, in combination with other location-based information such as your IP address, your billing postal code provided by your carrier, or your registration location, to provide enhanced location-based services, and to serve location-targeted advertising, search results, and other content.
            <br /><br />
            Log file information:
            • Log file information may be automatically reported by your browser each time you make a request to access (i.e., visit) the Website. It can also be provided when the content of the Website is downloaded to your browser or device.
            • When you use the Services, our servers automatically record certain log file information, including your web request, Internet Protocol (“IP”) address, browser type, referring / exit pages and URLs, number of clicks and how you interact with links, domain names, landing pages, pages viewed, and other such information. We may also collect similar information from emails sent to our Users which then help us track which emails are opened and which links are clicked by recipients. The information allows for more accurate reporting and improvement of the Services.
            <br /><br />
            Metadata:
            • Metadata is usually technical data that is associated with User Content. For example, Metadata can indicate how, when and by whom a piece of User Content was collected and how that content is formatted.
            • Metadata associated with certain types of User Content, such as pictures, may also include location information about where the Content was recorded (i.e., geotags).
            <br /><br />
            Information received from third parties:
            • We may receive information about you, including personal information, from third parties, to supplement the information we maintain about you. If we do so, this policy governs any combined information that we maintain in personally identifiable format.
          </p>
        </div>
      </div>
    )
  }
}

export default Privacy
