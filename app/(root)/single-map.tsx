// app/(root)/single-map.tsx
import { View, Text } from "react-native";
import { Map } from "../../components";
import { useTheme } from "../../theme";

const business = {
	id: "1",
	name: "Coffee Shop",
	coordinates: { latitude: 37.78825, longitude: -122.4324 },
};

export default function SingleMap() {
	const { theme } = useTheme();

	return (
		<View
			className="flex-1 items-center justify-center p-4"
			style={{ backgroundColor: theme.palette.background.default }}
		>
			<Text className="font-primary text-h1 font-extrabold text-primary mb-6">
				Single Business Map
			</Text>
			<Map
				mode="single"
				businesses={[business]}
				initialRegion={{
					latitude: business.coordinates.latitude,
					longitude: business.coordinates.longitude,
					latitudeDelta: 0.01,
					longitudeDelta: 0.01,
				}}
				height={400}
				markerColor={theme.palette.primary.DEFAULT}
			/>
		</View>
	);
}
