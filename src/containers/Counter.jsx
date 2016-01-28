import React, { Component, PropTypes } from 'react'
import {connect} from 'react-redux'
import {actions as counterActions} from 'redux/modules/counter'

const mapStateToProps = (state) => ({
  counter: state.counter
})

class Counter extends Component {
  static propTypes = {
    counter: PropTypes.number.isRequired,
    doubleAsync: PropTypes.func.isRequired,
    increment: PropTypes.func.isRequired
  };

  handleIncrement (e) {
    e.preventDefault()
    this.props.increment(1)
  }

  handleDoubleAsync (e) {
    e.preventDefault()
    this.props.doubleAsync()
  }

  render () {
    const { counter } = this.props
    return (
      <div>
        <h3>
          Counter:{' '}
          <span className='counter'>{counter}</span>
        </h3>
        <button className='button'
            onClick={this.handleIncrement.bind(this)}>
          Increment
        </button>
        {' '}
        <button className='button success'
            onClick={this.handleDoubleAsync.bind(this)}>
          Double (Async)
        </button>
      </div>
    )
  }
}

export default connect(mapStateToProps, counterActions)(Counter)
