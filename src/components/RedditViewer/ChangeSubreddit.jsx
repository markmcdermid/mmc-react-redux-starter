import React, { Component, PropTypes } from 'react'

class ChangeReddit extends Component {
  static propTypes = {
    selectSubreddit: PropTypes.func.isRequired
  };
  constructor (props, context) {
    super(props, context)
    this.state = {
      subreddit: ''
    }
  }
  render () {
    return (
      <input
        className='moduleInput'
        type='text'
        value={this.state.subreddit}
        placeholder='Change Subreddit...'
        onKeyDown={this.handleSubmit.bind(this)}
        onChange={this.handleChange.bind(this)}
      />
    )
  }

  handleChange (e) {
    this.setState({ subreddit: e.target.value })
  }
  handleSubmit (e) {
    const {selectSubreddit} = this.props
    let subreddit = e.target.value.trim()
    if (e.which === 13) {
      selectSubreddit(subreddit)
      this.setState({ subreddit: '' })
    }
  }
}
export default ChangeReddit
