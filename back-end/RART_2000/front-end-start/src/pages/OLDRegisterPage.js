import React, { useState } from 'react'
import TextInput from '../components/TextInput'
import {NavLink} from 'react-router-dom'

export default function RegisterPage() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        company: "",
        password: "",
    });

    const [message, setMessage] = useState("");
    
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();

        fetch('http://localhost:5000/api/register', {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData),
        })
        .then((res) => res.json())
        .then((data) => {
        if (data.error) {
            setMessage(`❌ ${data.error}`);
        } else {
            setMessage(`✅ ${data.message}`);
            setFormData({ name: "", company: "", email: "", password: "" }); // Reset form
        }
        })
        .catch((err) => setMessage("❌ Error registering user"));
    };

    return (
        <div className="bg-zinc-600 min-h-screen">
            <p className="p-3 font-bold italic text-white text-2xl">RART-2000</p>
    
            <div className="flex items-center flex-col">
                <form className="flex items-center flex-col" onSubmit = {handleSubmit}>
                    <input
                        type="text"
                        name="name"
                        placeholder="full name"
                        value={formData.name}
                        onChange={handleChange}
                        className="text_input"
                        required
                    />
                    <input
                        type="text"
                        name="company"
                        placeholder="company"
                        value={formData.company}
                        onChange={handleChange}
                        className="text_input"
                        required
                    />
                     <input
                        type="email"
                        name="email"
                        placeholder="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="text_input"
                        required
                    />
                    <input
                        type="password"
                        name="password"
                        placeholder="password"
                        value={formData.password}
                        onChange={handleChange}
                        className="text_input"
                        required
                    />
                    <button className="m-3 w-96 p-1 rounded-md bg-sky-300 hover:bg-sky-400">Register</button>
                </form>

                <NavLink
                    to="/"
                    className="m-3 w-96 p-1 text-center rounded-md bg-white hover:bg-gray-200">
                    Sign In
                </NavLink>
            </div>
        </div>
    )
}