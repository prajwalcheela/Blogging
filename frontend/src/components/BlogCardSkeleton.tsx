function BlogCardSkeleton() {
  return (
    <div className="border-b pb-6 cursor-pointer">
      <div className="flex mb-2">
        <div className="pr-2">
          <div className="h-6 w-6 rounded-full bg-gray-200 animate-pulse"></div>
          {/* Avatar placeholder */}
        </div>
        <div className="flex items-center">
          <div className="h-3 w-16 bg-gray-200 rounded-full animate-pulse"></div>
          {/* Author name placeholder */}
          <div className="ml-2 h-3 w-12 bg-gray-200 rounded-full animate-pulse"></div>
          {/* Date placeholder */}
        </div>
      </div>
      <div className="h-4 w-32 bg-gray-200 rounded-full animate-pulse"></div>
      {/* Title placeholder */}
      <div className="h-16 w-full bg-gray-200 rounded-full animate-pulse mt-2"></div>
      {/* Content placeholder */}
      <div className="mt-6 h-3 w-16 bg-gray-200 rounded-full animate-pulse"></div>
      {/* Read time placeholder */}
    </div>
  );
}

export default BlogCardSkeleton;
