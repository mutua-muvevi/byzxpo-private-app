// app/index.tsx
import { View, Text, TouchableOpacity } from "react-native";
import { useTheme } from "../../theme/provider";

export default function Home() {
	const { mode, setMode, preset, setPreset, theme } = useTheme();

	return (
		<View
			className="flex-1 items-center justify-center"
			style={{ backgroundColor: theme.palette.background.default }}
		>
			<Text className="font-primary text-h1 font-extrabold text-primary">
				Theme Test
			</Text>
			<Text className="font-secondary text-body1 text-secondary mt-4">
				Mode: {mode}
			</Text>
			<Text className="font-secondary text-body1 text-secondary mt-2">
				Preset: {preset}
			</Text>
			<TouchableOpacity
				className="mt-4 px-4 py-2 bg-primary rounded-lg shadow-2"
				onPress={() => setMode(mode === "light" ? "dark" : "light")}
			>
				<Text className="text-white text-button">Toggle Mode</Text>
			</TouchableOpacity>
			<TouchableOpacity
				className="mt-4 px-4 py-2 bg-secondary rounded-lg shadow-2"
				onPress={() =>
					setPreset(preset === "default" ? "cyan" : "default")
				}
			>
				<Text className="text-white text-button">Toggle Preset</Text>
			</TouchableOpacity>
		</View>
	);
}
