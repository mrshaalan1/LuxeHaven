import React from 'react';

const SkeletonDetail = () => {
 return (
    <div className="container mx-auto px-4 h-max mt-7 ">
      <div className="font-extrabold mb-4 text-primary-dark w-full h-64 bg-gray-300 animate-pulse"></div>
      <div className="mt-5 xl:mx-10 relative w-full h-64 bg-gray-300 animate-pulse"></div>
      <div className="md:pt-28 text-xl text-gray-700 w-full h-64 bg-gray-300 animate-pulse"></div>
    </div>
 );
};

export default SkeletonDetail;
