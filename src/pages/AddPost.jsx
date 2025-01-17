import React from 'react'
import {Container} from '../Components/index'
import {PostForm} from '../Components/index'

function AddPost() {
  return (
    <div className='py-8'>
        <Container>
            <PostForm post={null} />
        </Container>

    </div>
  )
}

export default AddPost
