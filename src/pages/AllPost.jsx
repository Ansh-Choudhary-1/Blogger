import React from 'react'
import Container from '../Components/Container/Container'
import PostCard from '../Components/PostCard'
import appwriteService from "../appwrite/config"

function AllPost() {
    
    //Jb bhi state change hojati h tb react schedule krta h ek rerender
    // Ab jb rerender hoga toh tera appwriteService bhi dubara se run hojaiga iss vajah se useEffect Likhna pdta h
    //jo bs uss code ko ek baar run krega jb pura page refresh hoga or state update ke rerenders mei run nhi krega
    const [posts, setPosts] = React.useState([]);
        React.useEffect(()=>{
            appwriteService.getPosts([]).then((posts)=>{
                console.log(posts);
            
                if(posts){
                    setPosts(posts.documents)
                }
            })
    },[])
        
    
    
  return (
    <div className='flex flex-wrap w-full py-8'>
        <Container>
            {posts.map((post)=>{
                return(                
                <div key = {post.$id} className='p-2 w-1/4'>
                    <PostCard {...post} />
                </div>
            )})}
        </Container>
    </div>
  )
}

export default AllPost