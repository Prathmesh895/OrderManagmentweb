'use client';
import React, { useState } from 'react';
import FetchItem from '../components/fetchItem';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

function Page() {
    const searchParams = useSearchParams();
    const query = searchParams.get('category');
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(false);
    const [itemName, setItemName] = useState('');
    const [itemStock, setItemStock] = useState('');
    const [itemPrice, setItemPrice] = useState('');
    const [message, setMessage] = useState('');
    const [counts, setCounts] = useState({ totalItems: 0, InstockItem: 0, outOfStockItems: 0 });
    const [stock, setStock] = useState(searchParams.get('category') || null);
    const [error, setError] = useState({
        itemName: '',
        itemStock: '',
        itemPrice: '',
        general: '',
    });
    const router = useRouter();

    const handleOnOpen = () => {
        setIsOpen(!isOpen);
    };

    const handleOnAddItem = async (e) => {
        e.preventDefault();
        let newError = {};
        if (!itemName) newError.itemName = 'Please enter item name';
        if (!itemStock) newError.itemStock = 'Please enter item stock';
        if (!itemPrice) newError.itemPrice = 'Please enter item price';
        if (Object.keys(newError).length > 0) {
            setError(newError);
            setError((prev) => ({ ...prev, general: 'Enter all fields' }));
            return;
        }

        try {
            const res = await fetch('api/manageitem', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    title: itemName,
                    stock: itemStock,
                    price: itemPrice,
                }),
            });
            if (res.ok) {
                setMessage('Item added successfully');
                setTimeout(() => {
                    setMessage('');
                    setIsOpen(false);
                    window.location.reload();
                }, 500);
            }
            console.log('Item added');
        } catch (error) {
            console.log('Unable to add');
        }
    };

    const handleClickCategory = (category) => {
        setStock(category);
        const newQueryParams = new URLSearchParams(searchParams);
        newQueryParams.set('category', category);
        router.push(`${pathname}/?${newQueryParams.toString()}`);
    };

    return (
        <>
            <section className='m-5'>
                <div className='flex justify-between'>
                    <h1 className='font-semibold text-2xl text-gray-600'>Items Details</h1>
                    <h1
                        onClick={handleOnOpen}
                        className='bg-violet-600 py-2 px-2 text-white rounded border hover:bg-white hover:border-violet-600 hover:text-black cursor-pointer'
                    >
                        + Add New Item
                    </h1>
                </div>
            </section>

            <nav className='flex flex-col lg:flex-row justify-between space-y-3 lg:space-y-0 lg:space-x-5 m-5 lg:w-[97%]'>
                <div
                    onClick={() => handleClickCategory('Total Items')}
                    className={`bg-white p-5 basis-1/3 space-y-3 border rounded cursor-pointer ${query === 'Total Items' ? 'border-2 border-violet-600' : ''}`}
                >
                    <h1 className='font-semibold text-xl text-blue-500'>Total Items</h1>
                    <h2 className='text-gray-500 font-semibold text-md'>Total <span>{counts.totalItems}</span></h2>
                </div>
                <div
                    onClick={() => handleClickCategory('Instock Items')}
                    className={`bg-white p-5 basis-1/3 space-y-3 border rounded cursor-pointer ${query === 'Instock Items' ? 'border-2 border-amber-500' : ''}`}
                >
                    <h1 className='font-semibold text-xl text-amber-500'>Instock Items</h1>
                    <h2 className='text-gray-500 font-semibold text-md'>Total <span>{counts.InstockItem}</span></h2>
                </div>
                <div
                    onClick={() => handleClickCategory('Out of stock Items')}
                    className={`bg-white p-5 basis-1/3 space-y-3 border rounded cursor-pointer ${query === 'Out of stock Items' ? 'border-2 border-red-500' : ''}`}
                >
                    <h1 className='font-semibold text-xl text-red-500'>Out of stock Items</h1>
                    <h2 className='text-gray-500 font-semibold text-md'>Total <span>{counts.outOfStockItems}</span></h2>
                </div>
            </nav>

            <FetchItem onCountsChange={(newCounts) => setCounts(newCounts)} />

            {isOpen && (
                <div className='fixed inset-0 flex items-center justify-center z-50'>
                    <div className='fixed inset-0 bg-gray-500 opacity-50'></div>
                    <form
                        onSubmit={handleOnAddItem}
                        className='bg-white m-5 p-5 w-full max-w-lg border-t-2 border-violet-500 flex flex-col justify-center space-y-5 z-50'
                    >
                        <h1 className='text-center text-xl font-semibold text-gray-700'>Add New Item</h1>
                        <h1 className='text-center text-red-600'>{error.general}</h1>
                        <h1 className='text-center text-green-600'>{message}</h1>
                        <div className='flex flex-col'>
                            <label htmlFor='itemname' className='text-gray-700'>Enter Item Name</label>
                            <input
                                type='text'
                                id='itemname'
                                value={itemName}
                                onChange={(e) => setItemName(e.target.value)}
                                className='border p-2'
                                placeholder='e.g., Burger'
                            />
                            {error.itemName && <span className='text-red-600 mt-1 text-sm'>{error.itemName}</span>}
                        </div>
                        <div className='flex flex-col'>
                            <label htmlFor='itemstock' className='text-gray-700'>Enter Item Quantity</label>
                            <input
                                type='number'
                                id='itemstock'
                                value={itemStock}
                                onChange={(e) => setItemStock(e.target.value)}
                                className='border p-2'
                                placeholder='e.g., 10'
                            />
                            {error.itemStock && <span className='text-red-600 mt-1 text-sm'>{error.itemStock}</span>}
                        </div>
                        <div className='flex flex-col'>
                            <label htmlFor='itemprice' className='text-gray-700'>Enter Price/Item</label>
                            <input
                                type='number'
                                id='itemprice'
                                value={itemPrice}
                                onChange={(e) => setItemPrice(e.target.value)}
                                className='border p-2'
                                placeholder='e.g., 99 Rs'
                            />
                            {error.itemPrice && <span className='text-red-600 mt-1 text-sm'>{error.itemPrice}</span>}
                        </div>
                        <div className='flex justify-between'>
                            <button
                                onClick={handleOnOpen}
                                type='button'
                                className='py-2 px-5 border rounded hover:bg-violet-600 border-violet-600 hover:text-white'
                            >
                                Cancel
                            </button>
                            <button
                                type='submit'
                                className='bg-violet-600 py-2 px-5 text-white rounded border hover:bg-white hover:border-violet-600 hover:text-black'
                            >
                                Add Item
                            </button>
                        </div>
                    </form>
                </div>
            )}
        </>
    );
}

export default Page;
