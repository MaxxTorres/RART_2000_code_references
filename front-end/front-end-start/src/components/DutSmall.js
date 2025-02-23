import React from 'react'

function DutSmall(props) {
    const {onHover, isFailed, progress, number} = props

    const handleMouseEnter = () => {
        onHover(number)
    }

    return (
        <div 
            className = {`m-3 mb-10 p-3 border-4 text-center bg-stone-400 
                w-48 text-2xl ${isFailed ? "border-red-500 border-dashed" : "border-white"}`}
                onMouseEnter={handleMouseEnter} >
            {progress}% DUT{number}
        </div>
    )
}

export default DutSmall