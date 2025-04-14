// forms/register/register-form.tsx
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { View, TouchableOpacity, Text } from "react-native";
import Toast from "react-native-toast-message";
import { useAuthContext } from "../../contexts";
import {
	FormProvider,
	RHFTextField,
	RHFAutocomplete,
	RHFSelect,
} from "../../components/hook-form";
import { useTheme } from "../../theme";
import { countries } from "@/constants/countries";

interface RegisterFormValues {
	name: string;
	email: string;
	password: string;
	country: string;
	role: string;
}

const registerSchema = yup.object().shape({
	name: yup.string().required("Name is required"),
	email: yup.string().email("Invalid email").required("Email is required"),
	password: yup.string().required("Password is required"),
	country: yup.string().required("Country is required"),
	role: yup.string().required("Role is required"),
});

const roleOptions = [
	{ value: "admin", label: "Admin" },
	{ value: "business", label: "Business" },
	{ value: "individual", label: "Individual" },
];

export default function RegisterForm() {
	const { register } = useAuthContext();
	const { theme } = useTheme();

	const methods = useForm<RegisterFormValues>({
		resolver: yupResolver(registerSchema),
		defaultValues: {
			name: "",
			email: "",
			password: "",
			country: "",
			role: "",
		},
	});

	const {
		handleSubmit,
		formState: { isSubmitting },
	} = methods;

	const onSubmit = async (data: RegisterFormValues) => {
		try {
			await register(data);
			Toast.show({
				type: "success",
				text1: "Registration Successful",
			});
		} catch (error : any) {
			Toast.show({
				type: "error",
				text1: "Registration Failed",
				text2: error.message,
			});
		}
	};

	return (
		<FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
			<View className="w-full">
				<RHFTextField name="name" placeholder="Full Name" type="text" />
				<RHFTextField name="email" placeholder="Email" type="text" />
				<RHFTextField
					name="password"
					placeholder="Password"
					type="password"
				/>
				<RHFAutocomplete
					name="country"
					placeholder="Select Country"
					type="country"
					options={countries}
				/>
				<RHFSelect
					name="role"
					options={roleOptions}
					placeholder="Select Role"
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
						{isSubmitting ? "Registering..." : "Register"}
					</Text>
				</TouchableOpacity>
			</View>
		</FormProvider>
	);
}
