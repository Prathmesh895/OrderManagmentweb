"use client"
import React, { useState } from 'react'


function page({ itemData }) {
  const [ItemStock, setItemStock] = useState('');
  const [ItemPrice, setItemPrice] = useState('');
  const [message, setMessage] = useState('');
  console.log(itemData);
  const name = itemData.Itemname;
  const prevstock = itemData.stock;
  const prevprice = itemData.price;
  const _id = itemData.id;
  const handleOnUpdate = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/manageitem', ({
        method: "PATCH",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          _id,
          stock:ItemStock,
          price:ItemPrice
        })
      }))
      if (res.ok) {
        console.log("Updated Item Succesfully");
        setMessage("Updated Item Succesfully");
        setTimeout(()=>{
          setMessage('');
          window.location.reload();
        },2000)
      }

    } catch (error) {
      console.log("Error while updating Item");
    }
  }
  return (
    <form className='bg-white m-5 p-5 lg:w-1/3 absolute lg:left-1/3 top-[10%] border-t-4 border-violet-500 flex flex-col justify-center'>
      <h1 className='text-center text-xl font-semibold text-gray-700 m-5'>Update Item <i>{name}</i></h1>
      <h1 className='text-center text-green-600'>{message}</h1>
      <h1>Total current Quantity {prevstock}</h1>
      <h1>Current Price/item ₹{prevprice}</h1>
      {/* Input for item quantity */}
      <div className='flex flex-col my-5'>
        <label htmlFor="itemstock" className='text-gray-700'>Enter item Quantity</label>
        <input
          type="number"
          id='itemstock'
          value={ItemStock}
          onChange={(e) => setItemStock(e.target.value)}
          className='border p-2'
          placeholder='ex:10'
        />
      </div>
      {/* Input for item price */}
      <div className='flex flex-col my-5'>
        <label htmlFor="itemstock" className='text-gray-700'>Enter Price/item  </label>
        <input
          type="number"
          id='itemstock'
          value={ItemPrice}
          onChange={(e) => setItemPrice(e.target.value)}
          className='border p-2'
          placeholder='ex:99 Rs'
        />
      </div>

      {/* Button */}
      <div className='flex justify-between mt-auto pt-10 '>
        <button className=' py-2 px-20  rounded border hover:bg-violet-600 border-violet-600 hover:text-white cursor-pointer'> Cancel</button>
        <button onClick={handleOnUpdate} className='bg-violet-600 py-2 px-20 text-white rounded border hover:bg-white hover:border-violet-600 hover:text-black cursor-pointer'>
          Add Item
        </button>
      </div>
    </form>
  )
}

export default page