import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { BrowserRouter as Router } from 'react-router-dom'
import * as WebFont from 'webfontloader'
import App from './App'

WebFont.load({
  google: {
    families: ['Work Sans:300,400,600,700'],
  },
})

ReactDOM.render(<Router basename={process.env.PUBLIC_URL}><App /></Router>, document.getElementById('root'))
