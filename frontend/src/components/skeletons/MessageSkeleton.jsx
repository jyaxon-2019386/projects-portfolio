const MessageSkeleton = () => {
	return (
	  <div className="animate-pulse space-y-4 p-4">
		<div className="flex gap-3 items-center">
		  <div className="skeleton w-10 h-10 rounded-full shrink-0 bg-gray-300"></div>
		  <div className="flex flex-col gap-1 w-full">
			<div className="skeleton h-4 w-3/4 bg-gray-300"></div>
			<div className="skeleton h-4 w-1/2 bg-gray-300"></div>
		  </div>
		</div>
		<div className="flex gap-3 items-center justify-end">
		  <div className="flex flex-col gap-1 w-full">
			<div className="skeleton h-4 w-1/2 bg-gray-300 ml-auto"></div>
		  </div>
		  <div className="skeleton w-10 h-10 rounded-full shrink-0 bg-gray-300"></div>
		</div>
	  </div>
	);
  };
  
  export default MessageSkeleton;
  