import React, { useState } from 'react'
import {NavLink} from 'react-router-dom'

export default function AlertSide({showAlert}) {
   
    return (
        <div className={`fixed top-0 -right-2 w-64 m-1 p-3 px-5 mt-14 bg-white border-2 
            border-solid border-zinc-500 flex flex-col z-10`}>
                
            <p>Found Errors: </p>


            {/* <p className = "text-lg underline">DUT-{id}</p>
            <div className="my-3 flex flex-col">
                Progress: 
                {isFailed ? <p className="text-red-500">Relay Failed</p>
                    : <div className="border border-solid border-black rounded-sm w-full bg-zinc-500">
                        <div className = "pl-2 w-1/3 bg-green-500">{progress}%</div>
                        </div>}
            </div>
            <p>On/Off Cycle:</p>
            <p>Avg bounce period (ms): </p>
            <p>Avg bounce count: </p>
            <p>Avg SCR (ohms): </p>
            <p>Avg DCR (ohms): </p>
            <NavLink 
                to = "/module"
                state = {{ dut_no: id-1}}
                className="text-center m-3 p-1 rounded-md bg-zinc-300 hover:bg-gray-200">View Module
            </NavLink> */}
        </div>
    )
}
