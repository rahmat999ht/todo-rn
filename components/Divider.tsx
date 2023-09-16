import { View } from "./Themed";
import { StyleSheet } from "react-native";

export const Divider = () => {
  return (
    <View
      style={styles.separator}
      lightColor="#eee"
      darkColor="rgba(255,255,255,0.1)"
    />
  );
};


export const VerticalDivider = () => {
  return (
    <View
      style={styles.separatorVer}
      lightColor="#eee"
      darkColor="rgba(255,255,255,0.1)"
    />
  );
};

const styles = StyleSheet.create({
  separator: {
    height: 1,
    width: "100%",
  },
  separatorVer: {
    width: 1,
    height: "100%",
  },
});
