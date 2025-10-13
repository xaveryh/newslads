import React from 'react';
import newsImage from '../assets/news_image.png';

const topics = [
    {
      title: 'Politics',
      content: 'Blah Blah Blah Blah Blah Blah\nBlah Blah Blah',
    },
    {
      title: 'Sports',
      content: 'Blah Blah Blah Blah Blah Blah\nBlah Blah Blah',
    },
    {
      title: 'Economy',
      content: 'Blah Blah Blah Blah Blah Blah\nBlah Blah Blah',
    },
  ];

export default function NewsSection1() {
  return (
    <section className="py-16 px-6 md:px-12 bg-white">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-2xl font-semibold mb-10">What’s new on NewsLads?</h2>
        
        <div className="flex flex-col md:flex-row items-center md:items-center gap-10">
          {/* Left Side: Topics */}
          <div className="flex-1 space-y-6">
            {topics.map((topic, index) => (
              <div key={index}>
                <h3 className="font-semibold text-base mb-1">{topic.title}</h3>
                <p className="text-gray-600 whitespace-pre-line text-sm leading-relaxed">
                  {topic.content}
                </p>
              </div>
            ))}

            <div className="mt-6 space-x-3">
              <button className="px-6 py-2 bg-black text-white rounded-2xl text-sm hover:bg-gray-800">
                search
              </button>
              <button className="px-6 py-2 bg-gray-100 text-sm rounded-2xl hover:bg-gray-200">
                Show more...
              </button>
            </div>
          </div>

          {/* Right Side: Image */}
          <div className="flex-1">
            <img
              src={newsImage}
              alt="News Illustration"
              className="w-full max-w-md mx-auto md:mx-0 object-contain"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
