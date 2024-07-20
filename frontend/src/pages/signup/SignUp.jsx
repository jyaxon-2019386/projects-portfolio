import { Link } from "react-router-dom";
import GenderCheckbox from "./GenderCheckbox";
import { useState } from "react";
import useSignup from "../../hooks/useSignup";

const SignUp = () => {
	const [inputs, setInputs] = useState({
		fullName: "",
		username: "",
		password: "",
		confirmPassword: "",
		gender: "",
	});

	const { loading, signup } = useSignup();

	const handleCheckboxChange = (gender) => {
		setInputs({ ...inputs, gender });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		await signup(inputs);
	};

	return (
		<div className="flex items-center justify-center min-h-screen">
			<div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md backdrop-filter backdrop-blur-md bg-opacity-60">
				<h1 className="text-3xl font-semibold text-center text-gray-800 mb-4">
					Sign Up <span className="text-blue-500">NOVA</span>
				</h1>
				<form onSubmit={handleSubmit}>
					<div className="mb-4">
						<label className="block text-gray-700 mb-2">Nombres y apellidos</label>
						<input
							type="text"
							placeholder="Nombre"
							className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
							value={inputs.fullName}
							onChange={(e) => setInputs({ ...inputs, fullName: e.target.value })}
						/>
					</div>
					<div className="mb-4">
						<label className="block text-gray-700 mb-2">Username</label>
						<input
							type="text"
							placeholder="username"
							className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
							value={inputs.username}
							onChange={(e) => setInputs({ ...inputs, username: e.target.value })}
						/>
					</div>
					<div className="mb-4">
						<label className="block text-gray-700 mb-2">Contraseña</label>
						<input
							type="password"
							placeholder="Contraseña"
							className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
							value={inputs.password}
							onChange={(e) => setInputs({ ...inputs, password: e.target.value })}
						/>
					</div>
					<div className="mb-4">
						<label className="block text-gray-700 mb-2">Confirma Contraseña</label>
						<input
							type="password"
							placeholder="Contraseña"
							className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
							value={inputs.confirmPassword}
							onChange={(e) => setInputs({ ...inputs, confirmPassword: e.target.value })}
						/>
					</div>
					<GenderCheckbox onCheckboxChange={handleCheckboxChange} selectedGender={inputs.gender} />
					<Link to="/login" className="text-blue-600 hover:underline block mb-4">
						¿Ya tienes una cuenta?
					</Link>
					<button
						className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
						disabled={loading}
					>
						{loading ? <span className="loading loading-spinner"></span> : "Sign Up"}
					</button>
				</form>
			</div>
		</div>
	);
};

export default SignUp;
