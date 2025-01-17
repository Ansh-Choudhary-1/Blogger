import React,{useState,useEffect} from 'react'
import {useSelector} from 'react-redux'
import {useNavigate} from 'react-router-dom'

export default function AuthLayout({children,authentication = true}) {
    const navigate = useNavigate();
    const [loader,setLoader] = useState(true)
    let authStatus = useSelector(state=>state.auth.status)
    

    useEffect(()=>{
      setLoader(true);
        // TODO: make it more easy to understand
        if (authentication) {
          if (authStatus !== true) navigate("/login");
      } else {
          if (authStatus !== false) navigate("/");
      }
        setLoader(false)
    },[authStatus,navigate,authentication])

  return (
    loader ? <h1>Loading...</h1>:<>{children}</>
  )
}

