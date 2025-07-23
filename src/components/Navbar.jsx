import { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
    const isLoggedIn = false;

  return (
    <nav className='fixed top-0 w-full z-99 bg-red-500 flex justify-between items-center h-14 p-2 text-white '>
        <div>
            <h3>logo</h3>
        </div>

        <div className=''>
            {isLoggedIn ? (
                <>
                <Link>
                    <span>login</span>
                </Link>
                </>
            ) : (
                <>
                <Link>
                    <span>history</span>
                </Link>
                <button>
                    <span>logout</span>
                </button>
                </>
            )}
        </div>
    </nav>
  )
}

export default Navbar;