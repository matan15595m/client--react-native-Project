import { useState, FC, useEffect } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, Button, Alert, TextInput, ScrollView } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { FontAwesome5 } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import post_model,{Post} from '../models/post_models/post_model';

const PostDetailsScreen:FC<{navigation:any,route:any}> =({navigation,route})=>{
  const message = route.params.message
  const sender = route.params.sender
  const imgURL = route.params.imageURL
  
    return (
      <View style={styles.container}>
                <View>
                    {imgURL == "" && <Image source={require('../assets/image.webp')} style={styles.avatar}></Image>}
                    {imgURL != "" && <Image source={{ uri: imgURL }} style={styles.avatar}></Image>}
                </View>
                <Text style={styles.text}>Message from {sender}:</Text>
                <Text style={styles.input}>
                  {message}
                </Text>
            </View>
     )
}
export default PostDetailsScreen
const styles = StyleSheet.create({
  container: {
    flex: 1,
},
avatar: {
  marginTop:10,
    height: 300,
    width: '100%',
    
},
input: {
  textAlign:'left',
  color: 'black',
  fontWeight:'bold',
  fontSize:15,
  borderWidth: 1,
  borderRadius: 10,
  padding:30,
},
text: {
  textAlign: 'center',
  color: 'black',
  fontWeight:'bold',
  fontSize:15,
  marginBottom:10
}
  });