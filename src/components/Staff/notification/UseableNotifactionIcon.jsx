import React from 'react';

const NotificationBadge = ({ count }) => {
  return (
    <div className="bg-red-500 text-white rounded-full w-6 h-6 text-center text-sm absolute top-0 right-0 -mt-1 -mr-1">
      {count}
    </div>
  );
};

export default NotificationBadge;
