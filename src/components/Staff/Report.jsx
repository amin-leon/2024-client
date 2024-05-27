import { BsDot } from 'react-icons/bs';
import { useSelector } from 'react-redux';


function Report() {
  const closedIssues = useSelector((state) => state.issue.closedIssues);

  return (
    <div>
      {closedIssues.length === 0 ? (
        <p>No  statistical Chart</p>
      ) : (
        closedIssues.map((issue) => (
          <div className='max-h-60 overflow-y-auto' key={issue._id}>
            <div className='flex flex-row justify-between mb-1 border-b border-b-1'>
                <div className='flex gap-1'>
                  <div className='text-blue-500 text-4xl'>
                    <BsDot />
                  </div>
                  <div className='flex flex-row justify-between'>
                    <p className='pb-2'>{issue.description}</p>
                    <p>2 days ago</p>
                  </div>
                </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default Report;
