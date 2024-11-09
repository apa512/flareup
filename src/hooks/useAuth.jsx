import { useState, useEffect, createContext, useContext } from "react";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
	const [user, setUser] = useState(null);
	const [loading, setLoading] = useState(true);

	async function signOut() {
		const token = localStorage.getItem("token");
		if (token) {
			try {
				await fetch("/api/sessions", {
					method: "DELETE",
					headers: {
						Authorization: `Bearer ${token}`,
					},
				});
			} catch (error) {
				console.error("Error signing out:", error);
			}
		}
		localStorage.removeItem("token");
		setUser(null);
	}

	useEffect(() => {
		async function loadUser() {
			const token = localStorage.getItem("token");
			if (token) {
				try {
					const response = await fetch("/api/me", {
						headers: {
							Authorization: `Bearer ${token}`,
						},
					});
					if (response.ok) {
						const userData = await response.json();
						setUser(userData);
					} else {
						localStorage.removeItem("token");
					}
				} catch (error) {
					console.error("Error loading user:", error);
					localStorage.removeItem("token");
				}
			}
			setLoading(false);
		}

		loadUser();
	}, []);

	const value = {
		user,
		loading,
		signOut,
	};

	return (
		<AuthContext.Provider value={value}>
			{!loading && children}
		</AuthContext.Provider>
	);
}

export function useAuth() {
	return useContext(AuthContext);
}

