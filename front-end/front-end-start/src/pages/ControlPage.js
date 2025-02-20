import React, {useState} from 'react'
import NavBar from '../components/NavBar'
import DutSmall from '../components/DutSmall'

const duts_1 = [
    {id: 1, progress: 40, isFailed: false},
    {id: 2, progress: 30, isFailed: false},
    {id: 3, progress: 45, isFailed: true},
    {id: 4, progress: 20, isFailed: false},
    {id: 5, progress: 60, isFailed: false},
    {id: 6, progress: 37, isFailed: true},
    {id: 7, progress: 15, isFailed: true},
    {id: 8, progress: 84, isFailed: false},
]
const duts_2 = [
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
    const [duts, setDuts] = useState(duts_1)

    return (
    <div className="bg-zinc-600 min-h-screen">
    <NavBar />

    <div className = "h-screen flex flex-row">
        <div className = "m-3 p-3 h-5/6 bg-zinc-400 w-1/4 flex flex-col">
            <p className="mb-10">Layers</p>
            <button className="m-2 p-1 text-center rounded-md bg-white hover:bg-gray-200" onClick={() => setDuts(duts_1)}>Layer 1</button>
            <button className="m-2 p-1 text-center rounded-md bg-white hover:bg-gray-200" onClick={() => setDuts(duts_2)}>Layer 2</button>
        </div>

        <div className = "m-3 p-3 h-5/6 bg-zinc-300 w-3/4">
            Devices Under Test
            <div className = "mt-10 flex flex-wrap justify-center">
                {duts.map((dut) => (
                    <DutSmall number={dut.id} isFailed={dut.isFailed} progress={dut.progress}/>
                ))}   
            </div>
        </div>
    </div>
    </div>
    )
}