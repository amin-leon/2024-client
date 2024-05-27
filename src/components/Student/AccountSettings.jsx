import axios from 'axios';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { authActions } from '../../redux/auth/authSlice';
import { Link } from 'react-router-dom';

  
function AccountSettings() {
    const dispatch = useDispatch()
    const userInfo = useSelector((state) => state.auth.user);
    const userId = userInfo._id;
    const [formData, setFormData] = useState({
      fullName: '',
      email: '',
      username: '',
      telephone: '',
      role: '',
      position: '',
      level: ''
    });

    useEffect(() => {
        const fetchUserData = async () => {
          try {
            const response = await axios.get(`http://localhost:8080/auth/${userId}`);
            setFormData({
              fullName: response.data.fullName || '',
              email: response.data.email || '',
              username: response.data.username || '',
              role: response.data.role || '',
              telephone: response.data.telephone || '',
              position: response.data.position || ''
            });

          } catch (error) {
            console.error('Error fetching user data:', error);
          }
        };
        fetchUserData();
      }, [userId]); 

      const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
          ...formData,
          [name]: value,
        });
      };
  
      const handleUpdate = async (e) => {
        e.preventDefault()

        try {
            await axios.put(`http://localhost:8080/auth/users/${userId}`, formData)
            dispatch(authActions.updateAdditionalUserInfo(formData))
          } catch (error) {
            console.error('Error updating user:', error);
          }
      };

  return (
    <div className='md:flex md:gap-3 md:ml-10 md:mr-10 md:mt-10 border md:px-32'>
         <div className="md:max-w-[300px] md:bg-white rounded-lg md:p-12 md:flex md:flex-col border-r-2">
                <div className="mb-8">
                    <img className="object-center object-cover rounded-md h-48 w-48 md:h-36 md:w-36" src={`http://localhost:8080/${userInfo?.profile}`} alt="profile" />
                </div>
                <div className="text-center">
                    <p className="text-xl text-gray-700 font-bold mb-2">{userInfo?.fullName + ""}</p>
                    <p className="text-base text-gray-400 font-normal">{userInfo?.role}</p>
                    <div className='add'>
                      <Link to='/Home/admin/setting'>
                        <button type="file" className="bg-blue-500 hover:bg-blue-700 text-white py-1 px-3 mt-3 rounded-sm w-full" >Go to settings
                        </button>
                      </Link>
                    </div>
                </div>
            </div>
            <div className="bg-no-repeat bg-cover bg-center relative">
                <div className="flex z-10">
                <div className="pt-8 md:pb-12 md:pl-12 pb-r bg-white md:mx-auto rounded-2xl w-full md:w-100">
                    <div>
                    <p className='text-2xl pt-5 pb-10 font-bold'>{userInfo?.position}  info details </p>
                    </div>
                    <form className="grid grid-cols-1 gap-4" onSubmit={handleUpdate}>
                    <div className="md:grid md:grid-cols-2 md:gap-4">
                        <div>
                        <label className="text-sm font-medium text-gray-700">Full names</label>
                        <input
                            type="text"
                            className="w-full text-base p-3 border-none bg-gray-100 border-gray-300 rounded-lg focus:outline-none focus:border-blue-400"
                            placeholder="Muneza Ben"
                            name="fullName"
                            value={formData.fullName}
                            onChange={handleChange}
                        />
                        </div>
                        {userInfo.role ==='Student' && (
                        <div>
                        <label className="text-sm font-medium text-gray-700">Telephone</label>
                        <input 
                            type="text"
                            className="w-full text-base p-3 border-none bg-gray-100 rounded-lg focus:outline-none focus:border-blue-400"
                            placeholder="0780944444"
                            name="telephone"
                            value={formData.telephone}
                            onChange={handleChange}
                        />
                        </div>
                        )}
                        <div>
                        <label className="text-sm font-medium text-gray-700">Username</label>
                        <input 
                            type="text"
                            className="w-full text-base p-3 border-none bg-gray-100 rounded-lg focus:outline-none focus:border-blue-400"
                            placeholder="@lamar250"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                        />
                        </div>
                        <div>
                        <label className="text-sm font-medium text-gray-700">Email adress</label>
                        <input                    
                            type="email"
                            className="w-full text-base p-3 border-none bg-gray-100 rounded-lg focus:outline-none focus:border-blue-400"
                            placeholder="lamar250@yahoo.com"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                        />
                        </div>
                        {userInfo.role ==='Student' && (
                        <div>
                        <label className="text-sm font-medium text-gray-700">Position</label>
                        <select
                            className="w-full text-base p-3 border-none bg-gray-100 rounded-lg focus:outline-none focus:border-blue-400"
                            name="position"
                            onChange={handleChange}
                            readonly
                        >
                            <option value={formData.position}>{formData.position}</option>
                        </select>
                        </div>
                        )}
                        <div>
                          <label className="text-sm font-medium text-gray-700">  Role</label>
                          <input
                              type="text"
                              className="w-full text-basep-3 border-none bg-gray-100 rounded-lg focus:outline-none focus:border-blue-400"
                              placeholder="Comfirm  password @123"
                              name="reserved"
                              value={formData.role}
                              onChange={handleChange}
                              readonly
                          />
                        </div>
                        <div>
                          <label className="text-sm font-medium text-gray-700">  Position</label>
                          <input
                              type="text"
                              className="w-full text-basep-3 border-none bg-gray-100 rounded-lg focus:outline-none focus:border-blue-400"
                              name="reserved"
                              value={formData.position}
                              onChange={handleChange}
                              readonly
                          />
                        </div>
                    </div>
                    <div className='flex gap-3'>
                        <button
                            type="submit"
                            className="bg-blue-400 w-16 hover:bg-blue-500 text-white font-bold  focus:outline-none focus:shadow-outline "
                        >
                            Edit
                        </button>
                    </div>
                    </form>
                </div>
            </div>
      </div>
    </div>
  )
}

export default AccountSettings