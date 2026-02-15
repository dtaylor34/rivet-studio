import React from 'react';

const ImageShowcase = ({ images, caption }) => (
  <div className="mb-16">
    {images.length === 1 ? (
      <div className="bg-surface rounded-2xl p-8 lg:p-12">
        <div className="bg-overlay/10 rounded-lg aspect-video flex items-center justify-center">
          <p className="text-faint text-center">Image: {images[0]}</p>
        </div>
      </div>
    ) : (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {images.map((img, idx) => (
          <div key={idx} className="bg-surface rounded-2xl p-6 lg:p-8">
            <div className="bg-overlay/10 rounded-lg aspect-video flex items-center justify-center">
              <p className="text-faint text-center text-sm">Image: {img}</p>
            </div>
          </div>
        ))}
      </div>
    )}
    {caption && <p className="text-faint text-center mt-4 text-sm">{caption}</p>}
  </div>
);

export default ImageShowcase;
