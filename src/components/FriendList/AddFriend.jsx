import React, { Component, PropTypes } from 'react'

class AddFriend extends Component {
  static propTypes = {
    addFriend: PropTypes.func.isRequired
  };

  constructor (props, context) {
    super(props, context)
    this.state = {
      name: 'Add Friend...'
    }
  }
  render () {
    return (
      <input
        className='moduleInput'
        type='text'
        value={this.state.name}
        onKeyDown={this.handleSubmit.bind(this)}
        onChange={this.handleChange.bind(this)}
        onFocus={this.handleFocus.bind(this)}
        onBlur={this.handleBlur.bind(this)}
      />
    )
  }

  handleFocus (e) {
    let value = e.target.value.trim()
    if (value == 'Add Friend...') {
      this.setState({ name: '' })
    }
  }

  handleBlur (e) {
    let value = e.target.value.trim()
    if (!value) {
      this.setState({ name: 'Add Friend...'})
    }
  }
  handleChange (e) {
    this.setState({ name: e.target.value })
  }
  handleSubmit (e) {
    let name = e.target.value.trim()
    if (e.which === 13) {
      this.props.addFriend(name)
      this.setState({ name: '' })
    }
  }
}
export default AddFriend
