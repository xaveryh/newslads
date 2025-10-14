import React from "react"
import logo from '../assets/logo.png'
import { Link } from 'react-router-dom';

export default function TopSection() {
    return (
        <section className="py-16 px-6 md:px-12">
            <div className="max-w-7xl mx-auto flex flex-row md:flex-row items-center justify-between gap-10">
            
                {/* Left side */}
                <div className="flex-1 text-center md:text-left">
                    <h1 className="text-7xl font-extrabold mb-4">Welcome!</h1>
                    <p className="text-lg mb-6">See what’s newest with NewsLads!</p>
                    <Link to="/search">
                        <button className="bg-black text-white px-6 py-2 rounded-2xl hover:bg-gray-800">Search</button>
                    </Link>
                </div>

                {/* Right side */}
                <div className="flex-1">
                    <img
                    src={logo}
                    alt="NewsLads Logo"
                    className="w-[500px] h-auto mx-auto md:mx-0"
                    />
                </div>
            </div>
        </section>
    );
}