// tslint:disable-next-line jsx-no-lambda
import * as React from 'react'
import { Route } from 'react-router-dom'
import Activate from './Activate'
import Donate from './Donate'
import Home from './Home'
import Setup from './Setup'

const App = () => {
  return(
      <div>
        <Route exact path={'/'} render={(routerProps) => <Home routerProps={routerProps} />} />
        <Route exact path={'/setup'} render={(routerProps) => <Setup routerProps={routerProps} />} />
        <Route exact path={'/activate'} render={(routerProps) => <Activate routerProps={routerProps} />} />
        <Route path={'/donate/:channelId/:ethAddress'} render={(routerProps) => <Donate routerProps={routerProps} />} />
      </div>
  )
}

export default App
