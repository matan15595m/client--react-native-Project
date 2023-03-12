import { useState, FC, useEffect } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, Button, Alert, TextInput, ScrollView } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { FontAwesome5 } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import auth_model from '../models/auth_model';
import AsyncStorage from '@react-native-async-storage/async-storage';
import post_model, { Post } from '../models/post_models/post_model';
import Loading from './Loading';

const CurrentUserPostDetails: FC<{ route: any, navigation: any }> = ({ route, navigation }) => {
    
    const [message, setMessage] = useState("")
    const [update, setUpdate] = useState(false)
    const[loading,setLoading] = useState(false)
    const [avatarUri, setAvatarUri] = useState("")
    const Message = route.params.message
    const sender = route.params.sender
    const imageURL = route.params.imageURL
    const id = route.params.id

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
         setMessage(Message)
         
    }, [])
    const openCamera = async () => {
        try {
            const res = await ImagePicker.launchCameraAsync()
            if (!res.canceled && res.assets.length > 0) {
                const uri = res.assets[0].uri
                setAvatarUri(uri)
                setUpdate(true)
            }

        } catch (err) {
            console.log("open camera error:" + err)
        }
    }
    const onSave=async ()=>{
        
        const post: Post = {
            message:message,
            sender:sender,
            imageURL:imageURL
        }
        try {
            setLoading(true)
            if (avatarUri != "") {  
                console.log("uploading image")
                const url = await post_model.uploadImage(avatarUri)
                post.imageURL = url
                console.log("got url from upload: " + url)
            }
            const accessToken:any = await AsyncStorage.getItem('accessToken')
            await post_model.updatePost(post,accessToken,id)
            setLoading(false)
        } catch (err) {
            console.log("fail adding post: " + err)
            setLoading(false)
        }
        navigation.goBack()
        setLoading(false)
    }
    const openGallery = async () => {
        try {
            const res = await ImagePicker.launchImageLibraryAsync()
            if (!res.canceled && res.assets.length > 0) {
                const uri = res.assets[0].uri
                setAvatarUri(uri)
                setUpdate(true)
            }

        } catch (err) {
            console.log("open camera error:" + err)
        }
    }
    return (
        <ScrollView>
            {loading? <Loading />:
            <View style={styles.container}>
                <View>
                    {update  && <Image source={{ uri: avatarUri}} style={styles.avatar}></Image>}
                    {imageURL == "" && <Image source={require('../assets/image.webp')} style={styles.avatar}></Image>}
                    {imageURL != "" && !update && <Image source={{ uri: imageURL}} style={styles.avatar}></Image>}

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
                    placeholder={'message'}
                />
                <View style={styles.buttonesContainer}>
                    <TouchableOpacity  style={styles.button} onPress={onSave}>
                        <Text style={styles.buttonText}>Save</Text>
                    </TouchableOpacity>
                </View>
            </View>}
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
        bottom: -43,
        left: 50,
        width: 50,
        height: 50,
    },
    galleryButton: {
        position: 'absolute',
        bottom: -50,
        right: 50,
        width: 50,
        height: 50,
    },
    input: {
        height: 40,
        margin: 12,
        marginTop:50,
        borderWidth: 1,
        padding: 10,
        borderRadius: 5,
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

export default CurrentUserPostDetails