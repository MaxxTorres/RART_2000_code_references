import React, { useState } from 'react'
import {NavLink} from 'react-router-dom'

export default function SignPage() {
    const [formData, setFormData] = useState({
            name: "",
            password: "",
    });


    return (
    <div className="bg-zinc-600 min-h-screen">
        <p className="p-3 font-bold italic text-white text-2xl">RART-2000</p>

        <div className="flex items-center flex-col">
            <form className="flex items-center flex-col">
                <input
                    type="name"
                    name="name"
                    placeholder="full name"
                    value={formData.password}
                    onChange={()=>{}}
                    className="text_input"
                    required
                />
                <input
                    type="password"
                    name="password"
                    placeholder="password"
                    value={formData.password}
                    onChange={()=>{}}
                    className="text_input"
                    required
                />
                <button className="m-3 w-96 p-1 rounded-md bg-sky-300 hover:bg-sky-400">Sign In</button>
            </form>
            <NavLink
                to="/register"
                className="m-3 w-96 p-1 text-center rounded-md bg-white hover:bg-gray-200">
                Register
            </NavLink>
        </div>
    </div>
    )
}