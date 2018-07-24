import React from 'react'

import './styles/card.css'

export const inCard = (WrappedComponent, props) => {
  return (
    <div className="Card">
      <WrappedComponent {...props} />
    </div>
  )
}
