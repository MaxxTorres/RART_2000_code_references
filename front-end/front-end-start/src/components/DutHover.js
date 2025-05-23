import React, { useState, useContext } from 'react'
import { DeviceContext } from '../context/DeviceContext'
import {NavLink} from 'react-router-dom'

export default function DutHover(props) {
    const {mouse_pos, show, id, progress, isFailed, cycle, bounce} = props
    const [showStay, setshowStay] = useState(false)
    const {deviceData} = useContext(DeviceContext)

    const handleMouseEnter = () => {
        setshowStay(true)
    }

    const handleMouseLeave = () => {
        setshowStay(false)
    }
   
    return (
        <div className={`z-10 absolute rounded-md w-64 m-1 p-3 px-5 mt-14 bg-white border-2 
            border-solid border-zinc-500 flex flex-col shadow
            ${show | showStay ? "":"hidden"}`}
            style={{
                left: `${mouse_pos[0]}px`,
                top: `${mouse_pos[1]-125}px`,
              }}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}>
            <p className = "text-lg underline">DUT-{id}</p>
            <div className="my-3 flex flex-col">
                Progress: 
                {isFailed ? <p className="text-red-500">Relay Failed</p>
                    : <div className="border border-solid border-black rounded-sm w-full bg-zinc-500">
                        <div className = "pl-2 bg-green-500"
                            style = {{width: `${deviceData[id-1].progress}%`}}>
                            {deviceData[id-1].progress}%
                        </div>
                    </div>}
            </div>
            <p>On/Off Cycle:</p>
            <p className = "mt-2">Average</p>
            <div className="ml-2">
                <p>Bounce Period (ms): </p>
                <p>Bounce Count: </p>
                <p>SCR (ohms): </p>
                <p>DCR (ohms): </p>
            </div>
            <NavLink 
                to = "/module"
                state = {{ dut_no: id-1}}
                className="text-center m-3 p-1 rounded-md bg-zinc-300 hover:bg-gray-200">View Module
            </NavLink>
        </div>
    )
}
