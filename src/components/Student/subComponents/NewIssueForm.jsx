import React, { useState, useEffect } from 'react';
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { object, string } from "yup";
import axios from 'axios';
import Modal from '../pop_up/Model';
import { useSelector } from 'react-redux';


// private_channel_code

const validationSchema = object().shape({
  title: string()
    .max(60, 'Issue title must be at most 60 characters')
    .required('Title is required'),
    reporter: string()
    .required('Your id is missing please'),
    private_channel_code: string()
    .max(30, 'Private channel code must be at most 30 characters'),
  description: string()
    .max(1200, 'Description must be at most 1200 characters')
    .required('Description is required'),
  category: string().required('Select your category'),
});

function NewIssueForm() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPrivate, setIsPrivate] = useState(false);
  const [assignStaff, setAssignStaff] = useState()

  const openModal = () => {
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };
  
  const userInfo = useSelector((state)=> state.auth.user);
  const reporter = userInfo._id;


  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    resolver: yupResolver(validationSchema),
  });


  // get staff id to assigned issue to him directly
    useEffect(() => {
      const fetchCodeRequests = async () => {
        try {
          const response = await axios.get(`http://localhost:8080/api/code/single-code-request/${reporter}`); // Update the URL as needed
  
          setAssignStaff(response?.data?.staff);
        } catch (error) {
          console.error('Error fetching staff code:', error);
        }
      };
  
      fetchCodeRequests();
    }, []);

  
  // token
  const token = sessionStorage.getItem('authToken');

  if (!token) {
    console.error('No token found');
    return;
  }


  const onSubmitHandler = async (data) => {
    try {
      const formData = new FormData();
      formData.append('title', data.title);
      formData.append('reporter', data.reporter);
      formData.append('description', data.description);
      formData.append('category', data.category);
      formData.append('attachment', data.attachment[0]);

      if (data.private_channel_code) { 
        formData.append('private_channel_code', data.private_channel_code);
      }
    
  
      await axios.post('http://localhost:8080/issue/new-issue', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${token}`
        },
      });
      openModal();
    } catch (error) {
      console.error('Error creating issue:', error);
    }
    reset();
  };

  

  return (
    <div>
      <div className="bg-no-repeat bg-cover bg-center relative">
        <div className="flex z-10 px-2">
          <div className="md:p-4 rounded-2xl w-full">
           <p className='pb-8 text-2xl font-bold'>Rise Issue Here </p>
           <form onSubmit={handleSubmit(onSubmitHandler)}>
            {/* md:grid md:grid-cols-2 gap-4*/}
            <div className="md:grid gap-4">
              {/* fields */}
              <div>
                <p>Is this issue private?</p>
                <div className='mt-1 flex gap-2 items-center'>
                  <input type="radio" name='issue' onChange={() => setIsPrivate(true)}/>Yes
                  <input type="radio" checked name='issue' onChange={() => setIsPrivate(false)}/>No
                </div>
                {isPrivate && (
                  <div className='mb-2'>
                    <input
                      {...register('private_channel_code')}
                      type="text"
                      className="w-full text-base p-3 border-none bg-gray-100 rounded-lg focus:outline-none focus:border-blue-400"
                      placeholder="Type your private_channel_code here ..."
                      name="private_channel_code"
                    />
                    <label className="text-sm font-medium text-red-500">{errors.private_channel_code?.message}</label>
                  </div>
                )}
                <div className=''>
                  <input
                    {...register("title")}
                    type="text"
                    className="w-full  text-base p-3 border-none bg-gray-100 rounded-lg focus:outline-none focus:border-blue-400"
                    placeholder="Type a Title"
                    name="title"
                  />
                  <label className="text-sm font-medium text-red-500">{errors.title?.message}</label>
                </div>
                <div className='mt-2'>
                  <select
                    {...register("category")}
                    className="w-full text-base p-3 border-none bg-gray-100  rounded-lg focus:outline-none focus:border-blue-400"
                    name="category"
                  >
                    <option value="">Select category</option>
                    <option value="Welfare">Welfare</option>
                    <option value="Academic">Academic</option>
                    <option value="Rogistics">Rogistics</option>
                    <option value="Health">Health</option>
                    <option value="Personal">Personal</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div className='mt-2'>
                  <input
                    type="file"
                    // required
                    {...register("attachment")}
                    className="w-full text-base p-3 border-none bg-gray-100 rounded-lg focus:outline-none focus:border-blue-400"
                  />
                </div>
                <div className='mt-2'>
                  <input
                    {...register('reporter')}
                    type="hidden"
                    className="w-full text-base p-3 border-none bg-gray-100 rounded-lg focus:outline-none focus:border-blue-400"
                    placeholder="We want to see you"
                    name="reporter"
                    value={reporter}
                  />
                  <label className="text-sm font-medium text-red-500">{errors.reporter?.message}</label>
                </div>
              </div>
              {/* text area and button */}
              <div>
                <div>
                  <textarea {...register("description")} rows={6}
                    className="w-full text-base p-3 border-none bg-gray-100 rounded-lg focus:outline-none focus:border-blue-400"
                    placeholder="Enter issue description"
                    name="description"
                  ></textarea>
                  <p className="text-sm font-medium text-red-500">{errors.description?.message}</p>
                </div>
                <button
                  type="submit"
                  className="bg-[#1F3365] hover:bg-black text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
                >
                  Rise
                </button>
              </div>
            </div>
          </form>

          </div>
        </div>
      </div>
      <Modal isOpen={isModalOpen} onClose={closeModal} />
    </div>
  );
}

export default NewIssueForm;
