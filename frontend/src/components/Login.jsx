import { useState } from 'react';
import { BiUser, BiShow, BiHide } from 'react-icons/bi';
import { AiOutlineLock } from 'react-icons/ai';
import { useLogin } from "../shared/hooks/useLogin";
import { useResetPassword } from '../shared/hooks/useResetPassword.jsx';
import loginImage from '../assets/2.png';

export const Login = () => {
  const { isLoading: isLoginLoading, login } = useLogin();
  const { isLoading: isResetLoading, resetPassword } = useResetPassword();

  const [formData, setFormData] = useState({
    identifier: '',
    password: ''
  });
  const [errors, setErrors] = useState({
    identifier: '',
    password: '',
    invalidCredentials: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [resetPasswordData, setResetPasswordData] = useState({
    identifier: '',
    newPassword: ''
  });
  const [resetPasswordErrors, setResetPasswordErrors] = useState({
    identifier: '',
    newPassword: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: ''
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!formData.identifier) {
      newErrors.identifier = 'El nombre de usuario es obligatorio';
    }

    if (!formData.password) {
      newErrors.password = 'Se requiere contraseña';
    }

    if (Object.keys(newErrors).length === 0) {
      try {
        await login(formData);
      } catch (error) {
        console.error('Error:', error);
        setErrors({ invalidCredentials: 'Invalid username/email or password.' });
      }
    } else {
      setErrors(newErrors);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleResetPasswordChange = (e) => {
    const { name, value } = e.target;
    setResetPasswordData((prevData) => ({
      ...prevData,
      [name]: value
    }));
    setResetPasswordErrors((prevErrors) => ({
      ...prevErrors,
      [name]: ''
    }));
  };

  const handleResetPasswordSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!resetPasswordData.identifier) {
      newErrors.identifier = 'El nombre de usuario es obligatorio';
    }

    if (!resetPasswordData.newPassword) {
      newErrors.newPassword = 'Se requiere una nueva contraseña';
    }

    if (Object.keys(newErrors).length === 0) {
      try {
        await resetPassword(resetPasswordData.identifier, resetPasswordData.newPassword);
        setShowForgotPassword(false);
      } catch (error) {
        console.error('Error:', error);
        setResetPasswordErrors({ invalidCredentials: 'Error al restablecer la contraseña.' });
      }
    } else {
      setResetPasswordErrors(newErrors);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-[#202B42]">
      <div className="bg-white p-0 rounded-lg shadow-lg flex w-3/4 max-w-4xl">
        <div className="w-2/4 bg-[#202B42] p-8 flex flex-col justify-center items-center">
          <img src={loginImage} alt="Login Illustration" className="max-w-full h-auto mb-4" />
        </div>
        <div className="w-1/2 p-8 bg-gray-100">
          {showForgotPassword ? (
            <>
              <h1 className="text-2xl font-bold text-[#202B42] text-center mb-5">Recuperar Contraseña</h1>
              <p className="text-center text-gray-600 mb-9">Introduce tu nombre de usuario y una nueva contraseña.</p>
              <form onSubmit={handleResetPasswordSubmit}>
                <div className="relative mb-4">
                  <input
                    type="text"
                    name="identifier"
                    value={resetPasswordData.identifier}
                    onChange={handleResetPasswordChange}
                    className={`w-full px-4 py-2 border ${resetPasswordErrors.identifier ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-[#4E46DB]`}
                    placeholder="Nombre de usuario"
                  />
                  <BiUser className="absolute top-3 right-3 text-gray-400" />
                  {resetPasswordErrors.identifier && <span className="text-red-500 text-sm">{resetPasswordErrors.identifier}</span>}
                </div>
                <div className="relative mb-4">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="newPassword"
                    value={resetPasswordData.newPassword}
                    onChange={handleResetPasswordChange}
                    className={`w-full px-4 py-2 border ${resetPasswordErrors.newPassword ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-[#4E46DB]`}
                    placeholder="Nueva contraseña"
                  />
                  <AiOutlineLock className="absolute top-3 right-3 text-gray-400" />
                  {resetPasswordErrors.newPassword && <span className="text-red-500 text-sm">{resetPasswordErrors.newPassword}</span>}
                  <button type="button" onClick={togglePasswordVisibility} className="absolute top-3 right-10 text-gray-400">
                    {showPassword ? <BiShow /> : <BiHide />}
                  </button>
                </div>
                <button
                  className="w-full py-2 mb-4 bg-[#4E46DB] text-white font-bold rounded-md hover:bg-[#3b39a3] transition duration-300"
                  type="submit"
                  disabled={isResetLoading}
                >
                  Actualizar Contraseña
                </button>
                <button
                  type="button"
                  className="text-[#4E46DB] text-center w-full"
                  onClick={() => setShowForgotPassword(false)}
                >
                  Volver al inicio de sesión
                </button>
              </form>
            </>
          ) : (
            <>
              <h1 className="text-2xl font-bold text-[#202B42] text-center mb-5">Hello! Welcome back.</h1>
              <p className="text-center text-gray-600 mb-9">Log in with your data that you entered during your registration.</p>
              <form onSubmit={handleSubmit}>
                <div className="relative mb-4">
                  <input
                    type="text"
                    name="identifier"
                    value={formData.identifier}
                    onChange={handleChange}
                    className={`w-full px-4 py-2 border ${errors.identifier ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-[#4E46DB]`}
                    placeholder="Username"
                  />
                  <BiUser className="absolute top-3 right-3 text-gray-400" />
                  {errors.identifier && <span className="text-red-500 text-sm">{errors.identifier}</span>}
                </div>

                <div className="relative mb-4">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className={`w-full px-4 py-2 border ${errors.password ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-[#4E46DB]`}
                    placeholder="Password"
                  />
                  <AiOutlineLock className="absolute top-3 right-3 text-gray-400" />
                  {errors.password && <span className="text-red-500 text-sm">{errors.password}</span>}
                  <button type="button" onClick={togglePasswordVisibility} className="absolute top-3 right-10 text-gray-400">
                    {showPassword ? <BiShow /> : <BiHide />}
                  </button>
                </div>
                <button
                  className="w-full py-2 mb-4 bg-[#4E46DB] text-white font-bold rounded-md hover:bg-[#3b39a3] transition duration-300"
                  type="submit"
                  disabled={isLoginLoading}
                >
                  Login
                </button>
                {errors.invalidCredentials && <span className="text-red-500 text-sm block mt-4 text-center">{errors.invalidCredentials}</span>}
                <button
                  type="button"
                  className="text-[#4E46DB] text-center w-full"
                  onClick={() => setShowForgotPassword(true)}
                >
                  Forgot Password?
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;
