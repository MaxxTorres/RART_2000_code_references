import React, { useEffect, useState, useContext} from 'react'
import { DeviceContext } from '../context/DeviceContext';
import NavBar from '../components/NavBar'
import NavBarSide from '../components/NavBarSide'
import { useLocation } from 'react-router-dom';
import relayImage from '../assets/relay_pic_crop.png'
import { FaSdCard } from 'react-icons/fa6'

function ModulePage() {
  const {deviceData} = useContext(DeviceContext)
  const location = useLocation();
  const {dut_no} = location.state || 0;

  return (
  <div className="bg-zinc-600 min-h-screen">
  <NavBar />

  <div className = "h-screen flex flex-row">
      <NavBarSide />
      <div className = "m-8 p-3 h-5/6 bg-white w-1/4 flex flex-col">
        <p className = "m-2 underline text-xl">Module Unit Control</p>
        <p className = "m-5 mb-0 text-xl">Module Memory Usage:</p>
        <div className = "flex flex-row items-center gap-3 m-5 mt-0 text-xl"> <FaSdCard /> {`${deviceData[dut_no].memory} gb / 30 gb`}</div>
        <button className = "text-center m-3 p-1 rounded-md bg-zinc-300 hover:bg-gray-200">START</button>
        <button className = "text-center m-3 p-1 rounded-md bg-zinc-300 hover:bg-gray-200">PAUSE</button>
        <button className = "text-center m-3 p-1 rounded-md bg-zinc-300 hover:bg-gray-200">RESET</button>
        <div className = "mt-10 flex w-full justify-center">
          <div className = "w-52 h-52 bg-contain bg-no-repeat" style={{backgroundImage: `url(${relayImage})`}}></div>
        </div>
      </div>

      <div className = "rounded-xl border-4 border-stone-400 relative m-8 ml-0 h-5/6 bg-zinc-300 w-3/4">
      
          <div className = "w-full bg-stone-400 p-1 mt-3">
            <p className = "!text-2xl !no-underline text-white header font-bold">{`DUT-${dut_no+1} (${deviceData[dut_no].name}) Results`}</p>
          </div>

          <div className = "w-full mt-20 flex flex-row gap-28 justify-center text-xl">
            <div className = "data_container">
                <div className = "data_header">Bounce</div>
                <p>Max bounce count: <span className = "data">{deviceData[dut_no].max_b_count}</span></p>
                <p className = "mb-10">Min bounce count: <span className = "data">{deviceData[dut_no].min_b_count}</span></p>
                <p>Max bounce period (ms): <span className = "data">{deviceData[dut_no].max_b_period}</span></p>
                <p>Min bounce period (ms): <span className = "data">{deviceData[dut_no].min_b_period}</span></p>
            </div>
            <div className = "data_container">
              <div className = "data_header">Contact Resistance</div>
                <p>Max SCR (ohms): <span className = "data">{deviceData[dut_no].max_scr}</span></p>
                <p className = "mb-10">Min SCR (ohms): <span className = "data">{deviceData[dut_no].min_scr}</span></p>
                <p>Max DCR (ohms): <span className = "data">{deviceData[dut_no].max_dcr}</span></p>
                <p>Min DCR (ohms): <span className = "data">{deviceData[dut_no].min_dcr}</span></p>
            </div>
          </div>

          <div className = "w-full p-5 absolute bottom-0">
            <p className = "ml-3 text-lg">Test Start Time: March 5, 10:45am</p>
            <p className = "ml-3 text-lg">Time Remaining (EST): 130 hours</p>
            <div className = "m-3 h-10 rounded-lg bg-zinc-500">
                <div className = "bg-green-500 h-10 w-1/3 rounded-lg">
                    <p className = "text-2xl p-0.5 pl-3">{deviceData[dut_no].progress}%</p>
                </div>
            </div>
          </div>
      </div>
  </div>
  </div>
  )
}

export default ModulePage