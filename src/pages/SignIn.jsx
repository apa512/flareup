import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import Logo from "../components/Logo";
function SignIn() {
	const navigate = useNavigate();
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");

	async function handleSubmit(e) {
		e.preventDefault();
		setError("");

		try {
			const response = await fetch("/api/sessions", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					email_address: email,
					password
				})
			});

			if (!response.ok) {
				const data = await response.json();
				throw new Error(data.error || "Failed to sign in");
			}

			const { token } = await response.json();
			localStorage.setItem('token', token);
			navigate("/");
		} catch (err) {
			setError(err.message);
		}
	}

	return (
		<div className="min-h-screen bg-gradient-to-br from-orange-50 to-white">
			<nav className="flex justify-between items-center px-8 py-6 bg-white shadow-sm">
				<Link to="/" >
					<Logo />
				</Link>
			</nav>

			<main className="flex justify-center items-center px-8 py-16">
				<div className="bg-white p-8 rounded-2xl shadow-lg max-w-md w-full">
					<h2 className="text-3xl font-bold text-gray-800 mb-6">
						Welcome back
					</h2>
					{error && <p className="text-red-500 mb-4">{error}</p>}
					<form onSubmit={handleSubmit} className="space-y-4">
						<div>
							<input
								type="email"
								placeholder="Email"
								value={email}
								onChange={(e) => setEmail(e.target.value)}
								className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-rose-500"
							/>
						</div>
						<div>
							<input
								type="password"
								placeholder="Password"
								value={password}
								onChange={(e) => setPassword(e.target.value)}
								className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-rose-500"
							/>
						</div>
						<button
							type="submit"
							className="w-full bg-gradient-to-r from-rose-500 to-pink-500 text-white py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity"
						>
							Sign in
						</button>
						<p className="text-center text-gray-600 mt-2">
							Don't have an account?{" "}
							<Link to="/sign-up" className="text-rose-500 hover:text-rose-600">
								Sign up
							</Link>
						</p>
					</form>
				</div>
			</main>
		</div>
	);
}

export default SignIn;

