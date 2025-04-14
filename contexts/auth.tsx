// contexts/auth-context.tsx
import React, { createContext, useContext, useEffect, useReducer } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface User {
	id: string;
	name?: string;
	email: string;
	country?: string;
	role: "admin" | "business" | "individual";
}

interface LoginProps {
	email: string;
	password: string;
}

interface RegisterProps {
	name: string;
	email: string;
	password: string;
	country: string;
	role: "admin" | "business" | "individual";
}

interface AuthState {
	user: User | null;
	token: string | null;
	loading: boolean;
}

interface AuthContextValue {
	user: User | null;
	loading: boolean;
	authenticated: boolean;
	unauthenticated: boolean;
	login: (data: LoginProps) => Promise<void>;
	register: (data: RegisterProps) => Promise<void>;
	logout: () => void;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

const initialState: AuthState = {
	user: null,
	token: null,
	loading: true,
};

type Action =
	| { type: "INITIAL"; payload: { user: User | null; token: string | null } }
	| { type: "LOGIN"; payload: { user: User; token: string } }
	| { type: "REGISTER"; payload: { user: User; token: string } }
	| { type: "LOGOUT" };

const reducer = (state: AuthState, action: Action): AuthState => {
	switch (action.type) {
		case "INITIAL":
			return {
				...state,
				user: action.payload.user,
				token: action.payload.token,
				loading: false,
			};
		case "LOGIN":
			return {
				...state,
				user: action.payload.user,
				token: action.payload.token,
				loading: false,
			};
		case "REGISTER":
			return {
				...state,
				user: action.payload.user,
				token: action.payload.token,
				loading: false,
			};
		case "LOGOUT":
			return {
				...state,
				user: null,
				token: null,
				loading: false,
			};
		default:
			return state;
	}
};

const TOKEN_KEY = "token";

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
	children,
}) => {
	const [state, dispatch] = useReducer(reducer, initialState);

	// Initialize auth state
	useEffect(() => {
		const initialize = async () => {
			try {
				const token = await AsyncStorage.getItem(TOKEN_KEY);
				if (token) {
					// Mock user data; replace with API later
					const mockUser: User = {
						id: "mock-id",
						email: "mock@example.com",
						role: "individual",
					};
					dispatch({
						type: "INITIAL",
						payload: { user: mockUser, token },
					});
				} else {
					dispatch({
						type: "INITIAL",
						payload: { user: null, token: null },
					});
				}
			} catch (error) {
				console.error("Auth init failed:", error);
				dispatch({
					type: "INITIAL",
					payload: { user: null, token: null },
				});
			}
		};
		initialize();
	}, []);

	// Login
	const login = async ({ email, password }: LoginProps) => {
		try {
			// Mock login; replace with API later
			const mockUser: User = {
				id: `mock-id-${Date.now()}`,
				email,
				role: "individual",
			};
			const mockToken = `mock-token-${Date.now()}`;
			await AsyncStorage.setItem(TOKEN_KEY, mockToken);
			dispatch({
				type: "LOGIN",
				payload: { user: mockUser, token: mockToken },
			});
		} catch (error) {
			console.error("Login failed:", error);
			throw new Error("Login failed");
		}
	};

	// Register
	const register = async ({ name, email, country, role }: RegisterProps) => {
		try {
			// Mock register; replace with API later
			const mockUser: User = {
				id: `mock-id-${Date.now()}`,
				name,
				email,
				country,
				role,
			};
			const mockToken = `mock-token-${Date.now()}`;
			await AsyncStorage.setItem(TOKEN_KEY, mockToken);
			dispatch({
				type: "REGISTER",
				payload: { user: mockUser, token: mockToken },
			});
		} catch (error) {
			console.error("Register failed:", error);
			throw new Error("Register failed");
		}
	};

	// Logout
	const logout = async () => {
		try {
			await AsyncStorage.removeItem(TOKEN_KEY);
			dispatch({ type: "LOGOUT" });
		} catch (error) {
			console.error("Logout failed:", error);
		}
	};

	const value: AuthContextValue = {
		user: state.user,
		loading: state.loading,
		authenticated: !!state.user && !!state.token,
		unauthenticated: !state.user || !state.token,
		login,
		register,
		logout,
	};

	return (
		<AuthContext.Provider value={value}>{children}</AuthContext.Provider>
	);
};

export const useAuthContext = () => {
	const context = useContext(AuthContext);
	if (!context) {
		throw new Error("useAuthContext must be used within an AuthProvider");
	}
	return context;
};
