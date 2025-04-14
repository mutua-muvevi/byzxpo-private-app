// app/(auth)/register.tsx
import { View, Text } from "react-native";
import { useTheme } from "../../theme";
import { RegisterForm } from "../../forms";

const Register = () => {
	const { theme } = useTheme();

	return (
		<View
			className="flex-1 items-center justify-center p-4"
			style={{ backgroundColor: theme.palette.background.default }}
		>
			<Text className="font-primary text-h1 font-extrabold text-primary mb-6">
				Register
			</Text>
			<RegisterForm />
		</View>
	);
};

export default Register;
