
import React from 'react';

const MandiMap = () => {
  return (
    <div className="rounded-lg overflow-hidden shadow-lg border border-gray-200">
      <div className="bg-emerald-50 p-4 flex justify-between items-center">
        <div>
          <h3 className="font-medium text-emerald-800">The SabjiWala Headquarters</h3>
          <p className="text-sm text-gray-600">Bhim Nagar, JJ Colony No 3, Nangloi, Delhi, 110087, India</p>
        </div>
        <a 
          href="https://maps.google.com/?q=Bhim+Nagar+JJ+Colony+No+3+Nangloi+Delhi+110087+India" 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-xs bg-emerald-700 text-white px-3 py-1 rounded hover:bg-emerald-800 transition-colors"
        >
          Open in Google Maps
        </a>
      </div>
      <iframe 
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3500.458215742878!2d77.06630597524053!3d28.68491408166642!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d046b8a04fe4f%3A0x425a3ac563e66517!2sJJ%20Colony%20No.3%2C%20Nangloi%2C%20Delhi%2C%20110087!5e0!3m2!1sen!2sin!4v1715947556064!5m2!1sen!2sin" 
        width="100%" 
        height="400" 
        style={{ border: 0 }} 
        allowFullScreen={false} 
        loading="lazy" 
        referrerPolicy="no-referrer-when-downgrade"
        title="The SabjiWala Headquarters Map"
      ></iframe>
    </div>
  );
};

export default MandiMap;
