import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

// Actions
import { actions as loginActions } from 'redux/modules/auth'

const mapStateToProps = (state) => ({
  loggedIn: state.loggedIn
})

class Login extends Component {
  static propTypes = {
    login: PropTypes.func,
    loggedIn: PropTypes.bool.isRequired
  };

  render () {
    const { login } = this.props
    return (
      <span
      className='button success'
      onClick={() =>
        login()
      }>
        Login
      </span>
    )
  }
}

export default connect(mapStateToProps, loginActions)(Login)
