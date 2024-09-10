// src/screens/RegisterScreen.js
import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";
import axios from "axios";

const EnterOTPScreen = ({ navigation, route }) => {
  const { email } = route.params;
  const [otp, setOTP] = useState("");

  const handleRegister = async () => {
    try {
      // Thay thế URL và cấu hình axios với URL của bạn
      const response = await axios.post(
        "http://localhost:3000/api/v1/user/verified-user",
        {
          email,
          otp,
        }
      );
      alert(response.data.EM);
      navigation.navigate("Login");
    } catch (error) {
      alert(error.response.data.EM);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Nhập mã OTP đã gửi về email</Text>
      <TextInput
        style={styles.input}
        placeholder="OTP"
        value={otp}
        onChangeText={setOTP}
      />
      <Button title="Xác thực" onPress={handleRegister} />
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

export default EnterOTPScreen;
