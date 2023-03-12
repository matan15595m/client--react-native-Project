import React, { FC, useEffect, useState } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity } from 'react-native';
import auth_model,{ loginUser } from '../models/auth_model';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginScreen:FC<{navigation:any}> =({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const toggleIsSubmitted = () => {
    setIsSubmitted(value => !value);
  };
  async function checkIfLoggedIn(){
    if(await AsyncStorage.getItem('accessToken') != null){
      const email = AsyncStorage.getItem('currentUserEmail')
      navigation.navigate('MainAppScreen',{currentUserEmail:email});
    }
  }
  
  
  useEffect(() => {
    if (isSubmitted === true) {
      navigation.navigate('MainAppScreen');
    }
    
  }, [isSubmitted]);
  
  const handleLogin = async() => {
    
    const user: loginUser = {
        email: email,
        password: password,
    }
    try{
        const res= await auth_model.loginHandler(user)
        const token:any = res?.data
        await AsyncStorage.setItem('accessToken', token.accessToken.toString())
        await AsyncStorage.setItem('refreshToken', token.refreshToken.toString())
        await AsyncStorage.setItem('currentUserEmail',email)
        if(token != null){
        navigation.navigate('MainAppScreen',{currentUserEmail:email})
        }
        
    }catch(err){
        console.log(err)
    }

  }

  return (
    <View style={styles.container}>
      <Text style={styles.logo}>Welcome !</Text>
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
      <TouchableOpacity style={styles.loginBtn} onPress={handleLogin}>
        <Text style={styles.loginText}>LOGIN</Text>
      </TouchableOpacity>
      <Text style={styles.loginTextRegister}>Don't have an account ?</Text>
      <TouchableOpacity style={styles.loginBtnRegister} onPress={()=>{
        navigation.navigate('Register')}
        }>
        <Text style={styles.text}>Click here for register !</Text>
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
    fontWeight:'bold'
  },
  loginBtnRegister: {
    width: '70%',
    borderRadius: 25,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop:30,
    marginBottom: 10,
    fontWeight:'bold',
  },
  loginTextRegister: {
    color: 'black',
    fontWeight:'bold',
    alignContent:'center',
  },
  text:{
    marginTop:-80,
    color: 'black',
    fontWeight:'bold',
    alignContent:'center',
    textDecorationLine:'underline'
  }
});

export default LoginScreen;