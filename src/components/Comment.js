import React from 'react'
import { withRouter, Link } from 'react-router-dom'
import './styles/Comment.css'

const Comment = props => {
  return (
    <article className="Comment">
      <header>
        <strong>
          <Link to={`/blog/${props.username}`}>{props.username}</Link>
        </strong>
      </header>
      {props.content}
      <footer>
        <small>{props.createdAt}</small>
      </footer>
    </article>
  )
}

export default withRouter(Comment)
