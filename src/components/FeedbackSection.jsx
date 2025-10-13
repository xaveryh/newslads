import React, { useState, useEffect } from 'react';

const feedbacks = [
  { quote: '“A terrific piece of praise”', name: 'Name', description: 'Description', avatar: 'https://i.pravatar.cc/40?img=1' },
  { quote: '“A fantastic bit of feedback”', name: 'Name', description: 'Description', avatar: 'https://i.pravatar.cc/40?img=2' },
  { quote: '“A genuinely glowing review”', name: 'Name', description: 'Description', avatar: 'https://i.pravatar.cc/40?img=3' },
  { quote: '“A terrific piece of praise”', name: 'Name', description: 'Description', avatar: 'https://i.pravatar.cc/40?img=4' },
  { quote: '“A fantastic bit of feedback”', name: 'Name', description: 'Description', avatar: 'https://i.pravatar.cc/40?img=5' },
  { quote: '“A genuinely glowing review”', name: 'Name', description: 'Description', avatar: 'https://i.pravatar.cc/40?img=6' },
  { quote: '“A terrific piece of praise”', name: 'Name', description: 'Description', avatar: 'https://i.pravatar.cc/40?img=7' },
  { quote: '“A fantastic bit of feedback”', name: 'Name', description: 'Description', avatar: 'https://i.pravatar.cc/40?img=8' },
  { quote: '“A genuinely glowing review”', name: 'Name', description: 'Description', avatar: 'https://i.pravatar.cc/40?img=9' },
];

export default function FeedbackSection() {
  const [showAll, setShowAll] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  // Detect screen resize dynamically
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Show only first 6 items on mobile
  const visibleFeedbacks = isMobile && !showAll ? feedbacks.slice(0, 4) : feedbacks;

  return (
    <section className="py-16 px-6 md:px-12 bg-white">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-2xl font-semibold mb-8">Feedback</h2>

        {/* Feedback Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {visibleFeedbacks.map((item, index) => (
            <div key={index} className="border rounded-lg p-4 bg-white shadow-sm">
              <p className="text-sm mb-4">{item.quote}</p>
              <div className="flex items-center gap-3">
                <img
                  src={item.avatar}
                  alt={item.name}
                  className="w-8 h-8 rounded-full object-cover"
                />
                <div>
                  <p className="text-sm font-medium">{item.name}</p>
                  <p className="text-xs text-gray-500">{item.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Show More Button (only on mobile + hidden when expanded) */}
        {isMobile && !showAll && (
          <div className="mt-6 text-center">
            <button
              onClick={() => setShowAll(true)}
              className="px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800 transition"
            >
              Show more
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
