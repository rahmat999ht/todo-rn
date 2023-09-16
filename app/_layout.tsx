import FontAwesome from "@expo/vector-icons/FontAwesome";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { SplashScreen, Stack } from "expo-router";
import { useEffect } from "react";
import { useColorScheme, StyleSheet, Dimensions } from "react-native";
import { FAB, PaperProvider, MD2Colors, MD3Colors } from "react-native-paper";

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

  return <RootLayoutNav />;
}

function RootLayoutNav() {
  const colorScheme = useColorScheme();
  const colors = colorScheme === "dark" ? DarkTheme : DefaultTheme;

  return (
    <PaperProvider
      theme={{
        isV3: true,
        version: 3,
        dark: colorScheme === "dark",
        // colors: {
        //   primaryContainer: "#2f95dc",
        // },
      }}
    >
      <ThemeProvider value={colors}>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false,}} />
          <Stack.Screen
            name="modal"
            options={{
              presentation: "modal",
              title: "To Do",

            }}
          />
        </Stack>
        <FAB
          icon="plus"
          style={styles.fab}
          mode="flat"
          onPress={() => console.log("Pressed")}
        />
      </ThemeProvider>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  fab: {
    position: "absolute",
    margin: 16,
    right: 0,
    bottom: 80,
  },
});