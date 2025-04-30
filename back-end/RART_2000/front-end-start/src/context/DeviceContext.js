import React, { createContext, useState, useEffect } from 'react';

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

export const DeviceContext = createContext();

export const DeviceProvider = ({ children }) => {
    const sampleDeviceData = [
        {"id": 1, "name": "#149954-SIP-1", "isFailed": false, "progress": 20, "memory": 27.96, "min_b_count": 991.26, "max_b_count": 167.09, "max_b_period": 5.44, "min_b_period": 8.68, "max_scr": 6.00, "min_scr": 14.27, "max_dcr": 15.37, "min_dcr": 11.02},
        {"id": 2, "name": "#149954-SIP-2", "isFailed": false, "progress": 30, "memory": 25.14, "min_b_count": 565.73, "max_b_count": 580.59, "max_b_period": 6.92, "min_b_period": 8.71, "max_scr": 13.88, "min_scr": 1.79, "max_dcr": 10.21, "min_dcr": 9.97},
        {"id": 3, "name": "#149954-SIP-3", "isFailed": false, "progress": 10, "memory": 19.67, "min_b_count": 293.10, "max_b_count": 867.54, "max_b_period": 9.99, "min_b_period": 8.46, "max_scr": 10.44, "min_scr": 3.15, "max_dcr": 16.43, "min_dcr": 6.80},
        {"id": 4, "name": "#149954-SIP-4", "isFailed": true, "progress": 25, "memory": 16.80, "min_b_count": 989.62, "max_b_count": 376.98, "max_b_period": 3.56, "min_b_period": 6.18, "max_scr": 15.37, "min_scr": 1.81, "max_dcr": 16.18, "min_dcr": 11.66},
        {"id": 5, "name": "#149954-SIP-5", "isFailed": false, "progress": 28, "memory": 27.75, "min_b_count": 628.10, "max_b_count": 468.03, "max_b_period": 5.51, "min_b_period": 3.88, "max_scr": 12.67, "min_scr": 1.19, "max_dcr": 16.37, "min_dcr": 9.72},
        {"id": 6, "name": "#149954-SIP-6", "isFailed": true, "progress": 61, "memory": 3.13, "min_b_count": 575.53, "max_b_count": 454.42, "max_b_period": 6.92, "min_b_period": 8.96, "max_scr": 15.06, "min_scr": 11.05, "max_dcr": 3.64, "min_dcr": 18.04},
        {"id": 7, "name": "#149954-SIP-7", "isFailed": false, "progress": 74, "memory": 11.04, "min_b_count": 129.44, "max_b_count": 265.04, "max_b_period": 6.10, "min_b_period": 2.65, "max_scr": 17.15, "min_scr": 19.47, "max_dcr": 5.32, "min_dcr": 19.95},
        {"id": 8, "name": "#149954-SIP-8", "isFailed": false, "progress": 52, "memory": 17.94, "min_b_count": 669.94, "max_b_count": 563.38, "max_b_period": 9.18, "min_b_period": 1.42, "max_scr": 9.34, "min_scr": 13.18, "max_dcr": 6.74, "min_dcr": 3.71},
        {"id": 9, "name": "#149954-SIP-9", "isFailed": false, "progress": 31, "memory": 26.77, "min_b_count": 895.00, "max_b_count": 393.99, "max_b_period": 6.03, "min_b_period": 4.23, "max_scr": 9.57, "min_scr": 2.49, "max_dcr": 18.74, "min_dcr": 17.78},
        {"id": 10, "name": "#149954-SIP-10", "isFailed": true, "progress": 46, "memory": 8.14, "min_b_count": 194.91, "max_b_count": 404.76, "max_b_period": 6.19, "min_b_period": 3.61, "max_scr": 16.17, "min_scr": 11.14, "max_dcr": 6.25, "min_dcr": 5.35},
        {"id": 11, "name": "#149954-SIP-11", "isFailed": true, "progress": 64, "memory": 12.19, "min_b_count": 890.40, "max_b_count": 373.01, "max_b_period": 2.44, "min_b_period": 9.07, "max_scr": 16.93, "min_scr": 6.07, "max_dcr": 6.18, "min_dcr": 3.94},
        {"id": 12, "name": "#149954-SIP-12", "isFailed": false, "progress": 92, "memory": 17.30, "min_b_count": 321.33, "max_b_count": 941.84, "max_b_period": 9.91, "min_b_period": 5.82, "max_scr": 13.31, "min_scr": 5.30, "max_dcr": 5.36, "min_dcr": 8.30},
        {"id": 13, "name": "#149954-SIP-13", "isFailed": false, "progress": 93, "memory": 11.35, "min_b_count": 535.80, "max_b_count": 898.83, "max_b_period": 3.28, "min_b_period": 2.67, "max_scr": 15.46, "min_scr": 10.75, "max_dcr": 13.21, "min_dcr": 16.55},
        {"id": 14, "name": "#149954-SIP-14", "isFailed": true, "progress": 83, "memory": 22.47, "min_b_count": 101.86, "max_b_count": 412.68, "max_b_period": 3.45, "min_b_period": 3.61, "max_scr": 15.28, "min_scr": 19.73, "max_dcr": 8.67, "min_dcr": 1.06},
        {"id": 15, "name": "#149954-SIP-15", "isFailed": false, "progress": 38, "memory": 12.84, "min_b_count": 136.03, "max_b_count": 736.51, "max_b_period": 3.39, "min_b_period": 8.26, "max_scr": 8.09, "min_scr": 7.74, "max_dcr": 2.16, "min_dcr": 4.07},
        {"id": 16, "name": "#149954-SIP-16", "isFailed": false, "progress": 71, "memory": 3.99, "min_b_count": 386.45, "max_b_count": 296.61, "max_b_period": 6.70, "min_b_period": 8.16, "max_scr": 15.63, "min_scr": 3.37, "max_dcr": 7.90, "min_dcr": 17.34}
      ]
      
    const [deviceData, setDeviceData] = useState(sampleDeviceData);

    // **When Flask API is finished**
    // useEffect(() => {
    //     const fetchData = async () => {
    //     try {
    //         const res = await fetch('http://localhost:5000/api/devices', {
    //             method: 'POST',
    //             headers: {
    //                 'Content-Type': 'application/json',
    //             },
    //             body: JSON.stringify(formData)
    //         });

    //         const data = await res.json();
    //         setDeviceData(data);

    //     } catch (error) {
    //         console.error("Error fetching device data:", error);
    //     }
    //     };

    //     fetchData();
    //     const interval = setInterval(fetchData, 60000); // Poll every minute
    //     return () => clearInterval(interval);
    // }, []);

    return (
        <DeviceContext.Provider value={{ deviceData }}>
        {children}
        </DeviceContext.Provider>
    );
};
