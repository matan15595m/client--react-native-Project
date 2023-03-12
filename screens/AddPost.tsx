import { useState, FC, useEffect } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, Button, Alert, TextInput, ScrollView } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { FontAwesome5 } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import post_model,{Post} from '../models/post_models/post_model';
import AsyncStorage from '@react-native-async-storage/async-storage';



const AddPostScreen: FC<{ route: any, navigation: any }> = ({ route, navigation }) => {
    const currentUserEmail = route.params.currentUserEmail
    
    const [message, setMessage] = useState("")
    const [sender, setSender] = useState("")
    
    const [avatarUri, setAvatarUri] = useState("")
    
    const onSave=async ()=>{
        
        const post: Post = {
            message:message,
            sender:currentUserEmail,
            imageURL:"",
        }
        try {
            if (avatarUri != "") {
                console.log("uploading image")
                const url = await post_model.uploadImage(avatarUri)
                post.imageURL = url
                
            }
            const accessToken:any = await AsyncStorage.getItem('accessToken')
            await post_model.addPost(post,accessToken)
        } catch (err) {
            console.log("fail adding post: " + err)
        }
        navigation.goBack()
    }
    const onCancellCallback = () => {
        navigation.goBack()
    }
    const askPermission = async () => {
        try {
            const res = await ImagePicker.getCameraPermissionsAsync()
            if (!res.granted) {
                alert("camera permission is requiered!")
            }
        } catch (err) {
            console.log("ask permission error " + err)
        }
    }
    useEffect(() => {
        askPermission()
    }, [])
    const openCamera = async () => {
        try {
            const res = await ImagePicker.launchCameraAsync()
            if (!res.canceled && res.assets.length > 0) {
                const uri = res.assets[0].uri
                setAvatarUri(uri)
            }

        } catch (err) {
            console.log("open camera error:" + err)
        }
    }
    const openGallery = async () => {
        try {
            const res = await ImagePicker.launchImageLibraryAsync()
            if (!res.canceled && res.assets.length > 0) {
                const uri = res.assets[0].uri
                setAvatarUri(uri)
            }

        } catch (err) {
            console.log("open camera error:" + err)
        }
    }
    return (
        <ScrollView>
            <View style={styles.container}>
                <View>
                    {avatarUri == "" && <Image source={require('../assets/image.webp')} style={styles.avatar}></Image>}
                    {avatarUri != "" && <Image source={{ uri: avatarUri }} style={styles.avatar}></Image>}

                    <TouchableOpacity  >
                        <Ionicons name={'camera'} style={styles.cameraButton} size={50} onPress={openCamera} />
                    </TouchableOpacity>
                    <TouchableOpacity >
                        <FontAwesome5 style={styles.galleryButton} name="upload" size={40} color="black"onPress={openGallery} />
                    </TouchableOpacity>
                </View>

                <TextInput
                    style={styles.input}
                    onChangeText={setMessage}
                    value={message}
                    placeholder={'Message'}
                />
                
                <View style={styles.buttonesContainer}>
                    <TouchableOpacity  style={styles.button} onPress={onCancellCallback}>
                        <Text style={styles.buttonText}>Cancel</Text>
                    </TouchableOpacity>
                    <TouchableOpacity  style={styles.button} onPress={onSave}>
                        <Text style={styles.buttonText}>Save</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ScrollView>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    avatar: {
        height: 250,
        resizeMode: "contain",
        alignSelf: 'center',
        width: '100%'
    },
    cameraButton: {
        position: 'absolute',
        bottom: -10,
        left: 10,
        width: 50,
        height: 50,
    },
    galleryButton: {
        position: 'absolute',
        bottom: -10,
        right: 10,
        width: 50,
        height: 50,
    },
    input: {
        margin: 12,
        borderWidth: 1,
        padding: 50,
        borderRadius: 10,
        textAlign:'left'
    },
    buttonesContainer: {
        flexDirection: 'row',
        
    },
    button: {
        flex: 1,
        margin: 12,
        padding: 12,
        backgroundColor: "#fb5b5a",
        borderRadius: 10,
    },
    buttonText: {
        textAlign: 'center',
        color: 'white',
        fontWeight:'bold'
    }
});

export default AddPostScreen
