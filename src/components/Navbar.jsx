import { useState, useContext, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AlignJustify, AudioWaveform, History, X } from 'lucide-react';
import { useFirebase } from '../context/Firebase';


const Navbar = () => {
    const [show, setShow] = useState(false);
    const isLoggedIn = true;

    const firebase = useFirebase();

    const handleClick = () => {
        if(show === true) setShow(false)
        else setShow(true)
    }

  return (
    <>
        <nav className='fixed top-0 w-full z-91 bg-black flex justify-between items-center h-14 p-2 text-white '>
            <div className='m-2'>
                <AudioWaveform size={30}/>
            </div>

            <div className=''>
                {isLoggedIn ? (
                    <>
                    <div className='m-2 sm:hidden'>
                        <AlignJustify className='cursor-pointer' onClick={handleClick}/>
                    </div>
                    <div className='p-2 text-[14px] hidden sm:block'>
                        <Link className='mr-4 cursor-pointer'>
                            <span>History</span>
                        </Link>
                        <Link className='cursor-pointer'>
                            <span>Logout</span>
                        </Link>
                    </div>
                    </>
                ) : (
                    <>
                    <div className='p-2 cursor-pointer text-[14px]' >Enter</div>
                    </>
                )}
            </div>
        </nav>

        {show && (
            <div className='border-t border-white fixed top-14 right-0 bg-black h-full w-full z-99 justify-center items-center flex'>
                <div className='flex flex-col top-0 absolute h-[400px] w-[250px] bg-black'>
                    <Link className='text-white pt-10 pl-1'>
                        <span>History</span>
                    </Link>
                    <hr className="border-t border-gray-500 my-4" />
                    <Link className='text-white pl-1'>
                        <span>Logout</span>
                    </Link>
                    <hr className="border-t border-gray-500 my-4" />
                    <div className='justify-center items-center flex mt-4'>
                        <X className='text-white' onClick={handleClick}/>
                    </div>
                    
                </div>
            </div>
        )}
    </>
  )
}

export default Navbar;