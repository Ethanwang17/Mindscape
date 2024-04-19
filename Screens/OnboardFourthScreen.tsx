import React from "react";
import {View, Image, SafeAreaView, StatusBar} from "react-native";
import { Button, Card, TextInput, Text } from "react-native-paper";
import { CheckBox } from "react-native-elements";
import {applicationTheme} from "./appTheme";
import {useTogglePasswordVisibility} from "./pwVisibility";
import {transparent} from "react-native-paper/lib/typescript/styles/themes/v2/colors";
import CustomButton from "../Components/CustomButton";

const OnboardFourthScreen = ({ navigation }: { navigation: any }) => {
  const [isChecked, setIsChecked] = React.useState(false);
  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };
  const NextScreen = () => {
    if (isChecked) {
      navigation.navigate("HomepageScreen");
    } else {
      alert("Please check the checkbox to continue.");
    }
  };
  return (
    <SafeAreaView style={[applicationTheme.loginContent, { flex: 1 }]}>
      <StatusBar barStyle="dark-content" />

      <View style={{ flex: 1 }}>
        <View style={applicationTheme.onboardHeader}>
          <Text
            style={[
              applicationTheme.welcomeTextStyle,
              {
                fontFamily: "Rubik_700Bold",
                fontSize: 32,
                color: "#153D45",
                paddingBottom: 84,
              },
            ]}
          >
            Your personal data{"\n"}
            is secure!
          </Text>
        </View>

        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Image
            style={applicationTheme.lockImage}
            source={require("../assets/lock.png")}
          />
          <Text
            style={[
              applicationTheme.welcomeTextStyle,
              {
                paddingTop: 69,
                width: "80%",
                fontFamily: "Inter_600SemiBold",
                fontSize: 15,
              },
            ]}
          >
            At Mindscape, we understand the value of privacy. We are committed
            to securing your health and screen time data to ensure your peace of
            mind.
          </Text>
        </View>
        <View style={{ alignItems: "center", paddingTop: 60 }}>
          <CheckBox
            title="I understand that Mindscape is commited to securing my personal health information"
            checked={isChecked}
            onPress={handleCheckboxChange}
            checkedColor="#00FF00" // Color when checked
            uncheckedColor="#CCCCCC" // Color when unchecked
          />
        </View>

        <View
          style={{
            flex: 1,
            justifyContent: "flex-end",
            alignItems: "center",
          }}
        >
          <View
            style={{
              flexDirection: "row",
              // justifyContent: "center",
              marginBottom: 20,
            }}
          >
            <View
              style={{
                width: 10,
                height: 8,
                borderRadius: 5,
                backgroundColor: "#BFDDE2",
                marginHorizontal: 2,
              }}
            />
            <View
              style={{
                width: 10,
                height: 8,
                borderRadius: 5,
                backgroundColor: "#BFDDE2",
                marginHorizontal: 2,
              }}
            />
            <View
              style={{
                width: 26,
                height: 8,
                borderRadius: 5,
                backgroundColor: "#153D45",
                marginHorizontal: 2,
              }}
            />
            <View
              style={{
                width: 10,
                height: 8,
                borderRadius: 5,
                backgroundColor: "#BFDDE2",
                marginHorizontal: 2,
              }}
            />
          </View>

          <CustomButton onPress={NextScreen} text="Finish" />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default OnboardFourthScreen;
