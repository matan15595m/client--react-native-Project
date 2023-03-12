import React, { FC, useEffect, useState } from "react";
import { StyleSheet, View, FlatList, Text, Button } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import auth_model, { loginUser } from "../models/auth_model";
import PostListItem from "../models/post_models/postListItem";
import post_model, { Post } from "../models/post_models/post_model";
import posts_api from "../api/posts_api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SafeAreaView } from "react-native-safe-area-context";
import Loading from "./Loading";

const PostsListScreen: FC<{ navigation: any }> = ({ navigation }) => {
  function onRowSelected(
    message: string,
    sender: string,
    imageURL: string,
    id: any
  ) {
    navigation.navigate("PostDetailsScreen", {
      message: message,
      sender: sender,
      imageURL: imageURL,
      id: id,
    });
  }
  const [loading, setLoading] = useState(false);
  const [posts, setPosts] = useState<Array<any>>([]);

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", async () => {
      let posts: Post[] = [];
      try {
        setLoading(true);
        const accessToken: any = await AsyncStorage.getItem("accessToken");
        posts = await post_model.getAllPosts(accessToken, null);
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
        <Loading />
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
export default PostsListScreen;

const styles = StyleSheet.create({
  list: {
    flex: 1,
  },
});
