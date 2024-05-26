  import { useForm } from "react-hook-form";
  import { z } from "zod";
  import { zodResolver } from "@hookform/resolvers/zod";
  import { useMutation } from "@tanstack/react-query";
  import axios from "axios";
  import { useNavigate } from "react-router-dom";

  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  const schema = z.object({
    name: z.string().min(1, "Name is required"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    company: z.string().optional(),
    gender: z.string().optional(),
  });

  const Register = () => {

      const navigate = useNavigate();
    const {
      register,
      handleSubmit,
      formState: { errors,isSubmitting },
    } = useForm({
      resolver: zodResolver(schema),
    });

    const mutation = useMutation((newUser) =>
      axios.post(`${API_BASE_URL}/register`, newUser)
    );

    const onSubmit = async (data) => {
      try {
        await mutation.mutateAsync(data);
        alert("User registered successfully");
        navigate('/login');
      } catch (error) {
        console.log("registration error:",error);
        alert(error.response?.data?.message || "Error registering user");
      }
    };

    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-purple-600 text-white">
        <div className="bg-white text-black p-8 rounded-lg shadow-lg w-full max-w-md">
          <h1 className="text-2xl font-bold mb-6">Register</h1>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-4">
              <label className="block mb-1 text-sm font-bold">Name</label>
              <input
                {...register("name")}
                className="w-full px-4 py-2 border border-gray-300 rounded-md"
              />
              {errors.name && (
                <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
              )}
            </div>
            <div className="mb-4">
              <label className="block mb-1 text-sm font-bold">Email</label>
              <input
                {...register("email")}
                className="w-full px-4 py-2 border border-gray-300 rounded-md"
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>
            <div className="mb-4">
              <label className="block mb-1 text-sm font-bold">Password</label>
              <input
                type="password"
                {...register("password")}
                className="w-full px-4 py-2 border border-gray-300 rounded-md"
              />
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>
            <div className="mb-4">
              <label className="block mb-1 text-sm font-bold">Company</label>
              <input
                {...register("company")}
                className="w-full px-4 py-2 border border-gray-300 rounded-md"
              />
            </div>
            <div className="mb-4">
              <label className="block mb-1 text-sm font-bold">Gender</label>
              <select
                {...register("gender")}
                className="w-full px-4 py-2 border border-gray-300 rounded-md"
              >
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </div>
            <button
            disabled={isSubmitting}
              type="submit"
              className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-300"
            >
              {isSubmitting?"Loading ...":"Sign Up"}
            </button>
          </form>
          {mutation.isError && (
            <p className="text-red-500 text-sm mt-4">
              {mutation.error.response?.data?.message || "Error registering user"}
            </p>
          )}
        </div>
      </div>
    );
  };

  export default Register;
