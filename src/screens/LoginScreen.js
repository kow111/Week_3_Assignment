import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/v1/user/login",
        {
          email,
          password,
        }
      );
      if (response.data.DT.user.is_verified === false) {
        alert("Tài khoản chưa được xác thực");
        navigation.navigate("EnterOTP", { email });
        return;
      }
      await AsyncStorage.setItem("userToken", response.data.DT.token);
      await AsyncStorage.setItem("user", JSON.stringify(response.data.DT.user));
      navigation.navigate("Home");
    } catch (error) {
      alert(error.response.data.EM);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Đăng Nhập</Text>
      <TextInput
        className="border border-gray-400 p-2 mb-2"
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Mật khẩu"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <Button title="Đăng Nhập" onPress={handleLogin} />
      <Button
        title="Forgot Password?"
        onPress={() => navigation.navigate("ForgetPassword")}
      />
      <Button title="Đăng Ký" onPress={() => navigation.navigate("Register")} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", padding: 16 },
  title: { fontSize: 24, marginBottom: 16, textAlign: "center" },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
  },
});

export default LoginScreen;
