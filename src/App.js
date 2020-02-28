import React from 'react';
import './App.css';
import { Switch, Route, withRouter } from 'react-router-dom';
import SignIn from './components/SignIn/SignIn';
import Pricing from './components/Pricing/pricing';
import Register from './components/Register/Register';
import Checkout from './components/Checkout/Checkout';
import StickyFooter from './components/Footer/footer';
import Bar from './components/AppBar/Bar';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      isSignedIn: false
    }
  }
  
  handleChange = event => {
    const { name, value } = event.target
    this.setState({[name]: value})
  }

  handleSubmit = () => {

    fetch('http://localhost:3000/', {
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        email: this.state.email,
        password: this.state.password
      })
    })
    .then(response => response.json())
    .then(data => {
      if (data === 'Success!') {
        this.setState({isSignedIn: true})
        this.props.history.push('/pricing');
        console.log(this.state)
        
      }
    })
  };

  handleLogout = () => {
      this.setState({isSignedIn: false})
      this.props.history.push('/')
  }

  
  render() {
    console.log(this.state)
    return (
      <div>
        <Bar isSignedIn={this.state.isSignedIn} handleLogout={this.handleLogout}/>
        <Switch>
          <Route exact path='/' render={(props) => <SignIn {...props} handleChange={this.handleChange} handleSubmit={this.handleSubmit} />} />
          <Route exact path='/register' component={Register} />
          <Route exact path='/pricing' component={Pricing}/>
          <Route exact path='/checkout' component={Checkout} />
        </Switch>        
        <StickyFooter />
      </div>
    );
    }
}

export default withRouter(App);
