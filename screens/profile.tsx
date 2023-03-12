import { useState, FC, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Button,
  Alert,
  TextInput,
  ScrollView,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { FontAwesome5 } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import auth_model from "../models/auth_model";
import AsyncStorage from "@react-native-async-storage/async-storage";
import post_model from "../models/post_models/post_model";
import { updateUser } from "../models/auth_model";

const ProfileScreen: FC<{ route: any; navigation: any }> = ({
  route,
  navigation,
}) => {
  const currentUserEmail = route.params.sender.sender;
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [avatarUri, setAvatarUri] = useState("");
  const [loading, setLoading] = useState(false);

  const askPermission = async () => {
    try {
      const res = await ImagePicker.getCameraPermissionsAsync();
      if (!res.granted) {
        alert("camera permission is requiered!");
      }
    } catch (err) {
      console.log("ask permission error " + err);
    }
  };
  const getUser = async () => {
    const accessToken: any = await AsyncStorage.getItem("accessToken");
    const user = await auth_model.getUserHandler(
      { email: currentUserEmail },
      accessToken
    );
    return user;
  };
  useEffect(() => {
    askPermission();
    const subscribe = navigation.addListener("focus", async () => {
      setLoading(true);
      const user = await getUser();
      setEmail(currentUserEmail);
      setFullname(user?.data.fullname);
      setAvatarUri(user?.data.imageURL);
      setLoading(false);
    });
    setLoading(false);
    return subscribe;
  }, []);
  const openCamera = async () => {
    try {
      const res = await ImagePicker.launchCameraAsync();
      if (!res.canceled && res.assets.length > 0) {
        const uri = res.assets[0].uri;
        setAvatarUri(uri);
      }
    } catch (err) {
      console.log("open camera error:" + err);
    }
  };
  const logout = async () => {
    try {
      const refreshToken: any = await AsyncStorage.getItem("refreshToken");
      await auth_model.logoutHandler(refreshToken);
      AsyncStorage.removeItem("accessToken");
      AsyncStorage.removeItem("refreshToken");
      AsyncStorage.removeItem("currentUserEmail");
      navigation.push("Login");
    } catch (err) {
      console.log(err);
    }
  };
  const onSave = async () => {
    try {
      setLoading(true);
      const user: updateUser = {
        email: currentUserEmail,
        fullname: fullname,
        imageURL: "",
      };
      if (avatarUri != "") {
        console.log("uploading image");
        const url = await post_model.uploadImage(avatarUri);
        user.imageURL = url;
        
      }
      const accessToken: any = await AsyncStorage.getItem("accessToken");
      await auth_model.updateUserHandler(user, accessToken);
      setLoading(false);
    } catch (err) {
      console.log("fail adding post: " + err);
      setLoading(false);
    }
    navigation.goBack();
    setLoading(false);
  };
  const openGallery = async () => {
    try {
      const res = await ImagePicker.launchImageLibraryAsync();
      if (!res.canceled && res.assets.length > 0) {
        const uri = res.assets[0].uri;
        setAvatarUri(uri);
      }
    } catch (err) {
      console.log("open camera error:" + err);
    }
  };
  return (
    <ScrollView>
      <View style={styles.container}>
        <View>
          {avatarUri == "" && (
            <Image
              source={require("../assets/image.webp")}
              style={styles.avatar}
            ></Image>
          )}
          {avatarUri != "" && (
            <Image source={{ uri: avatarUri }} style={styles.avatar}></Image>
          )}

          <TouchableOpacity>
            <Ionicons
              name={"camera"}
              style={styles.cameraButton}
              size={50}
              onPress={openCamera}
            />
          </TouchableOpacity>
          <TouchableOpacity>
            <FontAwesome5
              style={styles.galleryButton}
              name="upload"
              size={40}
              color="black"
              onPress={openGallery}
            />
          </TouchableOpacity>
        </View>

        <TextInput
          style={styles.input}
          onChangeText={setFullname}
          value={fullname}
          placeholder={"Full name"}
        />
        <Text style={styles.input}>{currentUserEmail}</Text>

        <View style={styles.buttonesContainer}>
          <TouchableOpacity style={styles.button} onPress={onSave}>
            <Text style={styles.buttonText}>Save</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.buttonesContainer}>
          <TouchableOpacity style={styles.button} onPress={logout}>
            <Text style={styles.buttonText}>Logout</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.buttonesContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              navigation.navigate("CurrentUserPosts", {
                sender: currentUserEmail,
              });
            }}
          >
            <Text style={styles.buttonText}>Go to my posts</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  avatar: {
    height: 250,
    resizeMode: "contain",
    alignSelf: "center",
    width: "100%",
  },
  cameraButton: {
    position: "absolute",
    bottom: -10,
    left: 10,
    width: 50,
    height: 50,
  },
  galleryButton: {
    position: "absolute",
    bottom: -10,
    right: 10,
    width: 50,
    height: 50,
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
  },
  buttonesContainer: {
    flexDirection: "row",
  },
  button: {
    flex: 1,
    margin: 12,
    padding: 12,
    backgroundColor: "#fb5b5a",
    borderRadius: 10,
  },
  buttonText: {
    textAlign: "center",
    color: "white",
    fontWeight: "bold",
  },
});

export default ProfileScreen;
