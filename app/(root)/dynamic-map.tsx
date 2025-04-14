// components/map/map.tsx
import { useEffect, useState, useRef } from "react";
import {
	View,
	Text,
	ActivityIndicator,
	Platform,
	Dimensions,
} from "react-native";
import MapView, { Marker, Region } from "react-native-maps";
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
	const [debugInfo, setDebugInfo] = useState<string>("Initializing map...");

	useEffect(() => {
		(async () => {
			try {
				console.log("Map: Checking location services...");
				setDebugInfo("Checking location services...");

				// Check location services
				const isLocationEnabled =
					await Location.hasServicesEnabledAsync();
				console.log(
					"Map: Location services enabled:",
					isLocationEnabled,
				);
				if (!isLocationEnabled) {
					setError("Location services are disabled");
					setDebugInfo("Location services disabled");
					Toast.show({
						type: "error",
						text1: "Location Disabled",
						text2: "Please enable location services to view the map.",
					});
					setLoading(false);
					return;
				}

				// Request permissions
				console.log("Map: Requesting permissions...");
				setDebugInfo("Requesting permissions...");
				const { status } =
					await Location.requestForegroundPermissionsAsync();
				console.log("Map: Permission status:", status);
				if (status !== "granted") {
					setError("Location permission denied");
					setDebugInfo("Location permission denied");
					Toast.show({
						type: "error",
						text1: "Permission Denied",
						text2: "Please allow location access to view the map.",
					});
					setLoading(false);
					return;
				}

				// Fetch location
				console.log("Map: Fetching location...");
				setDebugInfo("Fetching location...");
				const loc = await Location.getCurrentPositionAsync({
					accuracy: Location.Accuracy.High,
				});
				console.log("Map: Location fetched:", loc.coords);
				setLocation(loc);
				setDebugInfo(
					`Location: ${loc.coords.latitude}, ${loc.coords.longitude}`,
				);

				// Center map
				if (!initialRegion && mapRef.current) {
					console.log("Map: Centering map on location...");
					setDebugInfo("Centering map...");
					mapRef.current.animateToRegion({
						latitude: loc.coords.latitude,
						longitude: loc.coords.longitude,
						latitudeDelta: 0.05,
						longitudeDelta: 0.05,
					});
				}
			} catch (err) {
				console.error("Map: Error:", err);
				setError("Failed to initialize map");
				setDebugInfo(`Error: ${err.message}`);
				Toast.show({
					type: "error",
					text1: "Map Error",
					text2: "Unable to load the map. Please try again.",
				});
			} finally {
				console.log("Map: Loading complete");
				setLoading(false);
			}
		})();
	}, [initialRegion]);

	const handleRegionChange = (region: Region) => {
		console.log("Map: Region changed:", region);
		setDebugInfo(`Region: ${region.latitude}, ${region.longitude}`);
		if (mode === "dynamic" && onRegionChange) {
			try {
				onRegionChange(region);
			} catch (err) {
				console.warn("Map: Region change handler error:", err);
			}
		}
	};

	if (loading) {
		return (
			<View
				className="flex-1 items-center justify-center bg-grey-100"
				style={{ height, width, backgroundColor: "#F0F0F0" }}
			>
				<ActivityIndicator
					size="large"
					color={theme.palette.primary.DEFAULT}
				/>
				<Text
					className="font-secondary text-body2 text-grey-600 mt-2"
					style={{ color: theme.palette.grey[600] }}
				>
					Loading map...
				</Text>
				<Text
					className="font-secondary text-body3 text-grey-600 mt-2"
					style={{ color: theme.palette.grey[600] }}
				>
					{debugInfo}
				</Text>
			</View>
		);
	}

	if (error) {
		return (
			<View
				className="flex-1 items-center justify-center p-4 bg-grey-100"
				style={{ height, width, backgroundColor: "#F0F0F0" }}
			>
				<Text
					className="font-secondary text-body1 text-error text-center"
					style={{ color: theme.palette.error.DEFAULT }}
				>
					{error}
				</Text>
				<Text
					className="font-secondary text-body2 text-grey-600 mt-2 text-center"
					style={{ color: theme.palette.grey[600] }}
				>
					Please check your settings and try again.
				</Text>
				<Text
					className="font-secondary text-body3 text-grey-600 mt-2"
					style={{ color: theme.palette.grey[600] }}
				>
					Debug: {debugInfo}
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

	console.log("Map: Rendering MapView with region:", region);

	return (
		<View
			className="relative"
			style={{
				height,
				width,
				backgroundColor: "#FFFFFF",
				borderWidth: 1,
				borderColor: "#000000",
			}}
		>
			<MapView
				ref={mapRef}
				style={{ flex: 1 }}
				initialRegion={region}
				region={mode !== "dynamic" ? region : undefined}
				onRegionChangeComplete={handleRegionChange}
				showsUserLocation={true}
				showsMyLocationButton={true}
				scrollEnabled={true}
				zoomEnabled={true}
				pitchEnabled={true}
				rotateEnabled={true}
				provider={Platform.OS === "android" ? "google" : undefined}
				onMapReady={() => {
					console.log("Map: MapView is ready");
					setDebugInfo("Map loaded");
				}}
				onError={(err) => {
					console.error("Map: MapView error:", err);
					setDebugInfo(`MapView error: ${err.message}`);
				}}
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
			<Text
				className="font-secondary text-body3 text-grey-600 absolute bottom-2 left-2"
				style={{ color: theme.palette.grey[600] }}
			>
				{debugInfo}
			</Text>
		</View>
	);
}
