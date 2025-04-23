import React from 'react'

function DutSmall(props) {
    const {onLeave, onHover, isFailed, progress, number} = props

    const handleMouseEnter = (e) => {
        onHover(number, e.clientX, e.clientY)
    }

    const handleMouseLeave = () => {
        onLeave()
    }

    return (
        <div 
            className = {`z-0 m-3 mb-10 p-3 border-4 text-center bg-stone-400 shadow-lg
                w-52 text-3xl ${isFailed ? "border-red-500 border-dashed animate-pulse" : "border-white"}`}
                >
            <div
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}>
                {progress}% DUT-{number}
            </div>
        </div>
    )
}

export default DutSmall