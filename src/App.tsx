import * as React from 'react'
import { Route } from 'react-router-dom'
import Activate from './Activate'
import Confirm from './Confirm'
import Connect from './Connect'
import Donate from './Donate'
import Home from './Home'
import Pending from './Pending'
import Settings from './Settings'
import Setup from './Setup'
import Terms from './Terms'
import TestAlerts from './TestAlerts'

const App = () => {
  return(
      <div>
        <Route exact path={'/'} render={(routerProps) => <Home routerProps={routerProps} />} />
        <Route path={'/setup/:token'} render={(routerProps) => <Setup routerProps={routerProps} />} />
        <Route exact path={'/activate'} render={(routerProps) => <Activate routerProps={routerProps} />} />
        <Route path={'/donate/:channelId?'} render={(routerProps) => <Donate routerProps={routerProps} />} />
        <Route exact path={'/connect'} render={(routerProps) => <Connect routerProps={routerProps} />} />
        <Route exact path={'/testalerts'} render={(routerProps) => <TestAlerts routerProps={routerProps} />} />
        <Route exact path={'/settings'} render={(routerProps) => <Settings routerProps={routerProps} />} />
        <Route exact path={'/confirm'} render={(routerProps) => <Confirm routerProps={routerProps} />} />
        <Route exact path={'/pending'} render={(routerProps) => <Pending routerProps={routerProps} />} />
        <Route exact path={'/terms'} render={(routerProps) => <Terms routerProps={routerProps} />} />
      </div>
  )
}

export default App
