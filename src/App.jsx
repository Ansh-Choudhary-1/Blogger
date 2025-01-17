import { useState,useEffect } from 'react'
import './App.css'
import { useDispatch } from "react-redux";
import AuthService from "./appwrite/auth"
import {login,logout} from './Store/authSlice'
import { Outlet } from 'react-router-dom';
import {Header, Footer} from './Components/index'

function App() {
  const [loading,setLoading] = useState(true)
  const dispatch = useDispatch();

  useEffect(()=>{
    AuthService.getCurrentUser()
    .then((userData)=>{
      if(userData){
        dispatch(login({userData}))
      }else{
        dispatch(logout())
      }
    })
    .finally(()=>setLoading(false))
  },[])


  return!loading? (
    <div className='min-h-screen flex flex-wrap content-between bg-gray-400'>
      <div className='w-full block'>
        <Header/>
        <main>
          TODO: <Outlet/>
          </main>
        <Footer/>
      </div>
    </div>
  ):null
}

export default App
