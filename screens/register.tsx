import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { FC,useEffect,useState } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity } from 'react-native'
import register_model,{registerUser} from '../models/register_model';

const RegisterScreen:FC<{navigation:any}> =({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const[fullname,setFullname] = useState('')
  
  const handleRegister = async() => {
    const user: registerUser = {
        email: email,
        password: password,
        fullname:fullname,
        imageURL:""
    }
    try{
        const res= await register_model.registerHandler(user)
        const token:any = res?.data
        await AsyncStorage.setItem('accessToken', token.accessToken.toString())
        await AsyncStorage.setItem('refreshToken', token.refreshToken.toString())
        if(token != null){
        navigation.navigate('MainAppScreen',{currentUserEmail:email})
        }
    }catch(err){
        console.log(err)
    }

  }

  return (
    <View style={styles.container}>
      <Text style={styles.logo}>Register</Text>
      <View style={styles.inputView}>
        <TextInput
          style={styles.inputText}
          placeholder="Email"
          placeholderTextColor="#003f5c"
          onChangeText={(text) => setEmail(text)}
        />
      </View>
      <View style={styles.inputView}>
        <TextInput
          style={styles.inputText}
          placeholder="Password"
          placeholderTextColor="#003f5c"
          secureTextEntry={true}
          onChangeText={(text) => setPassword(text)}
        />
      </View>
      <View style={styles.inputView}>
        <TextInput
          style={styles.inputText}
          placeholder="Full name"
          placeholderTextColor="#003f5c"
          onChangeText={(text) => setFullname(text)}
        />
      </View>
      <TouchableOpacity style={styles.loginBtn} onPress={handleRegister}>
        <Text style={styles.loginText}>REGISTER</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#cccccc',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    fontWeight: 'bold',
    fontSize: 30,
    color: '#fb5b5a',
    marginBottom: 40,
  },
  inputView: {
    width: '80%',
    backgroundColor: '#fff',
    borderRadius: 25,
    height: 50,
    marginBottom: 20,
    justifyContent: 'center',
    padding: 20,
  },
  inputText: {
    height: 50,
    color: 'black',
  },
  loginBtn: {
    width: '80%',
    backgroundColor: '#fb5b5a',
    borderRadius: 25,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 40,
    marginBottom: 10,
  },
  loginText: {
    color: 'white',
  },
});

export default RegisterScreen;