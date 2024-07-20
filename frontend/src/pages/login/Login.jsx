import { useState } from "react";
import { Link } from "react-router-dom";
import useLogin from "../../hooks/useLogin";

const Login = () => {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");

	const { loading, login } = useLogin();

	const handleSubmit = async (e) => {
		e.preventDefault();
		await login(username, password);
	};

	return (
		<div className="flex items-center justify-center min-h-screen">
			<div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md backdrop-filter backdrop-blur-md bg-opacity-60">
				<h1 className="text-3xl font-semibold text-center text-gray-800 mb-4">
					Login <span className="text-blue-500">NOVA</span>
				</h1>
				<form onSubmit={handleSubmit}>
					<div className="mb-4">
						<label className="block text-gray-700 mb-2">Username</label>
						<input
							type="text"
							placeholder="Nombre de usuario"
							className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
							value={username}
							onChange={(e) => setUsername(e.target.value)}
						/>
					</div>
					<div className="mb-4">
						<label className="block text-gray-700 mb-2">Contraseña</label>
						<input
							type="password"
							placeholder="Contraseña"
							className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
						/>
					</div>
					<Link to="/signup" className="text-blue-600 hover:underline block mb-4">
						 ¿No tienes cuenta?
					</Link>
					<button
						className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
						disabled={loading}
					>
						{loading ? <span className="loading loading-spinner"></span> : "Login"}
					</button>
				</form>
			</div>
		</div>
	);
};

export default Login;
