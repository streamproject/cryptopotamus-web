import { MDCRipple } from '@material/ripple'
import * as React from 'react'
import { boxStyle, h1, h2, text } from './components/styles/common'
import { auth } from './utils/ApiUtils'

type TermsProps = { routerProps: any }
/*tslint:disable*/
class Terms extends React.Component<TermsProps, {}> {
  constructor(props) {
    super(props)
    this.state = {}

  }

  public componentDidMount() {
    if (document.querySelector('button'))
      MDCRipple.attachTo(document.querySelector('button'))
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
        <div style={{marginLeft: '10%', marginRight: '10%', marginTop: '100px'}}>
          <h1 style={h1}>Terms & Conditions</h1>
          <p style={text}>
            These Terms of Use govern your access to and use of our website (the “Website”), and any other online services (collectively, the “Services”) provided by Cryptopotam.us or its legal affiliates (“Cryptopotam.us”, the “Company”, “we” or “us”), including any content, functionality, features and applications offered on or through the Services to you as a guest or registered user.
                <br /><br />
            Please read the Terms of Use carefully before you start to use our Services. By using the Services, you accept and agree to be bound and abide by these Terms of Use and our Privacy Policy. If you do not agree to be bound by the Terms of Use or Privacy Policy, you must discontinue use of the Services immediately.
                <br /><br />
            You understand that we may revise and update these Terms of Use from time to time in our sole discretion. All changes are effective immediately upon posting. Your continued use of the Services following the posting of a revised Terms of Use means that you accept and agree to those changes. It is your responsibility to check the Terms of Use posted on the Services periodically so that you are aware of any changes, as they are binding on you.
        </p>
          <h2 style={h2}>1. Prohibited Uses</h2>
          <p style={text}>
            By using the Services, you represent and warrant that you are of legal age to form a binding contract with Stream and meet all of the foregoing eligibility requirements. If you do not meet all of these requirements, you must not use or access any of the Services.
          <br /><br />
            If a Stream Service is configured to enable the use of software, content, virtual items or other materials owned or licensed by Stream we grant you a limited, non-exclusive, non-sublicensable, non-transferable license to access and use such software, content, virtual item or other material for your personal, noncommercial use only. You may use the Services only for lawful purposes and in accordance with these Terms of Use. You agree not to use or access any of the Services:
          <br /><br />
            • In any way that violates any applicable federal, state, local, or international law, rule, or regulation (including, without limitation, any laws regarding fraud or the export of data or software to and from the US or other countries).
          <br /><br />
            • To post or encourage others to post violent, discriminatory, unlawful, infringing, hateful or other inappropriate videos, photos or other content, or for the purpose of defaming, stalking, bullying, abusing, harassing, threatening, impersonating, harming, impersonating or intimidating people or entities.
          <br /><br />
            • Attempting to exploit anyone in any way by exposing them to inappropriate content, asking for personally identifiable information, including, without limitation, your or any other person’s social security or alternate national identity numbers, non-public phone numbers or non-public email addresses.
          <br /><br />
            • To send, knowingly receive, upload, download, use, or re-use any material that does not comply with the below referenced Content Standards set out in these Terms of Use.
          <br /><br />
            • To create, solicit, transmit, or procure the sending of, any unwanted comments or other forms of harassing communications including, advertising or promotional material without our prior written consent, including any “junk mail,” “chain letter,” “spam” or any other similar solicitation.
          <br /><br />
            • To impersonate, attempt to impersonate, or falsely imply that you are associated with Cryptopotam.us, a Cryptopotam.us employee, Cryptopotam.us’s URL or domain name, another user, or any other person or entity (including, without limitation, by using email addresses or usernames associated with any of the foregoing).
          <br /><br />
            • Use the Services in any manner that could disable, alter, overburden, damage, or impair the Website or engage in any other conduct that restricts or interferes with any other party's use, which, as determined by us, may harm Cryptopotam.us or users of the Website and expose them to liability, including but not limited to by transmitting any worms, viruses, spyware, malware or any other code of a destructive, malicious, intrusive, or disruptive nature.
          <br /><br />
            • To circumvent or disable any content protection system or digital rights management technology used with any Service; decompile, reverse engineer, disassemble or otherwise reduce any Service to a human-readable form; remove identification, or other proprietary notices; or access or use any Service in an unlawful or unauthorized manner or in a manner that suggests an association with our products, services or brands.
          <br /><br />
            • To create accounts or access of data (including user profiles and photos ) through unauthorized means, by using an automated device, caching, script, bot, spider, crawler or scraper.
          <br /><br />
            • In any way that violates any applicable federal, state, local, or international law, rule, or regulation (including, without limitation, any laws regarding fraud or the export of data or software to and from the US or other countries).
          <br /><br />
            • To post or encourage others to post violent, discriminatory, unlawful, infringing, hateful or other inappropriate videos, photos or other content, or for the purpose of defaming, stalking, bullying, abusing, harassing, threatening, impersonating, harming, impersonating or intimidating people or entities.
          <br /><br />
            • Attempting to exploit anyone in any way by exposing them to inappropriate content, asking for personally identifiable information, including, without limitation, your or any other person’s social security or alternate national identity numbers, non-public phone numbers or non-public email addresses.
          <br /><br />
            • To send, knowingly receive, upload, download, use, or re-use any material that does not comply with the below referenced Content Standards set out in these Terms of Use.
          <br /><br />
            • To create, solicit, transmit, or procure the sending of, any unwanted comments or other forms of harassing communications including, advertising or promotional material without our prior written consent, including any “junk mail,” “chain letter,” “spam” or any other similar solicitation.
          <br /><br />
            • To impersonate, attempt to impersonate, or falsely imply that you are associated with Cryptopotam.us, a Cryptopotam.us employee, Cryptopotam.us’s URL or domain name, another user, or any other person or entity (including, without limitation, by using email addresses or usernames associated with any of the foregoing).
          <br /><br />
            • Use the Services in any manner that could disable, alter, overburden, damage, or impair the Website or engage in any other conduct that restricts or interferes with any other party's use, which, as determined by us, may harm Cryptopotam.us or users of the Website and expose them to liability, including but not limited to by transmitting any worms, viruses, spyware, malware or any other code of a destructive, malicious, intrusive, or disruptive nature.
          <br /><br />
            • To circumvent or disable any content protection system or digital rights management technology used with any Service; decompile, reverse engineer, disassemble or otherwise reduce any Service to a human-readable form; remove identification, or other proprietary notices; or access or use any Service in an unlawful or unauthorized manner or in a manner that suggests an association with our products, services or brands.
          <br /><br />
            • To create accounts or access of data (including user profiles and photos ) through unauthorized means, by using an automated device, caching, script, bot, spider, crawler or scraper.
        </p>
          <h2 style={h2}> 2. Trademarks </h2>
          <p>
            • The Services contain content owned or licensed by Cryptopotam.us (“Cryptopotam.us Content”).Cryptopotam.us Content is protected by copyright, trademark, patent, trade secret and other laws, and, as between you and Cryptopotam.us, Cryptopotam.us owns and retains all rights in the Cryptopotam.us Content and the Services. You will not remove, alter or conceal any copyright, trademark, service mark or other proprietary rights notices incorporated in or accompanying the Cryptopotam.us Content and you will not reproduce, modify, adapt, prepare derivative works based on, perform, display, publish, distribute, transmit, broadcast, sell, license or otherwise exploit the Cryptopotam.us Content.
        <br /><br />
            • The Cryptopotam.us name and logo are trademarks of Cryptopotam.us, and may not be copied, imitated or used, in whole or in part, without the prior written permission of Cryptopotam.us.
        <br /> <br />
            • All page headers, custom graphics, button icons and scripts are service marks, trademarks and/or trade dress of Cryptopotam.us, and may not be copied, imitated or used, in whole or in part, without prior written permission from Cryptopotam.us.
        </p>
          <h2 style={h2}> 3. Your Responsibilities </h2>
          <p>
            • You are responsible for any activity that occurs through your account and you agree you will not sell, transfer, license or assign your account, [followers], username, or any account rights. With the exception of people or businesses that are expressly authorized to create accounts on behalf of their employers or clients, Cryptopotam.us prohibits the creation of and you agree that you will not create an account for anyone other than yourself. You also represent that all information you provide or provided to Cryptopotam.us upon registration and at all other times will be true, accurate, current and complete and you agree to update your information as necessary to maintain its truth and accuracy.
          <br /> <br />
            • You are responsible for keeping your password secret and secure.
          <br /> <br />
            • You are solely responsible for your conduct and any data, text, files, information, usernames, images, graphics, photos, profiles, audio and video clips, sounds, musical works, works of authorship, applications, links and other content or materials (collectively, “Content”) that you submit, post, share, distribute or display on or via the Website.
          <br /> <br />
            •  You are solely responsible for your interaction with other users of the Website, whether online or offline. You agree that Cryptopotam.us is not responsible or liable for the conduct of any user. Cryptopotam.us reserves the right, but has no obligation, to monitor or become involved in disputes between you and other users. Exercise common sense and your best judgment when interacting with others, including when you submit or post Content or any personal or other information.
        </p>
        </div>
      </div>
    )
  }
}

export default Terms
