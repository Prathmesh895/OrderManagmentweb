"use client"
import React from 'react'
import { useState } from 'react';
import FetchItem from '../components/fetchItem';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';


function page() {
    const searchParams = useSearchParams();
    const query = searchParams.get('category')
    const pathname = usePathname();
    console.log(pathname,query)
    const [isopen, setIsopen] = useState(false);
    const [itemName, setItemName] = useState('');
    const [itemStock, setItemStock] = useState('');
    const [itemPrice, setItemPrice] = useState('');
    const [message, setMessage] = useState('');
    const [counts, setCounts] = useState({ totalItems: 0, InstockItem: 0, outOfStockItems: 0 });
    const [stock, setstock] = useState(searchParams.get("category") || null)
    const [error, setError] = useState({
        itemName: '',
        itemStock: '',
        itemPrice: '',
        general: '',
    });
    const router = useRouter();

    const handleonOpen = () => {
        setIsopen(!isopen);
    }
    const handleOnAddItem = async (e) => {
        e.preventDefault();
        // add errors if input field is empty 
        let newError = {};
        if (!itemName) newError.itemName = " Please Enter Item name";
        if (!itemStock) newError.itemStock = " Please Enter Item stock";
        if (!itemPrice) newError.itemPrice = " Please Enter Item Price";
        if (Object.keys(newError).length > 0) {
            setError(newError);
            setError(prev => ({ ...prev, general: 'Enter All fields' }))
            return;
        }
        // send data to api route getting from form 
        try {
            const res = await fetch('api/manageitem', ({
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    title: itemName,
                    stock: itemStock,
                    price: itemPrice
                }),
            }))
            if (res.ok) {
                setMessage("Item Added successfully");
                setTimeout(() => {
                    setMessage('');
                    setIsopen(false); // Hide the form after 2 seconds
                    window.location.reload();
                }, 500);

            }
            console.log("Item added")
        } catch (error) {
            console.log("Unable to add")
        }
    }
    const handleClickCategory = (category) => {
        setstock(category);
        const newQueryParams = new URLSearchParams(searchParams);
        newQueryParams.set("category", category); // Set new category
        router.push(`${pathname}/?${newQueryParams.toString()}`);

    };
   
    return (
        <>

            <section className='m-5 '>
                {/* Header section with title and button */}
                <div className='flex justify-between'>
                    <h1 className='font-semibold text-2xl text-gray-600'>Items Details</h1>
                    <h1 onClick={handleonOpen} className='bg-violet-600 py-2 px-2 text-white rounded border hover:bg-white hover:border-violet-600 hover:text-black cursor-pointer'> + Add New Item</h1>
                </div>
            </section>
            {/* Summary section with item statistics */}

            <nav className='lg:flex justify-between space-x-5 m-5 lg:w-[97%]'>
            <div onClick={() => handleClickCategory('Total Items')} className={`bg-white p-5 basis-1/3 space-y-3 border rounded cursor-pointer ${ query =="Total Items" ? "border-2 border-violet-600":''}`}>
                    <h1 className='font-semibold text-xl text-blue-500'>Total Items</h1>
                    <h2 className='text-gray-500 font-semibold text-md'>Total <span>{counts.totalItems}</span></h2>
                </div>
                <div onClick={() => handleClickCategory('Instock Items')} className={`bg-white p-5 basis-1/3 space-y-3 border rounded cursor-pointer ${ query =="Instock Items" ? "border-2 border-amber-500":''}`}>
                    <h1 className='font-semibold text-xl text-amber-500'>Instock Items</h1>
                    <h2 className='text-gray-500 font-semibold text-md'>Total <span>{counts.InstockItem}</span></h2>
                </div>
                <div onClick={() => handleClickCategory('Out of stock Items')} className={`bg-white p-5 basis-1/3 space-y-3 border rounded cursor-pointer ${ query =="Out of stock Items" ? "border-2 border-red-500":''}`}>
                    <h1 className='font-semibold text-xl text-red-500'>Out of stock Items</h1>
                    <h2 className='text-gray-500 font-semibold text-md'>Total <span>{counts.outOfStockItems}</span></h2>
                </div>
            </nav>

            <FetchItem onCountsChange={(newCounts) => setCounts(newCounts)} />
            {/* on click add new item button show form  */}
            {
                isopen &&
                <>
                    <div className='w-full h-screen absolute left-1 top-1'>
                        <div className='absolute inset-0 bg-gray-500 opacity-50 blur'></div>
                        {/* form for adding new item  */}
                        <form onSubmit={handleOnAddItem} className='bg-white m-5 p-5 lg:w-1/3 absolute lg:left-1/3 top-[10%] border-t-2 border-violet-500 flex flex-col justify-center'>
                            <h1 className='text-center text-xl font-semibold text-gray-700 m-5'>Add new Item</h1>
                            <h1 className='text-center text-red-600'>{error.general}</h1>
                            <h1 className='text-center text-green-600'>{message}</h1>
                            {/* Input for item name */}
                            <div className='flex flex-col my-5'>
                                <label htmlFor="itemname" className='text-gray-700'>Enter item name</label>
                                <input
                                    type="text"
                                    id='itemname'
                                    value={itemName}
                                    onChange={(e) => setItemName(e.target.value)}
                                    className='border p-2'
                                    placeholder='burger'
                                />
                                {error.itemName && <span className="text-red-600 mt-1 text-sm">{error.itemName}</span>}
                            </div>

                            {/* Input for item quantity */}
                            <div className='flex flex-col my-5'>
                                <label htmlFor="itemstock" className='text-gray-700'>Enter item Quantity</label>
                                <input
                                    type="number"
                                    id='itemstock'
                                    value={itemStock}
                                    onChange={(e) => setItemStock(e.target.value)}
                                    className='border p-2'
                                    placeholder='ex:10'
                                />
                                {error.itemStock && <span className="text-red-600 mt-1 text-sm">{error.itemStock}</span>}
                            </div>
                            {/* Input for item price */}
                            <div className='flex flex-col my-5'>
                                <label htmlFor="itemstock" className='text-gray-700'>Enter Price/item </label>
                                <input
                                    type="number"
                                    id='itemstock'
                                    value={itemPrice}
                                    onChange={(e) => setItemPrice(e.target.value)}
                                    className='border p-2'
                                    placeholder='ex:99 Rs'
                                />
                                {error.itemStock && <span className="text-red-600 mt-1 text-sm">{error.itemStock}</span>}
                            </div>

                            {/* Button */}
                            <div className='flex justify-between mt-auto pt-10 '>
                                <button onClick={handleonOpen} className=' py-2 px-20  rounded border hover:bg-violet-600 border-violet-600 hover:text-white cursor-pointer'> Cancel</button>
                                <button className='bg-violet-600 py-2 px-20 text-white rounded border hover:bg-white hover:border-violet-600 hover:text-black cursor-pointer'>
                                    Add Item
                                </button>
                            </div>
                        </form>
                    </div>
                </>
            }
        </>
    )
}

export default page