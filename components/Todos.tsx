import React, { useRef } from "react";
import { LayoutAnimation } from "react-native";
import { ActivityIndicator } from "react-native-paper";
import { FlashList } from "@shopify/flash-list";
import { Todo } from "./Todo";
import { ITodo } from "../types/Todo";
import { Divider } from "./Divider";
import { Text, View } from "./Themed";
import { deleteTodo, updateTodo, useGetAllTodo } from "../services/todo";

export const ListTodo = ({isDoneView} : {isDoneView: boolean}) => {
  const { data, setData, isLoading, isEmpty } = useGetAllTodo(isDoneView);

  const list = useRef<FlashList<ITodo> | null>(null);

  const removeTodo = async (item: ITodo) => {
    await deleteTodo(item);
    setData((data) =>
      data.filter((dataItem) => {
        return dataItem !== item;
      })
    );
    list.current?.prepareForLayoutAnimationRender();
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
  };

  const checkedTodo = async (item: ITodo) => {
    const newData = {
      ...item,
      isDone: !item.isDone,
    };
    await updateTodo(newData);
    setData((data) =>
      data.map((dataItem) => {
        if (dataItem === item) {
          return newData;
        }
        return dataItem;
      })
    );
    list.current?.prepareForLayoutAnimationRender();
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
  };

  if (isLoading) {
    return <ActivityIndicator animating={true} size={40} />;
  }

  if (isEmpty) {
    return (
      <View>
        <Text style={{ textAlign: "center", fontSize: 18, fontWeight: "600" }}>
          Masih Kosong
        </Text>
        {/* <MaterialIcons
          name="book"
          size={24}
          style={{ alignSelf: "center" }}
          color={MD3Colors.primary60}
        /> */}
      </View>
    );
  }

  return (
    <FlashList
      ref={list}
      keyExtractor={(item: ITodo) => {
        return item.id;
      }}
      renderItem={({ item }) => (
        <Todo checkedTodo={checkedTodo} removeTodo={removeTodo} todo={item} />
      )}
      estimatedItemSize={data?.length}
      ItemSeparatorComponent={Divider}
      data={data}
    />
  );
};

export default ListTodo;
