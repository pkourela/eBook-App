import * as React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './src/HomeScreen';
import DetailsScreen from './src/DetailsScreen';
import BookReadScreen from './src/BookReadScreen';
import SearchBooksScreen from './src/SearchBooksScreen';
import LoginScreen from './src/Login';
import FavouriteBooksScreen from './src/FavouriteBooks';
import DeleteBookScreen from './src/DeleteBook';
import {auth} from './firebase';

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Details" component={DetailsScreen} />
        <Stack.Screen name="BookRead" component={BookReadScreen} />
        <Stack.Screen name="SearchBook" component={SearchBooksScreen} />
        <Stack.Screen name="FavouriteBooks" component={FavouriteBooksScreen} />
        <Stack.Screen name="DeleteBook" component={DeleteBookScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;