/* import React from "react";

export default function NavBar() {
    return (
        <div className = "bg-white w-full">
            <p className="p-3 font-bold italic text-black text-2xl">RART-2000</p>
        </div>
    )
} */

    import React from 'react';
    import { useNavigate } from 'react-router-dom';
    
    export default function NavBar() {
        const navigate = useNavigate();
    
        const handleLogout = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/logout', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    credentials: 'include',
                });
    
                const data = await response.json();
                
                if (data.success) {
                    // Clear user data from localStorage
                    localStorage.removeItem('user');
                    // Redirect to login page
                    navigate('/');
                } else {
                    console.error('Logout failed:', data.message);
                }
            } catch (err) {
                console.error('Failed to connect to server:', err);
            }
        };
    
        return (
            <div className="bg-zinc-800 h-16 flex justify-between items-center px-4">
                <div className="text-white font-bold text-xl">RART-2000</div>
                <div className="flex items-center">
                    {/* Display username if available */}
                    <div className="text-white mr-4">
                        {localStorage.getItem('user') ? 
                            JSON.parse(localStorage.getItem('user')).username : ''}
                    </div>
                    <button 
                        onClick={handleLogout}
                        className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md"
                    >
                        Logout
                    </button>
                </div>
            </div>
        );
    }