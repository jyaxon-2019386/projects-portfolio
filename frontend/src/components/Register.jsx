import { useState } from 'react';
import { BiUser, BiShow, BiHide, BiBuildingHouse } from 'react-icons/bi';
import { AiOutlineLock, AiOutlineMail, AiOutlinePhone } from 'react-icons/ai';
import { useRegister } from '../shared/hooks/useRegister.jsx';
import { TablaRegister } from './TableRegister.jsx';
import toast from 'react-hot-toast';
import { NavBar } from './SideBar/NavBar';
import { SideBar } from './SideBar/SideBar';
import { useGetUser } from '../shared/hooks/useGetUser';

export const Register = ({ setProfileImageUrl }) => {
  const { register, isLoading } = useRegister();
  const { users, isFetching, getUser } = useGetUser();
  const [formData, setFormData] = useState({
    name: '',
    username: '',
    dpi: '',
    address: '',
    phone: '',
    email: '',
    password: '',
    confirmPassword: '',
    jobname: '',
    income: '',
    role: 'USER',
    imageUser: null
  });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'imageUser') {
      setFormData((prevData) => ({
        ...prevData,
        imageUser: files[0]
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value
      }));
    }
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: ''
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validar que el ingreso mensual sea de al menos Q100
    if (formData.income < 100) {
      toast.error('Los ingresos mensuales deben ser al menos Q100.');
      return;
    }

    // Validar que las contraseñas coincidan
    if (formData.password !== formData.confirmPassword) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        confirmPassword: 'Las contraseñas no coinciden'
      }));
      return;
    }

    try {
      const formDataToSubmit = new FormData();
      Object.keys(formData).forEach((key) => {
        formDataToSubmit.append(key, formData[key]);
      });

      const response = await register(formDataToSubmit);
      if (response && response.imageUrl) {
        setProfileImageUrl(response.imageUrl);  // Set the image URL to the parent component state
      }
      toast.success('Registro exitoso');
    } catch (error) {
      toast.error('El registro falló. Por favor, inténtalo de nuevo.');
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  return (
    <>
      <NavBar />
      <div className="flex h-screen bg-white">
        <SideBar />
        <div className="flex flex-1 justify-start items-center pl-6">
          <div className="bg-white p-1 rounded-lg shadow-lg w-full max-w-md">
            <div className="p-8 bg-[#202B42] rounded-lg">
              <h1 className="text-3xl font-bold text-white text-center mb-6">Register</h1>
              <p className="text-center text-gray-100 mb-4">Registra al Cliente</p>
              <form onSubmit={handleSubmit} encType="multipart/form-data">
                <div className="relative mb-4">
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className={`w-full px-4 py-2 border ${errors.name ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-[#4E46DB]`}
                    placeholder="Name"
                    required
                  />
                  {errors.name && <span className="text-red-500 text-sm">{errors.name}</span>}
                </div>
                <div className="relative mb-4">
                  <input
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    className={`w-full px-4 py-2 border ${errors.username ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-[#4E46DB]`}
                    placeholder="Username"
                    required
                  />
                  <BiUser className="absolute top-3 right-3 text-gray-400" />
                  {errors.username && <span className="text-red-500 text-sm">{errors.username}</span>}
                </div>
                <div className="relative mb-4">
                  <input
                    type="text"
                    name="dpi"
                    value={formData.dpi}
                    onChange={handleChange}
                    className={`w-full px-4 py-2 border ${errors.dpi ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-[#4E46DB]`}
                    placeholder="DPI"
                    required
                  />
                  {errors.dpi && <span className="text-red-500 text-sm">{errors.dpi}</span>}
                </div>
                <div className="relative mb-4">
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    className={`w-full px-4 py-2 border ${errors.address ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-[#4E46DB]`}
                    placeholder="Address"
                    required
                  />
                  <BiBuildingHouse className="absolute top-3 right-3 text-gray-400" />
                  {errors.address && <span className="text-red-500 text-sm">{errors.address}</span>}
                </div>
                <div className="relative mb-4">
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className={`w-full px-4 py-2 border ${errors.phone ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-[#4E46DB]`}
                    placeholder="Phone"
                    required
                  />
                  <AiOutlinePhone className="absolute top-3 right-3 text-gray-400" />
                  {errors.phone && <span className="text-red-500 text-sm">{errors.phone}</span>}
                </div>
                <div className="relative mb-4">
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`w-full px-4 py-2 border ${errors.email ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-[#4E46DB]`}
                    placeholder="Email"
                  />
                  <AiOutlineMail className="absolute top-3 right-3 text-gray-400" />
                  {errors.email && <span className="text-red-500 text-sm">{errors.email}</span>}
                </div>
                <div className="relative mb-4">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className={`w-full px-4 py-2 border ${errors.password ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-[#4E46DB]`}
                    placeholder="Password"
                    required
                  />
                  <AiOutlineLock className="absolute top-3 right-3 text-gray-400" />
                  {errors.password && <span className="text-red-500 text-sm">{errors.password}</span>}
                  <button type="button" onClick={togglePasswordVisibility} className="absolute top-3 right-10 text-gray-400">
                    {showPassword ? <BiShow /> : <BiHide />}
                  </button>
                </div>
                <div className="relative mb-4">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className={`w-full px-4 py-2 border ${errors.confirmPassword ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-[#4E46DB]`}
                    placeholder="Confirm Password"
                    required
                  />
                  <AiOutlineLock className="absolute top-3 right-3 text-gray-400" />
                  {errors.confirmPassword && <span className="text-red-500 text-sm">{errors.confirmPassword}</span>}
                  <button type="button" onClick={toggleConfirmPasswordVisibility} className="absolute top-3 right-10 text-gray-400">
                    {showConfirmPassword ? <BiShow /> : <BiHide />}
                  </button>
                </div>
                <div className="relative mb-4">
                  <input
                    type="text"
                    name="jobname"
                    value={formData.jobname}
                    onChange={handleChange}
                    className={`w-full px-4 py-2 border ${errors.jobname ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-[#4E46DB]`}
                    placeholder="Job Name"
                    required
                  />
                  <BiBuildingHouse className="absolute top-3 right-3 text-gray-400" />
                  {errors.jobname && <span className="text-red-500 text-sm">{errors.jobname}</span>}
                </div>
                <div className="relative mb-4">
                  <input
                    type="number"
                    name="income"
                    value={formData.income}
                    onChange={handleChange}
                    className={`w-full px-4 py-2 border ${errors.income ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-[#4E46DB]`}
                    placeholder="Income"
                    required
                  />
                  {errors.income && <span className="text-red-500 text-sm">{errors.income}</span>}
                </div>
                <div className="relative mb-4">
                  <input
                    type="file"
                    name="profileImage"
                    accept="image/*"
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#4E46DB]"
                    required
                  />
                  {errors.imageUser && <span className="text-red-500 text-sm">{errors.imageUser}</span>}
                </div>
                <button
                  className="w-full py-2 mb-4 bg-[#4E46DB] text-white font-bold rounded-md hover:bg-[#3b39a3] transition duration-300"
                  type="submit"
                  disabled={isLoading}
                >
                  Register
                </button>
              </form>
            </div>
          </div>
          <TablaRegister users={users} />
        </div>
      </div>
    </>
  );
};

export default Register;