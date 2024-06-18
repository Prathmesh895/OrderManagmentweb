// SearchItems.js
"use client"
import React, { useState } from 'react';

const items = [
    { _id: "6670516a00e06502df371d3d", title: "Item 2", stock: 100, price: 99 },
    { _id: "667097e5227bbc92fd2719d6", title: "Burger", stock: 10, price: 199 },
    { _id: "66709809227bbc92fd2719dc", title: "Pizza", stock: 20, price: 299 },
    { _id: "66709828227bbc92fd2719e0", title: "Item 1", stock: 100, price: 199 },
    { _id: "66709840227bbc92fd2719e4", title: "Veg burger", stock: 0, price: 89 },
    { _id: "667098d7227bbc92fd2719f4", title: "Burger 1", stock: 2, price: 199 },
    { _id: "667098f2227bbc92fd2719f8", title: "Item 3", stock: 0, price: 122 },
    { _id: "66709901227bbc92fd2719fc", title: "Item 4", stock: 0, price: 100 },
    { _id: "6670991e227bbc92fd271a02", title: "Item 5 ", stock: 0, price: 99 },
    { _id: "66709931227bbc92fd271a06", title: "Item 6", stock: 50, price: 399 },
    { _id: "66709946227bbc92fd271a0c", title: "Item 7", stock: 100, price: 899 }
];

function SearchItems() {
    const [searchQuery, setSearchQuery] = useState('');

    const handleSearch = (e) => {
        setSearchQuery(e.target.value);
    };

    const filteredItems = items.filter(item =>
        item.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className='bg-white p-5 lg:w-1/3 m-5 relative lg:left-1/3 border rounded border-t-4 border-t-violet-500'>
            <h1>Search Items</h1>
            <input
                type="text"
                placeholder="Search for an item"
                value={searchQuery}
                onChange={handleSearch}
                className='border p-2 w-full my-5'
            />
            <div className='mt-5'>
                {filteredItems.length > 0 ? (
                    <ul>
                        {filteredItems.map(item => (
                            <li key={item._id} className='border p-3 my-2 rounded'>
                                <h2>{item.title}</h2>
                                <p>Stock: {item.stock}</p>
                                <p>Price: ${item.price}</p>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>No items found</p>
                )}
            </div>
        </div>
    );
}

export default SearchItems;
