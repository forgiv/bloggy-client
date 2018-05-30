import React from 'react'
import { Link } from 'react-router-dom'
import './styles/Home.css'

const Home = () => {
  return (
    <div className="Home">
      <ul>
        <li>
          <Link to="/login">Login</Link>
        </li>
        <li>
          <Link to="/register">Register</Link>
        </li>
      </ul>
    </div>
  )
}

export default Home
