import { useState, useEffect, useContext } from 'react'
import { useNavigate } from "react-router-dom"
import { useFirebase } from "../context/Firebase";


const SignIn = () => {
    const [form, setForm] = useState({ email: '', password: '' });
    const [error, setError] = useState('');

    const firebase = useFirebase();
    const navigate = useNavigate();

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        try {
            const response = await firebase.SignIn(email, password);
            console.log('Registration successful', response);

            // navigate
        } catch (err) {
            // error set
        }
    }


  return (
    <div className="flex justify-center items-center">
        <form
            onSubmit={handleSubmit}
            className="border border-black p-6"
        >
            <div className="mb-4 px-3">
                <label htmlFor="email" className="block font-medium mb-2" >Email</label>
                <input 
                    type="text"
                    id="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    required
                    className="w-full border-b bg-transparent px-3 py-1 hover:bg-white hover:bg-opacity-20 focus:outline-none"
                />
            </div>

            <div className="mb-4 p-3">
                <label htmlFor="password" className="block font-medium mb-2" >Password</label>
                <input 
                    type="text"
                    id="password"
                    name="password"
                    value={form.password}
                    onChange={handleChange}
                    required
                    className="w-full border-b bg-transparent px-3 py-1 hover:bg-white hover:bg-opacity-20 focus:outline-none"
                />
            </div>

            <div className="flex justify-center">
                <button
                type="submit"
                className="border text-black py-2 px-12 hover:bg-blue-500 hover:text-white"
                >
                SignIn
                </button>
            </div>

        </form>
    </div>
  )
}

export default SignIn;