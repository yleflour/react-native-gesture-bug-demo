import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Button } from "./src/Button/Button.component";
import { Pad } from "./src/Pad/Pad.component";

export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar hidden />
      <Pad size={200} />
      <Button size={80} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    backgroundColor: "#111",
  },
});
