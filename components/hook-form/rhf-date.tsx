// components/hook-form/rhf-date.tsx
import { Controller, useFormContext } from "react-hook-form";
import { Text, TouchableOpacity, View } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useState } from "react";
import { useTheme } from "../../theme";

interface RHFDatePickerProps {
	name: string;
	helperText?: string;
	[key: string]: any;
}

export function RHFDatePicker({
	name,
	helperText,
	...other
}: RHFDatePickerProps) {
	const { control } = useFormContext();
	const { theme } = useTheme();
	const [show, setShow] = useState(false);

	return (
		<Controller
			name={name}
			control={control}
			render={({ field, fieldState: { error } }) => (
				<View className="w-full mb-4">
					<TouchableOpacity
						className="border border-grey-300 rounded-lg px-4 py-3"
						onPress={() => setShow(true)}
						style={{
							backgroundColor: theme.palette.grey[0],
							borderColor: error
								? theme.palette.error.main
								: theme.palette.grey[300],
						}}
					>
						<Text
							className="text-body1 font-primary"
							style={{
								color: field.value
									? theme.palette.grey[900]
									: theme.palette.grey[500],
							}}
						>
							{field.value
								? new Date(field.value).toLocaleDateString()
								: "Select date"}
						</Text>
					</TouchableOpacity>
					{show && (
						<DateTimePicker
							value={
								field.value ? new Date(field.value) : new Date()
							}
							mode="date"
							display="default"
							onChange={(event, date) => {
								setShow(false);
								if (date) field.onChange(date.toISOString());
							}}
							{...other}
						/>
					)}
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
