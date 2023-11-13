import { StyleSheet, Text, View, ScrollView, Image,TouchableOpacity, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react';
import { getFirestore, collection, doc, getDocs, deleteDoc, onSnapshot} from 'firebase/firestore'
import { auth } from '../firebase';

const db = getFirestore();

const FavouriteBooksScreen = ({navigation}) => {
    
    
    const [books, setBooks] = useState([]);
    useEffect(() => {
        onSnapshot(collection(db, `${auth.currentUser?.email}`), (snapshot) =>
            setBooks(snapshot.docs.map((doc) => ({...doc.data(), id: doc.id})))
            )
    }, []);

   
    
  return (
    <View backgroundColor= 'white'>
        <ScrollView>
            <Text style={styles.headerText}>My Library</Text>
            <Text style={styles.emailText}>{auth.currentUser?.email}</Text>

            {books.map(item => (

                <View style={styles.bookContainer} key={item.id}>
                    <TouchableOpacity style={styles.bookWrapper} onPress={() => navigation.navigate('Details', {item: item}) } >
                        <Image source={{uri:item.imageLink}} style={styles.AllBookImage}/> 
                        <Text style={styles.BookTitle}>{item.title}</Text>
                        <Text style={styles.BookAuthor}>{item.author}</Text>
                    </TouchableOpacity>
                    <View style={styles.buttonsWrapper}>
                        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Details', {item: item}) }>
                            <Text>Read Book</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('DeleteBook', {item: item})}>
                            <Text>Remove Book</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                
            ))}

        </ScrollView>
    </View>
  )
}

export default FavouriteBooksScreen

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
        color: 'white',
        fontSize: 13,
        fontWeight: 'bold'
    },
    BookAuthor: {
        color: 'grey',
        fontSize: 10,
    },
    bookContainer: {
        marginHorizontal: 20,
        marginTop: 10,
        backgroundColor: 'lightgrey',
        padding: 20,
        borderRadius: 10,
        shadowColor: 'black',
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.3,
        elevation: 6,
        flexDirection: 'row',
        flex: 1,
    },
    headerText: {
        fontSize: 30,
        fontWeight: "bold",
        marginTop: 5,
        marginLeft: 20
    },
    emailText: {
        marginLeft: 20
    },
    bookWrapper: {
        flex: 1,
        width: '100%'
    },
    buttonsWrapper: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
        marginBottom: 4
    },
    button: {
        paddingHorizontal: 10,
        paddingVertical: 10,
        marginTop: 10,
        backgroundColor: 'white',
        borderRadius: 10,
        shadowColor: 'black',
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.3,
        elevation: 6,
    }
})