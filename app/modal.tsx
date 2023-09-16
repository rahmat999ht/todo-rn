import { StyleSheet } from "react-native";

import { Text, View } from "../components/Themed";
import { useLocalSearchParams, useNavigation } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, MD3Colors, Snackbar } from "react-native-paper";
import { useGetTodo } from "../services/todo";
import { FormTodo } from "../components/FormTodo";

export default function ModalScreen() {
  const params = useLocalSearchParams();
  const nav = useNavigation();

  const { id = "New" } = params;

  const { data, isLoading, setLoading, setData } = useGetTodo(id as string);
  const titleApp = id !== "New" ? "Todo Update" : "Todo New";
  const titleSnackbar = id !== "New" ? "Berhasil Update" : "Berhasil Add";

  useEffect(() => {
    nav.setOptions({
      title: titleApp,
    });
  }, []);

  const [visible, setVisible] = useState(false);

  const onToggleSnackBar = () => setVisible(!visible);

  const onDismissSnackBar = () => setVisible(false);

  return (
    <View style={styles.container}>
      {isLoading ? (
        <ActivityIndicator animating={true} size={40} />
      ) : (
        <FormTodo
          data={data}
          setLoading={setLoading}
          setData={setData}
          onToggleSnackBar={onToggleSnackBar}
        />
      )}

      <Snackbar
        style={{
          position: "absolute",
          margin: 16,
          right: 0,
          left: 0,
          bottom: 24,
          width: "100%",
          backgroundColor: MD3Colors.primary60,
        }}
        visible={visible}
        onDismiss={onDismissSnackBar}
      >
        <Text style={{ fontWeight: "600", fontSize: 18 }}>{titleSnackbar}</Text>
      </Snackbar>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    paddingHorizontal: 16,
    gap: 8,
  },
});
