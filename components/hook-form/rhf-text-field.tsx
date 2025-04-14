// components/hook-form/rhf-text-field.tsx
import { Controller, useFormContext } from "react-hook-form";
import { TextInput, Text, View } from "react-native";
import { useTheme } from "../../theme";

interface RHFTextFieldProps {
	name: string;
	placeholder?: string;
	type?: "text" | "number" | "password";
	helperText?: string;
	[key: string]: any;
}

export default function RHFTextField({
	name,
	placeholder,
	type = "text",
	helperText,
	...other
}: RHFTextFieldProps) {
	const { control } = useFormContext();
	const { theme } = useTheme();

	return (
		<Controller
			name={name}
			control={control}
			render={({ field, fieldState: { error } }) => (
				<View className="w-full mb-4">
					<TextInput
						{...field}
						className="border border-grey-300 rounded-lg px-4 py-3 text-body1 font-primary text-grey-900"
						placeholder={placeholder}
						secureTextEntry={type === "password"}
						keyboardType={type === "number" ? "numeric" : "default"}
						value={
							type === "number" && field.value === 0
								? ""
								: String(field.value)
						}
						onChangeText={(value) =>
							field.onChange(
								type === "number" ? Number(value) || 0 : value,
							)
						}
						placeholderTextColor={theme.palette.grey[500]}
						style={{
							backgroundColor: theme.palette.grey[0],
							borderColor: error
								? theme.palette.error.main
								: theme.palette.grey[300],
						}}
						{...other}
					/>
					{(error || helperText) && (
						<Text
							className="text-caption mt-1"
							style={{
								color: error
									? theme.palette.error.main
									: theme.palette.grey[600],
							}}
						>
							{error?.message || helperText}
						</Text>
					)}
				</View>
			)}
		/>
	);
}
