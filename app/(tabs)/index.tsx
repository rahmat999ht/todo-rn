import { View } from "../../components/Themed";
import { ListTodo } from "../../components/Todos";
import { Dimensions, StyleSheet } from "react-native";

export default function TabTodoScreen() {
  return (
    <View style={styles.container}>
      <ListTodo isDoneView={false} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: "100%",
    alignContent: "center",
    justifyContent: "center",
    width: Dimensions.get("screen").width,
  },
});
