import React, { PropTypes } from 'react'
import FriendListItem from 'components/FriendList/FriendListItem'
import classNames from 'classnames'

const FriendList = (props) => {
  const { friendList: { friends, starFilter } } = props

  let classes = classNames({
    'friendList': true,
    'starred': starFilter
  })

  let visibleFriends = starFilter ? friends.filter(f => f.starred) : friends
  return (
    <ul className={classes}>
      {
        visibleFriends.map(f => {
          return (
              <FriendListItem
                 key={f.id}
                 friendId={f.id}
                 name={f.name}
                 starred={f.starred}
                 {...props}
             />
          )
        })
      }
    </ul>
  )
}

FriendList.propTypes = {
  friendList: PropTypes.object.isRequired
}

export default FriendList
