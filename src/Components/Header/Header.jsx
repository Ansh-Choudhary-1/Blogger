// import React from "react";
// import { Container, Logo, LogoutBtn } from "../index";
// import { Link } from "react-router-dom";
// import { useNavigate } from "react-router-dom";
// import { useSelector } from "react-redux";

// function Header() {
//   const authStatus = useSelector((state) => state.auth.status);
//   const navigate = useNavigate();
  


//   const navItems = [
//     {
//       name: "Home",
//       slug: "/",//url kaha ja raha hai 
//       active: true,
//     },
//     {
//       name: "Login",
//       slug: "/login",
//       active: !authStatus,
//     },
//     {
//       name: "Signup",
//       slug: "/signup",
//       active: !authStatus,
//     },
//     {
//       name: "All Posts",
//       slug: "/all-posts",
//       active: authStatus,
//     },
//     {
//       name: "Add Post",
//       slug: "/add-post",
//       active: authStatus,
//     },
//   ];
//   return (
//     <header className="py-3 shadow bg-gray-500">
//       {/* //header sepcialyy made for making header */}
//       <Container>
//         <nav className="flex">
//           <div className="mr-4">
//             <Link to="/">
//               <Logo width="70px" />
//             </Link>
//           </div>
//           <ul className="flex ml-auto">
//             {navItems.map((item) =>
//               item.active ? (
//                 <li key={item.name}>
//                   <button
//                     onClick={() => navigate(item.slug)}
//                     //navigate and href or link are same
//                     className="inline-bock px-6 py-2 duration-200 hover:bg-blue-100 rounded-full"
//                   >
//                     {item.name}
//                   </button>
//                 </li>
//               ) : null
//             )}
//             {authStatus && (
//               //authsatus true hoga then implemnt hoga ya nahi
//               <li>
//                 <LogoutBtn />
//               </li>
//             )}
//           </ul>
//         </nav>
//       </Container>
//     </header>
//   );
// }



// export default Header;


// import React from "react";
// import { Container, Logo, LogoutBtn } from "../index";
// import { Link } from "react-router-dom";
// import { useNavigate } from "react-router-dom";
// import { useSelector } from "react-redux";

// function Header() {
//   const authStatus = useSelector((state) => state.auth.status);
//   const navigate = useNavigate();

//   const navItems = [
//     {
//       name: "Home",
//       slug: "/",
//       active: true,
//     },
//     {
//       name: "Login",
//       slug: "/login",
//       active: !authStatus,
//     },
//     {
//       name: "Signup",
//       slug: "/signup",
//       active: !authStatus,
//     },
//     {
//       name: "All Posts",
//       slug: "/all-posts",
//       active: authStatus,
//     },
//     {
//       name: "Add Post",
//       slug: "/add-post",
//       active: authStatus,
//     },
//   ];

//   return (
//     <header className="sticky top-0 z-50 bg-gradient-to-r from-gray-800 to-gray-900 shadow-lg">
//       <Container>
//         <nav className="flex items-center justify-between py-3">
//           <Link to="/" className="flex items-center space-x-2">
//             <Logo width="70px" className="text-white" />
//             <span className="text-xl font-bold text-white hidden md:block">WordCraft </span>
//           </Link>
          
//           <ul className="flex items-center space-x-2 md:space-x-4">
//             {navItems.map((item) =>
//               item.active ? (
//                 <li key={item.name}>
//                   <button
//                     onClick={() => navigate(item.slug)}
//                     className="px-4 py-2 text-sm md:text-base font-medium text-white hover:bg-gray-700 rounded-full transition-colors duration-200"
//                   >
//                     {item.name}
//                   </button>
//                 </li>
//               ) : null
//             )}
//             {authStatus && (
//               <li className="ml-2">
//                 <LogoutBtn className="bg-red-600 hover:bg-red-700" />
//               </li>
//             )}
//           </ul>
//         </nav>
//       </Container>
//     </header>
//   );
// }

// export default Header;


import React from "react";
import { Container, LogoutBtn } from "../index";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function Header() {
  const authStatus = useSelector((state) => state.auth.status);
  const navigate = useNavigate();

  const navItems = [
    {
      name: "Home",
      slug: "/",
      active: true,
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
  ];

  return (
    <header className="sticky top-0 z-50 bg-gradient-to-r from-gray-800 to-gray-900 shadow-lg">
      <Container>
        <nav className="flex items-center justify-between py-3">
          <Link to="/" className="text-xl font-bold text-white hidden md:block">WordCraft</Link>
          
          <ul className="flex items-center space-x-2 md:space-x-4">
            {navItems.map((item) =>
              item.active ? (
                <li key={item.name}>
                  <button
                    onClick={() => navigate(item.slug)}
                    className="px-4 py-2 text-sm md:text-base font-medium text-white hover:bg-gray-700 rounded-full transition-colors duration-200"
                  >
                    {item.name}
                  </button>
                </li>
              ) : null
            )}
            {authStatus && (
              <li className="ml-2">
                <LogoutBtn className="bg-red-600 hover:bg-red-700" />
              </li>
            )}
          </ul>
        </nav>
      </Container>
    </header>
  );
}

export default Header;

