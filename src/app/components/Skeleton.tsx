import React from 'react';

const Skeleton = () => {
 return (
    <div className="rounded-2xl overflow-hidden shadow-md m-5 p-3 relative" style={{backgroundColor: '#ddd'}}>
      <div className="w-full h-64 object-cover rounded-lg cursor-pointer bg-gray-300 animate-pulse"></div>
      <div className="m-4">
        <div className="font-bold h-4 w-3/4 bg-gray-300 animate-pulse"></div>
        <div className="block text-gray-300 h-4 w-5/6 bg-gray-300 animate-pulse mt-2"></div>
      </div>
      <div className="bg-gray-300 text-gray-300 text-xs uppercase font-bold rounded-full p-2 absolute top-0 mt-9 ml-1 shadow-md animate-pulse">
        <span className="h-4 w-3/4 bg-gray-300 animate-pulse"></span>
      </div>
      <div className="bg-gray-300 text-gray-300 text-xs uppercase font-bold rounded-full p-2 absolute bottom-24 right-5 mt-4 ml-1 shadow-md animate-pulse">
        <span className="h-4 w-3/4 bg-gray-300 animate-pulse"></span>
      </div>
    </div>
 );
};

export default Skeleton;
