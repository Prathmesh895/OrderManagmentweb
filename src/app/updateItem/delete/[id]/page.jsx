'use client'
import React, { useState } from 'react'

function page({ itemData,onclange }) {
    const _id = itemData._id;
    // console.log("fetch id",_id);
    const title = itemData.title;
    const [message, setMessage] = useState('')

    const handleOnDelete = async () => {
        try {
            // Ensure userId is not undefined before making the API call
            if (!_id) return;
            const res = await fetch('/api/manageitem', {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ _id }),
            });

            const data = await res.json();
            if (res.ok) {
                console.log('Item deleted successfully');
                setMessage("Item deleted successfully");
                setTimeout(() => {
                    setMessage("");
                    window.location.reload();
                }, 1000)
                // Reload the page to show updated data after deletion

            } else {
                console.error(data.message);
                // setMessage(data.message);
            }
        } catch (error) {
            // setMessage(data.message);
            console.error('Error deleting user:', error);
        }
    }
    return (
        <> 
        {/* Show box for warning for delete item */}
            <div className='w-full h-screen absolute left-1 top-1'>
                <div className='absolute inset-0 bg-gray-500 opacity-50 blur'></div>
                <div className='bg-white m-5 p-5 lg:w-1/3 absolute lg:left-1/3 top-[10%] border-t-4 border-violet-500 rounded flex flex-col justify-center'>
                    <h1 className='text-xl font-semibold text-gray-600'>Are you sure to delete this item <span className='text-red-500'><i>{title}?</i></span></h1>
                    {
                        message &&
                        <h1 className='text-green-500 text-center'>{message}</h1> // successfull message on delete
                    }
                    <div className='flex space-x-5 justify-evenly mt-10'>
                        <button onClick={onclange} className='bg-gray-200 py-2 px-5 basis-1/3 rounded hover:bg-violet-700 hover:text-white'>Cancel</button>
                        <button onClick={handleOnDelete} className='bg-red-500 text-white basis-1/3 py-2 px-5 rounded hover:bg-red-700'>Yes,Delete</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default page