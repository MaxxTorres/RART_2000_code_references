import React from 'react'
import NavBar from '../components/NavBar'
import NavBarSide from '../components/NavBarSide'

function LandingPage() {
  return (
  <div className="bg-zinc-600 min-h-screen">
  <NavBar />
  <div className = "h-screen flex flex-row">
      <NavBarSide />
      <div className = "m-8 p-3 h-5/6 bg-white w-1/4 flex flex-col">
        <p className = "header">Memory Usage</p>
        <p className = "m-5 mt-0 text-xl">256 gb / 500 gb</p>
        <p className = "header">Devices Under Test (DUT)</p>
        <div className = "flex flex-col gap-2 m-5 mt-0 text-xl">
            <p>Total DUTs: 16</p>
            <p>In-progress: 13</p>
            <p>Competed: 0</p>
            <p>Paused: 1</p>
            <p>Failed: 2</p>
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