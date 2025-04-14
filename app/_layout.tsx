import { Stack } from "expo-router";
import ThemeProvider from "../theme/provider";
import { useCustomFonts } from "../hooks/use-fonts";
import { View, ActivityIndicator } from "react-native";
import "../global.css";

const RootLayout = () => {
	const fontsLoaded = useCustomFonts();

	if (!fontsLoaded) {
		return (
			<View className="flex-1 items-center justify-center">
				<ActivityIndicator size="large" color="#027cf5" />
			</View>
		);
	}

	return (
		<ThemeProvider>
			<Stack>
				<Stack.Screen
					name="(root)/index"
					options={{ headerShown: false }}
				/>
				<Stack.Screen
					name="(auth)/login"
					options={{ headerShown: false }}
				/>
			</Stack>
		</ThemeProvider>
	);
};

export default RootLayout;
