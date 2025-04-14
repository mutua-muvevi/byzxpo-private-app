// components/auth-guard.tsx
import { useRouter } from "expo-router";
import { useAuthContext } from "../contexts";
import { useEffect, useState } from "react";
import { LoadingScreen } from "./loading-screen";

interface AuthGuardProps {
	children: React.ReactNode;
}

const Container = ({ children }: AuthGuardProps) => {
	const { authenticated } = useAuthContext();
	const router = useRouter();
	const [checked, setChecked] = useState(false);

	useEffect(() => {
		if (!authenticated) {
			router.replace("/(auth)/login");
		} else {
			setChecked(true);
		}
	}, [authenticated, router]);

	if (!checked) {
		return null;
	}

	return <>{children}</>;
};

export const AuthGuard = ({ children }: AuthGuardProps) => {
	const { loading } = useAuthContext();

	return loading ? <LoadingScreen /> : <Container>{children}</Container>;
};
