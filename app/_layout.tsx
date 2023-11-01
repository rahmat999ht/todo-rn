import FontAwesome from "@expo/vector-icons/FontAwesome";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { SplashScreen, Stack, router, usePathname } from "expo-router";
import { useEffect } from "react";
import { useColorScheme, StyleSheet } from "react-native";
import { FAB, PaperProvider, Text, Button } from "react-native-paper";
import React from "react";
import {
  AuthenticatedUserProvider,
  useAuthContext,
} from "../components/AuthProvider";
import auth from "@react-native-firebase/auth";
import { View } from "../components/Themed";

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from "expo-router";

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: "(tabs)",
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
    ...FontAwesome.font,
  });
  const colorScheme = useColorScheme();
  const colors = colorScheme === "dark" ? DarkTheme : DefaultTheme;

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <AuthenticatedUserProvider>
      <PaperProvider
        theme={{
          isV3: true,
          version: 3,
          dark: colorScheme === "dark",
        }}
      >
        <ThemeProvider value={colors}>
          <RootLayoutNav />
        </ThemeProvider>
      </PaperProvider>
    </AuthenticatedUserProvider>
  );
}
// import auth from '@react-native-firebase/auth';
import { GoogleSignin } from "@react-native-google-signin/google-signin";
GoogleSignin.configure({
  webClientId:
    "1032606244343-a7o5f0o3o2gig0nv7ovfrftb96mruhci.apps.googleusercontent.com",
});

function RootLayoutNav() {
  const pathName = usePathname();
  const { user, login } = useAuthContext();

  if (!user) {
    return (
      <View style={styles.loginView}>
        <Text style={styles.label}>{"Welcome Login to \nyou'r Todo"}</Text>
        <Button
          onPress={login}
          style={styles.button}
          mode="contained-tonal"
          contentStyle={{
            width: "100%",
          }}
          icon="login"
        >
          <Text style={styles.buttonText}>Login</Text>
        </Button>
      </View>
    );
  }

  return (
    <>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen
          name="modal"
          options={{
            presentation: "modal",
            title: "Todo New",
          }}
        />
      </Stack>
      <FAB
        visible={pathName !== "/modal"}
        icon="plus"
        style={styles.fab}
        mode="flat"
        onPress={() => {
          router.push("/modal");
        }}
      />
    </>
  );
}

const styles = StyleSheet.create({
  label: { fontSize: 24, fontWeight: "900", textAlign: "center" },
  buttonText: { fontSize: 16, fontWeight: "900" },
  button: {
    width: "100%",
    height: 48,
    justifyContent: "center",
    alignItems: "center",
  },
  loginView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 24,
    gap: 34,
  },
  fab: {
    position: "absolute",
    margin: 16,
    right: 0,
    bottom: 80,
  },
});
