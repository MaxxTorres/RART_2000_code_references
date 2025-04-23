import React, { useContext, useState } from 'react'
import NavBar from '../components/NavBar'
import NavBarSide from '../components/NavBarSide'
import AlertSide from '../components/AlertSide'
import { SystemContext } from '../context/SystemContext'
import { FaDatabase, FaSpinner, FaCircleCheck, FaCirclePause, FaCircleExclamation } from "react-icons/fa6";

function LandingPage() {
  const {systemData} = useContext(SystemContext)
  const [showAlert, setShowAlert] = useState(false)

  const toggleAlert = () => {
    setShowAlert(!showAlert)
  }

  return (
  <div className="bg-zinc-600 min-h-screen">
  <NavBar toggleAlert={toggleAlert}/>
  {showAlert && <AlertSide showAlert={showAlert}/>}

  <div className = "h-screen flex flex-row">
      <NavBarSide />
      <div className = "m-8 p-3 h-5/6 bg-white w-1/4 flex flex-col">
        <div className = "flex flex-row items-center">
          <p className = "header">Memory Usage</p>
          <FaDatabase />
        </div>
        <p className = "m-5 mt-0 text-xl">{systemData[0].memory_used} gb / {systemData[0].memory_total} gb</p>
        <p className = "header">Devices Under Test (DUT)</p>
        <div className = "flex flex-col gap-4 m-5 mt-0 text-xl">
            <p>Total DUTs: 16</p>
            <div className = "flex flex-row items-center gap-2"> <FaSpinner className="animate-spin text-blue-500 text-xl" /> In-progress: {systemData[0].duts_inprogress}</div>
            <div className = "flex flex-row items-center gap-2"> <FaCircleCheck/> Completed: {systemData[0].duts_completed}</div>
            <div className = "flex flex-row items-center gap-2"> <FaCirclePause/> Paused: {systemData[0].duts_paused}</div>
            <div className = "flex flex-row items-center gap-2"> <FaCircleExclamation/> Failed: {systemData[0].duts_failed}</div>
        </div>
      </div>

      <div className = "rounded-xl border-4 border-stone-400 relative m-8 ml-0 p-3 h-5/6 bg-zinc-300 w-3/4">
          <p className = "header">Overall Results</p>
          <div className = "w-full absolute top-1/3 flex flex-col items-center">
            <p className = "italic text-lg">Final Results After ALL Tests Complete</p>
            <button className = "text-lg m-3 p-3 rounded-md bg-white hover:bg-gray-200">START TEST</button>
          </div>
          <div className = "w-full pr-7 absolute bottom-0">
            <p className = "ml-3 text-lg">Test Progress</p>
            <div className = "m-3 h-10 rounded-lg bg-zinc-500">
                <div className = "bg-green-500 h-10 w-1/3 rounded-lg">
                    <p className = "text-2xl p-0.5 pl-3">30%</p>
                </div>
            </div>
          </div>
      </div>
  </div>
  </div>
  )
}

export default LandingPage