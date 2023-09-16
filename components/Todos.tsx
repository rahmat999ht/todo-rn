import React, { useRef, useState } from "react";
import { LayoutAnimation } from "react-native";
import { FlashList } from "@shopify/flash-list";
import { Todo } from "./Todo";
import { ITodo } from "../types/Todo";
import { Divider } from "./Divider";

const dummyTodo: ITodo[] = [
  {
    id : "1",
    title: "title 1",
    descripsion: "descripsion 1",
    isDone: false,
  },
  {
    id : "2",
    title: "title 2",
    descripsion: "descripsion 2",
    isDone: true,
  },
  {
    id : "3",
    title: "title 3",
    descripsion: "descripsion 3",
    isDone: false,
  },
  {
    id : "4",
    title: "title 4",
    descripsion: "descripsion 4",
    isDone: false,
  },
];

export const ListTodo = () => {
  const [data, setData] = useState(dummyTodo);

  const list = useRef<FlashList<ITodo> | null>(null);

  const removeItem = (item: ITodo) => {
    setData(
      data.filter((dataItem) => {
        return dataItem !== item;
      })
    );
    list.current?.prepareForLayoutAnimationRender();
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
  };

  return (
    <FlashList
      ref={list}
      keyExtractor={(item: ITodo) => {
        return item.id;
      }}
      renderItem={({ item }) => <Todo removeItem={removeItem} item={item} />}
      estimatedItemSize={data.length}
      ItemSeparatorComponent={Divider}
      data={data}
    />
  );
};

export default ListTodo;
