import React, { PropTypes} from 'react'

const FriendListItem = (props) => {
  const { name, friendId, starred, starFriend, deleteFriend } = props
  return (
    <li>
      <div className='friendInfo'>{name}</div>
      <div className='friendActions'>
        <span className='button success btnAction' onClick={() => starFriend(friendId) }>
          {' '}{starred ? <i className='fa fa-star'/> : <i className='fa fa-star-o'/>}
        </span>
        <span className='button alert btnAction' onClick={() => deleteFriend(friendId) }>
          {' '}<i className='fa fa-trash'/>
        </span>
      </div>
    </li>
  )
}

FriendListItem.propTypes = {
  friendId: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  starred: PropTypes.bool,
  starFriend: PropTypes.func.isRequired,
  deleteFriend: PropTypes.func.isRequired
}

export default FriendListItem
