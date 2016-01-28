import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

// Components
import AddFriend from 'components/FriendList/AddFriend'
import FriendList from 'components/FriendList/FriendList'
import FriendFilter from 'components/FriendList/FriendFilter'

// Action Creators
import { actions as friendListActions } from 'redux/modules/friendList'

class FriendListApp extends Component {
  static propTypes = {
    addFriend: PropTypes.func.isRequired,
    deleteFriend: PropTypes.func.isRequired,
    starFriend: PropTypes.func.isRequired,
    filterFriends: PropTypes.func.isRequired,

    friendList: PropTypes.object.isRequired
  };
  render () {
    const { addFriend, filterFriends, friendList: { starFilter } } = this.props
    return (
      <div className={starFilter ? 'starred' : ''}>
        <h3>Friends</h3>
        <AddFriend addFriend={addFriend} />
        <FriendList {...this.props} />
        <FriendFilter
          starFilter={starFilter}
          filterFriends={filterFriends}
         />
      </div>
    )
  }
}

const mapStateToProps = state => ({friendList: state.friendList})
export default connect(mapStateToProps, friendListActions)(FriendListApp)
