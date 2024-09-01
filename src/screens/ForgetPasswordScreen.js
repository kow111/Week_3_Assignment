import axios from "axios";
import React, { useState } from "react";
import {
  View,
  TextInput,
  Button,
  Text,
  StyleSheet,
  ActivityIndicator,
} from "react-native";

const ForgetPasswordScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSendOtp = async () => {
    try {
      setLoading(true);
      const response = await axios.post(
        "http://localhost:3000/api/v1/user/forgot-password",
        {
          email,
        }
      );
      setLoading(false);
      alert(response.data.EM);
      setOtpSent(true);
    } catch (error) {
      alert(error.response.data.EM);
    }
  };

  const handleResetPassword = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/v1/user/reset-password",
        {
          email,
          otp,
          newPassword,
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
      <Text style={styles.title}>Forget Password</Text>
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
      />
      {otpSent && (
        <>
          <TextInput
            placeholder="OTP"
            value={otp}
            onChangeText={setOtp}
            style={styles.input}
          />
          <TextInput
            style={styles.input}
            placeholder="New Password"
            value={newPassword}
            onChangeText={setNewPassword}
            secureTextEntry
          />
          <Button title="Reset Password" onPress={handleResetPassword} />
        </>
      )}
      {!otpSent && <Button title="Send OTP" onPress={handleSendOtp} />}
      <Button
        title="Back to Login"
        onPress={() => navigation.navigate("Login")}
      />
      {loading && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      )}
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
  loadingContainer: {
    marginTop: 20,
  },
});

export default ForgetPasswordScreen;
