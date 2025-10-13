import React from "react"

export default function NavBar() {
    return (
        <header className='flex justify-between items-center p-4 shadow-md bg-white'>
            <h1 className='text-xl font-bold'>NewsLads.com</h1>
            <nav>
            <button className="bg-black text-white px-6 py-2 rounded-2xl hover:bg-gray-800 mr-2">Home</button>
            <button className="bg-black text-white px-6 py-2 rounded-2xl hover:bg-gray-800">Search</button>
            </nav>
        </header>
    );
}