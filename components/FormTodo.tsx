import { useState } from "react";
import { ITodo } from "../types/Todo";
import { StyleSheet } from "react-native";
import {
  Button,
  Card,
  Checkbox,
  MD3Colors,
  TextInput,
} from "react-native-paper";
import { Text, View } from "./Themed";
import { addTodo, defaultData, updateTodo } from "../services/todo";
import { router } from "expo-router";
import { useAuthContext } from "./AuthProvider";

export const FormTodo = ({
  data,
  setLoading,
  setData,
  onToggleSnackBar,
}: {
  data: ITodo;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setData: React.Dispatch<React.SetStateAction<ITodo>>;
  onToggleSnackBar: () => void;
}) => {
  const isNew = data.id === "New";
  const { user } = useAuthContext();
  const [title, setTitle] = useState(data.title);
  const [descripsion, setDescripsion] = useState(data.descripsion);
  const [isDone, setIsDone] = useState(data.isDone);
  const [isErrorTitle, setIsErrorTitle] = useState(false);
  const [isErrorDesc, setIsErrorDesc] = useState(false);

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
    const todo: ITodo = {
      id: data.id,
      title,
      descripsion,
      userId: user?.email ?? "-",
      isDone,
    };
    if (
      todo.title === defaultData.title ||
      todo.descripsion === defaultData.descripsion
    ) {
      if (todo.title === defaultData.title) {
        setIsErrorTitle(true);
      }
      if (todo.descripsion === defaultData.descripsion) {
        setIsErrorDesc(true);
      }
      return;
    } else {
      setIsErrorDesc(false);
      setIsErrorTitle(false);
      setLoading(true);
      if (data.id === "New") {
        await addTodo(todo);
      } else {
        await updateTodo(todo);
      }
      onToggleSnackBar();
      setData(todo);
      setLoading(false);
      router.back();
    }
  };

  return (
    <View>
      <TextInput
        value={title}
        onChangeText={onChangeTitle}
        mode="outlined"
        label="Title"
      />
      {isErrorTitle && (
        <Text style={styles.subTitle}>Title Tidak Boleh Kosong</Text>
      )}

      <TextInput
        value={descripsion}
        onChangeText={onChangeDesc}
        mode="outlined"
        label="Desc"
      />

      {isErrorDesc && (
        <Text style={styles.subTitle}>Descripsion Tidak Boleh Kosong</Text>
      )}
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
        // contentStyle={{
        //   padding: 5,
        // }}
        onPress={onSubmit}
      >
        {isNew ? "Create" : "Update"}
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  containerRow: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    fontSize: 18,
  },
  subTitle: {
    fontSize: 14,
    color: MD3Colors.error60,
    marginVertical: 4,
  },
});
