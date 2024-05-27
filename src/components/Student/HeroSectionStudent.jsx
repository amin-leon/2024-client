import { Link } from "react-router-dom";

const HeroSectionStudent = () => {
    return (
      <div className="flex-grow p-32 flex flex-col items-center justify-center">
        <h1 className="text-4xl font-bold mb-6 text-center text-gray-800">
          Hi Leon, Welcome to Your Dashboard
        </h1>
        <p className="text-lg mb-12 text-center text-gray-600">
          Get insights, manage your tasks, and stay organized.
        </p>
        <Link to="/Home/issue-page">
        <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-6 rounded-md">
          Get Started
        </button>
        </Link>
      </div>
    );
  };
  
  export default HeroSectionStudent;