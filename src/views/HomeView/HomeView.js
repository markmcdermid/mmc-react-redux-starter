import React from 'react'

// We define mapStateToProps where we'd normally use
// the @connect decorator so the data requirements are clear upfront, but then
// export the decorated component after the main class definition so
// the component can be tested w/ and w/o being connected.
// See: http://rackt.github.io/redux/docs/recipes/WritingTests.html

export default class HomeView extends React.Component {
  render () {
    return (
      <div className='text-center'>
        <h1>Welcome to this random React Redux Page</h1>
        <h3>Login to see the Dashboard</h3>
      </div>
    )
  }
}
