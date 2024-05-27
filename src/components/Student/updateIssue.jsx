import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { object, string } from "yup";
import axios from 'axios';
import Modal from './pop_up/Model';
import { useSelector } from 'react-redux';

const validationSchema = object().shape({
  title: string()
    .max(30, 'Issue title must be at most 30 characters')
    .required('Title is required'),
  description: string()
    .max(200, 'Description must be at most 200 characters')
    .required('Description is required'),
  category: string().required('Select your category'),
});

function UpdateIssue() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { id } = useParams();

  const openModal = () => {
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };
  
  const userInfo = useSelector((state)=> state.auth.user);
  const reporter = userInfo._id;

  const { register, handleSubmit, formState: { errors }, reset, setValue } = useForm({
    resolver: yupResolver(validationSchema),
  });

  useEffect(() => {
    const fetchIssue = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/issue/view/${id}`);
        const issueData = response.data; 
        setValue('description', issueData?.issue.description);
        setValue('category', issueData?.issue.category);
        setValue('title', issueData?.issue.title);

      } catch (error) {
        console.error('Error fetching issue:', error);
      }
    };

    fetchIssue()
  }, [id, setValue]);

  const onSubmitHandler = async (data, e) => {
    e.preventDefault();

    try {
      const updatedIssueData = {
        title: data.title,
        description: data.description,
        category: data.category,
      };
  
      await axios.put(`http://localhost:8080/issue/edit/${id}`, updatedIssueData);
  
      openModal();
    } catch (error) {
      console.error('Error updating issue:', error);
    }
    reset();
  };
  


  return (
    <div>
      <div className="bg-no-repeat bg-cover bg-center relative pt-10">
        <div className="flex z-10 px-2">
          <div className="p-2 mx-auto rounded-2xl w-[90%] border">
           <p className='pb-8 text-2xl font-bold'>Update Issue </p>
            <form  onSubmit={handleSubmit(onSubmitHandler)}>
              <div className="grid grid-cols-2 gap-4">
                <div>
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
                      <option value="Personal">Personal</option>
                    </select>
                  </div>
                  {/* Remove file input for attachment */}
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
                <div>
                  <div>
                    <textarea {...register("description")} rows={10}
                      className="w-full text-base p-3 border-none bg-gray-100 rounded-lg focus:outline-none focus:border-blue-400"
                      placeholder="Enter issue description"
                      name="description"
                    ></textarea>
                    <p className="text-sm font-medium text-red-500">{errors.description?.message}</p>
                  </div>
                  <button
                  type="submit"
                  className="bg-blue-500 hover:bg-black text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
                >
                  Update
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

export default UpdateIssue;
