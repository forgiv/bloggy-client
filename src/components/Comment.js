import React from 'react'

const Comment = props => {
  return (
    <article>
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
