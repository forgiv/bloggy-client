import React from 'react'
import connect from 'react-redux/lib/connect/connect'
import { getPosts } from '../actions/post'

class Blog extends React.Component {
  componentWillMount() {
    this.props.dispatch(getPosts(this.props.match.params.username))
  }

  render() {
    if (this.props.error) return <div>{this.props.error}</div>

    return (
      <div>
        {this.props.posts.map(post => {
          return (
            <article>
              <header>{post.title}</header>
              {post.content}
              <footer>
                <small>{post.createdBy}</small>
              </footer>
            </article>
          )
        })}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  posts: state.post.posts,
  error: state.post.error
})

export default connect(mapStateToProps)(Blog)
