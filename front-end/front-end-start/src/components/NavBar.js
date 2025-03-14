import React from "react";
import {NavLink} from 'react-router-dom'

export default function NavBar() {
    return (
        <div className = "flex flex-row justify-between bg-white w-full">
            <p className="p-3 text-black text-2xl">Company | Username</p>
            <div className = "flex flex-row">
                <p className="p-3 font-bold italic text-black text-2xl">RART-2000</p>
                <button className="text-red-300 border-x-2 border-black my-2 p-2 text-xl font-bold hover:bg-gray-200">{"<!>"}</button>
                <NavLink to = "/" className="m-2 p-2 rounded-md bg-zinc-300 hover:bg-gray-200">Sign Out</NavLink>
            </div>
        </div>
    )
}