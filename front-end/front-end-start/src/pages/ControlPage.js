import React, {useState} from 'react'
import NavBar from '../components/NavBar'
import NavBarSide from '../components/NavBarSide'
import DutSmall from '../components/DutSmall'
import DutHover from '../components/DutHover'
import AlertSide from '../components/AlertSide'
import mcuImage from '../assets/mcu_bg_trans.png'
import { FaLayerGroup } from "react-icons/fa6"

const duts = [
    {id: 1, progress: 40, isFailed: false},
    {id: 2, progress: 30, isFailed: false},
    {id: 3, progress: 45, isFailed: true},
    {id: 4, progress: 20, isFailed: false},
    {id: 5, progress: 60, isFailed: false},
    {id: 6, progress: 37, isFailed: true},
    {id: 7, progress: 15, isFailed: true},
    {id: 8, progress: 84, isFailed: false},
    {id: 9, progress: 40, isFailed: true},
    {id: 10, progress: 30, isFailed: false},
    {id: 11, progress: 45, isFailed: true},
    {id: 12, progress: 20, isFailed: false},
    {id: 13, progress: 60, isFailed: true},
    {id: 14, progress: 37, isFailed: true},
    {id: 15, progress: 15, isFailed: false},
    {id: 16, progress: 84, isFailed: false},
]

export default function ControlPage() {
    const [dutsIndex, setIndex] = useState([0,8])
    const [showAlert, setShowAlert] = useState(false)
    const [hover, setHover] = useState({show: false, id: 1, mouse_x: 0, mouse_y:0})

    const handleHover = (id_, mouseX, mouseY) => {
        setHover({show: true, id: id_, mouse_x: mouseX, mouse_y: mouseY})
    }

    const handleMouseLeave = () => {
        setHover({show: false, id: hover.id, mouse_x: hover.mouse_x, mouse_y: hover.mouse_y})
    }

    const toggleAlert = () => {
        setShowAlert(!showAlert)
    }

    return (
    <div className="bg-zinc-600 min-h-screen">
    <NavBar toggleAlert={toggleAlert}/>
    {showAlert && <AlertSide showAlert={showAlert}/>}
    <DutHover mouse_pos={[hover.mouse_x, hover.mouse_y]} show={hover.show} id={duts[hover.id-1].id} progress={duts[hover.id-1].progress} isFailed={duts[hover.id-1].isFailed}/>

    <div className = "h-screen flex flex-row">
        <NavBarSide />
        <div className = "m-8 p-3 h-5/6 bg-white w-1/4 flex flex-col">
            <div className = "flex flex-row items-center">
                <p className = "header mb-10">Layers</p>
                < FaLayerGroup />
            </div>
            <div className = "flex flex-col items-center mt-10">
                <button className="text-lg m-2 w-5/6 p-1 text-center rounded-md bg-zinc-300 hover:bg-gray-200" onClick={() => setIndex([0,8])}>Layer 1</button>
                <button className="text-lg m-2 w-5/6 p-1 text-center rounded-md bg-zinc-300 hover:bg-gray-200" onClick={() => setIndex([8,16])}>Layer 2</button>
            </div>
            {/* <button className="text-lg m-2 h-8 w-5/6 p-1 text-center rounded-md bg-zinc-300">
             <p className="text-gray-500">In development...</p></button> */}
        </div>

        <div className = "rounded-xl border-4 border-stone-400 flex items-center flex-col m-8 ml-0 p-3 h-5/6 bg-zinc-300 w-3/4">
            <div className = "header">Devices Under Test</div>
            <div className = "max-w-xl mt-10 gap-x-28 flex flex-wrap justify-center"
                style={{backgroundImage: `url(${mcuImage})`}}>
                {duts.slice(dutsIndex[0], dutsIndex[1]).map((dut) => (
                    <DutSmall onLeave={handleMouseLeave} onHover={handleHover} number={dut.id} isFailed={dut.isFailed} progress={dut.progress}/>
                ))}   
            </div>
        </div>
    </div>
    </div>
    )
}