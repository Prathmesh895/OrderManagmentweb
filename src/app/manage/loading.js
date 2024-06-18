import React from 'react'
function loading() {
    return (
        <div className='flex space-x-5 items-center relative left-[43%] w-56 p-1 bg-white border shadow-xl px-5'>
            <div className='border-4 animate-spin border-t-slate-300 border-b-slate-200 border-l-slate-400 w-9 h-9 rounded-full'></div>
            <p className='text-gray-500 font-semibold'>Loading...</p>
        </div>
    )
}
export default loading