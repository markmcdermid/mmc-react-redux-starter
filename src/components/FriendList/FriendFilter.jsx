import React, { PropTypes } from 'react'
import classNames from 'classnames'

const FriendFilter = (props) => {
  const { filterFriends, starFilter } = props

  let classes = classNames({
    'friendFilter': true,
    'starred': starFilter
  })
  return (
    <div
    onClick={() => filterFriends()}
    className={classes}
    >
      Filter: <i className={starFilter ? 'fa fa-star' : 'fa fa-star-o'} />
    </div>
  )
}

FriendFilter.propTypes = {
  filterFriends: PropTypes.func.isRequired,
  starFilter: PropTypes.bool.isRequired
}

export default FriendFilter
