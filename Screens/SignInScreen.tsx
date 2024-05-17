import React, { useState } from "react";
import {
  View,
  SafeAreaView,
  TouchableOpacity,
  StatusBar,
} from "react-native";
import { Text, TextInput } from "react-native-paper";
import { applicationTheme } from "./appTheme";
import CustomButton from "../Components/CustomButton";
import { FIREBASE_AUTH } from "../FirebaseConfig";
import { signInWithEmailAndPassword } from "firebase/auth";

const LoginScreen = (props: { navigation: { navigate: (arg0: string) => void; }; }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const auth = FIREBASE_AUTH;

  const handleSignInPress = async () => {
    setIsLoading(true);
    setError(null);

    // Trim leading/trailing spaces from email
    const trimmedEmail = email.trim();

    try {
      console.log("Attempting to sign in with email:", trimmedEmail);
      const response = await signInWithEmailAndPassword(
        auth,
        trimmedEmail,
        password
      );
      console.log("User signed in:", response.user);
      props.navigation.navigate("OnboardFirstScreen");
    } catch (error) {  
      setError("Login failed. Please check your credentials and try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView style={applicationTheme.loginContent}>
      <StatusBar barStyle="dark-content" />

      <View style={applicationTheme.view}>
        <Text
          style={[
            applicationTheme.titleTextStyle,
            {
              fontFamily: "Inter_700Bold",
              fontSize: 36,
              paddingBottom: 56,
              paddingTop: 56,
            },
          ]}
        >
          Welcome!
        </Text>
        <TextInput
          keyboardType="email-address"
          placeholder="E-mail"
          onChangeText={(text) => setEmail(text)}
          value={email}
          autoCapitalize="none" // Prevent auto-capitalization for emails
        />
        <TextInput
          placeholder="Password"
          onChangeText={(text) => setPassword(text)}
          value={password}
          secureTextEntry={true}
          style={{ marginBottom: 56 }}
        />

        {isLoading ? (
          <View style={{ alignItems: "center" }}>
            <Text>Signing in...</Text>
          </View>
        ) : (
          <CustomButton onPress={handleSignInPress} text="Sign In" />
        )}

        {error && (
          <Text style={{ color: "red" }}>{error}</Text>
        )}

        <View style={applicationTheme.container}>
          <View style={applicationTheme.fotterTextAlign}>
            <Text style={applicationTheme.footerTextStyle}>New User? </Text>
            <TouchableOpacity
              onPress={() => props.navigation.navigate("SignUpScreen")}
            >
              <Text style={applicationTheme.signInTextStyle}>Sign Up</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default LoginScreen;
