import React, { useEffect, useState } from 'react';
import { MdDelete } from 'react-icons/md';
import { FiEdit } from "react-icons/fi";
import { useSearchParams } from 'next/navigation';
import Delete from '@/app/updateItem/delete/[id]/page'
import Update from '@/app/updateItem/updateItem/[id]/page'
import Loading from '@/app/components/loading'


export default function FetchItem({ onCountsChange }) {
    const [itemsData, setItemsData] = useState([]); // State to hold all items fetched from API
    const [filterItems, setFilterItems] = useState([]); // State to hold filtered items based on category
    const [loading, setLoading] = useState(false); // Loading state indicator
    const [error, setError] = useState(''); // Error state for fetching items
    const [deleteItem, setDeleteItem] = useState('');
    const [updateItem, setUpdateItem] = useState('');
    const [showDeletebox, setShowDeletebox] = useState('');
    const [showUpdatebox, setShowUpdatebox] = useState('');
    const [currentPage, setCurrentPage] = useState(1); // Current page number for pagination
    const itemsPerPage = 10; // Number of items per page
    const searchParams = useSearchParams();
    const category = searchParams.get('category') || 'Total Items'; // Get category from URL query param

    useEffect(() => {
        fetchItems(); // Fetch items from API on component mount
    }, []);

    useEffect(() => {
        if (itemsData.length > 0) {
            showItemsByStock(category); // Filter items when category changes or itemsData updates
        }
    }, [category, itemsData]);

    // Function to fetch items from API
    const fetchItems = async () => {
        try {
            setLoading(true);
            const res = await fetch('api/manageitem');
            if (!res.ok) {
                throw new Error('Failed to fetch items');
            }
            const data = await res.json();
            setItemsData(data.Item); // Set fetched items to state
            setLoading(false);
        } catch (error) {
            setLoading(false);
            setError('Failed to fetch items'); // Set error message if fetch fails
        }
    };

    // Update item counts (total, in stock, out of stock) when itemsData changes
    useEffect(() => {
        if (itemsData.length > 0) {
            const totalItems = itemsData.length;
            const InstockItem = itemsData.filter(item => item.stock > 0).length;
            const outOfStockItems = itemsData.filter(item => item.stock <= 0).length;
            onCountsChange({ totalItems, InstockItem, outOfStockItems });
        }
    }, [itemsData]);

    // Function to filter items based on category (Instock, Out of stock, Total)
    const showItemsByStock = type => {
        let filteredItems = [];
        switch (type) {
            case 'Instock Items':
                filteredItems = itemsData.filter(item => item.stock > 0);
                break;
            case 'Out of stock Items':
                filteredItems = itemsData.filter(item => item.stock <= 0);
                break;
            case 'Total Items':
            default:
                filteredItems = itemsData;
                break;
        }
        setFilterItems(filteredItems); // Set filtered items to state
        setCurrentPage(1); // Reset current page to 1 when filter changes
    };

    // Calculate index of last and first item on current page
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    // Slice filtered items array to display items for current page
    const currentItems = filterItems.slice(indexOfFirstItem, indexOfLastItem);

    // Function to handle pagination - set current page number
    const paginate = pageNumber => setCurrentPage(pageNumber);

    // Function to handle next page button click
    const handleNextPage = () => {
        if (currentPage < Math.ceil(filterItems.length / itemsPerPage)) {
            setCurrentPage(prevPage => prevPage + 1);
        }
    };

    // Function to handle previous page button click
    const handlePrevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(prevPage => prevPage - 1);
        }
    };

    // add  data to delete item 
    const handleonDelete = (_id, title) => {
        const itemsData = {
            _id: _id,
            title: title
        }
        setDeleteItem(itemsData);
        console.log(itemsData)
    }
    const handleonShowDeletebox = () => {
        setShowDeletebox(!showDeletebox);
    }

    // update data 
    const handleOnShowUpdate = () => {
        setShowUpdatebox(!showUpdatebox);
    }
    const handleOnUpdate = (id, Itemname, stock, price) => {
        const updateData = {
            id, Itemname, stock, price
        }
        setUpdateItem(updateData);
        console.log(updateItem);
    }

    return (
        <>
            <table className='border m-5 lg:w-[97%]  bg-white'>
                <thead className='border bg-gray-100'>
                    <tr className='p-2'>
                        <th className='border p-2'>ID</th>
                        <th className='border p-2'>Item Name</th>
                        <th className='border p-2'>Available Quantity</th>
                        <th className='border p-2'>Price/Item</th>
                        <th className='border p-2'>Delete</th>
                    </tr>
                </thead>
                <tbody className='border'>
                    {loading ? (
                        <tr>
                            <td colSpan='5' className='text-center'>
                                <Loading />
                            </td>
                        </tr>
                    ) : currentItems.length > 0 ? (
                        currentItems.map((item, index) => (
                            <tr key={index} className='border cursor-pointer'>
                                <td className='border text-center p-2'>{indexOfFirstItem + index + 1}</td>
                                <td className='border text-center p-2'>{item.title}</td>
                                <td className='border text-center p-2'>{item.stock}</td>
                                <td className='border text-center p-2'>{item.price}</td>
                                <td className='flex justify-evenly items-center text-center p-2'>
                                    <p onClick={() => { handleonDelete(item._id, item.title), handleonShowDeletebox() }} className=' hover:text-red-600'><MdDelete size={25} /> </p>
                                    <p onClick={() => { handleOnUpdate(item._id, item.title, item.stock, item.price), handleOnShowUpdate() }}><FiEdit /></p>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan='5' className='p-2'>
                                <Loading />
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>

            {/* Pagination Controls */}
            {filterItems.length > itemsPerPage && (
                <div className='flex justify-center my-4 '>
                    {/* Previous Page Button */}
                    <button
                        onClick={handlePrevPage}
                        className={`mx-1 px-3 py-1 rounded-md ${currentPage === 1 ? 'bg-gray-300 cursor-not-allowed' : 'bg-gray-200 hover:bg-gray-300'
                            }`}
                        disabled={currentPage === 1}
                    >
                        Previous
                    </button>
                    {/* Page Number Buttons */}
                    {[...Array(Math.ceil(filterItems.length / itemsPerPage)).keys()].map(pageNumber => (
                        <button
                            key={pageNumber}
                            onClick={() => paginate(pageNumber + 1)}
                            className={`mx-1 px-3 py-1 rounded-md ${currentPage === pageNumber + 1 ? 'bg-blue-500 text-white' : 'bg-gray-200 hover:bg-gray-300'
                                }`}
                        >
                            {pageNumber + 1}
                        </button>
                    ))}
                    {/* Next Page Button */}
                    <button
                        onClick={handleNextPage}
                        className={`mx-1 px-3 py-1 rounded-md ${currentPage === Math.ceil(filterItems.length / itemsPerPage)
                            ? 'bg-gray-300 cursor-not-allowed'
                            : 'bg-gray-200 hover:bg-gray-300'
                            }`}
                        disabled={currentPage === Math.ceil(filterItems.length / itemsPerPage)}
                    >
                        Next
                    </button>
                </div>
            )}
            {
                showDeletebox &&
                <>
                    <Delete itemData={deleteItem} />
                </>
            }
            {showUpdatebox &&
                <Update itemData={updateItem} />
            }


        </>
    );
}
