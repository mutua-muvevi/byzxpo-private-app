// app/(root)/multi-map.tsx
import { View, Text } from "react-native";
import { Map } from "../../components";
import { useTheme } from "../../theme";

const businesses = [
	{
		id: "1",
		name: "Coffee Shop",
		coordinates: { latitude: 37.78825, longitude: -122.4324 },
	},
	{
		id: "2",
		name: "Bookstore",
		coordinates: { latitude: 37.79, longitude: -122.43 },
	},
];

export default function MultiMap() {
	const { theme } = useTheme();

	return (
		<View
			className="flex-1 items-center justify-center p-4"
			style={{ backgroundColor: theme.palette.background.default }}
		>
			<Text className="font-primary text-h1 font-extrabold text-primary mb-6">
				Multiple Businesses Map
			</Text>
			<Map
				mode="multiple"
				businesses={businesses}
				height={400}
				markerColor={theme.palette.primary.DEFAULT}
			/>
		</View>
	);
}
