import React, { useContext , useState, useEffect} from "react";
import {
  Image,
  TouchableOpacity,
  View,
  ImageBackground,
  StatusBar,
  Linking,
  Animated
} from "react-native";
import { Text } from "react-native-paper";
import { useUser } from "../UserContext";
import { applicationTheme } from "./appTheme";
import ProfilePictureContext from "../PictureContext";

const HomepageScreen = ({ navigation }: { navigation: any }) => {
  const { user } = useUser();
  const { profilePicture } = useContext(ProfilePictureContext);
  const [animation] = useState(new Animated.Value(1));


  const handleProfilePress = () => {
    navigation.navigate("ProfileScreen");
  };

  const handleCirclePress = () => {
    Linking.openURL(
      "http://10.18.89.186:8000/en-US/app/apple_health/mindscape_dashboard"
    );
  };

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(animation, {
          toValue: 1.2,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(animation, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
      ]),
      { iterations: -1 }
    ).start();
  }, []);


  return (
    <ImageBackground
      source={require("../assets/homepage_background.png")}
      resizeMode="cover"
      style={applicationTheme.image}
    >
      <StatusBar barStyle="light-content" />

      <View style={{ flex: 1 }}>
        <View style={applicationTheme.HomepageHeader}>
          <Text
            style={{
              fontFamily: "Rubik_700Bold",
              fontSize: 32,
              color: "#F2F8F6",
            }}
          >
            Hello,{"\n"}
            {user.name}
          </Text>
          <TouchableOpacity onPress={handleProfilePress} activeOpacity={1}>
            <Image
              source={
                profilePicture
                  ? { uri: profilePicture }
                  : require("../assets/default.png")
              }
              style={{
                width: 63,
                height: 63,
                resizeMode: "cover",
                borderRadius: 31.5, // Make the image circular
              }}
            />
          </TouchableOpacity>
        </View>
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text
            style={[
              applicationTheme.welcomeTextStyle,
              {
                fontFamily: "Inter_600SemiBold",
                fontSize: 20,
                color: "#F2F8F6",
                paddingBottom: 32,
              },
            ]}
          >
            Tap to view health
          </Text>
          <TouchableOpacity onPress={handleCirclePress} activeOpacity={1}>
            <View style={applicationTheme.circle}>
              <Animated.View
                style={[
                  applicationTheme.circle,
                  applicationTheme.circle,
                  { transform: [{ scale: animation }] },
                ]}
              >
                <Image
                  source={require("../assets/dark_green_logo.png")}
                  style={{ width: 113, height: 94 }}
                  resizeMode="contain"
                />
              </Animated.View>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
};

export default HomepageScreen;
