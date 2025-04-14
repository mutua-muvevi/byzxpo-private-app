// components/loading-screen.tsx
import { View, ActivityIndicator } from "react-native";

export const LoadingScreen = () => {
	return (
		<View className="flex-1 items-center justify-center bg-grey-100">
			<ActivityIndicator size="large" color="#027cf5" />
		</View>
	);
};
