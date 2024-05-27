import React,{ useState} from 'react';
import { Link } from 'react-router-dom';
import SocialIcons from '../components/social-media-icons/SocialIcons';
import { useDispatch, useSelector} from 'react-redux';
import { authActions } from '../redux/auth/authSlice';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import { setToken } from '../authService';
const backgroundImageUrl = 'https://www.npc.ac.rw/fileadmin/user_upload/1H9A5050.jpg';

const containerStyle = {
  backgroundImage: `url(${backgroundImageUrl})`,
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'center',
  backgroundSize: 'cover',
  position: 'relative',
};


const LoginForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.auth.loading);  // Use isLoading from Redux store
  const [error, setError] = useState(null)
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      // Dispatch the loginUserStart action to set loading state
      dispatch(authActions.loginUserStart());

      // Make an API call to fetch user information based on the login credentials
     const res=  await axios.post('http://localhost:8080/auth/login', formData);
      const userDataResponse = await axios.get(`http://localhost:8080/auth/login/${formData.email}`);
      const userData = userDataResponse.data;
      setToken(res.data.token)

      // Assuming response.data contains user data including the role
      if (userData.role === 'Student') {
        dispatch(authActions.loginUserSuccess(userData));
        navigate('/Home/issue-page');
      } else if (userData.role === 'Staff') {
        dispatch(authActions.loginUserSuccess(userData));
        navigate('/Home/staff-home');
      } else if (userData.role === 'Admin') {
        dispatch(authActions.loginUserSuccess(userData));
        navigate('/Home/manage');
      } else {
        // Handle other roles or cases if needed
      }
    } catch (error) {
      if (error.response.data.error === 'Your account is not active.') {
        setError('Your account is not active.');
      } else if (error.response.data.error === 'User not exist.') {
        setError('User account not exist.');
      } else if (error.response.data.error === 'Invalid credentials.') {
        setError('Invalid credentials.');
      }

      // Dispatch the loginUserFailure action with the error message
      dispatch(authActions.loginUserFailure(error.message));
    }
  };
  

  return (
<form onSubmit={handleLogin}>
<div className="bg-no-repeat bg-cover bg-center relative " style={containerStyle}>
    <div className="absolute bg-gradient-to-b from-[#1F3365] to-black opacity-80 inset-0 z-0"></div>
  <div className="min-h-screen sm:flex sm:flex-row mx-0 justify-center">
      <div className="flex-col flex  self-center p-10 sm:max-w-5xl xl:max-w-2xl  z-10">
        <div className="self-start hidden lg:flex flex-col  text-white">
          <img src="" className="mb-3" alt=''/>
          <h1 className="mb-8 font-bold text-3xl text-center">NATIONAL POLICE COLLEGE </h1>
          <p className="pr-3 text-sm text-center">NPC is an established institution of Police high training for Rwanda National Police mandated 
          to build the capacity of Police officers and other law enforcers</p>
            <p className='mt-5 text-center'>Join npc on #social medias:</p>
            
            <SocialIcons />

        </div>
      </div>
      <div className="flex justify-center self-center  z-10">
        <div className="p-12 bg-white mx-auto rounded-2xl w-100">
            <div className="mb-4">
              <h3 className="font-semibold text-2xl text-gray-800">Sign In </h3>
              <p className="text-gray-500">Please sign in to your account.</p>
            </div>
            <div className="space-y-5">
                        <div className="space-y-2">
                              <label htmlFor='sd' className="text-sm font-medium text-gray-700 tracking-wide" h>Email</label>
              <input className=" w-full text-base px-4 py-2 border  border-gray-300 rounded-lg focus:outline-none focus:border-blue-400"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        type="email"
                        placeholder="mail@gmail.com" />
              </div>
              <div className="space-y-2">
              <label  htmlFor='' className="mb-5 text-sm font-medium text-gray-700 tracking-wide">
                Password
              </label>
              <input className="w-full content-center text-base px-4 py-2 border  border-gray-300 rounded-lg focus:outline-none focus:border-blue-400" 
              type="password" 
              placeholder="Enter your password"
              name="password"
              value={formData.password}
              onChange={handleChange}
               />
            </div>
              <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input id="remember_me" name="remember_me" type="checkbox" className="h-4 w-4 bg-[#1F3365] focus:ring-blue-400 border-gray-300 rounded" />
                <label  htmlFor="remember_me" className="ml-2 block text-sm text-gray-800">
                  Remember me
                </label>
              </div>
              <div className="text-sm">
                <div className="text-gray-400 hover:text-[#1F3365]">
                  Forgot your password?
                </div>
              </div>
            </div>
            <div>
              <button onClick={handleLogin} type="submit" className="w-full flex justify-center bg-[#1F3365]  hover:bg-black text-gray-100 p-3  rounded-md tracking-wide font-semibold  shadow-lg cursor-pointer transition ease-in duration-500">
                {loading ? 'Logging in...' : 'Login'}

              </button>
            </div>
            <p>Don't Have account? <Link to='/register' className='text-[#1F3365]'>Sign Up</Link></p>
            </div>
            {error && <div style={{ color: 'red' }}>{ error }</div>}
            <div className='flex items-center justify-center'>
              <SocialIcons />
            </div>
        </div>
      </div>
  </div>
</div>
   </form>
  );
};

export default LoginForm;
