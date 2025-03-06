/* import TextInput from '../components/TextInput'
import {NavLink} from 'react-router-dom'

export default function RegisterPage() {
    return (
        <div className="bg-zinc-600 min-h-screen">
            <p className="p-3 font-bold italic text-white text-2xl">RART-2000</p>
    
            <div className="flex items-center flex-col">
                <form>
                    <TextInput label="username"/>
                    <TextInput label="company"/>
                    <TextInput label="password"/>
                    <button className="m-3 w-96 p-1 rounded-md bg-sky-300 hover:bg-sky-400">Register</button>
                </form>
                <NavLink
                    to="/"
                    className="m-3 mt-8 w-96 p-1 text-center rounded-md bg-white hover:bg-gray-200">
                    Sign In
                </NavLink>
            </div>
        </div>
    )
} */

    import { useState } from 'react'
    import TextInput from '../components/TextInput'
    import { NavLink, useNavigate } from 'react-router-dom'
    
    export default function RegisterPage() {
        const [formData, setFormData] = useState({
            username: '',
            company: '',
            password: ''
        });
        const [error, setError] = useState('');
        const navigate = useNavigate();
    
        const handleChange = (e) => {
            setFormData({
                ...formData,
                [e.target.name]: e.target.value
            });
        };
    
        const handleSubmit = async (e) => {
            e.preventDefault();
            setError('');
            
            try {
                const response = await fetch('http://localhost:5000/api/register', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    credentials: 'include',
                    body: JSON.stringify(formData)
                });
    
                const data = await response.json();
                
                if (data.success) {
                    navigate('/control');  // Redirect to control page on success
                } else {
                    setError(data.message || 'Registration failed');
                }
            } catch (err) {
                setError('Failed to connect to server');
            }
        };
    
        return (
            <div className="bg-zinc-600 min-h-screen">
                <p className="p-3 font-bold italic text-white text-2xl">RART-2000</p>
        
                <div className="flex items-center flex-col">
                    <form onSubmit={handleSubmit}>
                        <TextInput 
                            label="username"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                        />
                        <TextInput 
                            label="company"
                            name="company"
                            value={formData.company}
                            onChange={handleChange}
                        />
                        <TextInput 
                            label="password"
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                        />
                        {error && (
                            <p className="text-red-500 text-center mb-3">{error}</p>
                        )}
                        <button 
                            type="submit" 
                            className="m-3 w-96 p-1 rounded-md bg-sky-300 hover:bg-sky-400"
                        >
                            Register
                        </button>
                    </form>
                    <NavLink
                        to="/"
                        className="m-3 mt-8 w-96 p-1 text-center rounded-md bg-white hover:bg-gray-200"
                    >
                        Sign In
                    </NavLink>
                </div>
            </div>
        );
    }