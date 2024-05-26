
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const fetchUserProfile = async () => {
    const API_BASE_URL=import.meta.env.VITE_API_BASE_URL;
  const response = await axios.get(`${API_BASE_URL}/profile`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  });
  return response.data;
};

const UserDetails = () => {
  const { data, error, isLoading } = useQuery('userProfile', fetchUserProfile);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="max-w-sm mx-auto bg-white shadow-md rounded-lg overflow-hidden">
      <div className="px-6 py-4">
        <h1 className="text-xl font-bold mb-2">{data.name}</h1>
        <p className="text-gray-700">Email: {data.email}</p>
        <p className="text-gray-700">Company: {data.company}</p>
        <p className="text-gray-700">Gender: {data.gender}</p>
      </div>
    </div>
  );
};

export default UserDetails;

