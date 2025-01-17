import React from 'react'
import {useDispatch} from 'react-redux'
import authService from '../../appwrite/auth'
import {logout} from '../../Store/authSlice'
import store from '../../Store/Store'

function Logoutbtn() {
    const dispatch = useDispatch()

    const logoutHandler = ()=>{
        authService.logout() //this is a promise
        .then(()=>{
            dispatch(logout())
            console.log("Redux state after logout:", store.getState());
        })
    }

  return (
    <button onClick={logoutHandler} className='inline-block px-6 py-2 duration-200 hover:bg-blue-100 rounded-full'>
        Logout
    </button>
  )
}

export default Logoutbtn