// 'use client'
// import React, { Suspense, useState } from 'react'
// import Addoreders from '../components/addoreders';
// import ShowOrders from '../components/showOrders';
// import { usePathname, useRouter, useSearchParams } from 'next/navigation';


// export default function page() {
//     const router = useRouter();
//     const searchParams = useSearchParams();
//     const query = searchParams.get("category")
//     const pathname = usePathname();
//     const [showOrderForm, setShowOrderForm] = useState(false);
//     const [counts, setCounts] = useState({ totalOrder: 0, completeOrders: 0, inprocessingOrders: 0 });

//     //set query for filter items according to it
//     const handleOncategory = (category) => {
//         const newQueryParams = new URLSearchParams(searchParams);
//         newQueryParams.set("category", category);
//         router.push(`${pathname}/?${newQueryParams}`)
//     }

//     const handleOnOpen = () => {
//         setShowOrderForm(!showOrderForm)
//     }
//     const handleOnClose = () => {
//         setShowOrderForm(false);
//     };
//     return (
//         <>
//             <Suspense>
//                 <section className='m-5 '>
//                     <div>
//                         {/* Header section with title and button */}
//                         <div className='flex justify-between'>
//                             <h1 className='font-semibold text-2xl text-gray-600'>Order Summery</h1>
//                             <h1 onClick={handleOnOpen} className='bg-violet-600 py-2 px-2 text-white rounded border hover:bg-white hover:border-violet-600 hover:text-black cursor-pointer'> + Add New order</h1>
//                         </div>
//                         {/* nav for showing order  */}
//                         <nav className='flex justify-between space-x-5 my-5'>
//                             <div onClick={() => handleOncategory("Total Orders")} className={`bg-white p-5 basis-1/3 space-y-3 border rounded cursor-pointer ${query == "Total Orders" ? "border-2 border-violet-600" : ''}`}>
//                                 <h1 className='font-semibold text-xl text-blue-500'>Total Orders</h1>
//                                 <h2 className='text-gray-500 font-semibold text-md'>Total {counts.totalOrder}</h2>
//                             </div>
//                             <div onClick={() => handleOncategory("Completed orders")} className={`bg-white p-5 basis-1/3 space-y-3 border rounded cursor-pointer ${query == "Completed orders" ? "border-2 border-amber-500" : ''}`}>
//                                 <h1 className='font-semibold text-xl text-amber-500'>Completed orders</h1>
//                                 <h2 className='text-gray-500 font-semibold text-md'>Total {counts.completeOrders}</h2>
//                             </div>
//                             <div onClick={() => handleOncategory("In Process orders")} className={`bg-white p-5 basis-1/3 space-y-3 border rounded cursor-pointer ${query == "In Process orders" ? "border-2 border-red-500" : ''}`}>
//                                 <h1 className='font-semibold text-xl text-red-500'>In Process orders</h1>
//                                 <h2 className='text-gray-500 font-semibold text-md'>Total {counts.inprocessingOrders}</h2>
//                             </div>
//                         </nav>
//                     </div>
//                     <div className='bg-white p-5 border rounded'>

//                         <nav className='flex justify-between items-center'>
//                             <h1 className='font-semibold text-xl text-gray-600'>Orders Items</h1>

//                         </nav>
//                         {/* showorders  & receive counts */}
//                         <ShowOrders onCountsChange={(newCounts) => setCounts(newCounts)} />
//                     </div>
//                 </section>
//                 {/* add page orders  */}
//                 {
//                     showOrderForm && <Addoreders onClose={handleOnClose} />
//                 }
//             </Suspense>
//         </>
//     )
// }


'use client'
import React, { Suspense, useState } from 'react';
import AddOrders from '../components/addoreders';
import ShowOrders from '../components/showOrders';
import Loading from '@/app/components/loading'
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

function OrderPage() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const query = searchParams.get("category") || null;
    const pathname = usePathname();
    const [showOrderForm, setShowOrderForm] = useState(false);
    const [counts, setCounts] = useState({ totalOrder: 0, completeOrders: 0, inprocessingorders : 0 });

    // Set query for filter items according to it
    const handleOnCategory = (category) => {
        const newQueryParams = new URLSearchParams(searchParams);
        newQueryParams.set("category", category);
        router.push(`${pathname}/?${newQueryParams}`);
    };

    const handleOnOpen = () => {
        setShowOrderForm(!showOrderForm);
    };

    const handleOnClose = () => {
        setShowOrderForm(false);
    };

    return (
        <>
            <Suspense fallback={<Loading/>}>
                <section className="m-5">
                    <div>
                        {/* Header section with title and button */}
                        <div className="flex justify-between">
                            <h1 className="font-semibold text-2xl text-gray-600">Order Summary</h1>
                            <h1
                                onClick={handleOnOpen}
                                className="bg-violet-600 py-2 px-2 text-white rounded border hover:bg-white hover:border-violet-600 hover:text-black cursor-pointer"
                            >
                                + Add New Order
                            </h1>
                        </div>
                        {/* Nav for showing order */}
                        <nav className="flex justify-between space-x-5 my-5">
                            <div
                                onClick={() => handleOnCategory("Total Orders")}
                                className={`bg-white p-5 basis-1/3 space-y-3 border rounded cursor-pointer ${
                                    query == "Total Orders" ? "border-2 border-violet-600" : ''
                                }`}
                            >
                                <h1 className="font-semibold text-xl text-blue-500">Total Orders</h1>
                                <h2 className="text-gray-500 font-semibold text-md">Total {counts.totalOrder}</h2>
                            </div>
                            <div
                                onClick={() => handleOnCategory("Completed Orders")}
                                className={`bg-white p-5 basis-1/3 space-y-3 border rounded cursor-pointer ${
                                    query == "Completed Orders" ? "border-2 border-amber-500" : ''
                                }`}
                            >
                                <h1 className="font-semibold text-xl text-amber-500">Completed Orders</h1>
                                <h2 className="text-gray-500 font-semibold text-md">Total {counts.completeOrders}</h2>
                            </div>
                            <div
                                onClick={() => handleOnCategory("In Process Orders")}
                                className={`bg-white p-5 basis-1/3 space-y-3 border rounded cursor-pointer ${
                                    query == "In Process Orders" ? "border-2 border-red-500" : ''
                                }`}
                            >
                                <h1 className="font-semibold text-xl text-red-500">In Process Orders</h1>
                                <h2 className="text-gray-500 font-semibold text-md">Total {counts.inprocessingorders}</h2>
                            </div>
                        </nav>
                    </div>
                    <div className="bg-white p-5 border rounded">
                        <nav className="flex justify-between items-center">
                            <h1 className="font-semibold text-xl text-gray-600">Orders Items</h1>
                        </nav>
                        {/* Show orders & receive counts */}
                        <ShowOrders onCountsChange={(newCounts) => setCounts(newCounts)} />
                    </div>
                </section>
                {/* Add page orders */}
                {showOrderForm && <AddOrders onClose={handleOnClose} />}
            </Suspense>
        </>
    );
}

export default OrderPage;

