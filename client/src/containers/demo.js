import React, { Component } from 'react'

import SocialButton from '../components/socialButton/socialButton'
// import UserCard from '../components/userCard/userCard'
import App from '../App'

export default class Demo extends Component {
  constructor(props) {
    super(props)

    this.state = {
      logged: false,
      user: {},
      currentProvider: ''
    }
    this.nodes = {}

    this.onLoginSuccess = this.onLoginSuccess.bind(this)
    this.onLoginFailure = this.onLoginFailure.bind(this)
    this.onLogoutSuccess = this.onLogoutSuccess.bind(this)
    this.onLogoutFailure = this.onLogoutFailure.bind(this)
    this.logout = this.logout.bind(this)
  }

  setNodeRef(provider, node) {
    if (node) {
      this.nodes[provider] = node
    }
  }

  onLoginSuccess(user) {
    console.log(user)

    this.setState({
      logged: true,
      currentProvider: user._provider,
      user
    })
  }

  onLoginFailure(err) {
    console.error(err)

    this.setState({
      logged: false,
      currentProvider: '',
      user: {}
    })
  }

  onLogoutSuccess() {
    this.setState({
      logged: false,
      currentProvider: '',
      user: {}
    })
  }

  onLogoutFailure(err) {
    console.error(err)
  }

  logout() {
    const { logged, currentProvider } = this.state

    if (logged && currentProvider) {
      this.nodes[currentProvider].props.triggerLogout()
    }
  }

  render() {
    let children
    let user =this.state.user.profile;
    let user2 ={...user};
    console.log(user2.id);
    console.log(user2.firstName);
    console.log(user2.lastName);
    console.log(user2.headline);
    console.log(user2.location);
    console.log(user2.profilePicURL);
    console.log(this.state.logged);

    if (this.state.logged) {
      children = <App user={this.state.user} logout={this.logout} />
    } else {
      children = [
        <SocialButton
          provider='linkedin'
          appId='78xlkz34c94sm1'
          onLoginSuccess={this.onLoginSuccess}
          onLoginFailure={this.onLoginFailure}
          onLogoutSuccess={this.onLogoutSuccess}
          getInstance={this.setNodeRef.bind(this, 'linkedin')}
          key={'linkedin'}
        >
          Login with LinkedIn 
        </SocialButton>
        // 
      ]
    }

    return children
  }
}
