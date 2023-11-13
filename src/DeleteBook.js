import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { getFirestore, collection, doc, getDocs, deleteDoc, onSnapshot } from 'firebase/firestore'
import { auth } from '../firebase';

const db = getFirestore();


const DeleteBookScreen = ({route, navigation}) => {

    const { item } = route.params;
  
    

    const DeleteBook = () => {
        deleteDoc(doc(db, `${auth.currentUser?.email}`, `${item.title}`));
    }
  
  
    return (
    <View backgroundColor= 'white' height='100%'>
        <View marginTop= '12%'>
            <Text style={styles.headerText}>Want to remove this book from your library</Text>
            <Text style={styles.headerText}>Are you sure?</Text>
        </View>
        <View style={styles.bookContainer}>
            <Image source={{uri:item.imageLink}} style={styles.AllBookImage}/> 
            <Text style={styles.BookTitle}>{item.title}</Text>
            <Text style={styles.BookAuthor}>{item.author}</Text>
            
        </View>
        <TouchableOpacity style={styles.button} onPress={() => {
                        navigation.navigate('FavouriteBooks');
                        DeleteBook();
                    }}>
            <Text style={styles.buttonText}>Yes, remove the book</Text>
        </TouchableOpacity>
    </View>
  )
}

export default DeleteBookScreen

const styles = StyleSheet.create({
    AllBookImage: {
        borderRadius: 7,
        height: 120,
        width: 100,
        resizeMode: 'cover',
        backgroundColor: 'white'
    },
    BookTitle: {
        marginTop: 5,
        color: 'black',
        fontSize: 13,
        fontWeight: 'bold'
    },
    BookAuthor: {
        color: 'lightgrey',
        fontSize: 10,
    },
    bookContainer: {
        marginHorizontal: 20,
        marginTop: 20,
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        shadowColor: 'black',
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.3,
        elevation: 6,
        width: 138,
        alignSelf: 'center'
    },
    headerText: {
        fontSize: 17,
        fontWeight: '700',
        alignSelf: 'center'
    },
    buttonText: {
        fontSize: 14,
        fontWeight: '600',
        alignSelf: 'center',
        color: 'red'
    },
    button: {
        alignSelf: 'center',
        padding: 15,
        marginTop: 20,
    }
})