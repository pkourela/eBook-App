import React, { useEffect, useState } from 'react';
import { View, Image, SafeAreaView, Text, StyleSheet, ImageBackground, TouchableOpacity, FlatList, ScrollView } from 'react-native';
import { getAuth, signOut } from "firebase/auth";
import { auth } from '../firebase'


const HomeScreen = ({ navigation }) => {
  
  {/* Fetch Book */}
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  useEffect(() => {
    fetch('https://raw.githubusercontent.com/pkourela/books/main/booksContent.json')
      .then((response) => response.json())
      .then((json) => setData(json))
      .catch((error) => console.error(error))
  }, []);

   {/* All Books Render */}
   const renderAllBookItem = ({item}) => {
    return (
        <View style={styles.BookWrapper}>
            <TouchableOpacity onPress={() => navigation.navigate('Details', {item: item}) } >
                <View>
                    <Image source={{uri:item.imageLink}} style={styles.BookImage}/>
                    <Text style={styles.BookTitle}>{item.title}</Text>
                    <Text style={styles.BookAuthor}>{item.author}</Text>
                </View>
            </TouchableOpacity>
        </View>
    )
  }  

  const handleSignOut = () => {
    const auth = getAuth();
    signOut(auth)
    .then(() => {
        // Sign-out successful.
        navigation.replace("Login")
        console.log('Successful logout')
    }).catch((error) => {
        // An error happened.
        console.log('Error')
    });
}


  return (
    <ScrollView>
      <TouchableOpacity style={styles.searchWrapper} onPress={() => navigation.push('SearchBook') }>
          <Text style={styles.BookAuthor}>Search a book...</Text>
      </TouchableOpacity>
        <View style={styles.userCardContainer}>
        <Text> {auth.currentUser?.email} </Text>
            <TouchableOpacity onPress={handleSignOut}>
              <Text style={styles.userText}>Log out</Text>
            </TouchableOpacity>
        </View>
        <View style={styles.library}>
            <TouchableOpacity onPress={() => navigation.navigate('FavouriteBooks')}>
              <Text>My Library</Text>
            </TouchableOpacity>
        </View>
      <View style={styles.FlatlistWrapper}>
            <FlatList 
                data={data}
                renderItem={renderAllBookItem}
                keyExtractor={item => item.id}
                numColumns={2}
            />  
      </View>
    
    </ScrollView>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
  FlatlistWrapper: {
    marginVertical: 10,
    marginLeft: 20
  },
  BookWrapper: {
    marginHorizontal: 6,
    justifyContent: 'space-between',
    flex: 1,
  },
  BookImage: {
    borderRadius: 7,
    height: 230,
    width: 150,
    resizeMode: 'cover',
    marginTop: 20
  },
  library: {
    alignSelf: 'center',
    backgroundColor: 'lightgrey',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10
  },
  BookTitle: {
    marginTop: 5,
    fontSize: 13,
    fontWeight: 'bold'
  },
  BookAuthor: {
    fontSize: 10,
  },
  userCardContainer: {
    flexDirection: 'row',
    padding: 10,
    alignItems: 'center',
    justifyContent: 'space-between',
    marginRight: 15,
  },
  userText: {
    fontWeight: '900',
    backgroundColor: 'black',
    color: 'white',
    padding: 5,
    borderRadius: 5,
    shadowColor: 'black',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.3,
    elevation: 6,
  },
  searchWrapper: {
    borderWidth: 1,
    borderColor: 'grey',
    alignSelf: 'center',
    paddingVertical: 10,
    paddingHorizontal: 25,
    borderRadius: 10,
    marginTop: 15,
    width: 330
  }
})