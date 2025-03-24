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


  return loading?"Please wait" :(
    <div className='min-h-screen flex flex-wrap content-between bg-gray-400'>
      <div className='w-full block'>
        <Header/>
        <main>
          TODO: <Outlet/>
          </main>
        <Footer/>
      </div>
    </div>
  )
}

export default App

// Login ke time pr get user se sara data lekr redux store mei daalna h taaki tu usse flexibly use kr paye
// ab iss file mei kyuki <Outlet/> rkha h toh createRoute mei jakr element mei isko daalenge <App/> or children mei fir baaki ki cheeze daalenge