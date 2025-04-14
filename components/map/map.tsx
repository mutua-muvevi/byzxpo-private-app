// components/map/map.tsx
import { useEffect, useState, useRef } from "react";
import { View, Text, ActivityIndicator } from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE, Region } from "react-native-maps";
import * as Location from "expo-location";
import Toast from "react-native-toast-message";
import { useTheme } from "../../theme";

interface Business {
	id: string;
	name: string;
	coordinates: {
		latitude: number;
		longitude: number;
	};
}

interface MapProps {
	mode?: "single" | "multiple" | "dynamic";
	businesses?: Business[];
	initialRegion?: Region;
	onRegionChange?: (region: Region) => void;
	height?: number | string;
	width?: number | string;
	markerColor?: string;
}

export default function Map({
	mode = "multiple",
	businesses = [],
	initialRegion,
	onRegionChange,
	height = "100%",
	width = "100%",
	markerColor = "#FF5630",
}: MapProps) {
	const { theme } = useTheme();
	const mapRef = useRef<MapView>(null);
	const [location, setLocation] = useState<Location.LocationObject | null>(
		null,
	);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		(async () => {
			try {
				const { status } =
					await Location.requestForegroundPermissionsAsync();
				if (status !== "granted") {
					setError("Location permission denied");
					setLoading(false);
					Toast.show({
						type: "error",
						text1: "Permission Denied",
						text2: "Please allow location access to view the map.",
					});
					return;
				}

				const loc = await Location.getCurrentPositionAsync({
					accuracy: Location.Accuracy.High,
				});
				setLocation(loc);
				if (!initialRegion && mapRef.current) {
					mapRef.current.animateToRegion({
						latitude: loc.coords.latitude,
						longitude: loc.coords.longitude,
						latitudeDelta: 0.05,
						longitudeDelta: 0.05,
					});
				}
			} catch (err) {
				setError("Failed to fetch location");
				Toast.show({
					type: "error",
					text1: "Location Error",
					text2: "Unable to retrieve your location.",
				});
			} finally {
				setLoading(false);
			}
		})();
	}, []);

	const handleRegionChange = (region: Region) => {
		if (mode === "dynamic" && onRegionChange) {
			onRegionChange(region);
		}
	};

	if (loading) {
		return (
			<View
				className="flex-1 items-center justify-center bg-grey-100"
				style={{ height, width }}
			>
				<ActivityIndicator
					size="large"
					color={theme.palette.primary.DEFAULT}
				/>
			</View>
		);
	}

	if (error) {
		return (
			<View
				className="flex-1 items-center justify-center p-4 bg-grey-100"
				style={{ height, width }}
			>
				<Text
					className="font-secondary text-body1 text-error text-center"
					style={{ color: theme.palette.error.DEFAULT }}
				>
					{error}
				</Text>
			</View>
		);
	}

	const region = initialRegion || {
		latitude: location?.coords.latitude || 37.78825,
		longitude: location?.coords.longitude || -122.4324,
		latitudeDelta: 0.05,
		longitudeDelta: 0.05,
	};

	return (
		<View className="relative" style={{ height, width }}>
			<MapView
				ref={mapRef}
				provider={PROVIDER_GOOGLE}
				className="absolute top-0 left-0 right-0 bottom-0"
				initialRegion={region}
				region={mode !== "dynamic" ? region : undefined}
				onRegionChangeComplete={handleRegionChange}
				showsUserLocation={true}
				showsMyLocationButton={true}
				scrollEnabled={true}
				zoomEnabled={true}
				pitchEnabled={true}
				rotateEnabled={true}
			>
				{mode === "single" && businesses.length > 0 && (
					<Marker
						coordinate={businesses[0].coordinates}
						title={businesses[0].name}
						pinColor={markerColor}
					/>
				)}
				{mode !== "single" &&
					businesses.map((business) => (
						<Marker
							key={business.id}
							coordinate={business.coordinates}
							title={business.name}
							pinColor={markerColor}
						/>
					))}
			</MapView>
		</View>
	);
}
