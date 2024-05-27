const CodeCard = ({ codes }) => {
  return (
    <div>
      {codes.length > 0 ? (
        <div className="bg-white border rounded-lg overflow-hidden shadow-lg w-64 p-4 mb-3">
          <h1 className="text-xl font-bold mb-2">Channels codes</h1>
          <div className="bg-gray-100 p-4 rounded-md mb-2">
            <span className="text-md font-semibold text-red-500">{codes[0]._id}</span> --
            <span className="text-md font-semibold text-red-500">{codes[0]?.staffInfo.position}</span>
          </div>
          <p className="text-gray-600 text-sm">This code can be used to send your issue directly to staff.</p>
        </div>
      ) : (
        <div className="bg-white border rounded-lg overflow-hidden shadow-lg w-64 p-4 mb-3">
          <h1 className="text-xl font-bold mb-2">Channels codes</h1>
          <p className="text-gray-600 text-sm">No ongoing code.</p>
        </div>
      )}
    </div>
  );
};

export default CodeCard;
