import React from 'react'
import './styles/Comment.css'

const Comment = props => {
  return (
    <article className="Comment">
      <header>
        <strong>{props.username}</strong>
      </header>
      {props.content}
      <footer>
        <small>{props.createdAt}</small>
      </footer>
    </article>
  )
}

export default Comment
