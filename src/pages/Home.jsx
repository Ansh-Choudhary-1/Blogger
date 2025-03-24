import React,{useEffect,useState} from 'react'
import appwriteService from "../appwrite/config"
import {Container,PostCard} from "../Components/index"
import { useSelector } from 'react-redux'



function Home() {
    const [posts, setPosts] = useState([])

    const authStatus = useSelector((state)=>state.auth?.status)
    //Fetching Post
    useEffect(()=>{
        appwriteService.getPosts().then((posts)=>{
            if(posts){
                setPosts(posts.documents)//This is a list of arrays
            }
        })
    },[])


    if(authStatus==false){
        return <div>Please Login</div>
    }
    else{

    if(posts.length ===0){
        return <div>No posts available</div>
    }
    
  return (
    <div className='w-full py-8'>
        <Container>
            <div className='flex flex-wrap'>
                {posts.map((post)=>(
                    <div key={post.$id} className='p-2 w-1/4'>
                        <PostCard {...post} />
                    </div>
                ))}
            </div>
        </Container>
    </div>
    )
   }
}

export default Home

// Dekh kis tarah redux ke auth ko use kr kr hm status lekr layout design kr rhe h
// {
//     "total": 10,
//     "documents": [
//         { ...post1 },
//         { ...post2 },
//         ...
//     ]
// } This is the structure in which getPosts returns