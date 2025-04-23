import React, { createContext, useState, useEffect } from 'react';

export const SystemContext = createContext();

export const SystemProvider = ({ children }) => {
    const sampleSystemData = [
        {"memory_used": 500, "memory_total": 1000, "duts_total": 16, "duts_inprogress": 10, "duts_completed": 1, "duts_paused": 2, "duts_failed": 3},
        {"dut_errors": "none", "system_errors": "none"}
      ]
      
    const [systemData, setSystemData] = useState(sampleSystemData);

    // **When Flask API is finished**
    // useEffect(() => {
    //     const fetchData = async () => {
    //     try {
    //         const res = await fetch('http://localhost:5000/api/system', {
    //             method: 'POST',
    //             headers: {
    //                 'Content-Type': 'application/json',
    //             },
    //             body: JSON.stringify(formData)
    //         });

    //         const data = await res.json();
    //         setSystemData(data);

    //     } catch (error) {
    //         console.error("Error fetching system data:", error);
    //     }
    //     };

    //     fetchData();
    //     const interval = setInterval(fetchData, 60000); // Poll every minute
    //     return () => clearInterval(interval);
    // }, []);

    return (
        <SystemContext.Provider value={{ systemData }}>
        {children}
        </SystemContext.Provider>
    );
};
