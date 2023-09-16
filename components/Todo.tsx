import { StyleSheet } from "react-native";
import { IconButton, MD3Colors, RadioButton } from "react-native-paper";
import { View, Text } from "./Themed";
import { ITodo } from "../types/Todo";
import { VerticalDivider } from "./Divider";
import { Link } from "expo-router";

interface TodoProps {
  item: ITodo;
  removeItem: (item: ITodo) => void;
}

export const Todo = ({ item, removeItem }: TodoProps) => {
  return (
    <View style={style.container}>
      {/* Content */}
      <View style={style.content}>
        <RadioButton
          status={item.isDone ? "checked" : "unchecked"}
          value={item.id}
        />
        <View>
          <Text style={style.title}>{item.title}</Text>
          <Text style={style.description}>{item.descripsion}</Text>
        </View>
      </View>
      {/* End Content */}

      {/* Action */}
      <View style={style.action}>
        <Link
          href={{
            pathname: "/modal",
            params: {
              id: item.id,
            },
          }}
          asChild
        >
          <IconButton iconColor={MD3Colors.primary50} icon="pencil" />
        </Link>
        <VerticalDivider />
        <IconButton
          iconColor={MD3Colors.error50}
          icon="delete"
          onPress={() => {
            removeItem(item);
          }}
        />
      </View>
      {/* End Action */}
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
    marginRight: 20,
    marginVertical: 8,
  },
  content: {
    marginLeft: 8,
    gap: 12,
    alignItems: "center",
    flexDirection: "row",
  },
  title: {
    fontWeight: "500",
    fontSize: 16,
  },
  description: {
    fontWeight: "200",
    fontSize: 14,
  },
  action: {
    flexDirection: "row",
    alignItems: "center",
    height: "50%",
  },
});
