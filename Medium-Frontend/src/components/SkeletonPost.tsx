import React from 'react';

const SkeletonPost = () => {
  return (
    <div className="pb-4 pt-4 m-2 max-w-md border-b-2 border-gray-200 dark:border-gray-700 shadow-lg overflow-hidden md:max-w-2xl animate-pulse">
      <div className="md:flex">
        <div className="md:flex-shrink-0">
          <div className="h-48 w-full bg-gray-300 dark:bg-gray-700 rounded-md md:w-48"></div>
        </div>
        <div className="p-8 w-full">
          <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-24 mb-2"></div>
          <div className="h-6 bg-gray-300 dark:bg-gray-700 rounded w-3/4 mb-2"></div>
          <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-full mb-2"></div>
          <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-full mb-2"></div>
          <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-full mb-2"></div>
          <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-1/2 mt-4"></div>
        </div>
      </div>
    </div>
  );
};

export default SkeletonPost;
