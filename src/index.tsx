import { createBrowserHistory } from 'history'
import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { Router } from 'react-router-dom'
import * as WebFont from 'webfontloader'
import App from './App'
WebFont.load({
  google: {
    families: ['Work Sans:300,400,600,700', 'Material Icons'],
  },
})
const css = document.createElement('style')
document.body.appendChild(css)

css.innerHTML = `body {
  margin: 0px;
}`

const history = createBrowserHistory()

ReactDOM.render(
  <Router history={history}>
    <App />
  </Router>, document.getElementById('root'))
