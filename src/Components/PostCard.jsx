import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import appwriteService from '../appwrite/config'
import { useState } from 'react'


function PostCard({
    $id,            // confusion mt lio appwrite ka syntax h bs 
    title,
    featuredImage
}){
    const [imageUrl, setImageUrl] = useState("")
    useEffect(()=>{
        async function getImage(){
        const url = await appwriteService.getFilePreview(featuredImage)
        setImageUrl(url)}
        getImage();
    },[featuredImage])

    //<Img src={}> yeh src url as string leta h or getFilePreview() isko ek promise bhej rha tha isiliye yeh krna pda 
  
  return (
    <Link to={`/post/${$id}`}>
        <div className='w-full bg-gray-100 rounded-xl p-4'>
            <div className='w-full justify-center mb-4'>
                <img src={imageUrl} alt={title} className='rounded-xl'/>
            </div>
            <h2 className='text-xl font-bold'>{title}</h2>
        </div>
    </Link>
  )
}

export default PostCard