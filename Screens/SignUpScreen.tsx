import React, { useState } from "react";
import { SafeAreaView, View, TouchableOpacity, StatusBar } from "react-native";
import { Text, TextInput, IconButton } from "react-native-paper";
import { applicationTheme } from "./appTheme";
import { useTogglePasswordVisibility } from "./pwVisibility";
import CustomButton from "../Components/CustomButton";
import { FIREBASE_AUTH } from "../FirebaseConfig";
import { createUserWithEmailAndPassword } from "firebase/auth";
import HomepageScreen from "./HomepageScreen";
import { useUser } from "../UserContext";

const SignUpScreen = ({ navigation }: { navigation: any }) => {
  const [firstName, setFirstName] = useState(""); // State for first name
  const [lastName, setLastName] = useState(""); // State for last name
  const [email, setEmail] = useState(""); // State for email
  const [password, setPassword] = useState(""); // State for password
  const { passwordVisibility, handlePasswordVisibility } =
    useTogglePasswordVisibility();
  const auth = FIREBASE_AUTH;
  const { setUser } = useUser();
  const [isFocused, setIsFocused] = useState(false);

  const handleSignUpPress = async () => {
    try {
      const response = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log("User signed up:", response.user);
      setUser({ name: `${firstName} ${lastName}` }); // Set user name in context
      navigation.navigate("OnboardFirstScreen"); // Navigate on success
    } catch (error) {
      console.error("Sign Up Error:", error);
      // Handle sign-up errors (e.g., display error message)
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
          Hello there!
        </Text>
        {/* First name input */}
        <TextInput
          value={firstName}
          onChangeText={setFirstName}
          placeholder="First Name"
          style={applicationTheme.textInput}
          underlineColor="transparent" // Set underline color to transparent
          activeUnderlineColor="#153D45" // Color when focused
        />
        {/* Last name input */}
        <TextInput
          value={lastName}
          onChangeText={setLastName}
          placeholder="Last Name"
          style={[applicationTheme.textInput, { borderBottomColor: "#153D45" }]}
          underlineColor="transparent" // Set underline color to transparent
          activeUnderlineColor="#153D45" // Color when focused
        />
        {/* Email input */}
        <TextInput
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          placeholder="E-mail"
          style={applicationTheme.textInput}
          autoCapitalize="none"
          underlineColor="transparent" // Set underline color to transparent
          activeUnderlineColor="#153D45" // Color when focused
        />
        {/* Password input */}
        <TextInput
          value={password}
          onChangeText={setPassword}
          secureTextEntry={passwordVisibility}
          placeholder="Password"
          right={
            <IconButton
              icon={passwordVisibility ? "eye-off" : "eye"}
              onPress={handlePasswordVisibility}
            />
          }
          autoCapitalize="none"
          style={applicationTheme.textInput}
          underlineColor="transparent" // Set underline color to transparent
          activeUnderlineColor="#153D45" // Color when focused
        />
        {/* Sign Up button */}
        <CustomButton onPress={handleSignUpPress} text="Sign Up" />

        <View style={applicationTheme.container}>
          <View style={applicationTheme.fotterTextAlign}>
            <Text style={applicationTheme.footerTextStyle}>
              Already have an account?{" "}
            </Text>
            <TouchableOpacity
              onPress={() => navigation.navigate("SignInScreen")}
            >
              <Text style={applicationTheme.signInTextStyle}>Sign In</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default SignUpScreen;
