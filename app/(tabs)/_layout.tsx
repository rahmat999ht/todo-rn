import { Tabs } from "expo-router";

import { MaterialIcons } from "@expo/vector-icons";
import { MD3Colors } from "react-native-paper";

export default function TabLayout() {

  return (
    <Tabs
      screenOptions={{
        headerStyle: {
          backgroundColor: MD3Colors.primary60,
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
