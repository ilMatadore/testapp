import React from 'react';
import './App.css';
import { Route } from 'react-router-dom';

import SignIn from './components/SignIn/SignIn';
import Pricing from './components/Pricing/pricing';
import Register from './components/Register/Register';
import Checkout from './components/Checkout/Checkout';
import StickyFooter from './components/Footer/footer';
import Bar from './components/AppBar/Bar';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      route: 'signin',
      isSignedIn: false
    }
  }

  render() {
    return (
      <div>
        <Bar />
        <Route exact path='/' component={SignIn} />
        <Route exact path='/register' component={Register} />
        <Route exact path='/pricing' component={Pricing} />
        <Route exact path='/checkout' component={Checkout} />        
        <StickyFooter />
      </div>
    );
  }
}

export default App;
