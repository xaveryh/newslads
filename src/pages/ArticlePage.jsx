import React from 'react';
import NavBar from '../components/NavBar';
import FooterSection from '../components/FooterSection';

export default function ArticlePage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-12">

      <NavBar />

      {/* Title & Main Image */}
      <article className="space-y-6">
        <h2 className="text-3xl font-bold max-w-2xl leading-snug">
          NRL cult hero saves ‘his best for last’ in Super League grand final fairy tale
        </h2>

        <img
          src="/"
          alt="NRL hero with trophy"
          className="w-full border-4 border-blue-500 rounded"
        />

        {/* Article Content */}
        <div className="space-y-4 text-gray-800 text-sm leading-relaxed">
          <p>
            Blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah...
          </p>
          <p>
            Blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah...
          </p>
        </div>

        {/* Inline Supporting Images */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <img src="/path-img1.jpg" alt="Team celebration" className="rounded" />
          <img src="/path-img2.jpg" alt="Player moment" className="rounded" />
        </div>

        {/* More Content */}
        <p className="text-sm text-gray-700 leading-relaxed">
          More blah blah blah blah blah blah blah blah blah blah blah blah...
        </p>
      </article>

      {/* Related Posts Section */}
      <section className="space-y-4">
        <h3 className="text-lg font-semibold">Related articles or posts</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { title: "GeeksHealth: ‘This 1 Cup Before Bed...’", img: "/rel1.jpg" },
            { title: "NRL star steps out with jaw-dropping sister", img: "/rel2.jpg" },
            { title: "Cardiologist: Final Exit... This Crushed Every Bit of Belly Fat", img: "/rel3.jpg" },
            { title: "Wellness Salt Globes & Detox", img: "/rel4.jpg" },
          ].map((item, index) => (
            <div key={index} className="space-y-2">
              <img src={item.img} alt={item.title} className="rounded w-full" />
              <p className="text-xs text-gray-800">{item.title}</p>
            </div>
          ))}
        </div>
      </section>

      <FooterSection />

    </div>
  );
}
