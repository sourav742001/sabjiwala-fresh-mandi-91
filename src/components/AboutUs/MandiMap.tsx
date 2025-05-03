
import React from 'react';

const MandiMap = () => {
  return (
    <div className="rounded-lg overflow-hidden shadow-lg border border-gray-200">
      <div className="bg-emerald-50 p-4 flex justify-between items-center">
        <div>
          <h3 className="font-medium text-emerald-800">Jwalapuri Vegetable Market</h3>
          <p className="text-sm text-gray-600">Delhi, India</p>
        </div>
        <a 
          href="https://maps.google.com/?q=Jwalapuri+Vegetable+Market+Delhi" 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-xs bg-emerald-700 text-white px-3 py-1 rounded hover:bg-emerald-800 transition-colors"
        >
          Open in Google Maps
        </a>
      </div>
      <iframe 
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3500.4508984004707!2d77.07698531508646!3d28.6785858824084!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d047309fff32f%3A0xa4a689a1ee1a1581!2sJwalapuri%20Vegetable%20Market!5e0!3m2!1sen!2sin!4v1651234567890!5m2!1sen!2sin" 
        width="100%" 
        height="400" 
        style={{ border: 0 }} 
        allowFullScreen={false} 
        loading="lazy" 
        referrerPolicy="no-referrer-when-downgrade"
        title="Jwalapuri Vegetable Market Map"
      ></iframe>
    </div>
  );
};

export default MandiMap;
