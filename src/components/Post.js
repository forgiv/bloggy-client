import React from 'react'
import withRouter from 'react-router-dom/withRouter'
import connect from 'react-redux/lib/connect/connect'
import { getPost } from '../actions/post'
import { Link } from 'react-router-dom'
import './styles/Post.css'
import * as marked from 'marked'
import { getComments } from '../actions/comment'
import Comment from './Comment'
import NewComment from './NewComment'

class Post extends React.Component {
  componentWillMount() {
    const { username, slug } = this.props.match.params
    this.props.dispatch(getPost(username, slug))
    this.props.dispatch(getComments(username, slug))
  }

  render() {
    if (this.props.post) {
      return (
        <div className="Post-Container">
          <Link to={`/blog/${this.props.match.params.username}`}>
            &lt;- back to blog
          </Link>
          <article className="Post">
            <header>
              <h1 className="title">{this.props.post.title}</h1>
              <h2 className="sub-title">{this.props.match.params.username}</h2>
            </header>
            <div
              dangerouslySetInnerHTML={{
                __html: marked(this.props.post.content)
              }}
            />
            <footer>
              <small>{this.props.post.createdAt}</small>
            </footer>
          </article>
          <div>
            <NewComment
              {...{
                username: this.props.match.params.username,
                slug: this.props.match.params.slug
              }}
            />
            {this.props.comments.map(c => (
              <Comment
                username={c.userId.username}
                content={c.content}
                createdAt={c.createdAt}
                key={c.id}
              />
            ))}
          </div>
        </div>
      )
    }
    return <div>404 - Post not found</div>
  }
}

const mapStateToProps = state => ({
  post: state.post.posts[0],
  authToken: state.auth.authToken,
  comments: state.comment.comments
})

export default withRouter(connect(mapStateToProps)(Post))
