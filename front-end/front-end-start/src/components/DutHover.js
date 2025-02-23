import React from 'react'

export default function DutHover(props) {
    const {id, progress, isFailed, cycle, bounce} = props
    return (
        <div className="m-1 p-5 mt-14 bg-white border-2 border-solid border-zinc-500 flex flex-col">
            <p>DUT-{id}</p>
            <p>{isFailed ? "<!> Relay Failed" : "In-progress"}</p>
            <div className="my-3 flex flex-col">
                Progress: 
                <div className="border border-solid border-black rounded-sm pl-1 w-1/3 bg-green-500">{progress}%</div>
            </div>
            <p>On/Off Cycle:</p>
            <p>Avg Bounce: </p>
        </div>
    )
}
