import React from 'react'
import ReactDOM from 'react-dom'

/* eslint-disable import/no-extraneous-dependencies */
import { BrowserRouter, Link, Route } from 'react-router-dom'

import CssBaseline from 'material-ui/CssBaseline'
import AppBar from 'material-ui/AppBar'
import Toolbar from 'material-ui/Toolbar'
import Button from 'material-ui/Button'
/* eslint-enable import/no-extraneous-dependencies */

import './styles.less'
import MultiStep from './pages/MultiStep'
import NestedFields from './pages/NestedFields'
import CustomValidationMessages from './pages/CustomValidationMessages'
import CustomValidators from './pages/CustomValidators'


const wrapperStyle = {
  backgroundColor: 'white',
  height: 'inherit',
  overflowX: 'hidden',
  overflowY: 'auto',
}

const Root = () => (
  <div style={wrapperStyle}>
    <CssBaseline />
    <BrowserRouter>
      <div>
        <AppBar position="sticky">
          <Toolbar>
            <Button>
              <Link to="/">Nested Fields</Link>
            </Button>
            <Button>
              <Link to="/custom-validation-messages">
                Custom Validation Messages
              </Link>
            </Button>
            <Button>
              <Link to="/custom-validators">Custom Validators</Link>
            </Button>
            <Button>
              <Link to="/stepper">Stepper</Link>
            </Button>
          </Toolbar>
        </AppBar>

        <Route exact path="/" component={NestedFields} />
        <Route
          path="/custom-validation-messages"
          component={CustomValidationMessages}
        />
        <Route path="/custom-validators" component={CustomValidators} />
        <Route path="/stepper" component={MultiStep} />
      </div>
    </BrowserRouter>
  </div>
)

ReactDOM.render(<Root />, document.querySelector('#root'))
