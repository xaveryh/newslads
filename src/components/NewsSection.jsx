import React from 'react';
import { Link } from 'react-router-dom'; // ✅ Correct import

const newsItems = [
  {
    title: 'Motoring',
    description: "What’s new in the motoring world",
    image: 'https://source.unsplash.com/featured/400x300?car,event',
    slug: 'motoring',
  },
  {
    title: 'Cooking guides',
    description: "Freshest recipes to liven up your kitchen",
    image: 'https://source.unsplash.com/featured/400x300?cooking,food',
    slug: 'cooking-guides',
  },
  {
    title: 'Politics',
    description: "Is your party right for you? Check out our surveys!",
    image: 'https://source.unsplash.com/featured/400x300?politics,government',
    slug: 'politics',
  },
];

export default function NewsSection() {
  return (
    <section className="py-16 px-6 md:px-12 bg-white">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-2xl font-semibold mb-8">News at your fingertips</h2>

        <div className="grid gap-6 md:grid-cols-3">
          {newsItems.map((item, index) => (
            <Link
              to={`/article`} // link each card to a specific article
              key={index}
              className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300"
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-52 object-cover"
              />
              <div className="p-4">
                <h3 className="text-base font-semibold">{item.title}</h3>
                <p className="text-sm text-gray-600">{item.description}</p>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-8 text-left">
          <button className="px-6 py-2 bg-gray-100 hover:bg-gray-200 text-sm rounded-2xl">
            Show more...
          </button>
        </div>
      </div>
    </section>
  );
}
