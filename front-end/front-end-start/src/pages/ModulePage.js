import React, { useEffect, useState} from 'react'
import NavBar from '../components/NavBar'
import NavBarSide from '../components/NavBarSide'
import { useLocation } from 'react-router-dom';
import relayImage from '../assets/relay_pic_crop.png'
import { FaSdCard } from 'react-icons/fa6'

// function getRandomInRange(min, max) {
//   return (Math.random() * (max - min) + min).toFixed(2);
// }

// const module_data = Array.from({ length: 16 }, (_, i) => ({
//   id: `#149954-SIP-${i + 1}`,
//   memory: getRandomInRange(1, 30),
//   min_b_count: getRandomInRange(100, 1000),
//   max_b_count: getRandomInRange(100, 1000),
//   max_b_period: getRandomInRange(1, 10),
//   min_b_period: getRandomInRange(1, 10),
//   max_scr: getRandomInRange(1, 20),
//   min_scr: getRandomInRange(1, 20),
//   max_dcr: getRandomInRange(1, 20),
//   min_dcr: getRandomInRange(1, 20)
// }));

// console.log(module_data);

let module_data = [
  {"id": "#149954-SIP-1", "progress": 20, "memory": 27.96, "min_b_count": 991.26, "max_b_count": 167.09, "max_b_period": 5.44, "min_b_period": 8.68, "max_scr": 6.00, "min_scr": 14.27, "max_dcr": 15.37, "min_dcr": 11.02},
  {"id": "#149954-SIP-2", "progress": 30, "memory": 25.14, "min_b_count": 565.73, "max_b_count": 580.59, "max_b_period": 6.92, "min_b_period": 8.71, "max_scr": 13.88, "min_scr": 1.79, "max_dcr": 10.21, "min_dcr": 9.97},
  {"id": "#149954-SIP-3", "progress": 10, "memory": 19.67, "min_b_count": 293.10, "max_b_count": 867.54, "max_b_period": 9.99, "min_b_period": 8.46, "max_scr": 10.44, "min_scr": 3.15, "max_dcr": 16.43, "min_dcr": 6.80},
  {"id": "#149954-SIP-4", "progress": 25, "memory": 16.80, "min_b_count": 989.62, "max_b_count": 376.98, "max_b_period": 3.56, "min_b_period": 6.18, "max_scr": 15.37, "min_scr": 1.81, "max_dcr": 16.18, "min_dcr": 11.66},
  {"id": "#149954-SIP-5", "progress": 28, "memory": 27.75, "min_b_count": 628.10, "max_b_count": 468.03, "max_b_period": 5.51, "min_b_period": 3.88, "max_scr": 12.67, "min_scr": 1.19, "max_dcr": 16.37, "min_dcr": 9.72},
  {"id": "#149954-SIP-6", "progress": 61, "memory": 3.13, "min_b_count": 575.53, "max_b_count": 454.42, "max_b_period": 6.92, "min_b_period": 8.96, "max_scr": 15.06, "min_scr": 11.05, "max_dcr": 3.64, "min_dcr": 18.04},
  {"id": "#149954-SIP-7", "progress": 74, "memory": 11.04, "min_b_count": 129.44, "max_b_count": 265.04, "max_b_period": 6.10, "min_b_period": 2.65, "max_scr": 17.15, "min_scr": 19.47, "max_dcr": 5.32, "min_dcr": 19.95},
  {"id": "#149954-SIP-8", "progress": 52, "memory": 17.94, "min_b_count": 669.94, "max_b_count": 563.38, "max_b_period": 9.18, "min_b_period": 1.42, "max_scr": 9.34, "min_scr": 13.18, "max_dcr": 6.74, "min_dcr": 3.71},
  {"id": "#149954-SIP-9", "progress": 31, "memory": 26.77, "min_b_count": 895.00, "max_b_count": 393.99, "max_b_period": 6.03, "min_b_period": 4.23, "max_scr": 9.57, "min_scr": 2.49, "max_dcr": 18.74, "min_dcr": 17.78},
  {"id": "#149954-SIP-10", "progress": 46, "memory": 8.14, "min_b_count": 194.91, "max_b_count": 404.76, "max_b_period": 6.19, "min_b_period": 3.61, "max_scr": 16.17, "min_scr": 11.14, "max_dcr": 6.25, "min_dcr": 5.35},
  {"id": "#149954-SIP-11", "progress": 64, "memory": 12.19, "min_b_count": 890.40, "max_b_count": 373.01, "max_b_period": 2.44, "min_b_period": 9.07, "max_scr": 16.93, "min_scr": 6.07, "max_dcr": 6.18, "min_dcr": 3.94},
  {"id": "#149954-SIP-12", "progress": 92, "memory": 17.30, "min_b_count": 321.33, "max_b_count": 941.84, "max_b_period": 9.91, "min_b_period": 5.82, "max_scr": 13.31, "min_scr": 5.30, "max_dcr": 5.36, "min_dcr": 8.30},
  {"id": "#149954-SIP-13", "progress": 93, "memory": 11.35, "min_b_count": 535.80, "max_b_count": 898.83, "max_b_period": 3.28, "min_b_period": 2.67, "max_scr": 15.46, "min_scr": 10.75, "max_dcr": 13.21, "min_dcr": 16.55},
  {"id": "#149954-SIP-14", "progress": 83, "memory": 22.47, "min_b_count": 101.86, "max_b_count": 412.68, "max_b_period": 3.45, "min_b_period": 3.61, "max_scr": 15.28, "min_scr": 19.73, "max_dcr": 8.67, "min_dcr": 1.06},
  {"id": "#149954-SIP-15", "progress": 38, "memory": 12.84, "min_b_count": 136.03, "max_b_count": 736.51, "max_b_period": 3.39, "min_b_period": 8.26, "max_scr": 8.09, "min_scr": 7.74, "max_dcr": 2.16, "min_dcr": 4.07},
  {"id": "#149954-SIP-16", "progress": 71, "memory": 3.99, "min_b_count": 386.45, "max_b_count": 296.61, "max_b_period": 6.70, "min_b_period": 8.16, "max_scr": 15.63, "min_scr": 3.37, "max_dcr": 7.90, "min_dcr": 17.34}
]


function ModulePage() {
  const location = useLocation();
  const {dut_no} = location.state || 0;

  //-----------------------------------------------------
  const [data, setData] = useState(null);

    const fetchData = async () => {
        try {
            const response = await fetch("http://localhost:5000/api/data"); // Change to your Flask API endpoint
            const result = await response.json();
            setData(result);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

  //FETCHING DATA FROM API EVERY 5 MINUTES
  useEffect(() => {
    fetchData(); // Fetch immediately on mount

    const interval = setInterval(() => {
        fetchData(); // Fetch every 5 minutes
    }, 300000); // 300,000 ms = 5 minutes

    return () => clearInterval(interval); // Cleanup interval on unmount
  }, []);
  //-----------------------------------------------------

  return (
  <div className="bg-zinc-600 min-h-screen">
  <NavBar />

  <div className = "h-screen flex flex-row">
      <NavBarSide />
      <div className = "m-8 p-3 h-5/6 bg-white w-1/4 flex flex-col">
        <p className = "m-2 underline text-xl">Module Unit Control</p>
        <p className = "m-5 mb-0 text-xl">Module Memory Usage:</p>
        <div className = "flex flex-row items-center gap-3 m-5 mt-0 text-xl"> <FaSdCard /> {`${module_data[dut_no].memory} gb / 30 gb`}</div>
        <button className = "text-center m-3 p-1 rounded-md bg-zinc-300 hover:bg-gray-200">START</button>
        <button className = "text-center m-3 p-1 rounded-md bg-zinc-300 hover:bg-gray-200">PAUSE</button>
        <button className = "text-center m-3 p-1 rounded-md bg-zinc-300 hover:bg-gray-200">RESET</button>
        <div className = "mt-10 flex w-full justify-center">
          <div className = "w-52 h-52 bg-contain bg-no-repeat" style={{backgroundImage: `url(${relayImage})`}}></div>
        </div>
      </div>

      <div className = "rounded-xl border-4 border-stone-400 relative m-8 ml-0 h-5/6 bg-zinc-300 w-3/4">
      
          <div className = "w-full bg-zinc-600 p-1 mt-3 border-b-4 border-stone-400">
            <p className = "!text-2xl !no-underline text-white header font-bold">{`DUT-${dut_no+1} (${module_data[dut_no].id}) Results`}</p>
          </div>

          <div className = "w-full mt-20 flex flex-row gap-28 justify-center text-xl">
            <div className = "data_container">
                <div className = "data_header">Bounce</div>
                <p>Max bounce count: <span className = "data">{module_data[dut_no].max_b_count}</span></p>
                <p className = "mb-10">Min bounce count: <span className = "data">{module_data[dut_no].min_b_count}</span></p>
                <p>Max bounce period (ms): <span className = "data">{module_data[dut_no].max_b_period}</span></p>
                <p>Min bounce period (ms): <span className = "data">{module_data[dut_no].min_b_period}</span></p>
            </div>
            <div className = "data_container">
              <div className = "data_header">Contact Resistance</div>
                <p>Max SCR (ohms): <span className = "data">{module_data[dut_no].max_scr}</span></p>
                <p className = "mb-10">Min SCR (ohms): <span className = "data">{module_data[dut_no].min_scr}</span></p>
                <p>Max DCR (ohms): <span className = "data">{module_data[dut_no].max_dcr}</span></p>
                <p>Min DCR (ohms): <span className = "data">{module_data[dut_no].min_dcr}</span></p>
            </div>
          </div>

          <div className = "w-full p-5 absolute bottom-0">
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