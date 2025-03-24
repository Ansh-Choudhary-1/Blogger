import React from 'react'

function Container({children}) {
  return (
    <div className='w-full max-w-7xl mx-auto px-4'>
        {children}
    </div>
  )
}

export default Container

// CSS easy krne ke liye ek container bnaliya or ab cheeze pages(routing) ke time ismei dalegi