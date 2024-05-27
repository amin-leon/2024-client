import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { addDocument, deleteDocument } from '../../../redux/docs/docsSlice'; 
import { useParams } from 'react-router-dom';

function SharedDocs() {
  const documents = useSelector((state) => state.documents.documents);
  const dispatch = useDispatch();
  const [file, setFile] = useState(null);
  const { issueId } = useParams();

  useEffect(() => {
    // Function to fetch documents
    const fetchDocuments = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/docs/documents/${issueId}`);
        // Dispatch the action to update the documents in the Redux store
        dispatch({ type: 'documents/setDocuments', payload: response.data });
      } catch (error) {
        console.error('Error fetching documents:', error);
      }
    };

    // Set up an interval to fetch documents every second
    const interval = setInterval(fetchDocuments, 1000);

    // Clean up the interval on component unmount
    return () => clearInterval(interval);
  }, [dispatch]);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };


    // token
    const token = sessionStorage.getItem('authToken');

      if (!token) {
        console.error('No token found');
        return;
      }

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      if (!file) {
        console.error('No file selected.');
        return;
      }

      const formData = new FormData();
      formData.append('document', file);
      formData.append('issueId', issueId);
      formData.append('posterUser', issueId);

      const response = await axios.post('http://localhost:8080/docs/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${token}`
        }
      });

      dispatch(addDocument(response.data.newDoc));
      console.log('File uploaded:', response.data.newDoc);
      setFile(null);
    } catch (error) {
      console.log('Error uploading file:', error);
    }
  };

  const handleDelete = async (documentId) => {
    try {
      await axios.delete(`http://localhost:8080/docs/documents/delete/${documentId}`,{
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      dispatch(deleteDocument(documentId));
      alert('Document deleted');
    } catch (error) {
      console.log('Error deleting document:', error);
    }
  };

  return (
    <div className="container mx-auto mt-8 px-4">
      <h1 className="text-2xl font-bold mb-4">Documents Shared</h1>

      <form onSubmit={handleSubmit} className="mb-4">
        <label className="block mb-2">
          Upload Attachment:
        </label>
        <input type="file" onChange={handleFileChange} className="mt-1" /><br></br>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
          Upload
        </button>
      </form> 

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {documents.map((document) => (
          <div key={document._id} className="bg-white rounded shadow-md p-4">
            <div className="w-full h-auto mb-2" />
            {document.document}
            <a href={`http://localhost:8080/${document.document}`} target="_blank" rel="noopener noreferrer" className="block text-blue-500">Read document</a> 
            
            <button onClick={() => handleDelete(document._id)} className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded">
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SharedDocs;
