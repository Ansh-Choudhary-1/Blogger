import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import Container from '../Container/Container.jsx';
import Logo from '../Logo.jsx';
import LogoutBtn from './LogoutBtn.jsx';

function Header() {
  const authStatus = useSelector((state)=>state.auth?.status)
  const navigate = useNavigate()
  const navItems = [
    {
      name: 'Home',
      slug: "/",
      active: true
    }, 
    {
      name: "Login",
      slug: "/login",
      active: !authStatus,
  },
  {
      name: "Signup",
      slug: "/signup",
      active: !authStatus,
  },
  {
      name: "All Posts",
      slug: "/all-posts",
      active: authStatus,
  },
  {
      name: "Add Post",
      slug: "/add-post",
      active: authStatus,
  },
  ]

  return (
    <header
    className='py-3 shadow bg-gray-500'>
      <Container>
        <nav>
          <div className='mr-4'>
            <Link to='/'>
            <Logo width='70px'/>
            </Link>
          </div>
          <ul className='flex ml-auto'>
            {navItems.map((item)=>
            item.active?(
              <li key ={item.name}>
                <button
                onClick={()=>navigate(item.slug)}
                className='inline-block px-6 py-2 duration-200 hover:bg-blue-100 rounded-full'
                >{item.name}</button>
              </li>
            ):null
            )}

            {authStatus && ( // agr authStatus h sirf tb yeh () waali cheez dikhegi kaafi common syntax h
              <li>
                <LogoutBtn/>
              </li>
            )}

          </ul>
        </nav>
      </Container>
    </header>
  )
}

export default Header


// Production grade takeAways from here 
// 1. Navbar bnane ke liye ek array create krle usmei slug daal name daal state daal and fir usko map krle and navigate mei slug daalde
// 2. Logout button ke liye authstatus dekhlio or && ka use krlio