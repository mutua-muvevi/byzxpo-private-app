// app/(auth)/login.tsx
import { View, Text, TouchableOpacity } from "react-native";
import { useTheme } from "../../theme/provider";
import { useAuthContext } from "../../contexts";

export default function Login() {
	const { theme } = useTheme();
	const { login, register } = useAuthContext();

	return (
		<View
			className="flex-1 items-center justify-center p-4"
			style={{ backgroundColor: theme.palette.background.default }}
		>
			<Text className="font-primary text-h1 font-extrabold text-primary">
				Login
			</Text>
			<TouchableOpacity
				className="mt-4 px-4 py-2 bg-primary rounded-lg shadow-2"
				onPress={() =>
					login({ email: "test@example.com", password: "password" })
				}
			>
				<Text className="text-white text-button">Login</Text>
			</TouchableOpacity>
			<TouchableOpacity
				className="mt-4 px-4 py-2 bg-success rounded-lg shadow-2"
				onPress={() =>
					register({
						name: "Test User",
						email: "test@example.com",
						password: "password",
						country: "US",
						role: "individual",
					})
				}
			>
				<Text className="text-white text-button">Register</Text>
			</TouchableOpacity>
		</View>
	);
}
