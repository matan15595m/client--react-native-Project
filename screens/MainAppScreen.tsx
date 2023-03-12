import React, { FC, useState } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, TouchableHighlight } from 'react-native';
import auth_model,{ loginUser } from '../models/auth_model';
import { FlatList } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import ProfileScreen from './profile';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import PostsListScreen from './PostsList';
import PostDetailsScreen from './PostDetailsScreen';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Header } from 'react-native/Libraries/NewAppScreen';
import AddPostScreen from './AddPost';
import CurrentUserPosts from './currentUserPosts';
import CurrentUserPostDetails from './CurrentUserPostDetails';
const Tab = createBottomTabNavigator()
const HomeStack = createNativeStackNavigator()
const ProfileStack = createNativeStackNavigator()


export const HomeStackScreen:FC =(navigation:any)=>{

    return(
    <HomeStack.Navigator>
     <HomeStack.Screen name="PostsListScreen" component={PostsListScreen} options={{headerShown:false}}/>  
     <HomeStack.Screen name="PostDetailsScreen" component={PostDetailsScreen} options={{headerTitle:"Post details"}}/>
     <HomeStack.Screen name="AddPostScreen" component={AddPostScreen} options={{headerTitle:"Add new post"}}/>
    </HomeStack.Navigator>
    )
};

export const ProfileStackScreen:FC<{sender:any}> =(sender:any)=>(
    
    <ProfileStack.Navigator >
     <ProfileStack.Screen name="ProfileScreen"  component={ProfileScreen} initialParams={{sender}} options={{headerShown:false}}/>
     <ProfileStack.Screen name="CurrentUserPosts" component={CurrentUserPosts} initialParams={{sender}} options={{headerTitle:"Your posts"}}/>
     <ProfileStack.Screen name="CurrentUserPostDetails" component={CurrentUserPostDetails} initialParams={{sender}} options={{headerTitle:"Your post details"}}/>
    </ProfileStack.Navigator> 
);

const MainAppScreen:FC<{route: any,navigation:any}> =({route,navigation}) =>{ 
  const currentUserEmail = route.params.currentUserEmail
  
  const onAddPost = ()=>{
    navigation.navigate('AddPostScreen',{currentUserEmail:currentUserEmail})
  }
        return (   
        <Tab.Navigator 
         screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
           let iconName="";
           if (route.name === 'Home') {
              iconName = focused
              ? 'home'
              : 'home-outline';
              
            } else if (route.name === 'Profile') {
              iconName = focused
              ? 'person'
              : 'person-outline';
            }
       return <Ionicons name={iconName as "key"} size={24} color="#fb5b5a"/>;
         }
      }) 
      
    }
    >
          <Tab.Screen
          options={{headerStyle:{backgroundColor:"#fb5b5a"},headerRight:()=>(
            <TouchableHighlight onPress={onAddPost} underlayColor={"#fb5b5a"}>
                <Ionicons name={'add-circle'} size={40} color={'white'} />
            </TouchableHighlight>
           ),headerTitleStyle:{color:'white',fontWeight:'bold'},tabBarLabel: ({focused, color}) => (<Text style={{color: focused ? "#fb5b5a" : color}}>Home</Text>)
           }}  
           name="Home" component={HomeStackScreen} />
          <Tab.Screen 
          options={{headerStyle:{backgroundColor:"#fb5b5a"},headerTitleStyle:{color:'white',fontWeight:'bold'},
            tabBarLabel: ({focused, color}) => (
              <Text style={{color: focused ? "#fb5b5a" : color}}>Profile</Text>
            ),
          }}
          name="Profile" children={()=><ProfileStackScreen sender={currentUserEmail} />} />
        </Tab.Navigator> 
        )
      
        };
export default MainAppScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#cccccc',
    alignItems: 'center',
    justifyContent: 'center',
  },
  });