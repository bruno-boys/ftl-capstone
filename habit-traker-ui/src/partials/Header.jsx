import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../images/habit-traker-logo.png'
import Avatar from "./Avatar"

function Header() {

  const [top, setTop] = useState(true);
  const navigate = useNavigate();

  const handleLogout = async (event) => {
    event.preventDefault();
    localStorage.clear();
    navigate("/");
  };

  // detect whether user has scrolled the page down by 10px 
  useEffect(() => {
    const scrollHandler = () => {
      window.pageYOffset > 10 ? setTop(false) : setTop(true)
    };
    window.addEventListener('scroll', scrollHandler);
    return () => window.removeEventListener('scroll', scrollHandler);
  }, [top]);  

  return (
    <header className={`fixed w-full z-30 md:bg-opacity-90 transition duration-300 ease-in-out ${!top && 'bg-white backdrop-blur-sm shadow-lg'}`}>

      <div className="max-w-6xl mx-auto px-5 sm:px-6">
        <div className="flex items-center justify-between h-16 md:h-20" >

          {/* Site branding */}
          <div className="flex-shrink-0 mr-4">
            {/* Logo */}
            {
              !localStorage.getItem("habit_traker_token") ? 

              <Link to="/" className="block" aria-label="Cruip">
                <img src="src/images/habit-traker-logo.png" alt="" style={{width:"150px", height:"auto"}} />
              </Link>

             :

              <Link to="/activity" className="block" aria-label="Cruip">
                <img src={logo} alt="" style={{width:"150px", height:"auto"}} />
              </Link>
            }

          </div>

          {/* Site navigation */}
          {
            !localStorage.getItem("habit_traker_token") ? 
             
            <nav className="flex flex-grow">
              <ul className="flex flex-grow justify-end flex-wrap items-center">
                <li>
                  <Link to="/signin" className="font-medium text-gray-600 hover:text-gray-900 px-5 py-3 flex items-center transition duration-150 ease-in-out">Sign in</Link>
                </li>
                <li>
                  <Link to="/signup" className="btn-sm text-gray-200 bg-gray-900 hover:bg-gray-800 ml-3">
                    <span>Sign up</span>
                    <svg className="w-3 h-3 fill-current text-gray-400 flex-shrink-0 ml-2 -mr-1" viewBox="0 0 12 12" xmlns="http://www.w3.org/2000/svg">
                      <path d="M11.707 5.293L7 .586 5.586 2l3 3H0v2h8.586l-3 3L7 11.414l4.707-4.707a1 1 0 000-1.414z" fillRule="nonzero" />
                    </svg>                  
                  </Link>
                </li>
              </ul>
            </nav>

          :

            <nav className="flex flex-grow" style={{width:"100%"}}>
              <ul className="flex flex-grow justify-end flex-wrap items-center" style={{width:"100%"}}>
                <li>
                  <Link to="/activity" className="font-medium text-gray-600 hover:text-gray-900 px-5 py-3 flex items-center transition duration-150 ease-in-out" style={{color:"#338CF5"}}>Dashboard</Link>
                </li>
                <li>
                  <Link to="/habits" className="font-medium text-gray-600 hover:text-gray-900 px-5 py-3 flex items-center transition duration-150 ease-in-out" style={{color:"#338CF5"}}>Habits</Link>
                </li>
                <li>
                  <Link to = "/dummy" className="font-medium text-gray-600 hover:text-gray-900 px-5 py-3 flex items-center transition duration-150 ease-in-out" style={{color:"#338CF5"}}> Resources </Link>
                </li>
                {/* <li>
                  <Link to="/buddy-link" className="font-medium text-gray-600 hover:text-gray-900 px-5 py-3 flex items-center transition duration-150 ease-in-out">Buddies</Link>
                </li>
                <li>
                  <Link to="/user-profile" className="font-medium text-gray-600 hover:text-gray-900 px-5 py-3 flex items-center transition duration-150 ease-in-out">User Profile</Link>
                </li>
                <li>
                  <div className="btn-sm text-gray-200 bg-gray-900 hover:bg-gray-800 ml-3" onClick={handleLogout}>
                    <span>Sign out</span>
                    <svg className="w-3 h-3 fill-current text-gray-400 flex-shrink-0 ml-2 -mr-1" viewBox="0 0 12 12" xmlns="http://www.w3.org/2000/svg">
                      <path d="M11.707 5.293L7 .586 5.586 2l3 3H0v2h8.586l-3 3L7 11.414l4.707-4.707a1 1 0 000-1.414z" fillRule="nonzero" />
                    </svg>                  
                  </div>
                </li> */}
                <li>
                  <Avatar handleLogout={handleLogout}/>
                </li>
              </ul>
            </nav>
          }

        </div>
      </div>

    </header>
  );
}

export default Header;
