import React, { useState } from "react";
import { ITodo } from "../types/Todo";
import { Pressable, StyleSheet } from "react-native";
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
import { firebase } from "@react-native-firebase/firestore";

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
  const [date, setDate] = useState(data.dateTime?.toDate() ?? new Date());
  const [time, setTime] = useState(data.dateTime?.toDate() ?? new Date());
  const [isDone, setIsDone] = useState(data.isDone);
  const [isError, setIsError] = useState({
    title: false,
    descripsion: false,
  });

  const onChangeIsDone = () => {
    setIsDone(!isDone);
  };

  const onSubmit = async () => {
    const newDate = new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate(),
      time.getHours(),
      time.getMinutes(),
      time.getSeconds()
    );

    const dateTime = firebase.firestore.Timestamp.fromDate(newDate);

    const todo: ITodo = {
      id: data.id,
      title: title,
      descripsion: descripsion,
      dateTime: dateTime,
      userId: user?.uid ?? "-",
      isDone: isDone,
    };
    if (
      todo.title === defaultData.title ||
      todo.descripsion === defaultData.descripsion
    ) {
      if (todo.title === defaultData.title) {
        setIsError((v) => ({
          ...v,
          title: true,
        }));
      }
      if (todo.descripsion === defaultData.descripsion) {
        setIsError((v) => ({
          ...v,
          descripsion: true,
        }));
      }
      return;
    } else {
      setIsError((v) => ({
        title: false,
        descripsion: false,
      }));
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
        onChangeText={setTitle}
        mode="outlined"
        label="Title"
      />

      {isError.title && (
        <Text style={styles.subTitle}>Title Tidak Boleh Kosong</Text>
      )}
      <TextInput
        value={descripsion}
        onChangeText={setDescripsion}
        mode="outlined"
        label="Desc"
      />

      <InputDate label="Time" mode="time" date={time} setDate={setTime} />

      <InputDate label="Date" mode="date" date={date} setDate={setDate} />

      {isError.descripsion && (
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

import DateTimePickerModal from "react-native-modal-datetime-picker";

export const InputDate = ({
  date,
  setDate,
  mode,
  label,
}: {
  date: Date;
  mode: "date" | "time";
  label: string;
  setDate: React.Dispatch<React.SetStateAction<Date>>;
}) => {
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date: Date) => {
    setDate(date);
    hideDatePicker();
  };

  const value =
    "date" === mode
      ? date.toLocaleDateString("id-ID", {
          year: "numeric",
          month: "long",
          day: "2-digit",
        })
      : date
          .toLocaleDateString("id-ID", {
            hour: "2-digit",
            minute: "2-digit",
          })
          .split(" ")[1]
          .trim()
          .replace(".", " : ");

  return (
    <View>
      <Pressable onPress={showDatePicker}>
        <TextInput
          value={value}
          mode="outlined"
          label={label}
          editable={false}
        />
      </Pressable>

      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode={mode}
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      />
    </View>
  );
};
