import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { actions as redditActions } from 'redux/modules/reddit'
import Posts from 'components/RedditViewer/RedditPosts'
import ChangeSubreddit from 'components/RedditViewer/ChangeSubreddit'

const mapStateToProps = (state) => {
  // Sort the state in to a nice object to pass to props
  const { reddit: { selectedSubreddit, postsBySubreddit } } = state
  const { isFetching, lastUpdated, items: posts } = postsBySubreddit[selectedSubreddit] || { isFetching: true, items: [] }
  return {
    selectedSubreddit,
    posts,
    isFetching,
    lastUpdated
  }
}

@connect(mapStateToProps, redditActions)
export default class RedditViewer extends Component {

  componentDidMount() {
    const { fetchPostsIfNeeded, selectedSubreddit } = this.props
    fetchPostsIfNeeded(selectedSubreddit)
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.selectedSubreddit !== this.props.selectedSubreddit) {
      const { fetchPostsIfNeeded, selectedSubreddit } = nextProps
      fetchPostsIfNeeded(selectedSubreddit)
    }
  }

  handleRefreshClick (e) {
    e.preventDefault()
    const { selectedSubreddit, invalidateSubreddit, fetchPostsIfNeeded } = this.props
    invalidateSubreddit(selectedSubreddit)
    fetchPostsIfNeeded(selectedSubreddit)
  }

  render () {
    const { posts, selectedSubreddit, selectSubreddit, isFetching, lastUpdated } = this.props
    const LastUpdated = <div className="lastUpdated">Cached: <i className='fa fa-clock-o' /> {new Date(lastUpdated).toLocaleTimeString()}</div>
    return(
      <div className='redditViewer'>
      <h3><span className="preSubreddit">r/</span>{selectedSubreddit}</h3>
      <div className='topRight'>
        <i
          className={isFetching ? 'fa fa-cog fa-spin' : 'fa fa-refresh'}
          onClick={this.handleRefreshClick.bind(this)}
        />
      </div>

      {lastUpdated && LastUpdated}
      <ChangeSubreddit selectSubreddit={selectSubreddit} />
      {posts && <Posts posts={posts} />}
      </div>
      )
  }
}
