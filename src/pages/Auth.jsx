import { useState } from 'react'
import SignIn from '../components/SignIn';
import SignUp from '../components/SignUp';

const Auth = () => {
  const [page, setPage] = useState(false)

  const changeState1 = () => { setPage(true) }
  const changeState2 = () => { setPage(false) }

  return (
    <div className="min-h-screen flex flex-col justify-center items-center">
      <div className="flex justify-center gap-4 mb-4">
        <div
          className={`border px-4 py-2 cursor-pointer ${
            page ? 'bg-blue-500 text-white' : 'bg-white'
          }`}
          onClick={changeState1}
        >
          SignUp
        </div>
        <div
          className={`border px-5 py-2 cursor-pointer ${
            !page ? 'bg-blue-500 text-white' : 'bg-white'
          }`}
          onClick={changeState2}
        >
          SignIn
        </div>
      </div>

      {page ? <SignUp /> : <SignIn />}
    </div>
  )
}

export default Auth;