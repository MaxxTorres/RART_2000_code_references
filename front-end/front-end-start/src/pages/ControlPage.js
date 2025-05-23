import React, {useState, useContext} from 'react'
import { DeviceContext } from '../context/DeviceContext';
import NavBar from '../components/NavBar'
import NavBarSide from '../components/NavBarSide'
import DutSmall from '../components/DutSmall'
import DutHover from '../components/DutHover'
import AlertSide from '../components/AlertSide'
import mcuImage from '../assets/mcu_bg_trans.png'
import layerImage_1 from '../assets/layer_1.png'
import layerImage_2 from '../assets/layer_2.png'
import { FaLayerGroup } from "react-icons/fa6"

export default function ControlPage() {
    const {deviceData} = useContext(DeviceContext)
    const [dutsIndex, setIndex] = useState([0,8])
    const [showAlert, setShowAlert] = useState(false)
    const [layer, setLayer] = useState(1)
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
    <DutHover mouse_pos={[hover.mouse_x, hover.mouse_y]} show={hover.show} id={deviceData[hover.id-1].id} progress={deviceData[hover.id-1].progress} isFailed={deviceData[hover.id-1].isFailed}/>

    <div className = "h-screen flex flex-row">
        
        <NavBarSide />

        <div className = "m-8 p-3 h-5/6 bg-white w-1/4 flex flex-col">
            <div className = "flex flex-row items-center">
                <p className = "header mb-10">Layers</p>
                < FaLayerGroup />
            </div>
            <div className = "flex flex-col items-center mt-10">
                <button className="text-lg m-2 w-5/6 p-1 text-center rounded-md bg-zinc-300 hover:bg-gray-200" 
                    onClick={() => {setIndex([0,8]); setLayer(1)}}>Layer 1</button>
                <button className="text-lg m-2 w-5/6 p-1 text-center rounded-md bg-zinc-300 hover:bg-gray-200" 
                    onClick={() => {setIndex([8,16]); setLayer(2)}}>Layer 2</button>
            </div>
            <div className = "flex mt-20 w-full justify-center">
                { layer == 1 ? <div className="w-3/5 h-72 bg-contain bg-no-repeat" style={{backgroundImage: `url(${layerImage_1})`}}></div> :
                    <div className="w-3/5 h-72 bg-contain bg-no-repeat" style={{backgroundImage: `url(${layerImage_2})`}}></div>
                }
            </div>
        </div>

        <div className = "rounded-xl border-4 border-stone-400 flex items-center flex-col m-8 ml-0 p-3 h-5/6 bg-zinc-300 w-3/4">
            <div className = "header">Devices Under Test</div>
            <div className = "max-w-xl mt-10 gap-x-28 flex flex-wrap justify-center"
                style={{backgroundImage: `url(${mcuImage})`}}>
                {deviceData.slice(dutsIndex[0], dutsIndex[1]).map((dut) => (
                    <DutSmall onLeave={handleMouseLeave} onHover={handleHover} number={dut.id} isFailed={dut.isFailed} progress={dut.progress}/>
                ))}   
            </div>
        </div>
    </div>
    </div>
    )
}