import React from "react";
import {NavLink} from 'react-router-dom'

export default function NavBarSide() {

    return (
        <div className = "bg-zinc-300 w-48">
            <div className="h-2/5 border-b-2 border-black">
                <NavLink 
                    to = "/landing"
                    className={({ isActive }) =>
                        `text-xl flex items-center justify-center w-full h-full hover:bg-gray-200 transition-all duration-200 ${
                          isActive ? "font-bold underline text-blue-600" : "text-gray-800"
                        }`}>
                        Overview
                </NavLink>
            </div>
            <div className="h-3/5">
                <NavLink 
                    to = "/control"
                    className={({ isActive }) =>
                        `text-xl flex items-center justify-center w-full h-full hover:bg-gray-200 transition-all duration-200 ${
                          isActive ? "font-bold underline text-blue-600" : "text-gray-800"
                        }`}>
                        Layers
                </NavLink>
            </div>
        </div>
    )
}