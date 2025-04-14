// components/hook-form/rhf-radio-group.tsx
import { Controller, useFormContext } from "react-hook-form";
import { Text, TouchableOpacity, View } from "react-native";
import { useTheme } from "../../theme";

interface RHFRadioGroupProps {
	name: string;
	label?: string;
	options: { value: string; label: string }[];
	row?: boolean;
	helperText?: string;
	[key: string]: any;
}

export default function RHFRadioGroup({
	name,
	label,
	options,
	row,
	helperText,
	...other
}: RHFRadioGroupProps) {
	const { control } = useFormContext();
	const { theme } = useTheme();

	return (
		<Controller
			name={name}
			control={control}
			render={({ field, fieldState: { error } }) => (
				<View className="w-full mb-4">
					{label && (
						<Text
							className="text-body2 mb-2"
							style={{ color: theme.palette.grey[900] }}
						>
							{label}
						</Text>
					)}
					<View className={row ? "flex-row flex-wrap" : "flex-col"}>
						{options.map((option) => (
							<TouchableOpacity
								key={option.value}
								className={`flex-row items-center ${
									row ? "mr-4 mb-2" : "mb-2"
								}`}
								onPress={() => field.onChange(option.value)}
							>
								<Text
									className="text-body2 mr-2"
									style={{ color: theme.palette.grey[900] }}
								>
									{field.value === option.value ? "◉" : "○"}
								</Text>
								<Text
									className="text-body2"
									style={{ color: theme.palette.grey[900] }}
								>
									{option.label}
								</Text>
							</TouchableOpacity>
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
