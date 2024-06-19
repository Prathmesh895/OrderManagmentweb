'use client'
import React from 'react';
import Link from 'next/link';
import { LuBaggageClaim } from 'react-icons/lu';
import { IoHomeOutline } from "react-icons/io5";
import { SiNginxproxymanager } from "react-icons/si";
import { usePathname } from 'next/navigation';
export default function Sidebar() {

    const pathname = usePathname();
    const sidebarData = [
        { title: 'Home', link: '/', icon:IoHomeOutline },
        { title: 'Orders', link: '/orders', icon: LuBaggageClaim},
        { title: 'Manage', link: '/manage', icon:SiNginxproxymanager },
        { title: '', link: '' },
    ];

    return (
        <div className=' bg-white p-3 border-b'>
            <div className='flex justify-between items-center'>
            <h1 className=' font-semibold lg:text-2xl text-xl'>FoodApp</h1>
            {sidebarData.map((data, index) => (
                <div key={index} className="p-2">
                    <Link href={data.link} className="flex items-center lg:space-x-2">
                    <span className={`${pathname === data.link ? 'text-orange-600' : ''}`}>{data.icon && <data.icon className="text-xl" />}</span>
                        <span className={`text-sm ${pathname === data.link ? 'text-orange-600' : ''}`}>{data.title}</span>
                    </Link>
                </div>
            ))}
             </div>
        </div>
    );
}
