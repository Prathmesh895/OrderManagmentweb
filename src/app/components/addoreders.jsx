"use client"
import React, { useState, useEffect } from 'react';
import Select from 'react-select';

// AddOrders Component for adding new orders
function AddOrders({ items, onClose }) {
    const [orderData, setOrderData] = useState({
        customer: '',
        status: 'processing',
        ItemId: '',
        Items: [] // [{ id: itemID, name: itemName, quantity: number }]
    });

    // State for showing order data (if needed)
    const [showOrderData, setShowOrderData] = useState([]);

    // Handle changes in text input fields (customer and ItemId)
    const handleOrderData = (e) => {
        const { name, value } = e.target;
        setOrderData({
            ...orderData,
            [name]: value
        });
    };

    // Handle changes in the item selection
    const handleSelectChange = (selectedOptions) => {
        const selectedItems = selectedOptions ? selectedOptions.map(option => ({
            id: option.value,
            name: option.label.split(',')[0], // Extract item name from label
            quantity: 1 // Default quantity
        })) : [];
        setOrderData({
            ...orderData,
            Items: selectedItems
        });
    };

    // Handle changes in the quantity of items
    const handleQuantityChange = (itemId, quantity) => {
        const updatedItems = orderData.Items.map(item =>
            item.id === itemId ? { ...item, quantity: parseInt(quantity) } : item
        );
        setOrderData({
            ...orderData,
            Items: updatedItems
        });
    };

    // Handle form submission to add a new order
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch('/api/orders', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(orderData)
            });
            if (res.ok) {
                console.log('Order added successfully!');
                setOrderData({
                    customer: '',
                    status: 'processing',
                    ItemId: '',
                    Items: []
                });
                onClose(); // Close the modal on successful submission
            } else {
                console.error('Failed to add order');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    // Generate options for the Select component from the items prop
    const itemOptions = items.map(item => ({
        value: item._id,
        label: `${item.title}, Price: $${item.price}`
    }));

    return (
        <div className='p-5 w-full h-screen absolute left-1 top-1 rounded'>
            <div className='absolute inset-0 bg-gray-500 opacity-50 blur'></div>
            <form onSubmit={handleSubmit} className='bg-white m-5 p-5 lg:w-1/3 absolute lg:left-1/3 top-[10%] border-t-4 rounded border-violet-500 flex flex-col justify-center'>
                <h1>Enter Order Details</h1>
                {/* Input field for customer name */}
                <div className='flex flex-col my-5'>
                    <label htmlFor="customer">Enter customer name</label>
                    <input
                        type="text"
                        id='customer'
                        name='customer'
                        value={orderData.customer}
                        onChange={handleOrderData}
                        placeholder='john doe'
                        required
                    />
                </div>
                {/* Input field for Item ID */}
                <div className='flex flex-col my-5'>
                    <label htmlFor="ItemId">Enter Item id</label>
                    <input
                        type="number"
                        id="ItemId"
                        name='ItemId'
                        value={orderData.ItemId}
                        onChange={handleOrderData}
                        placeholder='#1010'
                        required
                    />
                </div>
                {/* Select component for selecting items */}
                <div className='flex flex-col my-5'>
                    <label htmlFor="Items">Select Items</label>
                    <Select
                        id='Items'
                        name='Items'
                        options={itemOptions}
                        isMulti
                        onChange={handleSelectChange}
                        placeholder='Select items...'
                        value={itemOptions.filter(option => orderData.Items.map(item => item.id).includes(option.value))}
                    />
                </div>
                {/* Input fields for quantities of selected items */}
                {orderData.Items.map((item, index) => (
                    <div key={item.id} className='flex flex-col my-5'>
                        <label htmlFor={`quantity-${item.id}`}>Quantity for {item.name}</label>
                        <input
                            type="number"
                            id={`quantity-${item.id}`}
                            value={item.quantity}
                            onChange={(e) => handleQuantityChange(item.id, e.target.value)}
                            min="1"
                            required
                        />
                    </div>
                ))}
                {/* Buttons for canceling and submitting the form */}
                <div className='flex justify-between'>
                    <button type="button" onClick={onClose} className='bg-gray-200 border rounded py-2 px-5 w-2/5 hover:bg-gray-300 hover:border-gray-700'>
                        Cancel
                    </button>
                    <button type='submit' className='bg-violet-600 text-white rounded border py-2 px-5 w-2/5 hover:bg-green-500 hover:border-green-700'>
                        Confirm
                    </button>
                </div>
            </form>
        </div>
    );
}

// OrderData component for fetching item data and rendering AddOrders component
function OrderData() {
    const [getitemsData, setGetitemsData] = useState([]);

    useEffect(() => {
        fetchItems(); // Fetch items from API on component mount
    }, []);

    // Function to fetch items from API
    const fetchItems = async () => {
        try {
            const res = await fetch('/api/manageitem');
            if (!res.ok) {
                throw new Error('Failed to fetch items');
            }
            const data = await res.json();
            setGetitemsData(data.Item); // Set fetched items to state
        } catch (error) {
            console.error('Failed to fetch items:', error);
        }
    };

    // State and function to handle modal visibility
    const [isModalOpen, setIsModalOpen] = useState(true);
    const handleClose = () => setIsModalOpen(false);

    return (
        <div>
            {isModalOpen && <AddOrders items={getitemsData} onClose={handleClose} />}
        </div>
    );
}

export default OrderData;
