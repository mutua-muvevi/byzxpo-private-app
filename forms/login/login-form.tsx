// forms/login/login-form.tsx
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { View, TouchableOpacity, Text } from "react-native";
import Toast from "react-native-toast-message";
import { useAuthContext } from "../../contexts";
import { FormProvider, RHFTextField } from "../../components/hook-form";
import { useTheme } from "../../theme";

interface LoginFormValues {
	email: string;
	password: string;
}

const loginSchema = yup.object().shape({
	email: yup.string().email("Invalid email").required("Email is required"),
	password: yup.string().required("Password is required"),
});

export default function LoginForm() {
	const { login } = useAuthContext();
	const { theme } = useTheme();

	const methods = useForm<LoginFormValues>({
		resolver: yupResolver(loginSchema),
		defaultValues: { email: "", password: "" },
	});

	const {
		handleSubmit,
		formState: { isSubmitting },
	} = methods;

	const onSubmit = async (data: LoginFormValues) => {
		try {
			await login(data);
			Toast.show({
				type: "success",
				text1: "Login Successful",
			});
		} catch (error: any) {
			Toast.show({
				type: "error",
				text1: "Login Failed",
				text2: error.message,
			});
		}
	};

	return (
		<FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
			<View className="w-full">
				<RHFTextField name="email" placeholder="Email" type="text" />
				<RHFTextField
					name="password"
					placeholder="Password"
					type="password"
				/>
				<TouchableOpacity
					className="bg-primary rounded-lg py-3 mt-4"
					onPress={handleSubmit(onSubmit)}
					disabled={isSubmitting}
				>
					<Text
						className="text-button text-center"
						style={{ color: theme.palette.grey[0] }}
					>
						{isSubmitting ? "Logging in..." : "Login"}
					</Text>
				</TouchableOpacity>
			</View>
		</FormProvider>
	);
}
