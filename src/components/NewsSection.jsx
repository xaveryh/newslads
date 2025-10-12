import React from 'react';

const newsItems = [
  {
    title: 'Motoring',
    description: "what’s new in the motoring world",
    image: 'https://source.unsplash.com/featured/400x300?car,event',
  },
  {
    title: 'Cookings guides',
    description: "freshest recipes to liven up your kitchen",
    image: 'https://source.unsplash.com/featured/400x300?cooking,food',
  },
  {
    title: 'Politics',
    description: "is your party right for you? check out our surveys!",
    image: 'https://source.unsplash.com/featured/400x300?politics,government',
  },
];

export default function NewsSection() {
  return (
    <section className="py-16 px-6 md:px-12 bg-white">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-2xl font-semibold mb-8">News at your fingertips</h2>
        <div className="grid gap-6 md:grid-cols-3">
          {newsItems.map((item, index) => (
            <div key={index} className="bg-white rounded-lg overflow-hidden shadow-sm">
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-52 object-cover"
              />
              <div className="p-4">
                <h3 className="text-base font-semibold">{item.title}</h3>
                <p className="text-sm text-gray-600">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-8 text-left">
          <button className="px-6 py-2 bg-gray-100 hover:bg-gray-200 text-sm rounded">
            Show more...
          </button>
        </div>
      </div>
    </section>
  );
}
