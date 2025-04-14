// components/hook-form/rhf-checkbox.tsx
import { Controller, useFormContext } from "react-hook-form";
import { Text, TouchableOpacity, View } from "react-native";
import { useTheme } from "../../theme";

interface RHFCheckboxProps {
	name: string;
	label: string;
	helperText?: string;
	[key: string]: any;
}

export function RHFCheckbox({
	name,
	label,
	helperText,
	...other
}: RHFCheckboxProps) {
	const { control } = useFormContext();
	const { theme } = useTheme();

	return (
		<Controller
			name={name}
			control={control}
			render={({ field, fieldState: { error } }) => (
				<View className="w-full mb-4">
					<TouchableOpacity
						className="flex-row items-center"
						onPress={() => field.onChange(!field.value)}
					>
						<Text
							className="text-body2 mr-2"
							style={{ color: theme.palette.grey[900] }}
						>
							{field.value ? "☑" : "⬜"}
						</Text>
						<Text
							className="text-body2"
							style={{ color: theme.palette.grey[900] }}
						>
							{label}
						</Text>
					</TouchableOpacity>
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

interface RHFMultiCheckboxProps {
	name: string;
	label?: string;
	options: { value: string; label: string }[];
	row?: boolean;
	helperText?: string;
	[key: string]: any;
}

export function RHFMultiCheckbox({
	name,
	label,
	options,
	row,
	helperText,
	...other
}: RHFMultiCheckboxProps) {
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
								onPress={() => {
									const newValue = field.value?.includes(
										option.value,
									)
										? field.value.filter(
												(v: string) =>
													v !== option.value,
										  )
										: [
												...(field.value || []),
												option.value,
										  ];
									field.onChange(newValue);
								}}
							>
								<Text
									className="text-body2 mr-2"
									style={{ color: theme.palette.grey[900] }}
								>
									{field.value?.includes(option.value)
										? "☑"
										: "⬜"}
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
