import { Tabs } from "expo-router";

import { MaterialIcons } from "@expo/vector-icons";
import { IconButton, MD3Colors } from "react-native-paper";
import { useAuthContext } from "../../components/AuthProvider";

export default function TabLayout() {
  const { logout } = useAuthContext();
  return (
    <Tabs
      screenOptions={{
        headerStyle: {
          backgroundColor: MD3Colors.primary60,
        },
        headerRight: () => {
          return (
            <IconButton
              icon="logout"
              mode="contained-tonal"
              size={20}
              onPress={logout}
            />
          );
        },
        tabBarActiveTintColor: MD3Colors.primary60,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Todo",
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="library-books" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="done"
        options={{
          title: "Done",
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="check" size={24} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
