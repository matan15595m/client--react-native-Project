import React, { FC, useEffect, useState } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableHighlight,Image } from 'react-native';
import auth_model,{ loginUser } from '../auth_model';
import { Post } from './post_model';


const PostListItem: FC<{ message: string, sender: string, imageURL: string, id:any, onRowSelected:Function }> =({ message,sender,imageURL,onRowSelected,id }) => {    
    const onClick = ()=>{
        onRowSelected(message,sender,imageURL,id)
    }
return (
    <View style = {styles.postContainer}>
<TouchableHighlight onPress={onClick} underlayColor={'gainsboro'}>
    <View style={styles.listRow}>
         {imageURL == "" && <Image style={styles.listRowImage} source={require('../../assets/image.webp')} />}
         {imageURL!= "" && <Image style={styles.listRowImage} source={{ uri: imageURL}} />}
    <View style={styles.listRowTextContainer}>
        <Text style={styles.listRowName}>{message}</Text>
        <Text style={styles.listRowId}>{sender}</Text>
        
    </View>
 </View>
 </TouchableHighlight>
 </View>
 )
}
export default PostListItem
const styles = StyleSheet.create({
    listRow: {
        margin:4,
        flexDirection: "row",
        height: 150,
        elevation: 1,
        borderRadius: 2,
        },
       listRowImage: {
        margin: 10,
        resizeMode: "contain",
        height: 130,
        width: 130,
        },
       listRowTextContainer: {
        flex: 1,
        margin: 10,
        justifyContent: "space-around"
        },
       listRowName: {
        fontSize:20
        },
       listRowId:{
        fontSize:20
        },
        postContainer: {
            borderRadius: 10,
            marginBottom: 10,
            marginHorizontal: 10,
            padding: 10,
        }
  });
