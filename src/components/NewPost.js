import React from 'react'
import './styles/NewPost.css'

class NewPost extends React.Component {
  submitForm = e => {
    e.preventDefault()
  }

  render() {
    return (
      <form onSubmit={e => this.submitForm(e)}>
        <label htmlFor="title">title</label>
        <input
          type="text"
          id="title"
          name="title"
          ref={e => (this.title = e)}
        />
        <label htmlFor="content">content</label>
        <textarea id="content" name="content" />
        <input type="submit" value="publish" />
      </form>
    )
  }
}

export default NewPost
