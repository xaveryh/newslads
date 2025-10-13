import React from 'react';

const articles = [
  {
    title: "Cox ‘bagged drugs before he could ride a bike’",
    description:
      "A spiral into drug addiction contributed to a former AFL star killing two CWA women in a meth-fuelled car crash.",
    image: "https://source.unsplash.com/featured/600x300?car,crime",
  },
  {
    title: "7.4 magnitude quake rocks Asian nation",
    description:
      "A magnitude 7.4 earthquake has rattled a nation of 115 million, prompting a tsunami warning and mass evacuations across the country.",
    image: "https://source.unsplash.com/featured/600x300?earthquake,asia",
  },
];

export default function ReadNext() {
  return (
    <section className="py-16 px-6 md:px-12 bg-white">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-2xl font-semibold mb-8">Read next</h2>
        <div className="grid gap-6 md:grid-cols-2">
          {articles.map((article, index) => (
            <div key={index} className="flex flex-col">
              <img
                src={article.image}
                alt={article.title}
                className="w-full h-52 object-cover rounded mb-4"
              />
              <h3 className="text-base font-semibold mb-1">{article.title}</h3>
              <p className="text-sm text-gray-600">{article.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
