// app/(auth)/login.tsx
import { View, Text } from "react-native";
import { useTheme } from "../../theme";
import { LoginForm } from "../../forms";

const Login = () => {
	const { theme } = useTheme();

	return (
		<View
			className="flex-1 items-center justify-center p-4"
			style={{ backgroundColor: theme.palette.background.default }}
		>
			<Text className="font-primary text-h1 font-extrabold text-primary mb-6">
				Login
			</Text>
			<LoginForm />
		</View>
	);
}

export default Login;