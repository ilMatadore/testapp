import React from 'react';
import './App.css';
import { Switch, Route, withRouter } from 'react-router-dom';
import { auth, createUserProfileDocument } from './firebase/firebase.utils';
 
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
      first_name: '',
      last_name: '',
      email: '',
      password: '',
      currentUser: null
    }
  }

  unsubscribeFromAuth = null;

  componentDidMount() {
   this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);

        userRef.onSnapshot(snapShot => {
          this.setState({
            currentUser: {
              id: snapShot.id,
              ...snapShot.data()
            }
          })
        });
        this.props.history.push('/pricing')
      } else {
        this.setState({ currentUser: userAuth })
        this.props.history.push('/')
      }  
    })
  }

  componentWillUnmount() {
    this.unsubscribeFromAuth();
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
        this.setState({ currentUser: !null })
        this.props.history.push('/pricing');        
      }
    })
  };

  handleLogout = () => {
    auth.signOut();
    this.setState({ currentUser: null })
    this.props.history.push('/')
}

  handleRegister = () => {  

    fetch('http://localhost:3000/register', {
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        first_name: this.state.first_name,
        last_name: this.state.last_name,
        email: this.state.email,
        password: this.state.password
      })
    })
    .then(response => response.json())
    .then(data => {
      if (data === 'Success!') {
        this.props.history.push('/pricing');
      }
    })
    
  };

 
  render() {
    return (
      <div>
        <Bar currentUser={this.state.currentUser} handleLogout={this.handleLogout}/>
        <Switch>
          <Route exact path='/' render={(props) => <SignIn {...props} handleChange={this.handleChange} handleSubmit={this.handleSubmit} />} />
          <Route exact path='/register' render={(props) => <Register {...props} handleChange={this.handleChange} handleSubmit={this.handleRegister} />}  />
          <Route exact path='/pricing' component={Pricing}/>
          <Route exact path='/checkout' component={Checkout} />
        </Switch>        
        <StickyFooter />
      </div>
    );
    }
}

export default withRouter(App);
