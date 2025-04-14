// components/hook-form/rhf-code.tsx
import { Controller, useFormContext } from "react-hook-form";
import { TextInput, Text, View } from "react-native";
import { useTheme } from "../../theme";
import { useState } from "react";

interface RHFCodeProps {
	name: string;
	length?: number;
	helperText?: string;
	[key: string]: any;
}

export default function RHFCode({
	name,
	length = 6,
	helperText,
	...other
}: RHFCodeProps) {
	const { control } = useFormContext();
	const { theme } = useTheme();
	const [values, setValues] = useState<string[]>(Array(length).fill(""));

	return (
		<Controller
			name={name}
			control={control}
			render={({ field, fieldState: { error } }) => (
				<View className="w-full mb-4">
					<View className="flex-row justify-between">
						{Array.from({ length }).map((_, index) => (
							<TextInput
								key={index}
								className="border border-grey-300 rounded-lg w-12 h-12 text-center text-body1 font-primary"
								maxLength={1}
								keyboardType="numeric"
								value={values[index]}
								onChangeText={(text) => {
									const newValues = [...values];
									newValues[index] = text;
									setValues(newValues);
									field.onChange(newValues.join(""));
									if (text && index < length - 1) {
										// Auto-focus next input (handled via ref in real app)
									}
								}}
								style={{
									backgroundColor: theme.palette.grey[0],
									borderColor: error
										? theme.palette.error.main
										: theme.palette.grey[300],
								}}
								{...other}
							/>
						))}
					</View>
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
