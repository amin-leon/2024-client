import React from 'react';

function FormatDate({ createOn, status }) {
  let statusColor = 'black';

  switch (status) {
    case 'closed':
      statusColor = 'gray';
      break;
    case 'new':
      statusColor = 'red';
      break;
    case 'assigned':
      statusColor = 'green';
      break;
    default:
      break;
  }

  return (
    <div className='flex flex-row gap-3 pb-1 items-center'>
      {status &&  <div className={`bg-blue-50 px-5 py-1 rounded-md`}>{status && <span style={{ color: statusColor }}>{status}</span>}</div>
}
      <span>{new Date(createOn).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      })}</span>
    </div>
  );
}

export default FormatDate;
