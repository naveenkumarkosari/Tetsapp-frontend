
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  const goToRegister = () => {
    navigate('/register');
  };

  const goToLogin = () => {
    navigate('/login');
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-purple-600 text-white">
      <div className="text-center px-6 md:px-12 lg:px-24">  
        <h1 className="text-5xl font-extrabold mb-4 drop-shadow-lg">
          Welcome to Our Test-App
        </h1>
        <p className="text-lg md:text-xl mb-8">
          Experience the best service with our app. Sign up now to get started or log in if you already have an account.
        </p>
        <div className="flex flex-col md:flex-row justify-center items-center space-y-4 md:space-y-0 md:space-x-6">
          <button 
            className="w-40 md:w-48 bg-white text-blue-500 font-semibold px-6 py-3 rounded-lg "
            onClick={goToRegister}
          >
            Sign Up
          </button>
          <button 
            className="w-40 md:w-48 bg-white text-purple-500 font-semibold px-6 py-3 rounded-lg "
            onClick={goToLogin}
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
