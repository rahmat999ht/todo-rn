import { View } from "../../components/Themed";
import { ListTodo } from "../../components/Todos";
import { Dimensions, StyleSheet } from "react-native";

export default function TabTodoScreen() {
  return (
    <View style={styles.container}>
      <ListTodo />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: "100%",
    width: Dimensions.get("screen").width,
  },
});
