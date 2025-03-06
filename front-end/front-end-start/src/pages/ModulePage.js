import React from 'react'
import NavBar from '../components/NavBar'
import NavBarSide from '../components/NavBarSide'

function ModulePage() {
  return (
  <div className="bg-zinc-600 min-h-screen">
  <NavBar />
  <div className = "h-screen flex flex-row">
      <NavBarSide />
      <div className = "m-8 p-3 h-5/6 bg-white w-1/4 flex flex-col">
        <p className = "m-2 underline text-xl">Module Unit Control</p>
        <p className = "m-5 mt-0 mb-0 text-xl">Module Memory Usage:</p>
        <p className = "m-5 mt-0 text-xl">20 gb / 30 gb</p>
        <button className = "text-center m-3 p-1 rounded-md bg-zinc-300 hover:bg-gray-200">START</button>
        <button className = "text-center m-3 p-1 rounded-md bg-zinc-300 hover:bg-gray-200">PAUSE</button>
        <button className = "text-center m-3 p-1 rounded-md bg-zinc-300 hover:bg-gray-200">RESET</button>
      </div>

      <div className = "rounded-xl border-4 border-stone-400 relative m-8 ml-0 p-3 h-5/6 bg-zinc-300 w-3/4">
          <p className = "!text-2xl header">DUT-1 (#149954-SIP) Results</p>

          <div className = "w-full mt-20 flex flex-row gap-28 justify-center text-xl">
            <div className = "border-l-4 p-5 border-black border-double">
                <p>Max bounce count: <span className = "data">1000</span></p>
                <p className = "mb-10">Min bounce count: <span className = "data">200</span></p>
                <p>Max bounce period: <span className = "data">5 ms</span></p>
                <p>Min bounce period: <span className = "data">1 ms</span></p>
            </div>
            <div className = "border-l-4 p-5 border-black border-double">
                <p>Max SCR: <span className = "data">20 ohms</span></p>
                <p className = "mb-10">Min SCR: <span className = "data">10 ohms</span></p>
                <p>Max DCR: <span className = "data">20 ohms</span></p>
                <p>Min DCR: <span className = "data">10 ohms</span></p>
            </div>
          </div>

          <div className = "w-full pr-7 absolute bottom-0">
            <p className = "ml-3 text-lg">Test Start Time: March 5, 10:45am</p>
            <p className = "ml-3 text-lg">Time Remaining (EST): 130 hours</p>
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

export default ModulePage