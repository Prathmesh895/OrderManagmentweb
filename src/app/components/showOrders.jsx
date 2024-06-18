'use client'
import React, { useEffect, useState } from 'react';
import Loading from '@/app/components/loading';
import { useSearchParams } from 'next/navigation';


function ShowOrders({ onCountsChange }) {
    const searchParams = useSearchParams();
    const category = searchParams.get("category");
    const [ordersData, setOrderData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [filterItems, setFilterItems] = useState([]);
    const [customerFilter, setCustomerFilter] = useState('');
    const [minQuantityFilter, setMinQuantityFilter] = useState('');
    const [maxQuantityFilter, setMaxQuantityFilter] = useState('');

    useEffect(() => {
        ShOrders();
    }, []);

    // Fetch order details
    const ShOrders = async () => {
        try {
            setLoading(true);
            const res = await fetch('/api/orders');
            const Data = await res.json();
            setLoading(false);
            setOrderData(Data.ordersData);
        } catch (error) {
            console.log("Failed to fetch orders");
        }
    };

    // Update item counts (total, completed, in-process) when ordersData changes
    useEffect(() => {
        if (ordersData.length > 0) {
            const totalOrder = ordersData.length;
            const completeOrders = ordersData.filter(order => order.status === 'completed').length;
            const inprocessingOrders = ordersData.filter(order => order.status === 'processing').length;
            onCountsChange({ totalOrder, completeOrders, inprocessingOrders });
        }
    }, [ordersData]);

    // Filter orders based on category
    useEffect(() => {
        if (ordersData.length > 0) {
            showItemsByStock(category);
        }
    }, [category, ordersData, customerFilter, minQuantityFilter, maxQuantityFilter]);

    const showItemsByStock = (type) => {
        let filteredItems = [];
        switch (type) {
            case 'Completed orders':
                filteredItems = ordersData.filter(order => order.status === 'completed');
                break;
            case 'In Process orders':
                filteredItems = ordersData.filter(order => order.status === 'processing');
                break;
            case 'Total Orders':
            default:
                filteredItems = ordersData;
                break;
        }

        // Apply additional filters
        if (customerFilter) {
            filteredItems = filteredItems.filter(order =>
                order.Customer.toLowerCase().includes(customerFilter.toLowerCase())
            );
        }

        if (minQuantityFilter) {
            filteredItems = filteredItems.filter(order =>
                order.items.reduce((total, item) => total + item.quantity, 0) >= minQuantityFilter
            );
        }

        if (maxQuantityFilter) {
            filteredItems = filteredItems.filter(order =>
                order.items.reduce((total, item) => total + item.quantity, 0) <= maxQuantityFilter
            );
        }

        setFilterItems(filteredItems);
    };

    // Handle order status update
    const handleOnUpdate = async (orderId, newStatus) => {
        try {
            const res = await fetch('/api/orders', {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ _id: orderId, status: newStatus })
            });

            if (res.ok) {
                // Update the orders data state
                setOrderData(prevData => prevData.map(order =>
                    order._id === orderId ? { ...order, status: newStatus } : order
                ));
            } else {
                console.error('Failed to update order status');
            }
        } catch (error) {
            console.error('Error updating order status:', error);
        }
    };

    return (
        <>
            <div className='my-2 flex space-x-2'>
                <input
                    type='text'
                    placeholder='Customer Name'
                    value={customerFilter}
                    onChange={(e) => setCustomerFilter(e.target.value)}
                    className='border p-2'
                />
                <input
                    type='number'
                    placeholder='Min Quantity'
                    value={minQuantityFilter}
                    onChange={(e) => setMinQuantityFilter(e.target.value)}
                    className='border p-2'
                />
                <input
                    type='number'
                    placeholder='Max Quantity'
                    value={maxQuantityFilter}
                    onChange={(e) => setMaxQuantityFilter(e.target.value)}
                    className='border p-2'
                />
            </div>
            {/* Table for showing orders data */}
            <table className='border my-5 w-full'>
                <thead className='border bg-gray-100 '>
                    <tr className='p-2'>
                        <th className='border p-2'>Sr</th>
                        <th className='border p-2'>ID</th>
                        <th className='border p-2'>Customer Name</th>
                        <th className='border p-2'>Payment</th>
                        <th className='border p-2'>Items</th>
                        <th className='border p-2'>Quantities</th>
                        <th className='border p-2'>Status</th>
                        <th className='border p-2'>Update Status</th>
                    </tr>
                </thead>
                <tbody className='border'>
                    {loading ? (
                        <tr>
                            <td colSpan='8' className='text-center'>
                                <Loading />
                            </td>
                        </tr>
                    ) : (
                        filterItems.length > 0 ? (
                            filterItems.map((data, index) => (
                                <tr className='border cursor-pointer' key={data._id}>
                                    <td className='border text-center'>{index + 1}</td>
                                    <td className='border text-center'>{data.ItemId}</td>
                                    <td className='border text-center'>{data.Customer}</td>
                                    <td className='border text-center'>Payment Method</td>
                                    <td className='border text-center'>
                                        {data.items.map((item, idx) => (
                                            <div key={idx}>
                                                {item.name}
                                            </div>
                                        ))}
                                    </td>
                                    <td className='border text-center'>
                                        {data.items.map((item, idx) => (
                                            <div key={idx}>
                                                {item.quantity}
                                            </div>
                                        ))}
                                    </td>
                                    <td className={`border text-center ${data.status == "completed" ? "text-green-400" : 'text-red-400'}`}>{data.status}</td>
                                    <td className='border text-center p-2'>
                                        {data.status === 'processing' && (
                                            <button
                                                className='bg-violet-500 text-white hover:bg-blue-600 p-1 rounded'
                                                onClick={() => handleOnUpdate(data._id, 'completed')}
                                            >
                                                Complete
                                            </button>
                                        )}
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan='8' className='text-center'>
                                    No orders found.
                                </td>
                            </tr>
                        )
                    )}
                </tbody>
            </table>
        </>
    );
}

export default ShowOrders;
