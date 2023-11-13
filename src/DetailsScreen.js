import { View, Image, Button, SafeAreaView, Text, StyleSheet, ImageBackground, TouchableOpacity, FlatList, ScrollView } from 'react-native';
import React, { useEffect, useState } from 'react';
import { getFirestore, collection, getDocs, setDoc, doc, updateDoc, arrayUnion, arrayRemove} from 'firebase/firestore'
import { auth } from '../firebase';

const db = getFirestore();


const DetailsScreen = ({route, navigation}) => {

    const { item } = route.params;

    const AddBook = () => {
      setDoc(doc(db, `${auth.currentUser?.email}`, `${item.title}`), {
          author: `${item.author}`,
          country: `${item.country}`,
          imageLink: `${item.imageLink}`,
          language: `${item.language}`,
          pages: `${item.pages}`,
          title: `${item.title}`,
          year: `${item.year}`,
          pdfLink:`${item.pdfLink}`,
          saved: true             
      })
  }

    return (
        <View style={styles.containerDetails}>
            <ScrollView style={styles.scrollView}>
                <Text style={styles.TitleBook}>{item.title}</Text>  
                <Text style={styles.authorText}>{item.author}</Text>
                <Image source={{uri:item.imageLink}} style={styles.BookImage}/>
                <View style={styles.detailsContainer}>
                  <Text>Year: {item.year}</Text>
                  <Text>Language: {item.language}</Text>
                  <Text>Pages: {item.pages}</Text>
                </View>
                <TouchableOpacity style={styles.Button} onPress={() => navigation.navigate('BookRead', {item: item})}>
                  <Text>Read Book</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.Button} onPress={() => AddBook()}>
                  <Text>Save to library</Text>
                </TouchableOpacity>
            </ScrollView>
        </View>
  )
}

export default DetailsScreen

const styles = StyleSheet.create({
    BookImage: {
      borderRadius: 7,
      height: 230,
      width: 150,
      resizeMode: 'cover',
      marginTop: 30,
      alignSelf: 'center'
    },
    TitleBook: {
      marginTop: 30,
      fontSize: 18,
      fontWeight: 'bold',
      alignSelf: 'center'
    },
    authorText: {
      fontSize: 12,
      alignSelf: 'center'
    },
    Button: {
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: 14,
      paddingHorizontal: 32,
      borderRadius: 6,
      backgroundColor: 'white',
      width: '50%',
      marginTop: 20,
      alignSelf: 'center'
    },
    detailsContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-around',
      marginHorizontal: 15,
      marginVertical: 40,
      borderRadius: 8,
      paddingVertical: 20,
      backgroundColor: 'white',
    }
    
})