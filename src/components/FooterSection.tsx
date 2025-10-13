import React from 'react';
import { FaFacebookF, FaLinkedinIn, FaYoutube, FaInstagram } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="bg-gray-50 border-t py-10 px-6 md:px-12">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-5 gap-8 text-sm text-gray-600">
        
        {/* Logo & Social */}
        <div>
          <h2 className="text-lg font-semibold text-black mb-4">NewsLads.com</h2>
          <div className="flex space-x-4 mt-4">
            <FaFacebookF className="hover:text-black transition" />
            <FaLinkedinIn className="hover:text-black transition" />
            <FaYoutube className="hover:text-black transition" />
            <FaInstagram className="hover:text-black transition" />
          </div>
        </div>

        {/* Help and Support */}
        <div>
          <h3 className="text-sm font-semibold text-black mb-2">Help and support</h3>
          <ul className="space-y-1">
            <li><a href="#" className="hover:underline">Contact us</a></li>
            <li><a href="#" className="hover:underline">FAQ</a></li>
            <li><a href="#" className="hover:underline">General feedback</a></li>
          </ul>
        </div>

        {/* Sign up */}
        <div>
          <h3 className="text-sm font-semibold text-black mb-2">Sign up</h3>
          <ul className="space-y-1">
            <li><a href="#" className="hover:underline">Registration</a></li>
            <li><a href="#" className="hover:underline">Connect</a></li>
            <li><a href="#" className="hover:underline">Newsletter</a></li>
          </ul>
        </div>

        {/* About us */}
        <div>
          <h3 className="text-sm font-semibold text-black mb-2">About us</h3>
          <ul className="space-y-1">
            <li><a href="#" className="hover:underline">Page</a></li>
            <li><a href="#" className="hover:underline">Page</a></li>
            <li><a href="#" className="hover:underline">Page</a></li>
          </ul>
        </div>

        {/* Our Pages */}
        <div>
          <h3 className="text-sm font-semibold text-black mb-2">Our Pages</h3>
          <ul className="space-y-1">
            <li><a href="#" className="hover:underline">Home</a></li>
            <li><a href="#" className="hover:underline">Categories</a></li>
            <li><a href="#" className="hover:underline">Recent news</a></li>
          </ul>
        </div>

      </div>
    </footer>
  );
}
