// import { StatusBar } from "expo-status-bar";
import { Pressable, StyleSheet } from "react-native";

import { Text, View } from "../components/Themed";
import {
  Stack,
  router,
  useLocalSearchParams,
  useNavigation,
} from "expo-router";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Button,
  Card,
  Checkbox,
  MD3Colors,
  Switch,
  TextInput,
} from "react-native-paper";
import { addTodo, updateTodo, useGetTodo } from "../services/todo";

export default function ModalScreen() {
  const params = useLocalSearchParams();
  const nav = useNavigation();

  const { id = "New" } = params;

  const { data, isLoading, setLoading } = useGetTodo(id as string);
  const titleApp = id !== "New" ? "Todo Update" : "Todo New";

  useEffect(() => {
    nav.setOptions({
      title: titleApp,
    });
  }, []);

  return (
    <View style={styles.container}>
      {isLoading ? (
        <ActivityIndicator animating={true} size={40} />
      ) : (
        <FormTodo data={data} setLoading={setLoading} />
      )}
    </View>
  );
}

import React from "react";
import { ITodo } from "../types/Todo";

const FormTodo = ({
  data,
  setLoading,
}: {
  data: ITodo;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const buttonTitle = data.id !== "New" ? "Update" : "Add";
  const [title, setTitle] = useState(data.title);
  const [descripsion, setDescripsion] = useState(data.descripsion);
  const [isDone, setIsDone] = useState(data.isDone);

  const onChangeTitle = (title: string) => {
    setTitle(title);
  };

  const onChangeDesc = (descripsion: string) => {
    setDescripsion(descripsion);
  };

  const onChangeIsDone = () => {
    setIsDone(!isDone);
  };

  const onSubmit = async () => {
    setLoading(true);
    if (data.id === "New") {
      await addTodo({
        id: data.id,
        title,
        descripsion,
        isDone,
      });
    }
    await updateTodo({
      id: data.id,
      title,
      descripsion,
      isDone,
    });
    setLoading(false);
  };

  return (
    <>
      <TextInput
        value={title}
        onChangeText={onChangeTitle}
        mode="outlined"
        label="Title"
      />

      <TextInput
        value={descripsion}
        onChangeText={onChangeDesc}
        mode="outlined"
        label="Desc"
      />

      {/* <View> */}

      {data.id !== "New" && (
        <Card
          mode="outlined"
          style={{
            marginTop: 8,
          }}
          onPress={onChangeIsDone}
        >
          <Card.Content style={styles.containerRow}>
            <Text style={styles.title}>Done</Text>
            <Checkbox
              status={isDone ? "checked" : "unchecked"}
              onPress={onChangeIsDone}
            />
          </Card.Content>
        </Card>
      )}
      <Button
        mode="contained"
        style={{
          marginTop: 40,
        }}
        onPress={onSubmit}
      >
        {buttonTitle}
      </Button>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    paddingHorizontal: 16,
    gap: 8,
  },
  containerRow: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    fontSize: 18,
    // fontWeight: "500",
  },
});
