import React, { PropTypes, Component } from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'

// CSS
// ===
import 'foundation-sites/dist/foundation.css'
import 'styles/core.scss'

// Actions
// =======
import { routeActions } from 'redux-simple-router'
import { actions as authActions } from 'redux/modules/auth'
const { push } = routeActions
const { login, logout } = authActions

class CoreLayout extends Component {
  static propTypes = {
    children: PropTypes.element,
    logout: PropTypes.func.isRequired,
    login: PropTypes.func.isRequired,
    push: PropTypes.func.isRequired,
    loggedIn: PropTypes.bool.isRequired
  };

  componentWillReceiveProps (nextProps) {
    // When auth props change checks if logging in or out.
    if (!this.props.loggedIn && nextProps.loggedIn) {
      // login
      this.props.push('/dashboard')
    } else if (this.props.loggedIn && !nextProps.loggedIn) {
      // logout
      this.props.push('/')
    }
  }

  handleLogin (e) {
    e.preventDefault()
    this.props.login()
  }

  handleLogout (e) {
    e.preventDefault()
    this.props.logout()
  }

  render () {
    const { children, loggedIn } = this.props
    return (
      <div className='page-container'>
      <div className='top-bar'>
          <div className='top-bar-left'>
            <ul className='menu'>
              <li><Link to='/'>Home</Link></li>
              <li><Link to='/404'>404</Link></li>
            </ul>

          </div>
          <div className='top-bar-right'>
            { !loggedIn
              ? <div
                className='button success'
                onClick={this.handleLogin.bind(this)}>Login</div>
              : <div
                className='button alert'
                onClick={this.handleLogout.bind(this)}>Logout</div>
            }
          </div>
      </div>
        <div className='view-container'>
          {children}
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  loggedIn: state.loggedIn
})

export default connect(mapStateToProps, { login, logout, push })(CoreLayout)
