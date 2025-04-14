import { Stack } from "expo-router";
import ThemeProvider from "../theme/provider";
import { useCustomFonts } from "../hooks/use-fonts";
import { View, ActivityIndicator } from "react-native";
import "../global.css";
import { AuthProvider } from "@/contexts";

const RootLayout = () => {
	const fontsLoaded = useCustomFonts();

	if (!fontsLoaded) {
		return (
			<View className="flex-1 items-center justify-center bg-primary">
				<ActivityIndicator size="large" color="#027cf5" />
			</View>
		);
	}

	return (
		<ThemeProvider>
			<AuthProvider>
				<Stack>
					<Stack.Screen
						name="(root)/index"
						options={{ headerShown: true }}
					/>
					<Stack.Screen
						name="(auth)/login"
						options={{ headerShown: true }}
					/>
					<Stack.Screen
						name="(auth)/register"
						options={{ headerShown: false }}
					/>
					<Stack.Screen
						name="(root)/single-map"
						options={{ headerShown: false }}
					/>
					<Stack.Screen
						name="(root)/multi-map"
						options={{ headerShown: false }}
					/>
					<Stack.Screen
						name="(root)/dynamic-map"
						options={{ headerShown: false }}
					/>
				</Stack>
			</AuthProvider>
		</ThemeProvider>
	);
};

export default RootLayout;
