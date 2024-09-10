import React, { useEffect, useState } from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const HomeScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const handleLogout = async () => {
    await AsyncStorage.removeItem("userToken");
    await AsyncStorage.removeItem("user");
    navigation.navigate("Login");
  };
  const fetchUser = async () => {
    const user = await AsyncStorage.getItem("user");
    setEmail(JSON.parse(user).email);
  };
  useEffect(() => {
    fetchUser();
  });
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Chào mừng bạn!</Text>
      <Text>Email: {email}</Text>
      <Button title="Đăng Xuất" onPress={handleLogout} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
  title: { fontSize: 24, marginBottom: 16 },
});

export default HomeScreen;
