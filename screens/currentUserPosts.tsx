import React, { FC, useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  FlatList,
  Text,
  Button,
  SafeAreaView,
} from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import auth_model, { loginUser } from "../models/auth_model";
import PostListItem from "../models/post_models/postListItem";
import post_model, { Post } from "../models/post_models/post_model";
import posts_api from "../api/posts_api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Loading from "./Loading";

const CurrentUserPosts: FC<{ navigation: any; route: any }> = ({
  navigation,
  route,
}) => {
  const currentUserEmail = route.params.sender;
  const [loading, setLoading] = useState(false);

  function onRowSelected(
    message: string,
    sender: string,
    imageURL: string,
    id: any
  ) {
    navigation.navigate("CurrentUserPostDetails", {
      message: message,
      sender: sender,
      imageURL: imageURL,
      id: id,
    });
  }

  const [posts, setPosts] = useState<Array<any>>([]);

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", async () => {
      let posts: Post[] = [];
      try {
        setLoading(true);
        const accessToken: any = await AsyncStorage.getItem("accessToken");
        const sender: any = {
          sender: currentUserEmail,
        };
        posts = await post_model.getAllPosts(accessToken, sender);
        setLoading(false);
      } catch (err) {
        console.log("fail fetching posts " + err);
        setLoading(false);
      }
      setPosts(posts);
      setLoading(false);
    });
    return unsubscribe;
  });
  return (
    <SafeAreaView style={{ flex: 1 }}>
      {loading ? (
        <View style={{ flex: 1 }}>
          <Loading />
        </View>
      ) : (
        <FlatList
          style={styles.list}
          data={posts}
          keyExtractor={(item) => item._id.toString()}
          renderItem={({ item }) => (
            <PostListItem
              message={item.message}
              sender={item.sender}
              id={item._id}
              imageURL={item.imageURL}
              onRowSelected={onRowSelected}
            />
          )}
        />
      )}
    </SafeAreaView>
  );
};
export default CurrentUserPosts;

const styles = StyleSheet.create({
  list: {
    flex: 1,
  },
});
