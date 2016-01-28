import React from 'react'

// Components
// ==========
import FriendListApp from 'containers/FriendListApp'
import Counter from 'containers/Counter'
import RedditViewer from 'containers/RedditViewer'

// We define mapStateToProps where we'd normally use
// the @connect decorator so the data requirements are clear upfront, but then
// export the decorated component after the main class definition so
// the component can be tested w/ and w/o being connected.
// See: http://rackt.github.io/redux/docs/recipes/WritingTests.html

export default class DashboardView extends React.Component {
  render () {
    return (
      <div className='text-center'>
        <div className='moduleWrap'>
              <div className='module'>
                <FriendListApp />
              </div>
        </div>
        <div className='moduleWrap'>
            <div className='module'>
              <Counter />
            </div>
        </div>
        <div className='moduleWrap'>
            <div className='module'>
              <RedditViewer />
            </div>
        </div>
      </div>
    )
  }
}
